import { GET_ALL_COUNTRIES, GET_FILTERED_COUNTRIES, GET_FULL_COUNTRY_LIST, GET_ALL_ACTIVITIES } from "../actions";

const initialState = {
    fullCountryList: [],
    countries: [],
    countries_activities:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
        case GET_FILTERED_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
        case GET_FULL_COUNTRY_LIST:
            return{
                ...state,
                fullCountryList: action.payload
            }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                countries_activities: action.payload
            }
    
        default:
            return state;
    }
}


export default rootReducer;