import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBackoffice from '../HeaderBackoffice';
import './SidebarBackoffice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTh,
  faNewspaper,
  faWalking,
  faAlignLeft,
  faComments,
  faUsers,
  faWindowRestore,
  faHouseUser,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

const sections = [
  {
    name: '',
    icon: faTh,
    title: 'Backoffice'
  },
  {
    name: '/news',
    icon: faNewspaper,
    title: 'Novedades',
  },
  {
    name: '/activities',
    icon: faWalking,
    title: 'Actividades',
  },
  {
    name: '/categories',
    icon: faAlignLeft,
    title: 'Categorías',
  },
  {
    name: '/testimonials',
    icon: faComments,
    title: 'Testimonios',
  },
  {
    name: '/home',
    icon: faHouseUser,
    title: 'Home',
  },
  {
    name: '/slides',
    icon: faWindowRestore,
    title: 'Slides',
  },
  {
    name: '/users',
    icon: faUsers,
    title: 'Usuarios',
  },
  {
    name: '/members',
    icon: faAddressCard,
    title: 'Miembros',
  },
];

export default function SidebarBackoffice({ classToggle, handleToggle }) {
  let navClass = classToggle ? 'l-navbar show' : 'l-navbar';
  let headerClass = classToggle
    ? 'header body-pd bg-white shadow-sm py-4'
    : 'header bg-white shadow-sm py-4';

  return (
    <>
      <HeaderBackoffice
        headerClass={headerClass}
        handleToggle={handleToggle}
        classToggle={classToggle}
      />
      <div className={navClass} id='nav-bar'>
        <nav className='nav'>
          <div>
            <div className='nav_list'>
              {sections?.map((section) => (
                <Link
                  to={`/backoffice${section.name}`}
                  className='nav_link'
                  key={section.title}
                >
                  <FontAwesomeIcon icon={section.icon} className={`nav_icon`} />
                  <span className='nav_name'>{section.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
