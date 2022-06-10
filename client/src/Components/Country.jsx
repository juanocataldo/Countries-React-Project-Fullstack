import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../Styles/country.css'
import { getCountries, GET_ALL_COUNTRIES, GET_FULL_COUNTRY_LIST, setFavCountry, SET_FAVORITE_COUNTRY } from '../Redux/actions'
import { useEffect, useState } from 'react'
import heart_red from '../Assets/heart_red.png'
import heart_black from '../Assets/heart_black.png'

export function Country({ id, name, flag, continent, favorite }) {
    const dispatch = useDispatch()
    
    let allCountries = useSelector(store => store.fullCountryList)
    const favorites = useSelector(store => store.favorites_countries)
    let fixedAllCountries = useSelector(store => store.countries)
    let updated = Object.assign([{}], fixedAllCountries, allCountries);
    
    useEffect(()=>{
        updated = Object.assign([{}], fixedAllCountries, allCountries);       
    },[])

    function setAsFavorite() {
        updated = Object.assign([{}], fixedAllCountries, allCountries);
        for (var i in updated) {
            if (updated[i].country_id == id) {
                if (updated[i].heart === true || updated[i].heart === undefined) {
                    updated[i].heart = false
                    updated[i].act = "del"
                    dispatch({
                        type: SET_FAVORITE_COUNTRY,
                        payload: updated[i]
                    })
                    break;
                } else {
                    updated[i].heart = true
                    updated[i].act = "add"
                    
                    dispatch({
                        type: SET_FAVORITE_COUNTRY,
                        payload: updated[i]
                    })
                    break;
                }
            }
        }
    }


    return <div>
    
    <div className="country" id={id}>
        <div className="heart">
            {favorite && <img src={heart_red} alt="" id='heart' onClick={() => setAsFavorite()}/>}
            {favorite || <img src={heart_black} alt="" id='heart' onClick={() => setAsFavorite()}/>}
        </div>

        <NavLink to={`/details/${id}`} className="countryAccess">
            <div className="country-content">           
                <div style={{backgroundImage:`url(${flag})`, backgroundSize:"cover", height:"150px",width:"100%",backgroundPosition:"center",borderRadius:"15px"}} ></div>
                {/* <img src={flag} alt="" className="flag" /> */}
                <span>{name}</span><br />
                <label>{continent}</label>
            </div>
        </NavLink>
    </div>
    </div>
}