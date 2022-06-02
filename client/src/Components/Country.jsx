import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../Styles/country.css'
import { getCountries, GET_ALL_COUNTRIES, GET_FULL_COUNTRY_LIST, setFavCountry, SET_FAVORITE_COUNTRY } from '../Redux/actions'
import { useEffect, useState } from 'react'


export function Country({ id, name, flag, continent, favorite }) {
    const dispatch = useDispatch()

    // let allCountries = useSelector(store => store.countries)
    let allCountries = useSelector(store => store.fullCountryList)


    useEffect(() => {
        
    }, [])

    function setAsFavorite() {

        for (var i in allCountries) {
            if (allCountries[i].country_id == id) {
                if (allCountries[i].heart === true) {
                    console.log('no fav')
                    allCountries[i].heart = false
                } else {
                    console.log('fav')
                    allCountries[i].heart = true
                }
            }
        }

        let filtered = allCountries.filter(e => e.heart === true)
        console.log('los favs ', filtered)
       
        dispatch({
            type: SET_FAVORITE_COUNTRY,
            payload: filtered
        })

       
    }

    return <div className="country">
        {favorite && <svg onClick={() => setAsFavorite()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" /></svg>}
        {favorite || <svg onClick={() => setAsFavorite()} xmlns="http://www.w3.org/2000/svg" color='white' width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" /></svg>}

        <NavLink to={`/details/${id}`} className="countryAccess">
            <div className="country-content">
                {/* <svg onClick={() => setFav()} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
        <svg onClick={() => setFav()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg> */}

                <img src={flag} alt="" className="flag" />
                <span>{name}</span><br />
                <label>{continent}</label>


            </div>
        </NavLink>
    </div>
}