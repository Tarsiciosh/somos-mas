import React, { useState } from 'react'
import News from '../News/News'
import Slider from './Slider'
import { useEffect } from 'react'
import { getHomeApi } from '../../services/homeRequests'
import Contacto from '../contact/Contacto'
import { GetContacto } from '../../services/contacto'
import ContactForm from '../contact/ContactForm'
import SpinnerOng from '../SpinnerOng'
import { alert } from '../../services/alert'
import './home.css'
import { Layout } from '../layout/Layout'
import { useHistory } from 'react-router'

const Index = ({ id = "1" }) => {
  const [home, setHome] = useState({})
  const [isLoading, setLoad] = useState(true)
  const socialMedia = GetContacto()

  const history = useHistory()
  const token = localStorage.getItem('token')



  const setInitialValues = (id) => {
    if (id) {
      try {
        getHomeApi(id)
          .then(response => {
            setHome(response.data.data)
            setLoad(false)
          })
      } catch (error) {
        console.log("error:", error)
        alert('Error 404', 'Error al cargar la página de inicio, vuelva a intentarlo', 'error', 'Ok')
      }
    } else {
      setLoad(false)
    }
  }

  useEffect(() => {
    setInitialValues(id)

  }, [id])

  const logOut = () => {
    localStorage.removeItem("token")
    history.push("/")
  }

  return (
    <>
      <Layout logOut={logOut} token={token}>
        {isLoading ? <SpinnerOng />
          :
          <div className='d-flex justify-content-center'>
            <div className='contenedor-home'>
              <Slider />
              <div className="d-flex flex-wrap">
                <News />
              </div>
              <ContactForm />
            </div>
          </div>
        }
      </Layout>
    </>
  )
}

export default Index
