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
  let allActivities = useSelector(store => store.countries_activities)
  let countriesPaginated = useSelector(store => store.countries)
  useEffect(() => {
    setCountryOrder('ASC')
    setPopulationOrder('')
    dispatch(getAllActivities())
    dispatch(getCountriesPaginated('ASC', ''))
    dispatch(getCountries())
    dispatch(getFullActivities())
  }, [])

  const allCountries = useSelector(store => store.fullCountryList)
  const fixedAllCountries = useSelector(store => store.countries)

  const indexOfLastPost = currentPage * countriesPerPage;
  const indexOfFirstPost = indexOfLastPost - countriesPerPage;
  const currentPosts = allCountries.slice(indexOfFirstPost, indexOfLastPost).sort(compare)

  useEffect(() => {
    setCountryOrder('ASC')
    setPopulationOrder('')
    dispatch(getAllActivities())
    dispatch(getCountriesPaginated('ASC', ''))
    dispatch(getCountries())
    dispatch(getFullActivities())
  }, [])


  useEffect(() => {

    //     if(currentPage === 1)
    //     setCountriesPerPage(9)
    // else
    //     setCountriesPerPage(10)

  }, [currentPage])

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
    setCountryOrder('DESC')
    setPopulationOrder('')
    dispatch(getCountriesPaginated('DESC', ''))
  }

  // FILTRO A-Z
  function orderByAZ() {
    setCountryOrder('ASC')
    setPopulationOrder('')
    dispatch(getCountriesPaginated('ASC', ''))
  }

  // FILTRO POPULATION
  function orderByBiggerPopulation() {
    setCountryOrder('')
    setPopulationOrder('DESC')
    dispatch(getCountriesPaginated('', 'DESC'))
  }

  function orderBySmallerPopulation() {
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
    console.log('todos', fixedAllCountries)
    let filtered = fixedAllCountries.filter(c => c.country_continent === e.target.value)
    console.log('filtrados', filtered)
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
    filtered = fixedAllCountries.filter(item => filtered[0].includes(item.country_id));

    dispatch({
      type: GET_FULL_COUNTRY_LIST,
      payload: filtered
    })
  }

  function searchByName(e) {
    e.preventDefault()
    let filtered = filterItems(searchCountryByName)
    countriesPaginated = filtered

    dispatch({
      type: GET_FULL_COUNTRY_LIST,
      payload: filtered
    })
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
        <div className="title-dock">
          <span>Home</span>
        </div>

        <div className="filter-dock">
          <span>Filters</span>
        </div>

        <div className="inner-filter">
          <div className="filtro-row">
            <span>Country name</span>
            <form onSubmit={searchByName}>
              <input className="input" type="text" name="searchByName" id="" placeholder="Search country" onChange={fillSearchByName} />
              <input className="input" type="submit" value="Search" style={{ width: "100%" }} />
            </form>
          </div>
          <div className="filtro-row">
            <span>Alphabetically</span><br />
            <button id="btnFilter" className="input" onClick={() => orderByAZ()}>A-Z</button>
            <button id="btnFilter" className="input" onClick={() => orderByZA()}>Z-A</button><br />
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
            <button id="btnFilter" className="input" onClick={() => orderByBiggerPopulation()}>Bigger poblation</button>
            <button id="btnFilter" className="input" onClick={() => orderBySmallerPopulation()}>Smaller poblation</button>
          </div>
        </div>
      </div>
      <div className="paginatorSpace">
        <div className="paginatorContainer">
          <Pagination postsPerPage={countriesPerPage} totalPosts={allCountries.length} paginate={paginate} />
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