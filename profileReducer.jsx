import { ADD_PROFILE, REMOVE_PROFILE, CALCULATE_AVERAGE_AGE } from "./profileActions";

const initialState = { addedProfile: [], averageAge: 0 }

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case CALCULATE_AVERAGE_AGE: {
            if(state.addedProfile.length === 0){
                return {...state, averageAge: 0}
            }
            const totalAge = state.addedProfile.reduce((sum, profile) => sum + profile.age, 0)
            const averageAge = totalAge/state.addedProfile.length
        

            return {...state, averageAge}
         
        }

        case ADD_PROFILE: {
            const existing = state.addedProfile.find((p) => p.id === action.payload.id)

            if(existing){
            return state
        } else{
            return {...state, addedProfile:[...state.addedProfile, action.payload] }
        }
        }

        case REMOVE_PROFILE: {
            return {
                ...state, addedProfile: state.addedProfile.filter((p) => p.id !== action.payload.id)
            }
        }
        default: 
        return state
    }
}

export default profileReducer