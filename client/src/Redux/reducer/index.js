import { GET_ALL_COUNTRIES } from "../actions";

const initialState = {
    countries: [],
    countries_activities:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            // console.log('action.payload.content', action.payload.content)
            return{
                ...state,
                countries: action.payload
            }
    
        default:
            return state;
    }
}


export default rootReducer;