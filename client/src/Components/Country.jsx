import { useEffect } from "react"
import '../styles/country.css'

export function Country({name, flag}){
    useEffect(()=>{
        console.log('Name como prop ', name)
    },[name])
    return <div className="country">
        <img src={flag} alt="" className="flag" />
        <h5>{name}</h5>
    </div>
}