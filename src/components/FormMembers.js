import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getMembersApiId, postMembersApi, putMembersPublicApi } from '../services/membersRequests';
import { toBase64 } from './helpers';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';

export const FormMembers = () => {

    const [member, setMember] = useState({})
    const [imageMember, setImageMember] = useState("")
    const [isLoading, setLoad] = useState(true)

    const { id } = useParams()

    const setInitialValues = (id) => {
        if (id) {
            getMembersApiId(id)
                .then(response => {
                    let data = response.data.data
                    setMember(data);
                    setLoad(false)
                    console.log('data received')
                })
        } else {
            setLoad(false)
        }
    }

    useEffect(() => {
        setInitialValues(id)
    }, [id])

    const onChangeImg = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        setImageMember(base64);
    }

    const validationSchema = Yup.object({
        name: Yup.string().min(4, 'Must be more than 4 characters').required('Required'),
        description: Yup.string().required('Required'),
        facebookUrl: Yup.string().required('Required'),
        linkedinUrl: Yup.string().required('Required'),
        // image: Yup.mixed()
        //     .required("The image is required")
        //     .test(
        //         'fileType',
        //         "Unsupported Format",
        //         (value) => value && ["jpg", "png"].includes(value.split('.').pop())
        //     ),
    })

    const submitHandling = (values) => {
        let { name, description, facebookUrl, linkedinUrl } = values
        const payload = {
            name,
            description,
            image: imageMember,
            facebookUrl,
            linkedinUrl,
        }
        console.log(payload)
        const sendData = (payload) => {
            if (id) {
                putMembersPublicApi(id, payload)
                    .then(res => console.log(res.data))
                    .catch(error => console.log(error))
            } else {
                postMembersApi(payload)
                    .then(res => console.log(res.data))
                    .catch(error => console.log(error))
            }
        }
        sendData(payload)
    }

    return (

        <div>
            {isLoading ? <Spinner variant='dark' animation='border' />
                :
                <div>
                    <h1>{id ? 'Edit Membres' : 'Create Members'}</h1>
                    <Formik
                        initialValues={id ? {
                            name: member.name,
                            description: member.description,
                            image: member.image,
                            facebookUrl: member.facebookUrl,
                            linkedinUrl: member.linkedinUrl
                        } : {
                            name: '',
                            description: '',
                            image: '',
                            facebookUrl: '',
                            linkedinUrl: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // if (id) {
                            //     putMembersPublicApi(values)
                            //         .then(res => console.log(res.data))
                            //         .catch(error => console.log(error))
                            // } else {
                            //     setMember({ name: values.name, description: values.description, image: imageMember, facebookUrl: values.facebookUrl, linkedinUrl: values.linkedinUrl })
                            //     postMembersApiId(member)
                            //         .then(res => console.log(res.data))
                            //         .catch(error => console.log(error))
                            // }
                            // resetForm();
                            submitHandling(values)
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <Field
                                    placeholder="Nombre"
                                    type="text"
                                    name="name"
                                    value={values.name}
                                />
                                <ErrorMessage component='div' name='name' />
                                <input
                                    type="file"
                                    accept="image, .jpg, .jpeg, .png"
                                    onChange={onChangeImg}
                                />
                                <ErrorMessage component='div' name='image' />
                                <label htmlFor="">Redes sociales:</label>
                                <Field
                                    type="url"
                                    name="facebookUrl"
                                    placeholder="Facebook"
                                    value={values.facebookUrl}
                                />
                                <ErrorMessage component='div' name='facebookUrl' />
                                <Field
                                    type="url"
                                    name="linkedinUrl"
                                    placeholder="Linkedin"
                                    value={values.linkedinUrl}
                                />
                                <ErrorMessage component='div' name='linkedinUrl' />
                                <div>
                                    <CKEditor
                                        name="description"
                                        data={values.description}
                                        editor={ClassicEditor}
                                        onChange={
                                            (event, editor) => {
                                                const data = editor.getData();
                                                values.description = data
                                            }
                                        }
                                    />
                                    <ErrorMessage component='div' name='description' />
                                </div>
                                <button
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>}
        </div>
    )
}
