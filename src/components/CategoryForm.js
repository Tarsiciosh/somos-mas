import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./assets/categoryForms.css"
import { toBase64 } from "./helpers";
import axios from "axios";
import { CATEGORIES } from '../services/apiRest'

export default function CategoryForm() {
    const [category, setCategory] = useState(null);
    const [categoryImage, setCategoryImage] = useState("")

    // const getCategory = async () => {
    //     const response = await axios.get(`${CATEGORIES}/${category.id}`)
    //     setCategory(response.data.data)
    // }

    // useEffect(() => {
    //     if (!category.lenght) {
    //         getCategory();
    //     }
    // }, [])

    const onChangeImg = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        setCategoryImage(base64);

    }

    return (

        <div>
            <div>
                <h1>Creación o edición de usuario</h1>
                <Formik
                    initialValues={{ name: "", description: "", image: "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Es necesario que ingrese un nombre"
                        } else if (
                            !/^[A-Za-z\s]{4,}$/i.test(values.name)
                        ) {
                            errors.name = 'El nombre solo puede contener letras y espacios';
                        }
                        if (!values.description) {
                            errors.description = 'Es necesario que ingrese una descripción';
                        }
                        if (!categoryImage) {
                            errors.image = "Se debe ingresar una imagen"
                        }
                        console.log("values", values)
                        return errors;
                    }}

                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if (!category) {
                            try {
                                setCategory({ name: values.name, description: values.description, image: categoryImage })
                                await axios.post(CATEGORIES, category);
                            } catch (error) {
                                console.log(error.response)
                            }
                        } else {
                            try {
                                await axios.patch(`${CATEGORIES}/${category.id}`, category);
                            } catch (error) {
                                console.log(error.response)
                            }
                        }
                        resetForm();
                    }
                    }
                >
                    {({ isSubmitting, handleChange, values }) => (
                        <Form>
                            <label>Nombre de la categoría</label>
                            <Field value={values.name} placeholder="Ingrese un nombre para la categoría" type="text" name="name" />
                            <ErrorMessage name="name" component="div" />
                            <label> Descripción de categoría </label>
                            <div className="ckEditorForm">
                                <CKEditor
                                    name="description"
                                    editor={ClassicEditor}
                                    data={values.description}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        values.description = data
                                    }}
                                />
                            </div>
                            <ErrorMessage name="description" component="div" />
                            <p>Imagen categoria</p>
                            {categoryImage && <img src={categoryImage} alt="imagen_categoria" className="descriptionImage" />}
                            <input className="inputImage" type="file" accept="image, .jpg, .jpeg, .png" onChange={onChangeImg} />
                            <ErrorMessage name="image" component="div" />
                            <button className="submitButton" type="submit" disabled={isSubmitting}>
                                Enviar
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}