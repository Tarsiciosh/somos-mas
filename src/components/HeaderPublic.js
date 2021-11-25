import React from 'react'
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import './headerPublic.css'
const HeaderPublic = (props) => {

    const menu = [
        {
            name: 'Inicio',
            link: '/'
        },
        {
            name: 'Nosotros',
            link: '/nosotros'
        },
        {
            name: 'Contacto',
            link: '/contacto'
        },
        {
            name: 'Novedades',
            link: '/novedades'
        },
        {
            name: 'Campañas',
            link: '/campañas'
        },
        {
            name: 'Donaciones',
            link: '/donar'
        }
    ]
    const cambiarRuta = (link) => {
        props.history.push(`${link}`)
    }

    return (
        <header className='headerPublic container d-flex justify-content-around align-items-center'>
            <Router>
                {menu.map(item => (
                    <NavLink
                        to={item.link}
                        key={item.name}
                        style={{ color: '#004182' }}
                        activeClassName='active'
                        onClick={() => cambiarRuta(item.link)}
                        exact
                    >
                        {item.name}
                    </NavLink>
                ))}
            </Router>
        </header>
    )
}

export default withRouter(HeaderPublic)
