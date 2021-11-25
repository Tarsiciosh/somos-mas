import axios from "axios"
import { alert } from "./alert"
import { ORGANIZATION } from "./apiRest"
import { getOngApi, postOngApi } from "./publicApiService"

const base_url = ORGANIZATION

export const getHomeApi = () => {
    return (
        getOngApi(base_url)
    )
}

export const postHomeApi = (body) => {
    return (
        postOngApi(base_url, body)
    )
}

export const putOngApi = async (homeId, body) => {
    const putApi = `${base_url}/${homeId}`
    try {
        const resp = await axios.put(putApi, body)
        return resp
    } catch (error) {
        console.log("error:", error)
        alert("Error", "Se produjo un error", "error", "Salir")
    }
}
