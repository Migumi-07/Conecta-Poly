import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-title">Conecta Poly</h3>
          <p className="footer-slogan">Conectando la comunidad politécnica</p>
          <div className="footer-contact">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:conectapoly@gmail.com" className="footer-email">
              conectapoly@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-system">
          <h4 className="system-title">Sobre Nosotros</h4>
          <div className="system-items">
            <a href="." className="social-link">
              <FaUsers className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-social">
          <h4 className="social-title">Síguenos</h4>
          <div className="social-links">
            <a href="." className="social-link" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="." className="social-link" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="." className="social-link" aria-label="Twitter/X">
              <FaTwitter className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Conecta Poly. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
