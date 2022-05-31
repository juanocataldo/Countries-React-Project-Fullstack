import { Country } from "./Country"
import '../styles/country.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCountriesPaginated, GET_ALL_COUNTRIES, orderCountries, GET_FILTERED_COUNTRIES, getCountries, getAllActivities } from "../Redux/actions"
import { NavLink } from "react-router-dom"

export function Home() {

    const dispatch = useDispatch()
    let countriesPaginated = useSelector(store => store.countries)
    let allCountries = useSelector(store => store.fullCountryList)
    let allActivities = useSelector(store => store.countries_activities)

    const [countryOrder, setCountryOrder] = useState('')
    const [populationOrder, setPopulationOrder] = useState('')
    const [searchCountryByName, setSearchCountryByName] = useState('')
    // const [activities, setActivities] = useState('')

    const pagination = Math.ceil(allCountries.length / 10)

    useEffect(() => {
        setCountryOrder('ASC')
        setPopulationOrder('')
        dispatch(getCountriesPaginated('ASC', ''))      
        dispatch(getCountries())  
        dispatch(getAllActivities())
        
    }, [])


    let paginador = []
    for (let i = 0; i < pagination; i++) {
        paginador.push(i)
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
    function fillSearchByName(e){
        e.preventDefault()
        setSearchCountryByName(e.target.value)        
    }

    const filterItems = query => {        
        return allCountries.filter(c => c.country_name.match(new RegExp(query, "i")))       
      }

    function filterByContinent(e){
        console.log('FILTRANDO POR CONTINENTE ',e.target.value)
        let filtered = allCountries.filter(c => c.country_continent === e.target.value)
        dispatch({
            type:GET_ALL_COUNTRIES,
            payload:filtered        
        })
    }



    function searchByName(e){
        e.preventDefault()             
        let filtered = filterItems(searchCountryByName)
        countriesPaginated = filtered        
        console.log('filtered ',filtered)
        console.log('countriesPaginated ', countriesPaginated)

        dispatch({
            type:GET_ALL_COUNTRIES,
            payload:filtered        
        })
    }
    return <div>
        <h1>Countries</h1>
        <div className="filters">
            <form onSubmit={searchByName}>
                <input type="text" name="searchByName" id="" placeholder="Search country" onChange={fillSearchByName}/>
                <input type="submit" value="Search" />
            </form>
            
            <br />
            {/* FILTROS */}
            <button onClick={() => orderByAZ()}>A-Z</button>
            <button onClick={() => orderByZA()}>Z-A</button><br />
            
            <label for="continent">Order by continent:</label>
            <select name="continent" id="continents" onChange={filterByContinent}>
                <option  value="Africa">Antartica</option>
                <option  value="Africa">Africa</option>
                <option  value="Asia">Asia</option>
                <option  value="Europe">Europe</option>
                <option  value="North America">North America</option>
                <option  value="Oceania">Oceania</option>
                <option  value="South America">South America</option>
            </select>
            <br />
            <label for="continent">Filter by activity:</label>
            <select name="activity" id="activities">
                {allActivities && allActivities.map(c => <option value={c.touact_name}>{c.touact_name}</option>)}               
            </select>
            <br />

            <button onClick={() => orderByBiggerPopulation()}>Bigger poblation</button>
            <button onClick={() => orderBySmallerPopulation()}>Smaller poblation</button>
        </div>

        {/* MUESTRO COUNTRIES */}
        <div className="countryContainer">
            {countriesPaginated && countriesPaginated.map(c => <Country id={c.country_id} name={c.country_name} flag={c.country_flag} continent={c.country_continent} poblation={c.country_poblation} area={c.country_area} />)}
        </div>

        {/* SETEO MI PAGINADOR CON EL ORDEN (ESTADO) Y PAGE AND SIZE */}
        {paginador.map(page => <button onClick={() => dispatch(getCountriesPaginated(countryOrder, populationOrder, page))}>{page}</button>)}
    </div>
}