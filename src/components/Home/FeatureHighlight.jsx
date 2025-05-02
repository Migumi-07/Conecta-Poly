import { useEffect, useRef } from "react";
import featureImage from "../../images/card2.jpg";
import "../../styles/FeatureHighlight.css";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

function FeatureHighlight() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    
    const currentSectionRef = sectionRef.current;
    const currentContainerRef = containerRef.current;
    const currentContentRef = contentRef.current;
    const currentImageRef = imageRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentSectionRef) observer.observe(currentSectionRef);
    if (currentContainerRef) observer.observe(currentContainerRef);
    if (currentContentRef) observer.observe(currentContentRef);
    if (currentImageRef) observer.observe(currentImageRef);

    return () => {
     
      if (currentSectionRef) observer.unobserve(currentSectionRef);
      if (currentContainerRef) observer.unobserve(currentContainerRef);
      if (currentContentRef) observer.unobserve(currentContentRef);
      if (currentImageRef) observer.unobserve(currentImageRef);
    };
  }, []); 

  return (
    <section 
      className="feature-highlight-section" 
      id="EventoDestacado"
      ref={sectionRef}
    >
      <div className="feature-highlight-container" ref={containerRef}>
        <div className="feature-content" ref={contentRef}>
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
        <div className="feature-image-container" ref={imageRef}>
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