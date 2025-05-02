import newsImage1 from "../../images/news/compromiso.webp";
import "../../styles/NewsGrid.css";
function NewsGrid() {
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
      id: 1,
      title: "Nuevos Cursos Disponibles",
      category: "Educación",
      date: "15 Junio 2024",
      excerpt:
        "Explora nuestra nueva oferta académica para el próximo semestre",
      image: newsImage1,
    },
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
      id: 1,
      title: "Nuevos Cursos Disponibles",
      category: "Educación",
      date: "15 Junio 2024",
      excerpt:
        "Explora nuestra nueva oferta académica para el próximo semestre",
      image: newsImage1,
    },
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
      id: 1,
      title: "Nuevos Cursos Disponibles",
      category: "Educación",
      date: "15 Junio 2024",
      excerpt:
        "Explora nuestra nueva oferta académica para el próximo semestre",
      image: newsImage1,
    },
  ];

  return (
    <>
      <section className="news-grid-section">
        <h3 className="section-subtitle" id="Noticias">
          Más Noticias
        </h3>
        <div className="news-grid">
          {secondaryNews.map((news) => (
            <article key={news.id} className="news-card">
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
    </>
  );
}

export default NewsGrid;
