import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../../styles/ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="Contact">
      <div className="contact-container">
        <h2 className="contact-title">Contáctanos</h2>

        <div className="contact-grid">
      
          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <h3>Correo</h3>
            <a href="mailto:conectapoly@gmail.com">conectapoly@gmail.com</a>
          </div>

          <div className="contact-card">
            <FaPhone className="contact-icon" />
            <h3>Teléfono</h3>
            <a href="tel:+1234567890">+57 300 712 46 70</a>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Ubicación</h3>
            <p>Carrera 48 No. 7-151, El Poblado - Antioquia</p>
          </div>

          <div className="contact-card">
            <FaClock className="contact-icon" />
            <h3>Horario</h3>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
