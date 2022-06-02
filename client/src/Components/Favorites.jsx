import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Country } from "./Country"

export function Favorites(){

    let favorites = useSelector(store => store.favorites_countries)
    const [items, setItems] = useState([])

    useEffect(()=>{
        console.log('favs in favorites',favorites)
    },[])
    
    console.log(items)

    return <div className="visual">
        
        <div className="filter">
            <div className="title-dock">
                <span>Favorites</span>
            </div>
        </div>

        <div className="countrySpace">
            <div className="countryContainer">
                {favorites.length > 0 ? favorites.map(c => <Country name={c.country_name} flag={c.country_flag} continent={c.country_continent} id={c.country_id} /> ) : <span id="notfound">No countries found</span>}
            </div>
        </div>
        {/* {items && items.map(c => <p>{c.country_name}</p>)} */}
    </div>
}