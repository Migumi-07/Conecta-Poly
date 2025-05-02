import featureImage from "../../images/card2.jpg";
import "../../styles/FeatureHighlight.css";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

function FeatureHighlight() {
  return (
    <section className="feature-highlight-section" id="EventoDestacado">
      <div className="feature-highlight-container">
        <div className="feature-content">
          <span className="feature-badge">DESTACADO</span>
          <h3 className="feature-title">Evento Exclusivo para Developers</h3>
          <p className="feature-text">
            Participa en nuestro workshop de IA el próximo 25 de Julio con
            expertos de NVIDIA. Aprende las últimas técnicas en modelos de deep
            learning.
          </p>
          <div className="feature-details">
            <div className="feature-detail-item">
              <FaCalendarAlt className="feature-icon" />
              <span>25 Julio 2025</span>
            </div>
            <div className="feature-detail-item">
              <FaClock className="feature-icon" />
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="feature-detail-item">
              <FaMapMarkerAlt className="feature-icon" />
              <span>Auditorio Principal</span>
            </div>
          </div>
          <button className="feature-button">
            Registrarse Ahora <FaArrowRight className="button-icon" />
          </button>
        </div>
        <div className="feature-image-container">
          <img
            src={featureImage}
            alt="Evento destacado"
            className="feature-image"
          />
          <div className="feature-image-overlay"></div>
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlight;
