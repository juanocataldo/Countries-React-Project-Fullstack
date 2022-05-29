export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_ARGENTINE = 'GET_ARGENTINE'
export const GET_FILTERED_COUNTRIES = 'GET_FILTERED_COUNTRIES'
export const GET_FULL_COUNTRY_LIST = 'GET_FULL_COUNTRY_LIST'
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES'

// let countryArray = []

//Fetch a la api externa y fill en nuestra DB
export function getAllCountries(){
    return function(dispatch){
        console.log('INSERTING')
        return fetch('https://restcountries.com/v3/all')
        .then(data => data.json())
        .then(res => {   
            res.map(c => {
                let country = {
                    country_id:c.cca3 || 'N/A',
                    country_name: c.name.common || c.name.official || 'N/A',
                    country_flag: c.flags[0] || 'N/A',
                    country_continent: typeof c.continents !== 'undefined' ? c.continents[0] : 'N/A',
                    country_capital: typeof c.capital !== 'undefined' ? c.capital[0] : 'N/A',
                    country_subregion: c.subregion || 'N/A',
                    country_area: c.area.toString() || 'N/A',
                    country_poblation: c.population.toString() || 'N/A'
                }                
                uploadData(country)
                // countryArray.push(country)
            })            
            // dispatch({
            //     type: GET_ALL_COUNTRIES,
            //     payload: countryArray
            // })
        })
        .catch(err => console.log(err))
    }
}

export function uploadData(data){    
    fetch(`http://localhost:3001/`,
        {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .catch(e => console.log(e))
}

export function loadActivity(data){    
    fetch(`http://localhost:3001/activity`,
        {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .catch(e => console.log(e))
}

export function getAllActivities(){
    console.log('GET ACTIVITIES')
    return function(dispatch){
        return fetch('http://localhost:3001/activities')
        .then(data => data.json())
        .then(res => {
            dispatch({
                type: GET_ALL_ACTIVITIES,
                payload: res
            })
        })
    }
}

export function getCountriesPaginated(o,p,page){
    return function(dispatch){
        return fetch(`http://localhost:3001/home?order=${o}&poblation=${p}&page=${page}`)
        .then(data => data.json())
        .then(res => {
            dispatch({
                type: GET_FILTERED_COUNTRIES,
                payload: res
            })
        })
    }
}

export function getCountries(){
    return function(dispatch){
        return fetch(`http://localhost:3001/home/all`)
        .then(data => data.json())
        .then(res => {
            dispatch({
                type: GET_FULL_COUNTRY_LIST,
                payload: res
            })
        })
    }
}

export function orderCountries(countries){
    console.log('sorted: ',countries)
    return function(dispatch){        
            dispatch({
                type:GET_FILTERED_COUNTRIES,
                payload: countries
            })        
    }
}


export function createActivityOfCountry(data){
    console.log('DATAAAAAAAAAAAA',data)    
    fetch(`http://localhost:3001/activity_country`,
        {
            method:'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .catch(e => console.log(e))
}
