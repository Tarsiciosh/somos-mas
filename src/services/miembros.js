import axios from "axios";
import { MEMBERS } from "./apiRest";

const base_url = MEMBERS;

export const getMembers = async () => {
    return await axios.get(base_url)
        .then(response => {
            console.log("la data", response.data.data)
            return response.data;
        })
        .catch(error => {
            console.log('Error in get org data', error);
            return {}
        })
}
