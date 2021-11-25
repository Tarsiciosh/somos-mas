import React, { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getHomeApi, putOngApi } from '../services/homeRequests';
import { Spinner } from 'react-bootstrap';
import { alert } from '../services/alert';

export const FormEditHome = ({ id = "1", arraySlide = ['slide1'] }) => {
    const [home, setHome] = useState({})
    const [isLoading, setLoad] = useState(true)

    const validationSchema = Yup.object({
        welcome_text: Yup.string().min(20, 'Must be more than 20 characters').required('Required'),
        // textImage: Yup.string().required('Required'),
        // fileImage: Yup.mixed()
        //     .required("The image is required")
        //     .test(
        //         'fileType',
        //         "Unsupported Format",
        //         (value) => value && ["jpg", "png"].includes(value.split('.').pop())
        //     ),
    })

    const setInitialValues = (id) => {
        if (id) {
            try {
                getHomeApi(id)
                    .then(response => {
                        let data = response.data.data
                        setHome(data);
                        setLoad(false)
                        console.log('data received')
                    })
            } catch (error) {
                console.log("error:", error)
            }
        } else {
            setLoad(false)
        }
    }

    useEffect(() => {
        setInitialValues(id)
    }, [])

    return (

        <div>
            {isLoading ? <Spinner variant='dark' animation='border' />
                :
                <div>
                    <h1>{id ? 'Edit Home' : 'Edit Home'}</h1>
                    <Formik
                        initialValues={id ? {
                            welcome_text: home.welcome_text
                        } : {
                            welcome_text: ''
                        }}

                        validationSchema={validationSchema}

                        onSubmit={(values, { resetForm }) => {
                            putOngApi(id, values.welcome_text)
                        }}
                    >
                        {({ values, handleChange, handleBlur }) => (
                            <Form>
                                <h3>Editar texto de bienvenida</h3>
                                <textarea
                                    name="welcome_text"
                                    cols="30"
                                    rows="5"
                                    placeholder="Edit your text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.welcome_text}
                                />
                                <ErrorMessage component='div' name='welcomeText' />

                                {
                                    arraySlide.map(item =>
                                        <div
                                            key={item}
                                        >
                                            <h3> {` Editar ${item}`} </h3>
                                            <input
                                                name="textImage"
                                                type="text"
                                                placeholder="Editar texto del slide"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.textImage}
                                            />
                                            <ErrorMessage component='div' name='textImage' />
                                            <input
                                                name="fileImage"
                                                type="file"
                                                value={values.fileImage}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component='div' name='fileImage' />
                                        </div>

                                    )
                                }

                                <button type="submit">
                                    Enviar
                                </button>
                            </Form>
                        )}
                    </Formik >
                </div>}
        </div>
    )
}


