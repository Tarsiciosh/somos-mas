import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    
    const EditForm = () => {
        const [error, setError] = useState('')
        const formValidate = (values) => {
            if(!values.name || !values.logo || !values.shortDescription || !values.longDescription){
                setError('Todos los campos son requeridos') 
            }else{
                setError('')
            }
        }
    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        name: '',
                        logo: '',
                        shortDescription: '',
                        longDescription: ''
                    }}
                    onSubmit={(values, {resetForm})=>{
                        resetForm()
                    }}
                >
                    {({values, setFieldValue})=>(
                        <Form>
                            <div>
                                <label htmlFor='name'>Nombre</label>
                                <Field type='text' id='name' name='name' placeholder='Alkemy'  value={values.name}/>
                            </div>
                            <div>
                                <label htmlFor='logo'>Logo</label>
                                <Field type='file' accept='image/png, image/jpg' id='logo' name='logo' value={values.logo}/>
                            </div>
                            <div>
                                <label htmlFor='shortDescription'>Breve Descripción</label>
                                <CKEditor editor={ClassicEditor} onChange={(event, editor) => {setFieldValue('shortDescription', editor.getData())}}/>
                            </div>
                            <div>
                                <label htmlFor='longDescription'>Detalle</label>
                                <Field type='text' id='longDescription' name='longDescription' placeholder='Detalle' value={values.longDescription}/>
                            </div> 
                            <button type='submit' onClick={()=>formValidate(values)}>Editar</button>
                            {error && <div>{error}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <h4>Síguenos en nuestras redes sociales</h4>
                <div>
                    <div>Instagram: <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>SomosMás</a></div>
                    <div>Facebook: <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>Somos_Más</a></div>
                </div>
            </div>
        </>
    )
}

export default EditForm
