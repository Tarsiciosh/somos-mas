import { LOGIN, REGISTER } from "../../services/apiRest"
import { postOngApi } from "../../services/publicApiService"
import { types } from "../types"


export const startRegister = (user) => {
    
    return dispatch => {

        postOngApi(REGISTER, user)
        .then(data => {
            dispatch( register(data) )
        }).catch((error) => {
            return error
        })
    }   
}

export const register = (user) => {
    return {
        type: types.register,
        payload: {
            user
        }
    }
}

export const  startLogin = (user) => {
    return dispatch => {
        postOngApi(LOGIN, user)
        .then(data => {
            dispatch( login(data) )
            localStorage.setItem('token', data.data.data.token)}
            )
            .catch((error) => {
            return console.log(error)
        })
    }
}

export const login = (token) => {
    return {
        type: types.login,
        payload: {
            token
        }
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}