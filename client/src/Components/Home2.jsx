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
  
  const[az , setAz] = useState(false)
  const[za , setZa] = useState(false)

  const [bigP , setBigP] = useState(false)
  const [smallP , setSmallP] = useState(false)
  const [countryList, setCountryList] = useState(countries)
  let continent = document.getElementById('continents')
  let activities = document.getElementById('activities')


  let allActivities = useSelector(store => store.countries_activities)

  const favorites = useSelector(store => store.favorites_countries)
  const indexOfLastPost = currentPage * countriesPerPage;
  const indexOfFirstPost = indexOfLastPost - countriesPerPage;
  let currentPosts=null;
  if(countryList.length <= 0)
    currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost).sort(compare)
    else
  currentPosts = countryList.slice(indexOfFirstPost, indexOfLastPost).sort(compare)
  
  
 

  useEffect(() => {
    dispatch(getAllActivities())    
    dispatch(getFullActivities())
  }, [])

  useEffect(() => {
  },[favorites])

  useEffect(()=>{
    let azBtn = document.getElementById('az')
    let zaBtn = document.getElementById('za')


    if(az){
      azBtn.style.backgroundColor = "rgb(128,96,44)"
      zaBtn.style.backgroundColor = "#515960"
    }else
      azBtn.style.backgroundColor = ""
    
    if(za){
      zaBtn.style.backgroundColor = "rgb(128,96,44)"
      azBtn.style.backgroundColor = "#515960"
    }else
    zaBtn.style.backgroundColor = ""

    let big = document.getElementById('bigP')
    let small = document.getElementById('smallP')
    console.log(bigP)
    console.log(smallP)
    if(bigP){
      big.style.backgroundColor = "rgb(128,96,44)"
      small.style.backgroundColor = "#515960"
    }else{
      big.style.backgroundColor = ""
    }

    if(smallP){
      small.style.backgroundColor = "rgb(128,96,44)"
      big.style.backgroundColor = "#515960"
    }else{
      small.style.backgroundColor = ""
    }

  },[az, bigP, smallP, currentPage])



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
    setBigP(false)
    setSmallP(false)
    setZa(true)
    setAz(false)
    if(countryList.length <= 0){
      setCountryList(countries.sort(function (b, a) {
        return ('' + a.country_name).localeCompare(b.country_name);}))
    }else{
      setCountryList(countryList.sort(function (b, a) {
        return ('' + a.country_name).localeCompare(b.country_name);}))

    }

  }

  // FILTRO A-Z
  function orderByAZ() {    
    setAz(true)
    setZa(false)
    setBigP(false)
    setSmallP(false)
    if(countryList.length <= 0){
      setCountryList(countries.sort(function (a, b) {
        return ('' + a.country_name).localeCompare(b.country_name);}))
    }else{
      setCountryList(countryList.sort(function (a, b) {
        return ('' + a.country_name).localeCompare(b.country_name);}))
      }
  }

  // FILTRO POPULATION
  function orderByBiggerPopulation() {
    setBigP(true)
    setSmallP(false)
    setZa(false)
    setAz(false)
    if(countryList.length <= 0){
    setCountryList(countries.sort(function (b, a) {
      return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
  }))}else{
    setCountryList(countryList.sort(function (b, a) {
      return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
  }))
  }
    
    
  }

  function orderBySmallerPopulation() {
    setZa(false)
    setAz(false)
    setBigP(false)
    setSmallP(true)
    
    if(countryList.length <= 0){
      setCountryList(countries.sort(function (a, b) {
        return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
    }))}else{
      setCountryList(countryList.sort(function (a, b) {
        return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
    }))
    }
    
  }

  // FILTRO POR NOMBRE
  function fillSearchByName(e) {
    e.preventDefault()
    setSearchCountryByName(e.target.value)
  }

  const filterItems = query => {
    return countries.filter(c => c.country_name.match(new RegExp(query, "i")))
  }


  function filterByContinent(e) {
    activities.selectedIndex = 0
    
    if(e.target.value === 'all')
      setCountryList(countries)  
    else
      setCountryList(countries.filter(c => c.country_continent === e.target.value))  
  }


  function filterByActivity(e) {
    let filter = []
    let filtered = []

    
    continent.selectedIndex = 0;

    if(e.target.value === 'all'){
      filter = fullActivities
      filtered = filter.filter(function (x) {
        return x !== undefined;
      });
      if(countryList.length <= 0)
      setCountryList(countries.filter(item => filtered.includes(item.country_id)));
    else
    setCountryList(countries.filter(item => filtered.includes(item.country_id)));
    }else{
      filter = fullActivities.map(a => {
  
        if (a.touact_name.toLowerCase() === e.target.value.toLowerCase()) {
          return a.countries.map(a => a.country_id)
        }
      })
      filtered = filter.filter(function (x) {
        return x !== undefined;
      });
      if(countryList.length <= 0)
      setCountryList(countries.filter(item => filtered[0].includes(item.country_id)));
    else
    setCountryList(countries.filter(item => filtered[0].includes(item.country_id)));
      
    }


  }

  function searchByName(e) {
    e.preventDefault()
    setCountryList(filterItems(searchCountryByName)) 
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
              <option disabled="" selected="Select" value="all">All Countries</option>
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
              <option disabled="" selected="Select" value="all">All Countries</option>
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
          {countryList.length <= 0 
          ?
          <Pagination postsPerPage={countriesPerPage} totalPosts={countries.length} paginate={paginate} currentPage={currentPage} />

          :
          <Pagination postsPerPage={countriesPerPage} totalPosts={countryList.length} paginate={paginate} currentPage={currentPage} />

          }
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