import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Country } from "./Country"

export function Favorites(){

    let favorites = useSelector(store => store.favorites_countries)
    
    const [items, setItems] = useState([])

    useEffect(()=>{
        // favorites = [...new Set(favorites)]
        console.log('favssss', favorites)
    },[])
    

    return <div className="visual">
        
        <div className="filter">
        <div className="page-dock">
        <h1 className='title'>Favorites</h1>
        </div>
        </div>

        <div className="countrySpace">
            <div className="countryContainer">
                {favorites.length > 0 ? favorites.map( c => {
                    if(c.heart === true )
                    return <div><Country name={c.country_name} flag={c.country_flag} continent={c.country_continent} id={c.country_id} favorite={c.heart} /></div>} ) 
                    : 
                    <div className="notfound">
                        <span id="flagNotFound" class="material-symbols-outlined">flag</span>
                        
                        <span id="notfound" >No favorites added</span></div> }
                {/* {favorites[0].length > 0 ? favorites[0].map(c => <Country name={c.country_name} flag={c.country_flag} continent={c.country_continent} id={c.country_id} /> ) : <span id="notfound">No countries found</span>} */}
            </div>
        </div>
        {/* {items && items.map(c => <p>{c.country_name}</p>)} */}
    </div>
}