import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import NovletiesImage from './NoveltiesImage';
import { CATEGORIES } from '../services/apiRest';
import { useParams } from 'react-router';
import { alert } from '../services/alert';
import { getNewsPublicApiId, postNewsPublicApi, putNewsPublicApi } from '../services/newsRequests';
import { withRouter } from 'react-router';
import './NoveltiesForm.css'
const NoveltiesForm = (props) => {
  const [news, setNews] = useState({})
  const [isLoading, setLoad] = useState(true)
  const [categories, setCategories] = useState([])
  const [userCategories, setUserCategories] = useState({})

  const { id } = useParams()


  const setInitialValues = async (id) => {
    if (id) {
      await getNewsPublicApiId(id)
        .then(response => {
          let data = response.data.data
          setNews(data);
          setLoad(false)
        }).catch(error => {
          alert("Error", `Se produjo un error al buscar la novedad ${id}`, "error", "Salir")
        })

    } else {
      setLoad(false)
    }
  }

  const fetchCategories = async () => {
    let options = []
    await axios.get(CATEGORIES)
      .then(response => {
        const data = response.data.data
        for (let category of data) {
          options.push({
            id: category.id,
            slug: category.name
          })

        }
        setCategories(options)
      })
  }

  useEffect(() => {
    setInitialValues(id)
    fetchCategories();

  }, [id])

  const changeCategories = (e) => {
    let selectedName = e.target;
    categories.map(category => {
      if (category.slug === selectedName.value) {
        const index = selectedName.selectedIndex;
        const el = selectedName.childNodes[index]
        const option = el.getAttribute('id');
        return setUserCategories({
          id: option,
          slug: category.slug

        })
      }
    })
  }

  const validation = Yup.object().shape({
    title: Yup.string()
      .min(4, 'El titulo debe tener al menos 4 letras')
      .required('El campo no puede estar vacio'),
    content: Yup.string()
      .required('El campo no puede estar vacio')
  });

  const submitHandling = (values) => {
    let { title, slug, content, image, category_id } = values
    const today = Date.toString()
    const payload = {
      name: title,
      slug,
      content,
      image,
      category_id,
    }

    const sendData = async (payload) => {
      if (id) {
        await putNewsPublicApi(id, payload)
        .then(res => console.log(res.data))
          .catch(error => {
            alert("Error", "Se produjo un error al modificar la novedad", "error", "Salir")
            console.log(error)
          })
          props.history.push('/backoffice/news')
          alert('Actualizado!', 'Se actualizó de manera correcta!', 'success', 'Aceptar')
      } else {
        await postNewsPublicApi(payload)
          .then(res => console.log(res.data))
          .catch(error => {
            alert("Error", "Se produjo un error al crear la novedad", "error", "Salir")
            console.log(error)
          })
          props.history.push('/backoffice/news')
          alert('Nueva novedad', 'Se creó de manera correcta!', 'success', 'Aceptar')
      }
    }

    sendData(payload)
  }

  return (

    <div>
      {isLoading ? <Spinner variant='dark' animation='border' />
        :
        <div className='contenedor-novelties'>
          <h1 className='title-form'>{id ? 'Edit News' : 'Create News'}</h1>
          <Formik

            initialValues={id ? {
              title: news.name,
              category_id: news.category_id,
              slug: news.slug,
              content: news.content,
              image: news.image

            } :
              {
                title: '',
                category_id: '',
                slug: '',
                content: '',
                image: ''


              }}

            validationSchema={validation}
            onSubmit={(values) => {
              values.category_id = parseInt(userCategories.id)
              values.slug = userCategories.slug
              submitHandling(values)
            }
            }
          >
            {({ values, handleChange }) => (
              <Form>
                <h4 className='label-form'>Titulo</h4>
                <Field
                  className='form-control input-form'
                  name='title'
                  type='text'
                  onChange={handleChange}

                />
                <ErrorMessage component='div' className='alert alert-danger' name='title' />

                <h4 className='label-form'>Descripción</h4>
                <CKEditor
                  name='content'
                  className='form-control input-form'
                  editor={ClassicEditor}
                  data={values.content}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    values.content = data
                  }}
                />
                <ErrorMessage component='div' className='alert alert-danger mt-2' name='content' />

                < NovletiesImage
                  label="Imagen"
                  name="image"
                  type="file"
                />
                <ErrorMessage component='div' className='alert alert-danger mt-2' name='content' />
                <div className='section-enviar'>
                <select name='categories' className='select-form' onChange={e => changeCategories(e)}>
                  {categories.map((category) => {
                    return <option key={`category-${category.id}`} id={category.id}>{category.slug}</option>
                  })}
                </select>
                <button type='submit' className='btn-form'>{id ? 'Confirm Edit' : 'Confirm Add'}</button>
                </div>
              </Form>)}

          </Formik>
        </div>}
    </div>
  )
}

export default withRouter(NoveltiesForm);
