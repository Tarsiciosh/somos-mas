import React from 'react';
import { Formik } from 'formik';
import { sendContact } from '../../services/contacts'


const FormularioDeContacto = () => (

  <div>
    <Formik

      initialValues={{
        name: "",
        email: "",
        phone: "",
        message: ""
      }}

      validate={(valores) => {
        let errores = {};

        if (!valores.name || valores.name.trim().length === 0) {
          errores.name = 'por favor ingresa un nombre'
        } else if (!/^[a-zA-Z0-9ñÑöÖüÜáéíóúÁÉÍÓÚ ]{4,}$/.test(valores.name)) {
          errores.name = 'por favor ingresa un nombre válido'
        }

        if (!valores.email) {
          errores.email = 'por favor ingresa un correo'
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
          errores.email = 'por favor ingresa un correo válido'
        }

        if (!valores.phone) {
          errores.phone = 'por favor ingresa un número de teléfono'
        } else if (!/^[0-9 -]{8,20}$/.test(valores.phone)) {
          errores.phone = 'el teléfono debe tener 8 caracteres como mínimo'
        }

        if (!valores.message || valores.message.trim().length === 0) {
          errores.message = 'por favor ingresa un mensaje'
        } else if (valores.message.length < 10) {
          errores.message = 'el mensaje debe tener más de 10 caracteres'
        } else if (valores.message.length > 255) {
          errores.message = 'el mensaje debe tener menos de 256 caracteres'
        }

        return errores;
      }}

      onSubmit={async (valores, { resetForm }) => {

        const contacto = await sendContact(valores);

        if (contacto && contacto.success) {
          resetForm({
            name: "",
            email: "",
            phone: "",
            message: ""
          })
        }
      }}

    >

      {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (

        <form onSubmit={handleSubmit}>
          <h4>Contactate con nosotros</h4>
          <input
            type="text"
            className="form-control"
            name="name"
            value={values.name}
            placeholder="Nombre"
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            onChange={handleChange}
            onBlur={handleBlur} />
          <div>
            {touched.name && errors.name && <div className="error alert alert-warning p-1 m-0">{errors.name}</div>}
          </div>
          <input
            type="text"
            className="form-control"
            name="email"
            value={values.email}
            placeholder="email"
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            onChange={handleChange}
            onBlur={handleBlur} />
          <div>
            {touched.email && errors.email && <div className="error alert alert-warning p-1 m-0">{errors.email}</div>}
          </div>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={values.phone}
            placeholder="phone"
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            onChange={handleChange}
            onBlur={handleBlur} />
          <div>
            {touched.phone && errors.phone && <div className="error alert alert-warning p-1 m-0">{errors.phone}</div>}
          </div>
          <textarea
            type="text"
            className="form-control"
            name="message"
            value={values.message}
            rows="3"
            placeholder="Escribe tu consulta aquí"
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            onChange={handleChange}
            onBlur={handleBlur} />
          <div>
            {touched.message && errors.message && <div className="error alert alert-warning p-1 m-0">{errors.message}</div>}
          </div>
          <div className="d-grid gap-2">
            <button className="w-100 btn btn-lg btn-primary mb-1" type="button" onClick={handleSubmit} >Enviar</button>
          </div>
        </form>

      )}
    </Formik>
  </div>
);
export default FormularioDeContacto