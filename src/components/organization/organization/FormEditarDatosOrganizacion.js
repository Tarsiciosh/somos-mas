import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { getOrganization, postOrganization } from '../../../services/organizacion.js'

const FormularioEditarDatosOrganizacion = () => {
    const initialValues = {
        name: '',
        image: '',
        short_description: ''
    }
    const [organization, setOrganization] = useState(initialValues)
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
            <Formik
                enableReinitialize={true}
                initialValues={organization}
                validate={(valores) => {
                    let errores = {};
                    if (!valores.name || valores.name.trim().length === 0) {
                        errores.name = 'por favor ingresa un nombre'
                    } else if (!/^[a-zA-Z0-9ñÑöÖüÜáéíóúÁÉÍÓÚ ]{2,}$/.test(valores.name)) {
                        errores.name = 'por favor ingresa un nombre válido'
                    }
                    if (!valores.image) {
                        errores.image = 'por favor ingresa una url de imagen'
                    }
                    if (!valores.short_description || valores.short_description.trim().length === 0) {
                        errores.short_description = 'por favor ingresa una descripción'
                    } else if (valores.short_description.length > 255) {
                        errores.message = 'la descripción debe tener menos de 256 caracteres'
                    }
                    return errores;
                }}
                onSubmit={async (valores) => {
                    postOrganization(valores.name, valores.image, valores.short_description);
                }}
            >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>Edición de datos de la organización</h2>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={values.name}
                            placeholder="Nombre"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div>
                            {touched.name && errors.name && <div className="error alert alert-warning p-1 m-0">{errors.name}</div>}
                        </div>
                        <section>
                            <img src={values.image} />
                        </section>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={values.image}
                            placeholder="image"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div>
                            {touched.image && errors.image && <div className="error alert alert-warning p-1 m-0">{errors.image}</div>}
                        </div>
                        <textarea
                            type="text"
                            className="form-control"
                            name="short_description"
                            value={values.short_description}
                            rows="3"
                            placeholder="Escribe la descripción de la organización aquí"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div>
                            {touched.short_description && errors.short_description && <div className="error alert alert-warning p-1 m-0">{errors.short_description}</div>}
                        </div>
                        <div className="d-grid gap-2">
                            <button className="w-100 btn btn-lg btn-primary mb-1" type="button" onClick={handleSubmit} >Guardar</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
};
export default FormularioEditarDatosOrganizacion;