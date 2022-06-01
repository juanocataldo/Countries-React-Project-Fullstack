import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createActivityOfCountry, getAllActivities, getCountries, loadActivity } from "../Redux/actions"

export function CreateActivity(){

    const [activity, setActivity] = useState('')
    const [countryID, setCountryID] = useState('')
    const [countryList, setCountryList] = useState([])
    const [error, setError] = useState(false)

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

    
    //VALIDATIONS
    useEffect(()=>{
        
        let inputName = document.getElementById('touact_name')
        let difficulty = document.getElementById('touact_difficulty')
        let duration = document.getElementById('touact_duration')
        let season = document.getElementById('touact_season')
        let countries = document.getElementById('countries')

        if(!activity.touact_duration){
            duration.style.border = "3px solid red"
            duration.placeholder = "Fill this field"
            setError(true)
        }else{
            if(isNaN(activity.touact_duration)){
                console.log('not a number')
                duration.style.border = "3px solid red"
                duration.value = ""
                duration.placeholder = "Only numbers"
                setError(true)
            }else{
                setError(false)
                duration.style.border = ""
            }
        }

        if(!activity.touact_season){
            season.style.border = "3px solid red"
            season.placeholder = "Fill this field"
            setError(true)
        }else{
            setError(false)
            season.style.border = ""
        }

        if(!activity.touact_difficulty){
            difficulty.style.border = "3px solid red"
            difficulty.placeholder = "Fill this field"
            setError(true)
        }else{
            setError(false)
            difficulty.style.border = ""
        }

        if(!activity.touact_name){
            inputName.style.border = "3px solid red"
            inputName.placeholder = "Fill this field"
            setError(true)
        }else{
            setError(false)
            inputName.style.border = ""
        }

        if(countryList.length === 0){
            countries.style.border = "3px solid red"
            countries.placeholder = "Fill this field"
            setError(true)
        }else{
            setError(false)
            countries.style.border = ""
        }

      

    },[activity,countryList])



    function fillActivityState(e){
        e.preventDefault()
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
        console.log(activity)
    }

    function submitActivity(e){
        e.preventDefault()

        

        // CREATE THE ACTIVITY IN NON-RELATIONATED TABLE
        loadActivity(activity) //creo la actividad en su respectiva tabla
                
        
        // CREATE THE ACTIVITY IN RELATIONATED TABLE    
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
            <input type="text" name="touact_name" id="touact_name" onChange={fillActivityState} /><br />
            
            <label>Activity difficulty</label>
            {/* <input type="text" name="touact_difficulty" id="" onChange={fillActivityState} /><br /> */}
            <select name="touact_difficulty" id="touact_difficulty" onChange={fillActivityState}>
                <option disabled="disabled" selected="Select" value="Select option">Select difficulty</option>
                <option value="1">1 - Easy</option>
                <option value="2">2 - Upper Easy</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - Advanced</option>
                <option value="5">5 - Pro</option>            
            </select><br />

            <label>Activity duration</label>
            <input type="text" name="touact_duration" id="touact_duration" onChange={fillActivityState} /><br />

            <label>Activity season</label>
            <select name="touact_season" id="touact_season" onChange={fillActivityState}>
                <option disabled="disabled" selected="Select" value="Select option">Select season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Autumn">Autumn</option>
                <option value="All the year">All the year</option>            
            </select><br />
            {/* <input type="text" name="touact_season" id="" onChange={fillActivityState} /><br /> */}

            <label>Select country for this activity</label>
            <select name="country" id="countries" onChange={showPK}>
            <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
                {ordered && ordered.map(c => <option value={c.country_name} defaultValue={c.country_name}>{c.country_name}</option>)}               
            </select>
            <br />
            {countryList && countryList.map(item => <h5>{item}</h5>)}
            <input type="submit" value="Save"  />
        </form>
    </div>
}