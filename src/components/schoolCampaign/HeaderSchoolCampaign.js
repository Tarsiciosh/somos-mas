import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import schoolCampaning from '../../logo-escolar.png'
import logoOng from '../../logoSomosMas.png'
import './HeaderSchoolCampaign.css'

export const HeaderSchoolCampaign = () => {
    return (
        <Navbar
            bg="ligth"
            variant="ligth"
            className="shadow d-flex justify-content-around header"
        >
            <Navbar.Brand href="#home">
                <img
                    alt="logo campaña escolar"
                    src={schoolCampaning}
                    width="70"
                    height="60"
                    className="ms-5 logo-campaign"
                />
            </Navbar.Brand>
            <Nav>
                <h2 className="slogan">Juntos en la vuelta al cole</h2>
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
