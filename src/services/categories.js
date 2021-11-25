import { getOngApi, postOngApi, putOngApi } from './publicApiService'
import {CATEGORIES} from './apiRest'

export const getCategories = () => {
    return getOngApi(CATEGORIES)
}
export const getCategoriesById = (id) => {
    return getOngApi(CATEGORIES, id)
}
export const postCategories = (category) => {
    console.log(category)
    return postOngApi(CATEGORIES, category)
    
}
export const updateCategories = (id, update) => {
    return putOngApi(CATEGORIES, id, update)
}

