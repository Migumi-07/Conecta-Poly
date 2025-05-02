import { useEffect, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../../styles/Home/ContactSection.css";

function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentTitleRef = titleRef.current;
    const currentCardsRef = cardsRef.current;

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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (currentSectionRef) observer.observe(currentSectionRef);
    if (currentTitleRef) observer.observe(currentTitleRef);
    currentCardsRef.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
      if (currentTitleRef) observer.unobserve(currentTitleRef);
      currentCardsRef.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className="contact-section" id="Contact" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="contact-title" ref={titleRef}>Contáctanos</h2>

        <div className="contact-grid">
          <div 
            className="contact-card" 
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <FaEnvelope className="contact-icon" />
            <h3>Correo</h3>
            <a href="mailto:conectapoly@gmail.com">conectapoly@gmail.com</a>
          </div>

          <div 
            className="contact-card" 
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <FaPhone className="contact-icon" />
            <h3>Teléfono</h3>
            <a href="tel:+1234567890">+57 300 712 46 70</a>
          </div>

          <div 
            className="contact-card" 
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Ubicación</h3>
            <p>Carrera 48 No. 7-151, El Poblado - Antioquia</p>
          </div>

          <div 
            className="contact-card" 
            ref={(el) => (cardsRef.current[3] = el)}
          >
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