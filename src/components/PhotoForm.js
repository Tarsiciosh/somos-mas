import React, { useEffect, useState } from 'react'
import "./photoFormStyles.css"
import { Formik, Form } from "formik"
import * as Yup from 'yup';
import { createValueAtEndpoint, updateValueAtEndpoint } from './utils/helpers'
import { TextInput } from './utils/TextInput'
import { CKEditorTextInput } from './utils/CKEditorTextInput'
import { ImageFileInput } from './utils/ImageFileInput'
import { ImagePreview } from './utils/ImagePreview'
import { useParams } from 'react-router';
import axios from 'axios';
import { TESTIMONIALS } from '../services/apiRest';
import { Spinner } from 'react-bootstrap';
import { alert } from '../services/alert';


export const PhotoForm = () => {
  const { id } = useParams()
  const [imageUpdated, setImageUpdated] = useState(false)
  const [isLoading, setLoad] = useState(true)
  const [testimony, setTestimony] = useState({})

  let initialValues = {
    name: '',
    description: '',
    imageData: null
  }

  if (testimony) {
    initialValues.id = testimony.id
    initialValues.name = testimony.name
    initialValues.description = testimony.description
    initialValues.imageData = testimony.image
  }

  const setInitialValues = async (id) => {
    if (id) {
      try {
        await axios.get(`${TESTIMONIALS}/${id}`)
          .then(response => {
            let data = response.data.data
            setTestimony(data);
            setLoad(false)
            console.log('data received')
          })
      } catch (error) {
        console.log("error:", error)
        alert("Error", "Se produjo un error", "error", "Salir")
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
          <h1>{id ? 'Edit News' : 'Create News'}</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string()
                .required('Requerido.'),
              description: Yup.string(),
              imageData: Yup.mixed()
            })}
            onSubmit={async (values, { setSubmitting }) => {
              if (id) {
                try {
                  const response = await updateValueAtEndpoint(values, imageUpdated)
                  console.log(response)
                  setSubmitting(false)
                } catch (error) {
                  console.log("error:", error)
                  alert("Error", "Se produjo un error", "error", "Salir")
                }
              }
              else {
                try {
                  const response = await createValueAtEndpoint(values)
                  console.log(response)
                  setSubmitting(false)
                } catch (error) {
                  console.log(error)
                  alert("Error", "Se produjo un error", "error", "Salir")
                }
              }
            }
            }
          >
            {({ values }) => (
              <Form>
                <TextInput
                  label="Nombre"
                  name="name"
                  type="text"
                />
                <br />
                <CKEditorTextInput
                  label="Descripcion"
                  name='description'
                />
                <br />
                <ImageFileInput
                  label="Imagen"
                  name="imageData"
                  type="file"
                  setImageUpdated={setImageUpdated}
                />
                <ImagePreview url={values.imageData} />
                <br />
                <button type="submit">Enviar</button>
              </Form>
            )}
          </Formik>
        </div>}
    </div >
  )
}