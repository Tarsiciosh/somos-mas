import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'


const API_BASEURL = 'http://ongapi.alkemy.org/api/'

// Receiving a Project object will edit that project, if not, it will create a new project
const ProjectManagerForm = ({ proyecto = null }) => {
  const [isFormSent, setIsFormSent] = useState(false)
  const [imagePreview, setImagePreview] = useState()

  // Will handle the image field change and set the state, so we can preview the image
  const handleImagePreview = (e) => {
    e.target.files[0] && setImagePreview(e.target.files[0])
  }

  const submitProject = async (values) => {

    // Config counts on Project creation/edit 
    const config = {
      baseURL: API_BASEURL,
      url: `/projects${proyecto ? `/${proyecto.id}` : ''}`,
      method: proyecto ? 'put' : 'post',
      data: values
    }

    return axios.request(config)
      .then(response => console.info(response))
      .catch(err => console.error(err))
  }

  return (
    // Fields: title, description, image, due_date(optional)
    <Formik
      initialValues={{ title: '', description: '', image: '', due_date: '' }}

      validate={(values) => {
        let errors = {}

        // title validation
        if (!values.title) {
          errors.title = 'Ingrese' + (proyecto ? ' nuevo ' : ' ') + 'titulo del proyecto'
        } else if (!/[\w]/gm.test(values.title)) {
          errors.title = 'Titulo del proyecto tambien debe contener letras'
        }

        // description validation
        if (!values.description) {
          errors.description = 'Ingrese' + (proyecto ? ' nueva ' : ' ') + 'descripcion del proyecto'
        }

        // image validation
        if (!values.image) {
          errors.image = 'Ingrese' + (proyecto ? ' nueva ' : ' ') + 'imagen del proyecto'
        }

        return errors
      }}

      onSubmit={(values, { resetForm }) => {
        // Submit state notification and resetting form values
        submitProject(values)
        resetForm()
        setImagePreview()
        // Submit state could be changed on axios's API response
        setIsFormSent(true)
      }}
    >

      {({ values, errors, handleChange, setFieldValue }) => (
        <Form>
          <fieldset>
            <legend>{proyecto ? 'Edicion' : 'Creacion'} de proyecto</legend>

            <div className="form-group">
              <label htmlFor='title'>Titulo</label>
              <Field
                name='title'
                id='title'
                type='text'
                placeholder={'Ingrese' + (proyecto ? ' nuevo ' : ' ') + 'titulo'}
              />
              <ErrorMessage name='title' component={() => (<p>{errors.title}</p>)} />
            </div>


            <div className="form-group">
              <label htmlFor='description'>Descripcion</label>
              <Field
                name='description'
                id='description'
                type='text'
                placeholder={'Ingrese' + (proyecto ? ' nueva ' : ' ') + 'descripcion'}
              />
              <ErrorMessage name='description' component={() => (<p>{errors.description}</p>)} />
            </div>

            <div className="form-group">
              <label htmlFor='image'>Imagen</label>
              <input
                name='image'
                id='image'
                type='file'
                accept='image, .jpg, .jpeg, .png'
                alt='Imagen de proyecto'

                // Natively, Formik does not support easy file managment 
                onChange={(e) => {
                  setFieldValue(e.target.files[0])
                  handleChange(e)
                  handleImagePreview(e)
                }}
              />
              <ErrorMessage name='image' component={() => (<p>{errors.image}</p>)} />

              {
                values.image
                && imagePreview
                && <img
                  src={URL.createObjectURL(imagePreview)}
                  alt="Previsualizacion de imagen"
                  // TODO: Change this later
                  style={{ display: 'block', objectFit: 'cover', maxHeight: '5rem', maxWidth: '5rem' }}
                />
              }
            </div>

            <div className="form-group">
              <label htmlFor='due_date'>Fecha de vencimiento</label>
              <Field
                name='due_date'
                id='due_date'
                type='date'
                title={(proyecto ? 'Nueva f' : 'F') + 'echa de vencimiento (opcional)'}
              />
              <ErrorMessage name='due_date' component={() => (<p>{errors.due_date}</p>)} />
            </div>

            <button type='submit'>{proyecto ? 'Editar proyecto' : 'Cargar proyecto'}</button>

          </fieldset>

          {isFormSent && <p>Proyecto {proyecto ? 'actualizado' : 'creado'}</p>}

        </Form>
      )}
    </Formik >
  )
}

export default ProjectManagerForm