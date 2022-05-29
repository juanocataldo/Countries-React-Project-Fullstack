export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_ARGENTINE = 'GET_ARGENTINE'

// let countryArray = []

//Fetch a la api externa y fill en nuestra DB
export function getAllCountries(){
    return function(dispatch){
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

export function getCountries(p,s){
    return function(dispatch){
        return fetch(`http://localhost:3001/home?page=${p}&size=${s}`)
        .then(data => data.json())
        .then(res => {
            console.log('getCountries --> ',res)
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: res
            })
        })
    }
}

// export function getArgentine(){
//     return function(dispatch){
//         return fetch('https://restcountries.com/v3/name/argentina')
//         .then(data => data.json())
//         .then(res => {
//             let argentina = {
//                 country_id:res[0].cca3 || res[0].cioc || 'N/A',
//                 country_name: res[0].translations.spa.official || res[0].translations.spa.common || 'N/A',
//                 country_flag: res[0].flags[0] || 'N/A',
//                 country_continent: res[0].continents[0] || 'N/A',
//                 country_capital: res[0].capital[0] || 'N/A',
//                 country_subregion: res[0].subregion || 'N/A',
//                 country_area: res[0].area.toString() || 'N/A',
//                 country_poblation: res[0].population.toString() || 'N/A'
//             }
//             console.log('Hecho objeto ',res)

//             dispatch({
//                 type: GET_ARGENTINE,
//                 payload: res
//             })
//         })
//     }
// }