import { types } from "../types";

const initialState = {
    user: {},
    token: {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                token: action.payload.token
            }

        case types.register:
            return {
                user: action.payload.user
            }
        
        case types.logout:
            return initialState
    
        default:
            return state
    }
}