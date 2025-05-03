import { useEffect, useRef } from "react";
import newsImage1 from "../../images/news/cursos.jpg";
import newsImage2 from "../../images/news/evento.webp";
import newsImage3 from "../../images/news/becas.webp";
import newsImage4 from "../../images/news/arquitectura.webp";
import newsImage5 from "../../images/news/talleres.webp";
import newsImage6 from "../../images/news/conferencia.webp";
import "../../styles/Home/NewsGrid.css";

function NewsGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentCardsRef = cardsRef.current;
    const currentSubtitleRef = subtitleRef.current;

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

    if (currentSubtitleRef) observer.observe(currentSubtitleRef);
    if (currentSectionRef) observer.observe(currentSectionRef);

    currentCardsRef.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (currentSubtitleRef) observer.unobserve(currentSubtitleRef);
      if (currentSectionRef) observer.unobserve(currentSectionRef);
      currentCardsRef.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const secondaryNews = [
    {
      id: 1,
      title: "Nuevos Cursos Disponibles",
      category: "Educación",
      date: "15 Junio 2024",
      excerpt:
        "Explora nuestra nueva oferta académica para el próximo semestre",
      image: newsImage1,
    },
    {
      id: 2,
      title: "Evento de Bienvenida",
      category: "Eventos",
      date: "20 Junio 2024",
      excerpt:
        "Participa en nuestro evento de bienvenida para nuevos estudiantes",
      image: newsImage2,
    },
    {
      id: 3,
      title: "Convocatoria de Becas",
      category: "Educación",
      date: "25 Junio 2024",
      excerpt: "Nuevas becas disponibles para estudiantes destacados",
      image: newsImage3,
    },
    {
      id: 4,
      title: "Talleres de Verano",
      category: "Actividades",
      date: "1 Julio 2024",
      excerpt: "Inscríbete en nuestros talleres extracurriculares de verano",
      image: newsImage5,
    },
    {
      id: 5,
      title: "Renovación del gimnasio al aire libre",
      category: "Infraestructura",
      date: "5 Julio 2024",
      excerpt:
        "La membrana arquitectónica del gimnasio al aire libre y el domo del bloque P42 serán renovados",
      image: newsImage4,
    },
    {
      id: 6,
      title: "Conferencia Internacional",
      category: "Eventos",
      date: "10 Julio 2024",
      excerpt: "Prestigiosos académicos visitarán nuestro campus",
      image: newsImage6,
    },
  ];

  return (
    <section className="news-grid-section" ref={sectionRef}>
      <h3 className="section-subtitle" id="Noticias" ref={subtitleRef}>
        Más Noticias
      </h3>
      <div className="news-grid">
        {secondaryNews.map((news, index) => (
          <article
            key={news.id}
            className="news-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="news-image-container">
              <img src={news.image} alt={news.title} className="news-image" />
              <span className="news-category">{news.category}</span>
            </div>
            <div className="news-content">
              <h4 className="news-title">{news.title}</h4>
              <time className="news-date">{news.date}</time>
              <p className="news-excerpt">{news.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsGrid;
