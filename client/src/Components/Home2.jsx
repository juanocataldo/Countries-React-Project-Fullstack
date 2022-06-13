import '../Styles/country.css'
import '../Styles/filters.css'
import '../Styles/form.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFullActivities, getCountriesPaginated, GET_ALL_COUNTRIES, orderCountries, GET_FILTERED_COUNTRIES, getCountries, getAllActivities, GET_FULL_COUNTRY_LIST } from "../Redux/actions"
import { Countries } from "./Countries"
import { Pagination } from "./Pagination"

export function Home2({ countries }) {

  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage, setCountriesPerPage] = useState(10)
  const [searchCountryByName, setSearchCountryByName] = useState('')
  const fullActivities = useSelector(store => store.full_activities)

  const [az, setAz] = useState(false)
  const [za, setZa] = useState(false)
  const [bigP, setBigP] = useState(false)
  const [smallP, setSmallP] = useState(false)
  const [countryList, setCountryList] = useState(countries)

  let continent = document.getElementById('continents')
  let activities = document.getElementById('activities')


  let allActivities = useSelector(store => store.countries_activities)

  const favorites = useSelector(store => store.favorites_countries)
  const indexOfLastPost = currentPage * countriesPerPage;
  const indexOfFirstPost = indexOfLastPost - countriesPerPage;
  let currentPosts = null;
  if (countryList.length <= 0)
    currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost).sort(compare)
  else
    currentPosts = countryList.slice(indexOfFirstPost, indexOfLastPost).sort(compare)




  useEffect(() => {
    dispatch(getAllActivities())
    dispatch(getFullActivities())
  }, [])

  useEffect(() => {
    console.log(currentPage)
    
  }, [currentPage])

  useEffect(() => {
    let azBtn = document.getElementById('az')
    let zaBtn = document.getElementById('za')


    if (az) {
      azBtn.style.backgroundColor = "rgb(128,96,44)"
      zaBtn.style.backgroundColor = "#12324D"
    } else
      azBtn.style.backgroundColor = ""

    if (za) {
      zaBtn.style.backgroundColor = "rgb(128,96,44)"
      azBtn.style.backgroundColor = "#12324D"
    } else
      zaBtn.style.backgroundColor = ""

    let big = document.getElementById('bigP')
    let small = document.getElementById('smallP')
    console.log(bigP)
    console.log(smallP)
    if (bigP) {
      big.style.backgroundColor = "rgb(128,96,44)"
      small.style.backgroundColor = "#263954"
    } else {
      big.style.backgroundColor = ""
    }

    if (smallP) {
      small.style.backgroundColor = "rgb(128,96,44)"
      big.style.backgroundColor = "#263954"
    } else {
      small.style.backgroundColor = ""
    }

  }, [az, za, bigP, smallP, currentPage])



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
    if (countryList.length <= 0) {
      setCountryList(countries.sort(function (b, a) {
        return ('' + a.country_name).localeCompare(b.country_name);
      }))
    } else {
      setCountryList(countryList.sort(function (b, a) {
        return ('' + a.country_name).localeCompare(b.country_name);
      }))

    }

  }

  // FILTRO A-Z
  function orderByAZ() {
    setAz(true)
    setZa(false)
    setBigP(false)
    setSmallP(false)
    if (countryList.length <= 0) {
      setCountryList(countries.sort(function (a, b) {
        return ('' + a.country_name).localeCompare(b.country_name);
      }))
    } else {
      setCountryList(countryList.sort(function (a, b) {
        return ('' + a.country_name).localeCompare(b.country_name);
      }))
    }
  }

  // FILTRO POPULATION
  function orderByBiggerPopulation() {
    setBigP(true)
    setSmallP(false)
    setZa(false)
    setAz(false)
    if (countryList.length <= 0) {
      setCountryList(countries.sort(function (b, a) {
        return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
      }))
    } else {
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

    if (countryList.length <= 0) {
      setCountryList(countries.sort(function (a, b) {
        return a.country_poblation.localeCompare(b.country_poblation, undefined, { numeric: true, sensitivity: 'base' });
      }))
    } else {
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
    setCurrentPage(1)
    activities.selectedIndex = 0

    if (e.target.value === 'all')
      setCountryList(countries)
    else
      setCountryList(countries.filter(c => c.country_continent === e.target.value))
  }


  function filterByActivity(e) {
    setCurrentPage(1)
    let filter = []
    let filtered = []


    continent.selectedIndex = 0;

    if (e.target.value === 'all') {
      filter = fullActivities
      filtered = filter.filter(function (x) {
        return x !== undefined;
      });
      if (countryList.length <= 0)
        setCountryList(countries.filter(item => filtered.includes(item.country_id)));
      else
        setCountryList(countries.filter(item => filtered.includes(item.country_id)));
    } else {

      console.log('fullActivities', fullActivities)

      filter = fullActivities.map(a => {

        if (a.touact_name.toLowerCase() === e.target.value.toLowerCase()) {
          return a.countries.map(a => a.country_id)
        }
      })

      console.log('filter', filter)

      filtered = filter.filter(function (x) {
        return x !== undefined;
      });

      //CONCATENO LOS RESULTADOS PARA TENERLOS PROLIJOS A MANO

      let resFinal = [].concat.apply([], filtered)

      console.log('Result', resFinal)

      setCountryList(countries.filter(item => resFinal.includes(item.country_id)));
    }
  }

  function searchByName(e) {
    e.preventDefault()
    console.log(filterItems(searchCountryByName))
    setCurrentPage(1)
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
    if (pageNumber > 0 && pageNumber < 26) {
      console.log('page', pageNumber)
      setCurrentPage(pageNumber)
    }
  }



  return <div>
    {/* FILTROS */}
    <div className="visual">
      <div className="filter">
        <div className="page-dock">
          <h1 className='title'>Home</h1>
        </div>

        <div className="inner-filter">
          <div className="filtro-row" id='name'>
            <span>Country Name</span>
            <form onSubmit={searchByName} className='searchByName' style={{ marginTop: "5px" }}>
              <div class="group">
                <input required="" type="text" class="input2" onChange={fillSearchByName} />
                <span class="highlight"></span>
                <span class="bar"></span>
              </div>
              <button className='search'>
                <span class="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
          <div className="filtro-row">
            <span>Alphabetically</span><br />
            <button id="az" className="input" onClick={() => orderByAZ()}>
              <div className="alphOrder">
                <span class="material-symbols-outlined">arrow_right_alt</span>
                AZ
              </div>
            </button>
            <button id="za" className="input" onClick={() => orderByZA()}>
              <div className="alphOrder">
                <span class="material-symbols-outlined">keyboard_backspace</span>
                AZ
              </div>
            </button><br />
          </div>
          <div className="filtro-row">
            <span className='filterName'>By Continent</span><br />
            <div className="iconFilter">
              <span id='iconFilter' class="material-symbols-outlined">public</span>
              <select className="inputContinents" name="continent" id="continents" onChange={filterByContinent}>
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
          </div>
          <div className="filtro-row">
            <span>By activity</span><br />
            <div className="iconFilter">
              <span id='iconFilter' class="material-symbols-outlined">rowing</span>
              <select className="inputContinents" name="activity" id="activities" defaultChecked='' onChange={filterByActivity}>
                <option disabled="" selected="Select" value="all">All Countries</option>
                {allActivities &&

                  allActivities.map(c => <option value={c.touact_name}>{c.touact_name}</option>)}
              </select>
            </div>

          </div>
          <div className="filtro-row">
            <span>By population</span><br />
            <div className="popu">
              <button id="bigP" className="btnPopulationOrder" onClick={() => orderByBiggerPopulation()}>
                <span class="material-symbols-outlined">person_add</span></button>
              <button id="smallP" className="btnPopulationOrder" onClick={() => orderBySmallerPopulation()}><span class="material-symbols-outlined">person_remove</span></button>
            </div>
          </div>
        </div>
      </div>

      <div className="paginatorSpace">
        <div className="paginatorContainer">        
          {countryList &&
          <>
              <button onClick={() => { paginate(currentPage - 1) }}>
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
              <Pagination postsPerPage={countriesPerPage} totalPosts={countryList.length || 250} paginate={paginate} currentPage={currentPage} />
              <button onClick={() => { paginate(currentPage + 1) }}>
                <span style={{ marginLeft: "15px" }} class="material-symbols-outlined">arrow_forward</span>
              </button>
            </>
            // :
            // <>
            //   <button onClick={() => { paginate(currentPage - 1) }}>
            //     <span class="material-symbols-outlined">arrow_back</span>
            //   </button>
            //   <Pagination postsPerPage={countriesPerPage} totalPosts={countryList.length} paginate={paginate} currentPage={currentPage} />
            //   <button onClick={() => { paginate(currentPage + 1) }}>
            //     <span style={{ marginLeft: "15px" }} class="material-symbols-outlined">arrow_forward</span>
            //   </button>
            // </>
          }
        </div>
      </div>

      <div className="countrySpace">
        <div className="countryContainer">
          <Countries posts={currentPosts} />
        </div>


      </div>

    </div>

  </div>
}