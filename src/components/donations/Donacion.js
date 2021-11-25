import React, { useEffect } from 'react'
import Text from './Text'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import HeaderPublic from '../HeaderPublic';
import logo from '../logoSomosMas.png'
import FooterPublico from "../footer/FooterPublico";
import './donacion.css'


const Donacion = () => {
    const history = useHistory()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            history.push('/')
        }
    }, [token, history])

    const logOut = () => {
        localStorage.removeItem("token")
        history.push("/")
    }

    const logout = <Button className="btn btn-primary btn-sm" onClick={logOut}>Cerrar Sesión</Button>
    const login = <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
    const register = <Link to="/register" className=" mx-3 btn btn-outline-primary btn-sm">Registrarse</Link>
    const backoffice = <Link to="/backoffice" className="btn btn-outline-danger btn-sm mx-3">Backoffice</Link>

    return (
        <>
            <div className="header overflow-hidden bg-white shadow-sm">
                <img src={logo} alt='Logo somos más' className='h-100' />
                <HeaderPublic />
                {(token) && backoffice}
                {(token) ? logout : login}
                {(!token) && register}
            </div>
            <div className='text-center d-flex flex-column contenedor-gracias'>
                <h2 className="mt-5">Contribuye</h2>
                <Text text='Tu contribución ayudará a mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en el barrio La Cava, 
                    otorgando un cambio de rumbo en cada individuo a través de la educación, salud, trabajo, deporte, responsabilidad y compromiso.'
                />
                <div>
                    <Link to='/donar/gracias'><Button size='lg'>Donar</Button></Link>
                    <img src='https://img.icons8.com/color/50/000000/mercado-pago.png' alt='logo de mercado pago' />
                </div>
            </div>
            <div>
                <a
                    href="https://mpago.la/1vndVZF"
                    className="btn btn-primary"
                >
                    Donar
                </a>
                <img src='https://img.icons8.com/color/50/000000/mercado-pago.png' alt='logo de mercado pago' />
            </div>
            <div className="footer">
                <FooterPublico />
            </div>
        </>
    )
}

export default Donacion
