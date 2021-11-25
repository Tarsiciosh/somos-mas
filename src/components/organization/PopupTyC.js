import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DocumentOng from './Document';
//import './Popup.css'

const PopupTyC = () => {

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    isOpen &&
    <Popup trigger={<a href="#" className='popup'> términos y condiciones</a>} modal>
      <span><DocumentOng /></span>
      <button className="button" onClick={() => { setIsOpen(false) }}>close</button>
    </Popup>

  );

}
export default PopupTyC;


