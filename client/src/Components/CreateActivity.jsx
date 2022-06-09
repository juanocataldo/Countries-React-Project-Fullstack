import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createActivityOfCountry, getAllActivities, getCountries, loadActivity } from "../Redux/actions"
import '../Styles/createActivity.css'
import '../Styles/filters.css'
import { Modal } from "./Modal"
import Sport from '../Assets/activity_type/Sport.png'
import Tour from '../Assets/activity_type/Tour.png'
import Gastronomy from '../Assets/activity_type/Gastronomy.png'
import City from '../Assets/activity_type/City.png'
import Natural from '../Assets/activity_type/Natural.png'


export function CreateActivity() {

    const [activity, setActivity] = useState('')
    const [countryID, setCountryID] = useState('')
    const [countryList, setCountryList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [nameError, setNameError] = useState(true)
    const [diffError, setDiffError] = useState(true)
    const [durError, setDurError] = useState(true)
    const [seasonError, setSeasonError] = useState(true)
    const [countryError, setCountryError] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [actType, setActType] = useState('')

    const countries = useSelector(store => store.countries)
    const activities = useSelector(store => store.countries_activities)

    const dispatch = useDispatch()

    const dropdownDifficulty = document.getElementById('touact_difficulty');
    const dropdownSeason = document.getElementById('touact_season');
    const dropdownCountryList = document.getElementById('countries')
    const dropdownActType = document.getElementById('activity_type')

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

    useEffect(() => {

        console.log(activities)
    }, [])

    function closeMiniFlag(id) {
        let cleared = countryList.filter(c => c.country_id !== id)
        setCountryList(cleared)
    }

    function clearFields() {
        let form = document.getElementById("formActivity").reset();
        setCountryList([])
    }

    function validate() {
        let inputName = document.getElementById('touact_name')
        let difficulty = document.getElementById('touact_difficulty')
        let duration = document.getElementById('touact_duration')
        let season = document.getElementById('touact_season')
        let countries = document.getElementById('countries')


        if (!activity.touact_name) {
            inputName.style.border = "1px solid #ff000086"
            inputName.placeholder = "Fill this field"
            console.log('mal nombre')
            setNameError(true)
        } else {
            console.log('buen nombre')
            setNameError(false)
            inputName.style.border = ""
        }

        if (!activity.touact_difficulty) {
            difficulty.style.border = "1px solid #ff000086"
            difficulty.placeholder = "Fill this field"
            setDiffError(true)
        } else {
            setDiffError(false)
            difficulty.style.border = ""
        }

        if (!activity.touact_duration) {
            duration.style.border = "1px solid #ff000086"
            duration.placeholder = "Fill this field"
            setDurError(true)
        } else {
            if (isNaN(activity.touact_duration)) {
                console.log('not a number')
                duration.style.border = "1px solid #ff000086"
                duration.value = ""
                duration.placeholder = "Only numbers"
                setDurError(true)
            } else {
                setDurError(false)
                duration.style.border = ""
            }
        }

        if (!activity.touact_season) {
            season.style.border = "1px solid #ff000086"
            season.placeholder = "Fill this field"
            setSeasonError(true)
        } else {
            setSeasonError(false)
            season.style.border = ""
        }

        if (countryList.length === 0) {
            countries.style.border = "1px solid #ff000086"
            countries.placeholder = "Fill this field"
            setCountryError(true)
        } else {
            setCountryError(false)
            countries.style.border = ""
        }
    }

    function twoCalls(e) {
        fillActivityState(e)
        validate();
        console.log(`${diffError} ${durError} ${seasonError} ${countryError} ${nameError} `)
    }



    //VALIDATIONS
    useEffect(() => {
        validate()
    }, [activity, countryList])



    function fillActivityState(e) {
        e.preventDefault()
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })

    }


    function submitActivity(e) {
        e.preventDefault()

        if (nameError || diffError || durError || seasonError || countryError) {
            setErrorMsg('Some fields are wrong. Please check.')
        } else {
            setErrorMsg('')
            clearFields()
            // CREATE THE ACTIVITY IN NON-RELATIONATED TABLE
            loadActivity(activity) //creo la actividad en su respectiva tabla


            // CREATE THE ACTIVITY IN RELATIONATED TABLE    
            for (let i = 0; i < countryList.length; i++) {
                let act = {
                    country_id: countryList[i].country_id,
                    touact_id: 0
                }

                createActivityOfCountry(act)
            }
            dropdownDifficulty.selectedIndex = 0;
            dropdownSeason.selectedIndex = 0;
            dropdownCountryList.selectedIndex = 0;
            dropdownActType.selectedIndex = 0;
            setActivity('')
            setShowModal(true)
        }

    }

    function setActivityType(e) {
        // let imgActType = document.getElementById('sportPic')

        

        // if(imgActType)
        //     imgActType.classList.add('sportPic')
 
        e.preventDefault()        
        setActType(e.target.value)
    }


    function showPK(e) {
        let pk = countries.filter(c => c.country_name === e.target.value)
        setCountryID(pk[0].country_id)
        let add = pk[0]

        let repeated = countryList.find(c => {
            if (c.country_id === pk[0].country_id)
                return true

            return false
        })

        if (repeated === undefined)
            setCountryList(oldItems => [...oldItems, add])

        console.log(repeated)
        console.log(countryList)
    }



    return <div>
        <div className="visual">

            <div className="filter">
                <div className="page-dock">
                    <h1 className='title'>Create Activity</h1>
                </div>
            </div>

            <div className="createSpace">

                <div className='createContainer'>

                    <form id="formActivity" >
                        <div className="block">
                            <label>Activity name *</label><br />
                            <input className="input" type="text" name="touact_name" id="touact_name" onChange={twoCalls} /><br />
                        </div>

                        <div className="block">
                            <label>Activity duration (hs) *</label><br />
                            <input className="input" type="text" name="touact_duration" id="touact_duration" onChange={twoCalls} /><br />
                        </div>

                        <div className="block">
                            <label>Activity difficulty *</label><br />
                            <select className="input" name="touact_difficulty" id="touact_difficulty" onChange={twoCalls} >
                                <option disabled="disabled" selected="Select" value="Select option">Select difficulty</option>
                                <option value="1">1 - Easy</option>
                                <option value="2">2 - Upper Easy</option>
                                <option value="3">3 - Medium</option>
                                <option value="4">4 - Advanced</option>
                                <option value="5">5 - Pro</option>
                            </select>
                            <br />
                        </div>

                        <div className="block">
                            <label>Activity season *</label><br />
                            <select className="input" name="touact_season" id="touact_season" onChange={twoCalls}>
                                <option disabled="disabled" selected="Select" value="Select option">Select season</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Autumn">Autumn</option>
                                <option value="All the year">All the year</option>
                            </select><br />
                        </div>

                        <div className="block">
                            <label>Activity type</label><br />
                            <select className="input" name="activity_type" id="activity_type" onChange={setActivityType}>
                                <option disabled="disabled" selected="Select" value="Select option">Select type</option>
                                <option value="Sport">Sport</option>
                                <option value="Tour">Tour</option>
                                <option value="Gastronomy">Gastronomy</option>
                                <option value="Natural">Natural</option>
                                <option value="City">City</option>
                            </select><br />

                        </div>

                        {/* <input type="text" name="touact_season" id="" onChange={fillActivityState} /><br /> */}
                        <div className="block">
                            <label>Select country for this activity *</label><br />
                            <select className="input" name="country" id="countries" onChange={showPK}>
                                <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
                                {ordered && ordered.map(c => <option value={c.country_name} defaultValue={c.country_name}>
                                    {c.country_name}
                                </option>)}
                            </select>

                        </div>
                        <br />

                        <div className="submit">
                            <div className="saveBtn">
                                <button className="submBtn" onClick={submitActivity}>
                                    Save
                                    <span class="material-symbols-outlined">save</span>
                                </button>

                            </div>

                            <span> {errorMsg}</span>
                            <Modal onClose={() => setShowModal(false)} show={showModal} />
                        </div>
                    </form>
                </div>

                <div className="createContainerAct">
                    <div className="typePic">
                        {actType === 'Sport' ?
                            <img src={Sport} alt="" id="sportPic" />
                            :
                            actType === 'Tour' ?
                                <img src={Tour} alt="" id="sportPic" />
                                :
                                actType === 'Gastronomy' ?
                                    <img src={Gastronomy} alt="" id="sportPic" />
                                    :
                                    actType === 'Natural' ?
                                        <img src={Natural} alt="" id="sportPic" />
                                        :
                                        actType === 'City' ?
                                            <img src={City} alt="" id="sportPic" />
                                            : null
                        }
                    </div>
                    <div className="formulario">
                        <h1>{activity.touact_name ? activity.touact_name : "Activity"}</h1>
                        Duration: <span className="actRes">{activity.touact_duration}hs</span>
                        <hr id="renglon" />
                        Difficulty: <span className="actRes">
                        {activity.touact_difficulty === '1' ? " Easy (For everyone)" : ""}
                        {activity.touact_difficulty === '2' ? " Upper easy (No experience needed)" : ""}
                        {activity.touact_difficulty === '3' ? " Medium (Some experience is required)" : ""}
                        {activity.touact_difficulty === '4' ? " Advanced (Experience required)" : ""}
                        {activity.touact_difficulty === '5' ? " Pro (Only for professionals)" : ""}
                        {activity.touact_season !== '' ? "" : activity.touact_season !== "All the year" ? "AAA" : "Always check if this weather is appropiate for this activity"}
                        <hr id="renglon" />
                        </span>
                        
                        Season: <span className="actRes"> 
                             {activity.touact_season}
                        </span><br />
                        <hr id="renglon" />
                        Activity type: <span className="actRes">
                            {actType}
                        </span>

                        <hr id="renglon" />
                        
                        Activity for:
                        <div className="flagList">
                            {countryList && countryList.map(item => <div className="miniFlag"><button id="miniX" onClick={() => closeMiniFlag(item.country_id)}>x</button><img src={item.country_flag} alt="" /><span >{item.country_name}</span></div>)}
                        </div>

                    </div>
                </div>

            </div>

        </div>


    </div>
}