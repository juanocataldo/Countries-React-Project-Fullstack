import { Country } from "./Country"
import '../Styles/country.css'
import '../Styles/filters.css'

export function Countries({posts}){
        
    return <>
        {posts.length > 0 ? posts.map(c => <Country id={c.country_id} name={c.country_name} flag={c.country_flag} continent={c.country_continent} poblation={c.country_poblation} area={c.country_area} favorite={c.heart} />) : <span id="notfound" style={{padding:"0px 0px 20px 0px"}}>No countries found</span>}
    </>

}