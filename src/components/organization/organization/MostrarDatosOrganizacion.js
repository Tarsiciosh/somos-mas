import { getOrganization } from "../../../services/organizacion";
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MostrarDatosOrganizacion = () => {
    const initialValues = {
        name: '',
        image: '',
        short_description: ''
    }
    const [organization, setOrganization] = useState(initialValues);

    useEffect(() => {
        getOrganization().then(response => {
            setOrganization({
                name: response.data.name,
                image: response.data.logo,
                short_description: response.data.short_description
            })
        })
    }, [])

    return (
        <div>
            <section>
                <h2>Datos de la organización</h2>
                <article>Nombre: {organization.name}</article>
                <article>Imagen:</article>
                <img src={organization.image} />
                <article>Descripción: {organization.short_description}</article>
                <Link to='/backoffice/organization/edit'><button>Editar</button></Link>
            </section>
        </div>
    )
}
export default MostrarDatosOrganizacion