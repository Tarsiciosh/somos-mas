import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import LogotipoCampaign from '../../src/LogotipoJuguetes.png'
import logoOng from '../../src/logoSomosMas.png'
import './HeaderToyCampaign.css'

export const HeaderToyCampaign = () => {
    return (
        <Navbar
            bg="ligth"
            variant="ligth"
            className="shadow d-flex justify-content-around header"
        >
            <Navbar.Brand href="#home">
                <img
                    alt="logo campaña escolar"
                    src={LogotipoCampaign}
                    width="70"
                    height="60"
                    className="ms-5 logo-campaign"
                />
            </Navbar.Brand>
            <Nav>
                <h2 className="slogan">Juguetes por más sonrisas</h2>
            </Nav>
            <Nav>
                <img
                    alt="logo campaña escolar"
                    src={logoOng}
                    width="70"
                    height="60"
                    className="me-5 logo-ong"
                />
            </Nav>
        </Navbar>
    )
}
