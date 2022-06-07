import '../Styles/details.css'
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import back from '../Assets/back.png'
import NumberFormat from 'react-number-format';

export function CountryDetails() {

    const [details, setDetails] = useState('')
    const [gotActivities, setGotActivities] = useState('')
    const [moreData, setMoreData] = useState('')

    const { id } = useParams()

    let navigate = useNavigate()
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function fetchMoreData() {
        fetch(`https://restcountries.com/v3/alpha/${id}`)
            .then(data => data.json())
            .then(res => {
                setMoreData(res[0])
                console.log('more data -->', res[0])
            })
    }

    function getDetails() {
        fetch(`http://localhost:3001/countries/${id}`)
            .then(data => data.json())
            .then(res => {
                setDetails(res)
            })
    }

    function bringActivities() {
        fetch(`http://localhost:3001/eager/${id}`)
            .then(data => data.json())
            .then(res => {
                setGotActivities(res[0].tourist_activities)
            })
    }


    useEffect(() => {
        getDetails()
        bringActivities()
        fetchMoreData()
    }, [])
    
    return <div className='visual'>
        {/* <div className="filter">
            <div className="title-dock">
            <span>Details of {details.country_name}</span>
            </div>
        </div> */}
        <div className="detailsSpace blur" >
         <div className="background-image" style={{backgroundImage:`url(${details.country_flag})`}}></div>
            <div className="detailsContainer" >
                <div className="backBtn">
                    {/* <NavLink to='/home'> */}
                        <img src={back} alt="back" id='back' onClick={() => navigate(-1)} />
                    {/* </NavLink> */}
                </div>
                
                <div className="info" style={{zIndex:"9999"}}>
                <span id='titleActivities'>Details of {details.country_name}</span><br />
                            <hr /><br />
                    <div className="flag" >
                            {/* <img src={details.country_flag} alt="" /> */}
                        <div className="">
                            
                            <h1 style={{textDecoration:"underline"}}>{details.country_name} [{details.country_id}]</h1>
                            <span>Perimeter: {<NumberFormat value={details.country_area} thousandsGroupStyle="thousand" thousandSeparator={true} decimalSeparator="." displayType={'text'} />} kms2</span>
                            <br />
                            <span>Located at {details.country_subregion}</span>
                            <br />
                            <span>Total poblation: {<NumberFormat value={details.country_poblation} thousandsGroupStyle="thousand" thousandSeparator={true} decimalSeparator="." displayType={'text'} />}</span>
                            <br />
                            <span>Region: {moreData.region}</span>
                            <br />
                            {moreData.languages &&
                                <span>Language/s: {(Object.values(moreData.languages)).map(val => <span>{val} </span>)}</span>
                            }
                        </div>
                        <div>
                            <iframe className="holds-the-iframe" id='frame'
                                width="100%"
                                height="209"
                                frameBorder="0" style={{ border: "0" }}
                                referrerpolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC36GHRjga4WoOy0LsfWII_QhSJb2DQWRk&q=${details.country_name}`}
                                allowfullscreen>
                            </iframe>
                        </div>
                        
                    </div>
                    <div className="bottomDetail">

                        <div className="activities"><br /><br />
                            <span id='titleActivities'>Activities</span><br />
                            <span style={{color:"rgb(150, 150, 150)"}}>Difficulties: 1-Easy, 2-Upper easy, 3-Medium, 4-Hard, 5-Pro</span>
                            <hr />                            
                            <div className="listActivities">
                                {gotActivities.length>0 ? gotActivities.map(a => <div style={{width:`${100/gotActivities.length}%`}}><span id='activity'>{a.touact_name}</span><br />Duration: <span>{a.touact_duration} hs</span><br />Difficulty: <span>{a.touact_difficulty} </span><br />Season: <span>{a.touact_season} </span><br /><br /></div>) : <span style={{color:"rgb(180, 180, 180)"}}>No activites were created</span>}
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>

        </div>

    </div>
}