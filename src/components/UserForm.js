import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import "../components/assets/usersform.css"
import { toBase64 } from "./helpers";
import { useParams } from "react-router";
import { getUsersId, putUser } from "../services/usuarios";
import { useDispatch } from "react-redux";
import { startRegister } from "../app/auth/actions";
import { Spinner } from "react-bootstrap";


export default function UserForm() {
    const [usuario, setUsuario] = useState({});
    const [profileImage, setProfileImage] = useState("")
    const [isLoading, setLoad] = useState(true)
    const dispatch = useDispatch()


    const { id } = useParams()


    const setInitialValues = async (id) => {
        if (id) {
            await getUsersId(id)
                .then(response => {
                    let data = response.data.data
                    setUsuario(data);
                    setLoad(false)
                }).catch(error => {
                    alert("Error", `Se produjo un error al buscar la novedad ${id}`, "error", "Salir")
                    console.log(error)
                })
        } else {
            setLoad(false)
        }
    }

    useEffect(() => {
        setInitialValues(id)
    }, [])

    const onChangeImg = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        setProfileImage(base64)
    }

    const submitHandling = (values) => {
        let { name, email, password, role_id, profile_image } = values
        const payload = {
            name,
            email,
            password,
            // role_id,
            // profile_image,
        }

        const sendData = async (payload) => {
            if (id) {
                putUser(id, payload)
                    .then(res => console.log(res.data))
                    .catch(error => {
                        alert("Error", "Se produjo un error al modificar el usuario", "error", "Salir")
                        console.log(error)
                    })
            } else {
                dispatch(startRegister(payload))
                    .then(res => console.log(res.data))
                    .catch(error => {
                        alert("Error", "Se produjo un error al crear el usuario", "error", "Salir")
                        console.log(error)
                    })
            }
        }
        sendData(payload)
    }

    return (

        <div>
            {isLoading ? <Spinner variant='dark' animation='border' />
                :
                <div>
                    <h1>{id ? 'Edit User' : 'Create User'}</h1>
                    <Formik
                        initialValues={{ name: usuario.name, email: usuario.email, password: usuario.password, role_id: usuario.role_id, profile_image: usuario.profile_image }}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = "Es necesario que ingrese un nombre"
                            } else if (
                                !/^[A-Za-z\s]{4,}$/i.test(values.name)
                            ) {
                                errors.name = 'El nombre solo puede contener letras y espacios';
                            }
                            if (!values.email) {
                                errors.email = 'Es necesario que ingrese un email';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Dirección de email inválida';
                            }
                            if (!values.password) {
                                errors.password = "Es necesario que ingrese una contraseña"
                            } else if (
                                !/^[A-Z0-9._%+-]{8,}$/i.test(values.password)
                            ) {
                                errors.password = "Debe ingresar una contraseña válida"
                            }
                            if (!profileImage) {
                                errors.profile_image = "Se debe ingresar una imagen"
                            }
                            return errors;
                        }
                        }

                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            submitHandling(values)
                            resetForm();
                        }}
                    >
                        {({ isSubmitting, handleChange, values }) => (
                            <Form>
                                <Field value={values.name} placeholder="Ingrese un nombre" type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                                <Field value={values.email} placeholder="Ingrese un email" type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                                <Field value={values.password} placeholder="Ingrese una contraseña" type="password" name="password">
                                </Field>
                                <Field name="role_id" as="select">
                                    <option className="selectOption"></option>
                                    <option value={2} name="user">Usuario</option>
                                    <option value={1} name="admin">Administrador</option>
                                </Field>
                                <ErrorMessage name="password" component="div" />
                                <p>Foto de perfil</p>
                                {profileImage && <img className="profileImage" alt="imagen_perfil" src={profileImage} />}
                                <input className="inputImage" type="file" accept="image, .jpg, .jpeg, .png" onChange={onChangeImg} />
                                <ErrorMessage name="profile_image" component="div" />
                                <button className="submitButton" variant="outline-primary" type="submit" disabled={isSubmitting}>
                                    Enviar
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>}
        </div >
    )
}