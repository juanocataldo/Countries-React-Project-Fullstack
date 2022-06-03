
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createActivityOfCountry, getAllActivities, getCountries, loadActivity } from "../Redux/actions"
import '../Styles/createActivity.css'
import '../Styles/filters.css'
import { Modal } from "./Modal"
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


    const countries = useSelector(store => store.countries)
    const activities = useSelector(store => store.countries_activities)

    const dispatch = useDispatch()

    const dropdownDifficulty = document.getElementById('touact_difficulty');
    const dropdownSeason = document.getElementById('touact_season');
    const dropdownCountryList = document.getElementById('countries')

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
        dispatch(getCountries())
        dispatch(getAllActivities())
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
            inputName.style.border = "1px solid red"
            inputName.placeholder = "Fill this field"
            console.log('mal nombre')
            setNameError(true)
        } else {
            console.log('buen nombre')
            setNameError(false)
            inputName.style.border = ""
        }

        if (!activity.touact_difficulty) {
            difficulty.style.border = "1px solid red"
            difficulty.placeholder = "Fill this field"
            setDiffError(true)
        } else {
            setDiffError(false)
            difficulty.style.border = ""
        }

        if (!activity.touact_duration) {
            duration.style.border = "1px solid red"
            duration.placeholder = "Fill this field"
            setDurError(true)
        } else {
            if (isNaN(activity.touact_duration)) {
                console.log('not a number')
                duration.style.border = "1px solid red"
                duration.value = ""
                duration.placeholder = "Only numbers"
                setDurError(true)
            } else {
                setDurError(false)
                duration.style.border = ""
            }
        }

        if (!activity.touact_season) {
            season.style.border = "1px solid red"
            season.placeholder = "Fill this field"
            setSeasonError(true)
        } else {
            setSeasonError(false)
            season.style.border = ""
        }

        if (countryList.length === 0) {
            countries.style.border = "1px solid red"
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
        console.log(activity)
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
            setShowModal(true)
        }

    }


    function showPK(e) {
        let pk = countries.filter(c => c.country_name === e.target.value)
        setCountryID(pk[0].country_id)
        let add = pk[0]

        setCountryList(oldItems => [...oldItems, add])
        console.log(countryList)
    }



    return <div>
        <div className="visual">


        <div className="filter">
                <div className="page-dock">
                    <span>Create activity</span>
                </div>
            </div>
            <div className="createSpace">

                <div className='createContainer'>

                    {/* <span id='titleActivities'>Create Activity</span> */}

                    <form id="formActivity" onSubmit={submitActivity}>
                        <label>Activity name</label>
                        <input className="input select" type="text" name="touact_name" id="touact_name" onChange={twoCalls} /><br />

                        <label>Activity difficulty</label>
                        {/* <input type="text" name="touact_difficulty" id="" onChange={fillActivityState} /><br /> */}
                        <select className="input select" name="touact_difficulty" id="touact_difficulty" onChange={twoCalls}>
                            <option disabled="disabled" selected="Select" value="Select option">Select difficulty</option>
                            <option value="1">1 - Easy</option>
                            <option value="2">2 - Upper Easy</option>
                            <option value="3">3 - Medium</option>
                            <option value="4">4 - Advanced</option>
                            <option value="5">5 - Pro</option>
                        </select><br />

                        <label>Activity duration</label>
                        <input className="input select" type="text" name="touact_duration" id="touact_duration" onChange={twoCalls} /><br />

                        <label>Activity season</label>
                        <select className="input select" name="touact_season" id="touact_season" onChange={twoCalls}>
                            <option disabled="disabled" selected="Select" value="Select option">Select season</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Autumn">Autumn</option>
                            <option value="All the year">All the year</option>
                        </select><br />
                        {/* <input type="text" name="touact_season" id="" onChange={fillActivityState} /><br /> */}

                        <label>Select country for this activity</label>
                        <select className="input select" name="country" id="countries" onChange={showPK}>
                            <option disabled="disabled" selected="Select" value="Select option">Select an option</option>
                            {ordered && ordered.map(c => <option value={c.country_name} defaultValue={c.country_name}>
                                {c.country_name}
                            </option>)}
                        </select>
                        <br />
                        <div className="flagList">
                            {countryList && countryList.map(item => <div className="miniFlag"><button id="miniX" onClick={() => closeMiniFlag(item.country_id)}>x</button><img src={item.country_flag} alt="" /><span >{item.country_name}</span></div>)}
                        </div>
                        <div className="submit">
                            <input className="input" type="submit" value="Save" style={{ width: "100px" }} />
                            <span> {errorMsg}</span>
                            <Modal onClose={() => setShowModal(false)} show={showModal} />
                        </div>
                    </form>

                </div>

            </div>

        </div>


    </div>
}