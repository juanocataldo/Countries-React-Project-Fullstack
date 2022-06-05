import '../Styles/country.css'
import '../Styles/filters.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFullActivities, getCountriesPaginated, GET_ALL_COUNTRIES, orderCountries, GET_FILTERED_COUNTRIES, getCountries, getAllActivities, GET_FULL_COUNTRY_LIST } from "../Redux/actions"
import { Countries } from "./Countries"
import { Pagination } from "./Pagination"

export function Home2({ countries }) {

  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage, setCountriesPerPage] = useState(10)

  const [countryOrder, setCountryOrder] = useState('')
  const [populationOrder, setPopulationOrder] = useState('')
  const [searchCountryByName, setSearchCountryByName] = useState('')
  const fullActivities = useSelector(store => store.full_activities)
  
  const[az , setAz] = useState(true)
  const[za , setZa] = useState(false)

  const [bigP , setBigP] = useState(false)
  const [smallP , setSmallP] = useState(false)

  let allActivities = useSelector(store => store.countries_activities)
  let countriesPaginated = useSelector(store => store.countries)
  

  const allCountries = useSelector(store => store.fullCountryList)
  const fixedAllCountries = useSelector(store => store.countries)
  const favorites = useSelector(store => store.favorites_countries)
  const indexOfLastPost = currentPage * countriesPerPage;
  const indexOfFirstPost = indexOfLastPost - countriesPerPage;
  const currentPosts = allCountries.slice(indexOfFirstPost, indexOfLastPost).sort(compare)
  
  let updated = Object.assign([{}], fixedAllCountries, allCountries);
  
 

  useEffect(() => {
    updated = Object.assign([{}], fixedAllCountries, allCountries);
    setCountryOrder('ASC')
    setPopulationOrder('')
    dispatch(getAllActivities())
    
    if(allCountries.length<=0){
      dispatch(getCountriesPaginated('ASC', ''))
      dispatch(getCountries())
    }
    dispatch(getFullActivities())
  }, [])

  useEffect(() => {
    updated = Object.assign([{}], fixedAllCountries, allCountries);
  },[favorites])

  useEffect(()=>{
    let azBtn = document.getElementById('az')
    let zaBtn = document.getElementById('za')


    if(az){
      azBtn.style.backgroundColor = "rgb(128,96,44)"
      zaBtn.style.backgroundColor = "#515960"
    }
    if(za){
      zaBtn.style.backgroundColor = "rgb(128,96,44)"
      azBtn.style.backgroundColor = "#515960"
    }

    let big = document.getElementById('bigP')
    let small = document.getElementById('smallP')
    console.log(bigP)
    console.log(smallP)
    if(bigP){
      big.style.backgroundColor = "rgb(128,96,44)"
      small.style.backgroundColor = "#515960"
    }

    if(smallP){
      small.style.backgroundColor = "rgb(128,96,44)"
      big.style.backgroundColor = "#515960"
    }

  },[az, bigP, currentPage])

  useEffect(()=>{
   
  },[bigP])

  function compare(a, b) {
    if (a.last_nom < b.last_nom) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  }

  // FILTRO Z-A
  function orderByZA() {
    setZa(true)
    setAz(false)

    setCountryOrder('DESC')
    setPopulationOrder('')
    dispatch(getCountriesPaginated('DESC', ''))
  }

  // FILTRO A-Z
  function orderByAZ() {    
    setAz(true)
    setZa(false)

   
    setCountryOrder('ASC')
    setPopulationOrder('')
    dispatch(getCountriesPaginated('ASC', ''))
  }

  // FILTRO POPULATION
  function orderByBiggerPopulation() {
    setBigP(true)
    setSmallP(false)
    
    setCountryOrder('')
    setPopulationOrder('DESC')
    dispatch(getCountriesPaginated('', 'DESC'))
  }

  function orderBySmallerPopulation() {
    setBigP(false)
    setSmallP(true)
    setPopulationOrder('ASC')
    setCountryOrder('')
    dispatch(getCountriesPaginated('', 'ASC'))
  }

  // FILTRO POR NOMBRE
  function fillSearchByName(e) {
    e.preventDefault()
    setSearchCountryByName(e.target.value)
  }

  const filterItems = query => {
    return allCountries.filter(c => c.country_name.match(new RegExp(query, "i")))
  }


  function filterByContinent(e) {
    updated = Object.assign([{}], fixedAllCountries, allCountries);
    let filtered = updated.filter(c => c.country_continent === e.target.value)
    dispatch({
      type: GET_FULL_COUNTRY_LIST,
      payload: filtered
    })
  }


  function filterByActivity(e) {
    let filter = []
    let filtered = []
    filter = fullActivities.map(a => {

      if (a.touact_name.toLowerCase() === e.target.value.toLowerCase()) {
        return a.countries.map(a => a.country_id)
      }
    })
    filtered = filter.filter(function (x) {
      return x !== undefined;
    });
    filtered = updated.filter(item => filtered[0].includes(item.country_id));

    dispatch({
      type: GET_FULL_COUNTRY_LIST,
      payload: filtered
    })
  }

  function searchByName(e) {
    e.preventDefault()
    let filtered = filterItems(searchCountryByName)
    if(searchCountryByName === ''){
      console.log('filtro todo')
      dispatch({
        type: GET_FULL_COUNTRY_LIST,
        payload: updated.sort(compare)
      })
    }else{
      dispatch({
        type: GET_FULL_COUNTRY_LIST,
        payload: filtered
      })
    }
  }


  const seen = new Set();
  allActivities = allActivities.filter(el => {
    const duplicate = seen.has(el.touact_name.toLowerCase());
    seen.add(el.touact_name.toLowerCase());
    return !duplicate;
  });



  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  

  return <div>
    {/* FILTROS */}
    <div className="visual">
      <div className="filter">
        {/* <div className="title-dock">
          <span>Home</span>
        </div> */}
         <div className="page-dock">
          <h1 className='title'>Home</h1>
        </div>

        <div className="filter-dock">
          <span>Filters</span>
        </div>

        <div className="inner-filter">
          <div className="filtro-row" id='name'>
            <span>Country name</span>
            <form onSubmit={searchByName} className='searchByName' style={{marginTop:"5px"}}>
              <input autoComplete='off' className="input" id='inputNameSearch' type="text" name="searchByName" placeholder="Search country" onChange={fillSearchByName} />
              <button className='search'>
                <span class="material-symbols-outlined">search</span>
              </button>
              {/* <input className="search" type="submit" value="" /> */}
            </form>
          </div>
          <div className="filtro-row">
            <span>Alphabetically</span><br />
            <button id="az" className="input" onClick={() => orderByAZ()}>A-Z</button>
            <button id="za" className="input" onClick={() => orderByZA()}>Z-A</button><br />
          </div>
          <div className="filtro-row">
            <span>By Continent</span><br />
            <select className="input" name="continent" id="continents" onChange={filterByContinent}>
              <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
              <option value="Antarctica">Antartica</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>
          <div className="filtro-row">
            <span>By activity</span><br />
            <select className="input" name="activity" id="activities" defaultChecked='' onChange={filterByActivity}>
              <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
              {allActivities &&

                allActivities.map(c => <option value={c.touact_name}>{c.touact_name}</option>)}
            </select>

          </div>
          <div className="filtro-row">
            <span>By population</span><br />
            <button id="bigP" className="input" onClick={() => orderByBiggerPopulation()}>Bigger poblation</button>
            <button id="smallP" className="input" onClick={() => orderBySmallerPopulation()}>Smaller poblation</button>
          </div>
        </div>
      </div>
      <div className="paginatorSpace">
        <div className="paginatorContainer">
          <Pagination postsPerPage={countriesPerPage} totalPosts={allCountries.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>

      <div className="countrySpace">
        {/* MUESTRO COUNTRIES */}
        <div className="countryContainer">
          <Countries posts={currentPosts} />
          {/* {countriesPaginated && countriesPaginated.map(c => <Country id={c.country_id} name={c.country_name} flag={c.country_flag} continent={c.country_continent} poblation={c.country_poblation} area={c.country_area} />)} */}
        </div>


      </div>

    </div>

  </div>

  // return <div>

  //     {/* {allCountries && allCountries.map(c => <p>{c.country_name}</p>)} */}
  //     <Countries posts={currentPosts} />
  //     <Pagination postsPerPage={countriesPerPage} totalPosts={allCountries.length} paginate={paginate}/>
  // </div>
}