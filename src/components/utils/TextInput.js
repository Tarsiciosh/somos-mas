import React from 'react'
import { useField } from "formik";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props}/>
      {meta.touched && meta.error ? (
        <span>{meta.error}</span>
      ): null}
    </>
  )
}