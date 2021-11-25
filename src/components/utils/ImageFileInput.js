import React ,{ useState} from 'react'
import { useField } from "formik";

export const ImageFileInput = ({ label, setImageUpdated, ...props }) => {
  const helpers = useField(props)[2] //field meta helpers

  const { setValue } = helpers

  const [errorMessage, setErrorMessage] = useState('')

  const handleOnChange = (e) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setValue(reader.result)
      setImageUpdated(true)
    }
    const file = e.currentTarget.files[0]
    if (validateFileExtension(file.name)) {
      reader.readAsDataURL(file)
      setErrorMessage('')
    } else {
      setErrorMessage('Requerido (tiene que ser .jpg o .png)')
    }
  }

  const validateFileExtension = (fileName) =>{
    if ( /(.jpg|.png)/i.test(fileName))
      return true
    return false
  }

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input 
        {...props}
        onChange={handleOnChange} 
      />
      {<span>{errorMessage}</span>}
    </>
  )
}