import React from 'react';
import { useState, useEffect } from "react";
import { getOrganization } from '../../services/organizacion';
import { Link } from "react-router-dom";
import { GetContacto } from '../../services/contacto';
import './FooterPublico.css'
import { Col, Container, Row } from 'react-bootstrap';


const FooterPublico = () => {

    const ongValues = {
        name: '',
        image: '',
    }

    const [organization, setOrganization] = useState(ongValues);

    useEffect(() => {
        getOrganization().then(response => {
            setOrganization({
                name: response.data.name,
                image: response.data.logo,
            })
        })
    }, [])

    const socialMedia = GetContacto();

    return (
        <Container>
            <Row className='footerNavigationBar'>
                <Col md={2} xs={{ order: '2' }} lg={{ order: '1' }} >
                    <Link to="/" className='textNavBarFooter'>Inicio</Link>
                </Col>
                <Col md={2} xs={{ order: '3' }} lg={{ order: '2' }}>
                    <Link to="/nosotros" className='textNavBarFooter'>Nosotros</Link>
                </Col>
                <Col md={4} xs={{ order: '1' }} lg={{ order: '3' }}>
                    <Link to="/" className='textNavBarFooter'> <img src={organization.image} /></Link>
                </Col>
                <Col md={2} xs={{ order: '4' }} lg={{ order: '4' }} >
                    <Link to="/contacto" className='textNavBarFooter'>Contacto</Link>
                </Col>
                <Col md={2} xs={{ order: '5' }} lg={{ order: '5' }} >
                    <Link to="/novedades" className='textNavBarFooter'>Novedades</Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <hr className='footer-hr' />
                </Col>
            </Row>
            <Row>
                <Col xs={12} className='footerend'>
                    <ul className='footerSocialMedia'>
                        <li>
                            <a href={'https://' + socialMedia.facebook} target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-square" style={{ fontSize: '36px' }}></i></a>
                        </li>
                        <li>
                            <a href={'https://' + socialMedia.instagram} target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram-square" style={{ fontSize: '36px' }}></i></a>
                        </li>
                        <li>
                            <a href={'https://' + socialMedia.twitter} target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter-square" style={{ fontSize: '36px' }}></i></a>
                        </li>
                        <li>
                            <a href={'https://' + socialMedia.linkedin} target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin" style={{ fontSize: '36px' }}></i></a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}
export default FooterPublico;