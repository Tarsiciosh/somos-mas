import { getOngApi, postOngApi, putOngApi } from "./publicApiService";
import { USERS } from "./apiRest";


export const getUsers = () => {
    return getOngApi(USERS);
}

export const getUsersId = (id) => {
    return getOngApi(USERS, id);
}

export const postUser = (user) => {
    return postOngApi(USERS, user);
}

export const putUser = (id, user) => {
    return putOngApi(USERS, id, user);
}