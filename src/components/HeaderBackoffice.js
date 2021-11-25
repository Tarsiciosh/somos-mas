import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'

const HeaderBackoffice = ({headerClass,handleToggle,classToggle}) => {
    return (
        <Navbar className={headerClass} id='header'>
                <Button id='header-toggle' onClick={()=>handleToggle() }>
                    <FontAwesomeIcon icon={classToggle ? faTimes : faBars}/>
                </Button>
                <h1 className='text-center'>Somos Más</h1>
        </Navbar>
    )
}

export default HeaderBackoffice
