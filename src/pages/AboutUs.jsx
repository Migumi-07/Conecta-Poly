import { useEffect, useRef } from "react";
import { FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";
import team from "../images/team.jpg";
import "../styles/AboutUs.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs() {
  // Refs para los elementos a animar
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar cada sección
    [heroRef, missionRef, teamRef, valuesRef].forEach((ref) => {
      if (ref.current) fadeInObserver.observe(ref.current);
    });

    // Observar cada tarjeta de misión
    cardRefs.current.forEach((card) => {
      if (card) fadeInObserver.observe(card);
    });

    return () => {
      fadeInObserver.disconnect();
    };
  }, []);

  // Función para agregar refs a las tarjetas
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <>
      <Header />
      <div className="about-us-container">
        {/* Hero Section */}
        <section className="about-hero" ref={heroRef}>
          <div className="hero-content">
            <h1 className="hero-title">Conoce Conecta Poly</h1>
            <p className="hero-subtitle">
              Conectando a la comunidad del Politécnico Jaime isaza Cadavid
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="mission-section" ref={missionRef}>
          <div className="section-content">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Nuestra Misión
            </h2>
            <div className="mission-cards">
              <div className="mission-card" ref={addToCardRefs}>
                <div className="card-icon">
                  <FaUsers className="icon" />
                </div>
                <h3>Conectar</h3>
                <p>
                  Crear puentes entre estudiantes y docentes del
                  Politécnico Jaime Isaza Cadavid
                </p>
              </div>
              <div className="mission-card" ref={addToCardRefs}>
                <div className="card-icon">
                  <FaLightbulb className="icon" />
                </div>
                <h3>Innovar</h3>
                <p>
                  Ofrecer soluciones tecnológicas para fortalecer nuestra
                  comunidad
                </p>
              </div>
              <div className="mission-card" ref={addToCardRefs}>
                <div className="card-icon">
                  <FaHandshake className="icon" />
                </div>
                <h3>Colaborar</h3>
                <p>
                  Fomentar oportunidades de crecimiento académico y personal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="team-section" ref={teamRef}>
          <div className="section-content">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Nuestro Equipo
            </h2>
            <div className="team-content">
              <div className="team-text">
                <p>
                  Somos un grupo multidisciplinario de estudiantes del Politécnico Jaime Isaza Cadavid que buscan crear herramientas que fortalezcan los
                  lazos dentro de nuestra comunidad.
                </p>
                <p>
                  Combinamos conocimientos en desarrollo web, diseño y
                  comunicación para hacer de Conecta Poly una plataforma útil
                  para todos.
                </p>
              </div>
              <div className="team-image">
                <img src={team} alt="Equipo Conecta Poly" />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="values-section" ref={valuesRef}>
          <div className="section-content">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Nuestros Valores
            </h2>
            <ul className="values-list">
              <li>
                <strong>Excelencia:</strong> Mantenemos los estándares de
                calidad del Politécnico Jaime Isaza Cadavid
              </li>
              <li>
                <strong>Innovación:</strong> Buscamos siempre mejorar y
                actualizar nuestra plataforma
              </li>
              <li>
                <strong>Comunidad:</strong> Priorizamos las necesidades de
                nuestros usuarios
              </li>
              <li>
                <strong>Transparencia:</strong> Operamos con honestidad y
                claridad
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
