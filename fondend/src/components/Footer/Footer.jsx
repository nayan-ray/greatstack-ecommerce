import React from 'react';
import './Footer.css';
import logo from '../assets/logo_big.png';
import instagram from '../assets/instagram_icon.png';
import pinster from '../assets/pintester_icon.png';
import whatsapp from '../assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
              <img src={logo} alt="" />
              <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
             <li>Company</li>
             <li>Products</li>
             <li>Offices</li>
             <li>About</li>
             <li>Contact</li>
        </ul>
         <div className="footer-social-icon">
              <div className="footer-icons-container">
                    <img src={instagram} alt="" />
              </div>
              <div className="footer-icons-container">
                    <img src={pinster} alt="" />
              </div>
              <div className="footer-icons-container">
                    <img src={whatsapp} alt="" />
              </div>
         </div>
         <div className="footer-copyright">
              <hr />
              <p>Copyright @ 2023 - All Right Reserved.</p>
         </div>
    </div>
  )
}

export default Footer
