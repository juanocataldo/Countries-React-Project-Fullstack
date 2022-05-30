import { NavLink } from 'react-router-dom'
import '../styles/country.css'

export function Country({id, name, flag, continent}){

    return <div className="country">
        <img src={flag} alt="" className="flag" />
        <h5>{name}</h5>
        <h5>{continent}</h5>
        <NavLink to={`/details/${id}`}>Details</NavLink>
    </div>
}