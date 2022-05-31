import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function Favorites(){

    const favorites = useSelector(store => store.favorites_countries)
    const [items, setItems] = useState([])

    useEffect(()=>{
        console.log(favorites)
    },[])
    
    console.log(items)

    return <div>
        Favs
        <hr />
        {favorites && favorites.map(c => <p>{c.country_name} - {c.favorite}</p>)}
        {/* {items && items.map(c => <p>{c.country_name}</p>)} */}
    </div>
}