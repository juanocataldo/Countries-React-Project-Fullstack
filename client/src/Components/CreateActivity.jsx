import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createActivityOfCountry, getAllActivities, getCountries, loadActivity } from "../Redux/actions"
import '../styles/createActivity.css'
import '../styles/filters.css'
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
        let spanDurError = document.getElementById('durError')
        let season = document.getElementById('touact_season')
        let countries = document.getElementById('countries')


        if (!activity.touact_name) {
            setNameError(true)
        } else {
            setNameError(false)
            inputName.style.border = ""
        }

        if (!activity.touact_difficulty) {
            difficulty.style.border = "1px solid #ff000086"
            difficulty.placeholder = "Fill difficulty field"
            setDiffError(true)
        } else {
            setDiffError(false)
            difficulty.style.border = ""
        }

        if (!activity.touact_duration) {
            setDurError(true)
        } else {
            if (isNaN(activity.touact_duration)) {
                setDurError(true)
                console.log('not a number')
                setDurError(true)
            } else {
                setDurError(false)
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
        console.log('a submitear ',activity)
        
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
        e.preventDefault()        
        setActType(e.target.value)
    }


    function showPK(e) {
        let pk = countries.find(c => c.country_name === e.target.value)
        setCountryID(pk.country_id)
        
        setCountryList(oldItems => [...oldItems, pk])

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
                    <form id="formActivity" style={{zIndex:"9999"}} >
                        <div className="block">
                            <div className="group">
                            <span>Activity Name</span>
                                <input className="input3" type="text" name="touact_name" id="touact_name" onChange={twoCalls} placeholder="..."/><br />
                                <span class="highlight2"></span>
                                <span class="bar"></span>
                            </div>
                            {nameError && <span className="error">Please fill this field</span>}
                        </div>
<br />
                        <div className="block">
                            <span>Activity duration (hs)</span>   <br />                   
                            <input className="input2" type="text" name="touact_duration" id="touact_duration" onChange={twoCalls} placeholder="hs" /><br />
                            <span class="highlight2"></span>
                                <span class="bar"></span>
                            {durError && <span className="error" id="durError">Please fill this field only with numbers</span>}
                        </div>

                        <div className="block">
                            <select className="input" name="touact_difficulty" id="touact_difficulty" onChange={twoCalls} >
                                <option disabled="disabled" selected="Select" value="Select option">Select activity difficulty</option>
                                <option value="1">1 - Easy</option>
                                <option value="2">2 - Upper Easy</option>
                                <option value="3">3 - Medium</option>
                                <option value="4">4 - Advanced</option>
                                <option value="5">5 - Pro</option>
                            </select>
                            <br />
                        </div>

                        <div className="block">
                            <select className="input" name="touact_season" id="touact_season" onChange={twoCalls}>
                                <option disabled="disabled" selected="Select" value="Select option">Select activity season</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Autumn">Autumn</option>
                                <option value="All the year">All the year</option>
                            </select><br />
                        </div>

                        <div className="block">
                            <select className="input" name="activity_type" id="activity_type" onChange={setActivityType}>
                                <option disabled="disabled" selected="Select" value="Select option">Select activity type</option>
                                <option value="Sport">Sport</option>
                                <option value="Tour">Tour</option>
                                <option value="Gastronomy">Gastronomy</option>
                                <option value="Natural">Natural</option>
                                <option value="City">City</option>
                            </select><br />

                        </div>

                        <div className="block">
                            <select className="input" name="country" id="countries" onChange={showPK}>
                                <option disabled="disabled" selected="Select" value="Select option">Select the countries availables for this activity</option>
                                {ordered && ordered.map(c => <option value={c.country_name} defaultValue={c.country_name}>
                                    {c.country_name}
                                </option>)}
                            </select>

                        </div>
                        Activity for:
                        <div className="flagList">
                            {countryList && countryList.map(item => <div className="miniFlag"><button type="button" id="miniX" onClick={() => closeMiniFlag(item.country_id)}>x</button><img src={item.country_flag} alt="" /><span >{item.country_name}</span></div>)}
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
            </div>
        </div>
    </div>
}