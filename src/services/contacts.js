import { CONTACTS } from "./apiRest";
import { getOngApi, postOngApi } from "./publicApiService";

const base_path = CONTACTS; 

export const postContact = (contacto) => {
    return postOngApi(base_path, contacto);
}

export const getContactById = (id) => {
    return getOngApi(base_path, id);
}

export const getContacts = () => {
    return getOngApi(base_path);
}