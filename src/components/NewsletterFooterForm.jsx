import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const NewsletterFooterForm = () => {
  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState({
    state: false,
    email: ''
  })

  useEffect(() => {

    // Retrieving subscription state and mail from localStorage (false && '' if not found)
    const isSubscribed = (localStorage.getItem('subscribedToNewsletter')) ? JSON.parse(localStorage.getItem('subscribedToNewsletter')) : false
    const mailSubscribed = (isSubscribed && localStorage.getItem('mailSubscribedToNewsletter') !== '') ? localStorage.getItem('mailSubscribedToNewsletter') : ''

    // Changing the state as far as we get "valid" information from localStorage
    if (isSubscribed && mailSubscribed !== '') {
      setSubscribedToNewsletter({
        state: isSubscribed,
        email: mailSubscribed
      })
    } else {
      // Otherwise, preventively deleting both from LS
      localStorage.removeItem("subscribedToNewsletter")
      localStorage.removeItem("mailSubscribedToNewsletter")
    }
  }, [])

  return (
    <footer>
      {
        // Show the form only when user is not already subscribed
        subscribedToNewsletter.state && subscribedToNewsletter.email !== ''
          ? <p>Ya estas suscrito al newsletter con {subscribedToNewsletter.email}!</p>
          : <Formik
            initialValues={{ newsletterEmail: '' }}

            validate={(values) => {
              let errors = {}

              // Small regex for email validation
              const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

              // Newsletter Email validation, also checking our subscribe state
              if (subscribedToNewsletter.state && subscribedToNewsletter.email !== '') {
                errors.newsletterEmail = `Ya estas suscrito con mail ${subscribedToNewsletter.email}`
              } else if (!values.newsletterEmail) {
                errors.newsletterEmail = 'Ingrese su email para suscribirse'
              } else if (!validEmail.test(values.newsletterEmail)) {
                errors.newsletterEmail = 'Ingrese un mail valido'
              }
              return errors
            }}

            onSubmit={(values, { resetForm }) => {
              setSubscribedToNewsletter({
                state: true,
                email: values.newsletterEmail
              })
              localStorage.setItem("subscribedToNewsletter", true)
              localStorage.setItem("mailSubscribedToNewsletter", values.newsletterEmail)
              resetForm()
            }}
          >

            {({ errors }) => (
              <Form>
                <fieldset>
                  <legend>Suscribite y segui las novedades</legend>

                  <div className="form-group">
                    <label htmlFor='newsletterEmail'>Tu email</label>
                    <Field
                      name='newsletterEmail'
                      id='newsletterEmail'
                      type='email'
                      placeholder='Ingresa tu mail para suscribirte'
                      disabled={subscribedToNewsletter.state || false}
                      required
                    />

                    {
                      // Messages on subscription/error
                      subscribedToNewsletter.state && subscribedToNewsletter.email !== ''
                        ? <p>Ya estas suscrito al newsletter con {subscribedToNewsletter.email}!</p>
                        : errors.newsletterEmail
                          ? < ErrorMessage name='newsletterEmail' component={() => (<p>{errors.newsletterEmail}</p>)} />
                          : null
                    }

                  </div>

                  <button type='submit' disabled={subscribedToNewsletter.state || false}>Suscribirte</button>

                </fieldset>
              </Form>
            )}

          </Formik>
      }
    </footer>
  )
}

export default NewsletterFooterForm