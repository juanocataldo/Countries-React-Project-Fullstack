import '../Styles/details.css'
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import back from '../Assets/back.png'
import NumberFormat from 'react-number-format';

export function CountryDetails() {

    const [details, setDetails] = useState('')
    const [gotActivities, setGotActivities] = useState('')
    const [moreData, setMoreData] = useState('')
    const [weather, setWeather] = useState({})
    const [iconWeather, setIconWeather] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    let navigate = useNavigate()
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function fetchMoreData() {
            setLoading(true)
            fetch(`https://restcountries.com/v3/alpha/${id}`)
                .then(data => data.json())
                .then(res => {
                    setMoreData(res[0])
                    setLoading(false)                    
                })           
                .catch(e => console.log('fetch error -->',e))

                
            
    }

    function fetchWeatherInfo(){
        if(moreData){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${moreData.latlng[0]}&lon=${moreData.latlng[1]}&appid=3567f8bff2c8906b47ee80540774eaaf&units=metric`)
            .then(res => res.json())
            .then(data => {
                setWeather(data.main)                
                setIconWeather(data.weather[0].icon)
                console.log('weather',data)
            })
            .catch(e => console.log('weather fetch error -->', e))
        }
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
        console.log('moreData',moreData)
    }, [])

    useEffect(() =>{
        fetchWeatherInfo()
        console.log('wheateeer',weather)
    },[moreData])
   

    return <div className='visual'>
     
        <div className="detailsSpace blur" >
         <div className="background-image" style={{backgroundImage:`url(${details.country_flag})`}}></div>
            <div className="detailsContainer" >
                <div className="backBtn">
                    {/* <NavLink to='/home'> */}
                        <img src={back} alt="back" id='back' onClick={() => navigate(-1)} />
                    {/* </NavLink> */}
                </div>
                
                <div className="info" style={{zIndex:"9999"}}>
                    <div className="headerInfo">
                        <span id='titleActivities'>Details of {details.country_name}</span>
                        
                        {/* <div className="weatherInfo">
                            {weather && !loading ?
                            <>
                                <span id='weatherDet'> {Math.ceil(weather.temp)}°   </span> 
                                <img src={`http://openweathermap.org/img/w/${iconWeather}.png`} alt="" />
                            </>
                            :
                            <div className="loaderDiv">                                
                                <span style={{color: "#82847b"}}>Loading weather data<div class="loader"></div></span>
                            </div>
                            }
                        </div> */}

                    </div>

                <br />
                <hr />
                <br />
                    <div className="flag" >
                            <img src={details.country_flag} id="detailFlag" alt="" />
                        <div className="">
                            {/* <img src={details.country_flag} alt={`${details.country_name} flag`} style={{width:"60px", marginRight:"10px",paddingLeft:"5px"}} /> */}
                            <div className="weatherInfo">
                            {weather && !loading ?
                            <>
                                <span id='weatherDet'> {Math.ceil(weather.temp)}°   </span> 
                                <img src={`http://openweathermap.org/img/w/${iconWeather}.png`} alt="" />
                            </>
                            :
                            <div className="loaderDiv">                                
                                <span style={{color: "#82847b"}}>Loading weather data<div class="loader"></div></span>
                            </div>
                            }
                        </div>
                            <h1 id='countryTitle' style={{marginTop:"0px"}}>{details.country_name}  </h1>
                            <span>Code: {details.country_id}</span> <br />
                            <span>Perimeter: {<NumberFormat value={details.country_area} thousandsGroupStyle="thousand" thousandSeparator={true} decimalSeparator="." displayType={'text'} />} kms2</span>
                            <br />
                            <span>Located at {details.country_subregion}</span>
                            <br />
                            <span>Total poblation: {<NumberFormat value={details.country_poblation} thousandsGroupStyle="thousand" thousandSeparator={true} decimalSeparator="." displayType={'text'} />}</span>
                            <br />
                            <div className="fetching">
                                <span>Region: </span>
                                {!loading && moreData ? <>
                                    <span style={{marginLeft:"10px"}}>{moreData.region}</span>
                                    <br />                                
                                </>
                                :                            
                                    <div class="loader"></div>
                                }
                            </div>
                            
                            <div className="fetching">
                                <span>Language/s: </span>
                                {!loading && moreData ? <>                                    
                                        <span style={{marginLeft:"10px"}}>{(Object.values(moreData.languages)).map(val => <span>{val} </span>)}</span>
                                </>
                                :                            
                                    <div class="loader"></div>
                                }
                            </div>
                        </div>
                        <div>
                            <iframe  className="holds-the-iframe" id='frame'
                                width="100%"
                                height="209"
                                frameBorder="0" style={{ border: "0", marginTop:"10px", borderRadius:"10px" }}
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
                                {gotActivities.length>0 ? gotActivities.map(a => <div style={{padding:"15px"}}><span id='activity'>{a.touact_name}</span><br />Duration: <span>{a.touact_duration} hs</span><br />Difficulty: <span>{a.touact_difficulty} </span><br />Season: <span>{a.touact_season} </span><br /><br /></div>) : <span style={{color:"rgb(180, 180, 180)"}}>No activites were created</span>}
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    </div>
}