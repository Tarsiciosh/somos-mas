import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { GetContacto } from "../../services/contacto";
import FooterPublico from "../footer/FooterPublico";
import HeaderPublic from "../HeaderPublic";
import Title from "../Title";
import ContactForm from "./ContactForm";
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import logo from '../assets/logoSomosMas.png'

import './contacto.css'
import OngMap from "./OngMap";

const Contacto = () => {
    const socialMedia = GetContacto();

    const { facebook, instagram, linkedin, twitter } = socialMedia;

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
        <>
            <div className="header overflow-hidden bg-white shadow-sm">
                <img src={logo} alt='Logo somos más' className='h-100' />
                <HeaderPublic />
                {(token) && backoffice}
                {(token) ? logout : login}
                {(!token) && register}
            </div>
            <div style={{ margin: 0, padding: 0, width: '100%' }}>
                <Container>
                    <Row>
                        <Title titleName="Contacto" />
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <ContactForm />
                        </Col>
                        <Col xs={12} md={6}>
                            <section className='redes'>
                                <article className='articulo'>

                                    <a href={'https://' + facebook} target="_blank" rel="noopener noreferrer" title='Facebook'>
                                        <i className="fab fa-facebook-square" alt='Facebook'></i>
                                    </a>
                                </article>
                                <article className='articulo'>

                                    <a href={'https://' + instagram} target="_blank" rel="noopener noreferrer" title='Instagram'>
                                        <i class="fab fa-instagram-square"></i>
                                    </a>
                                </article>
                                <article className='articulo'>

                                    <a href={'https://' + twitter} target="_blank" rel="noopener noreferrer" title='Twitter'>
                                        <i class="fab fa-twitter-square"></i>
                                    </a>
                                </article>
                                <article className='articulo'>

                                    <a href={'https://' + linkedin} target="_blank" rel="noopener noreferrer" title='Linkedin'>
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </article>
                            </section>

                            <OngMap />
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className="footer">
                <FooterPublico />
            </div>
        </>
    )
}
export default Contacto;