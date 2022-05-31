import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function CountryDetails(){

    const [details, setDetails] = useState('')
    const [gotActivities, setGotActivities] = useState('')

    const {id} = useParams()

    function getDetails(){        
        fetch(`http://localhost:3001/details/${id}`)
        .then(data => data.json())
        .then(res => {
            setDetails(res)
        })    
    }

    function bringActivities(){
        fetch(`http://localhost:3001/eager/${id}`)
        .then(data => data.json())
        .then(res => {            
            setGotActivities(res[0].tourist_activities)
        })
    }


    useEffect(()=>{
        getDetails()
        bringActivities()
    },[])

    console.log(details)
    console.log('ACTIVITIES ', gotActivities)
    return <div>
        Details
        <h3>{details.country_id}</h3>
        <h1>{details.country_name}</h1>
        <h5>{details.country_area}kms2</h5>
        <h5>{details.country_subregion}</h5>
        <h5>{details.country_poblation}</h5>
        <h5>Activities</h5>
        <hr />
        {gotActivities && gotActivities.map(a => <p>{a.touact_name}</p>)}
    </div>
}