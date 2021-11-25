import { useField, Field, useFormikContext, ErrorMessage } from 'formik'
import React, {useState} from 'react'
import './NoveltiesForm.css'
const NovletiesImage = ({label, ...props}) => {
    const [base64Image, setBase64] = useState('')
    const data = useFormikContext(props)
    const helpers = useField(props)[2]
    console.log(data)
    const {setValue} = helpers

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await base64Convert(file)
       console.log(base64)
       setValue(
           base64
        )
    }

    const base64Convert = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = (()=>{
                resolve(fileReader.result)
            })
            fileReader.onerror = ((error)=>{
                reject(error)
            })
        })
    }
    return (<>
            <div className='input-imagen'>
                <label for='image' className='cargar-imagen'>Carga una imagen</label>
                <input
                    accept=".jpg, .png"
                    id='image'
                    name='image'
                    type='file'
                    onChange={((e) => uploadImage(e))}
                />
                <ErrorMessage component='div' className='alert alert-danger' name='image' />
            </div>
        </>
    )
}

export default NovletiesImage
