import React from 'react';
import './FooterToyCampaign.css';
import logo from '../LogotipoJuguetes.png';
import { Link } from 'react-router-dom';
export default function FooterCampañaEscolar() {
  return (
    <footer className='footer py-4'>
      <div className='logoFooterContainer'>
        <img src={logo} alt='LOGO CAMPAÑA ESCOLAR' />
      </div>
      <div className='d-none d-sm-block'>
        <Link to='/' className='text-muted toWeb'>
          Somos Más
        </Link>
      </div>
      <div className='d-none d-xxl-block text-muted'>
        <h6>Otras campañas</h6>
        <Link to='/' className='LinksCampañas'>
          Juntos en la vuelta al cole
        </Link>
        <br />
        <Link to='/' className='LinksCampañas'>
          Juguetes por más sonrisas
        </Link>
      </div>
      <div className='SocialMediaContainer'>
        <div>
          <a href='https://www.linkedin.com/company/somosmas/' target='_BLANK'>
            <i className='fab fa-linkedin'></i>
            <span className='d-none d-md-inline'>Linkedin</span>
          </a>
        </div>
        <div>
          <a href='https://www.instagram.com/SomosM%C3%A1s' target='_BLANK'>
            <i className='fab fa-instagram'></i>
            <span className='d-none d-md-inline'>Instagram</span>
          </a>
        </div>
        <div>
          <a href='https://twitter.com/somosmas' target='_BLANK'>
            <i className='fab fa-twitter-square'></i>
            <span className='d-none d-md-inline'>Twitter</span>
          </a>
        </div>
        <div>
          <a href='https://www.facebook.com/Somos_M%C3%A1ss' target='_BLANK'>
            <i className='fab fa-facebook-square'></i>
            <span className='d-none d-md-inline'>Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
