import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createActivityOfCountry, getAllActivities, getCountries, loadActivity } from "../Redux/actions"

export function CreateActivity(){

    const [activity, setActivity] = useState('')
    const [countryID, setCountryID] = useState('')
    const [countryList, setCountryList] = useState([])

    const countries = useSelector(store => store.fullCountryList)
    const activities = useSelector(store => store.countries_activities)

    const dispatch = useDispatch()
    
    let ordered = countries.sort((a, b) => {
        let fa = a.country_name.toLowerCase(),
            fb = b.country_name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getAllActivities())             
    },[])

    function fillActivityState(e){
        e.preventDefault()
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
    }

    function submitActivity(e){
        e.preventDefault()
        loadActivity(activity) //creo la actividad en su respectiva tabla
        
        // let country_id = countryID
        // let touact_id = 0

        // console.log('EL TOUCT ID ', touact_id)
        
        for (let i = 0; i < countryList.length; i++) {
            
            let act = {
                country_id: countryList[i],
                touact_id: 0
            }
            
            createActivityOfCountry(act)
            
        }
    }

    
    function showPK(e){
        
        let pk = countries.filter(c => c.country_name === e.target.value)
        setCountryID(pk[0].country_id)
        let add = pk[0].country_id
        
        setCountryList(oldItems => [...oldItems, add])
        console.log(countryList)        
    }

 

    return <div>
        <h1>Create Activity</h1><br />
        
        <form onSubmit={submitActivity}>
            <label>Activity name</label>
            <input type="text" name="touact_name" id="" onChange={fillActivityState} /><br />
            
            <label>Activity difficulty</label>
            <input type="text" name="touact_difficulty" id="" onChange={fillActivityState} /><br />

            <label>Activity duration</label>
            <input type="text" name="touact_duration" id="" onChange={fillActivityState} /><br />

            <label>Activity season</label>
            <input type="text" name="touact_season" id="" onChange={fillActivityState} /><br />

            <label>Select country for this activity</label>
            <select name="country" id="countries" onChange={showPK}>
            <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
                {ordered && ordered.map(c => <option value={c.country_name} defaultValue={c.country_name}>{c.country_name}</option>)}               
            </select>
            <br />
            {countryList && countryList.map(item => <h5>{item}</h5>)}
            <input type="submit" value="Save" />
        </form>
    </div>
}