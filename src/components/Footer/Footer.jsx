import React from "react";
import { Link } from "react-router";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/help">Centro de ayuda</Link></li>
            <li><Link to="/politica">Política de privacidad</Link></li>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li>Email: <a href="mailto:contacto@gorrasx.com">contacto@gorrasx.com</a></li>
            <li>Teléfono: +598 1234 5678</li>
            <li>Montevideo, Uruguay</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Seguinos</h4>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GorrasX. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
