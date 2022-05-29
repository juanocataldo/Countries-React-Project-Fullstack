import { Country } from "./Country"
import '../styles/country.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCountries } from "../Redux/actions"
import { NavLink } from "react-router-dom"

export function Home(){

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCountries())
    },[])
        
    const countries = useSelector(store => store.countries.content)
    const pagination = useSelector(store => store.countries.totalPages)
    
    let paginador = []
    for (let i = 0; i < pagination; i++) {
        paginador.push(i)
    }

    console.log(pagination)
    return <div>
        <h1>Countries</h1>
        <div className="countryContainer">
            {countries && countries.map( c => <Country name={c.country_name} flag={c.country_flag} /> ) }
        </div>


        {/* <button onClick={()=>dispatch(getCountries(0,10))}>1</button>
        <button onClick={()=>dispatch(getCountries(1,10))}>2</button> */}
        {paginador.map(p => <button onClick={()=>dispatch(getCountries(p,10))}>{p}</button> )}
    </div>
}