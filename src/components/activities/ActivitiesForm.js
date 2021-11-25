import React , { useState , useEffect } from 'react'
import "./ActivitiesStyles.css"
import { Formik, Form, } from "formik"
import * as Yup from 'yup';
import { createActivity, getActivity, /*updateActivity */} from '../../services/activities'

import { updateActivity } from '../../services/activities';
import { TextInput } from '../utils/TextInput'
import { CKEditorTextInput }  from '../utils/CKEditorTextInput'
import { ImageFileInput } from '../utils/ImageFileInput'
import { ImagePreview } from '../utils/ImagePreview'
import { useParams } from 'react-router';


export const ActivitiesForm = () =>
{
  const { id } = useParams()

  const [activity, setActivity] = useState (null)
  const [imageUpdated, setImageUpdated] = useState(false)

  let initialValues = {
    name: '',
    description: '',
    imageData: null
  }

  useEffect(() => {  
    const fetchActivity = async () => {
      if (id) {
        const response = await getActivity(id)
        
        const activityReaded =  {
          id: response.data.data.id,
          name: response.data.data.name,
          description: response.data.data.description,
          imageData: response.data.data.image
        }
        setActivity(activityReaded)   
      } else {
        setActivity(initialValues)
      }
    }
    fetchActivity()
  },[])

  return (
      <>
      {
        activity === null ?  
          <p> {'cargando...'}</p> 
        :
          <Formik
          initialValues = {activity}
          validationSchema = {Yup.object({
            name: Yup.string()
              .required('Requerido.'),
            description: Yup.string(),
            imageData: Yup.mixed()
          })} 
          onSubmit = { async (values, { setSubmitting }) => {
            if (id) {
              const response = await updateActivity(values, imageUpdated)
              console.log(response)
              setSubmitting(false)
            } else {
              const response = await createActivity(values)
              console.log(response)
              setSubmitting(false)
            }                  
          }}
        >
          {({ values }) => (
            <Form>
              <TextInput 
                label="Nombre"
                name="name" 
                type="text"
                placeholder="Natacion para todos"
              />            
              
              <br/>
    
              <CKEditorTextInput
                label="Descripcion"
                name='description'
              />
            
              <br/> 
    
              <ImageFileInput
                label="Imagen" 
                name="imageData"
                type="file"
                setImageUpdated={setImageUpdated}
              />
              <ImagePreview url={values.imageData}/>
    
              <br/>
    
              <button type="submit">Enviar</button>
              
            </Form>
          )}
        </Formik>   
      } 
      </>   
  )
}