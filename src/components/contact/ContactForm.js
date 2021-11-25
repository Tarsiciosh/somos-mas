import React from 'react';
import { Formik } from 'formik';
import { postContact } from '../../services/contacts'
import { alert } from '../../services/alert';
import GoogleMap from './GoogleMap';
import { latlon } from './GoogleMap';

const ContactForm = () => (

  <div className='contenedor-form-contact'>

    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          message: "",
        }}

        validate={(valores) => {
          let errores = {};

          if (!valores.name || valores.name.trim().length === 0) {
            errores.name = 'Por favor ingresa un nombre'
          } else if (!/^[a-zA-Z0-9ñÑöÖüÜáéíóúÁÉÍÓÚ ]{4,}$/.test(valores.name)) {
            errores.name = 'Por favor ingresa un nombre válido'
          }

          if (!valores.email) {
            errores.email = 'Por favor ingresa un correo'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
            errores.email = 'Por favor ingresa un correo válido'
          }

          if (!valores.phone) {
            errores.phone = 'Por favor ingresa un número de teléfono'
          } else if (!/^[0-9 -]{8,20}$/.test(valores.phone)) {
            errores.phone = 'El teléfono debe tener 8 caracteres como mínimo'
          }

          if (!valores.message || valores.message.trim().length === 0) {
            errores.message = 'Por favor ingresa un mensaje'
          } else if (valores.message.length < 10) {
            errores.message = 'El mensaje debe tener más de 10 caracteres'
          } else if (valores.message.length > 255) {
            errores.message = 'El mensaje debe tener menos de 256 caracteres'
          }

          return errores;
        }}

        onSubmit={async (valores, { resetForm }) => {
          console.log(latlon)
          const contacto = await postContact(valores);
          console.log(contacto)
          try {
            if (contacto) {
              resetForm({
                name: "",
                email: "",
                phone: "",
                message: "",
              })
            }
          } catch (error) {
            alert("Error", "Se produjo un error", "error", "Salir")
            console.log(error)
          }
        }}

      >

        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (

          <form onSubmit={handleSubmit}>
            <h4 className='title-contact'>Contactate con nosotros</h4>
            <input
              type="text"
              className="form-control input-map"
              name="name"
              value={values.name}
              placeholder="Nombre"
              aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
              onBlur={handleBlur} />
            <div>
              {touched.name && errors.name && <div className="alert alert-danger">{errors.name}</div>}
            </div>
            <input
              type="text"
              className="form-control input-map"
              name="email"
              value={values.email}
              placeholder="email"
              aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
              onBlur={handleBlur} />
            <div>
              {touched.email && errors.email && <div className="alert alert-danger">{errors.email}</div>}
            </div>
            <input
              type="text"
              className="form-control input-map"
              name="phone"
              value={values.phone}
              placeholder="phone"
              aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
              onBlur={handleBlur} />
            <div>
              {touched.phone && errors.phone && <div className="alert alert-danger">{errors.phone}</div>}
            </div>
            <textarea
              type="text"
              className="form-control input-map"
              name="message"
              value={values.message}
              rows="3"
              placeholder="Escribe tu consulta aquí"
              aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
              onBlur={handleBlur} />
            <div>
              {touched.message && errors.message && <div className="alert alert-danger">{errors.message}</div>}
            </div>
            <div className="d-grid gap-2">
              <button className="btn-contact" type="button" onClick={handleSubmit} >Enviar</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
    {/* <div className='d-flex col-5'>
      <GoogleMap/>
    </div> */}
  </div>
);
export default ContactForm