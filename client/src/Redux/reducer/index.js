import { FILTER_COUNTRIES, GET_FULL_ACTIVITIES, SET_FAVORITE_COUNTRY, GET_ALL_COUNTRIES, GET_FILTERED_COUNTRIES, GET_FULL_COUNTRY_LIST, GET_ALL_ACTIVITIES, GET_COUNTRY_DETAILS } from "../actions";

const initialState = {
    fullCountryList: [],
    countries: [],
    country_details:{},
    countries_activities:[],
    favorites_countries:[],
    full_activities:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload.filter(e => {e.heart = false 
                    return e})
            }
        case GET_FILTERED_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
        case GET_FULL_COUNTRY_LIST:
            return{
                ...state,
                fullCountryList: action.payload.filter(e => {e.heart = false 
                                                                return e})
            }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                countries_activities: action.payload
            }
        case GET_COUNTRY_DETAILS:
            return{
                ...state,
                country_details: action.payload
            }
        case SET_FAVORITE_COUNTRY:
            if(action.payload.act === 'add'){
                delete action.payload.act;
                return{
                    ...state,                
                    favorites_countries: [...state.favorites_countries, action.payload]
                }
            }
            if(action.payload.act === 'del'){
                delete action.payload.act;
                return{
                    ...state,                
                    favorites_countries: [...state.favorites_countries.filter( f => f.country_id !== action.payload.country_id)]
                }
            }
        case GET_FULL_ACTIVITIES:
            return{
                ...state,
                full_activities: action.payload
            }
        case FILTER_COUNTRIES:
            if(action.payload.type === 'continent'){
                return{
                    ...state,
                    fullCountryList: state.fullCountryList.filter()
                }
                
            }
    
        default:
            return state;
    }
}


export default rootReducer;