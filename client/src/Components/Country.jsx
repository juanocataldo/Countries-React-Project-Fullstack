import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../Styles/country.css'
import { setFavCountry, SET_FAVORITE_COUNTRY } from '../Redux/actions'
import { useEffect, useState } from 'react'


export function Country({id, name, flag, continent}){
    const dispatch = useDispatch()
    
    let favoriteList = useSelector(store => store.favorites_countries)
    const [favorite, setFavorite] = useState(favoriteList)

    
    // useEffect(()=>{
    //     setFavorite({
    //         country_id: id,
    //         country_name: name,
    //         country_flag: flag,
    //         country_continent: continent
    //     })
    // },[favorite])

    useEffect(() => {
        
    },[])

    function setAsFavorite(){        
        if(favoriteList.find(c => c.country_id === id)){
            
            console.log('EXISTE')
            favoriteList = favoriteList.filter(c => c.country_id !== id)
           
        }else{
            console.log('NO TA')
            setFavorite({
                country_id: id,
                country_name: name,
                country_flag: flag,
                country_continent: continent
            })

            console.log('setting reducer with ', favorite)

            dispatch({
                type: SET_FAVORITE_COUNTRY,
                payload: favorite
            })
            
        }
    }
    
    return <div className="country">
        <button onClick={() => setAsFavorite()}>fav</button>
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