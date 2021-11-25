import axios from 'axios';
import { ORGANIZATION } from './apiRest'

const base_url = ORGANIZATION;
export const getOrganization = () => {
    return axios.get(base_url)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('Error in get org data', error);
            return {}
        })
}

export const postOrganization = (name, image, shortDescription) => {
    return axios.post(base_url, {
        name: name,
        logo: image,
        short_description: shortDescription,
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
    });
}