import axios from "axios"
import { getOngApi, postOngApi } from "./publicApiService"

const base_url = 'http://ongapi.alkemy.org/api/'

export const getMembersApiId = (id) => {
    return (
        getOngApi("members", `${id}`)
    )
}

export const getMembersApi = () => {
    return (
        getOngApi("members")
    )
}

export const postMembersApi = (body) => {
    return (
        postOngApi("members", body)
    )
}

// Creo el método Put público, ya que la documentación lo solicita así.

export const putMembersPublicApi = async (id, body) => {
    const putApi = `${base_url}members/${id}`

    try {
        const resp = await axios.put(putApi, body)
        return resp
    } catch (error) {
        return error
    }
}