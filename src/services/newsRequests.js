import { getOngApi, postOngApi, putOngApi, deleteOngApi } from "./publicApiService";
import { NEWS } from './apiRest'


export const getNewsPublicApi = () => {
    return getOngApi(NEWS)
}

export const getNewsPublicApiId = (id) => {
    return getOngApi(NEWS, id)
}

export const postNewsPublicApi = (body) => {
    return postOngApi(NEWS, body)
}

// Creo el método Put público, ya que la documentación lo solicita así.
export const putNewsPublicApi = (id, body) => {
    return putOngApi(NEWS, id, body)
}

// Creo el método Delete público, ya que la documentación lo solicita así.
export const deleteNewsPublicApi = (id) => {
    return deleteOngApi(NEWS, id)
}
