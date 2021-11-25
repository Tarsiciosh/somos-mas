import React, { useState } from 'react'
import { useField } from "formik";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const CKEditorTextInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const [editor, setEditor] = useState()

  const { value } = meta
  const { setValue } = helpers

  return (
    <>
      <label htmlFor={props.name}>{label}</label> 
      <CKEditor
        {...field}
        editor={ ClassicEditor }
        data={ value }
        onReady={ editor => {
          setEditor(editor)
          const data = editor.getData()
          setValue(data)
        }}   
        onChange={()=>{
          const data = editor.getData()
          setValue(data)          
        }}
        onBlur={(event,editor) => {
          //console.log( 'Blur', editor)
        }}
        onFocus={(event,editor)=>{
          //console.log('Focus', editor)
        }}     
      />
    </>
  )
}