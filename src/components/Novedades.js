import React from 'react'
import News from './News/News'
import LastEvent from './News/LastEvent'
import Comments from './News/Detail/Comments'
import logoSomosMas from './logoSomosMas.png'
import logo from './logoSomosMas.png'
import HeaderPublic from './HeaderPublic'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FooterPublico from "./footer/FooterPublico";
import { useHistory } from "react-router";


const Novedades = () => {
    const history = useHistory()
    const token = localStorage.getItem('token')

    const logOut = () => {
        localStorage.removeItem("token")
        history.push("/")
    }

    const logout = <Button className="btn btn-primary btn-sm" onClick={logOut}>Cerrar Sesión</Button>
    const login = <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
    const register = <Link to="/register" className=" mx-3 btn btn-outline-primary btn-sm">Registrarse</Link>
    const backoffice = <Link to="/backoffice" className="btn btn-outline-danger btn-sm mx-3">Backoffice</Link>


    return (
        <div>
            <div className="header overflow-hidden bg-white shadow-sm">
                <img src={logo} alt='Logo somos más' className='h-100' />
                <HeaderPublic />
                {(token) && backoffice}
                {(token) ? logout : login}
                {(!token) && register}
            </div>
            <News />
            <LastEvent />
            <Comments />
            <div className="footer">
                <FooterPublico />
            </div>
        </div>
    )
}

export default Novedades
