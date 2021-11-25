import { getOrganization } from "./organizacion";
import { useState, useEffect } from "react";

export const GetContacto = () => {
    const initialValues = {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
    }

    const [contacto, setContacto] = useState(initialValues);

    useEffect(() => {
        getOrganization().then(response => {
            const datos = {
                facebook: response.data.facebook_url,
                instagram: response.data.instagram_url,
                twitter: response.data.twitter_url,
                linkedin: response.data.linkedin_url
            }
            setContacto({
                ...datos
            })
        })
    }, [])
    

    return contacto;
}
