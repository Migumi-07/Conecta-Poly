import { useState } from "react";
import { FaUser, FaHeart, FaTimes, FaInfoCircle } from "react-icons/fa";
import "../../styles/Discover/PeopleCards.css";
import profile1 from "../../images/ProfilePictures/profile1.jpg";
import profile2 from "../../images/ProfilePictures/profile2.jpg";
import profile3 from "../../images/ProfilePictures/profile3.jpeg";
import profile4 from "../../images/ProfilePictures/profile4.jpeg";
function PeopleCardsGrid() {
  const people = [
    {
      id: 1,
      name: "Ana López",
      age: 22,
      role: "Estudiante de Ingeniería",
      image: profile1,
      shortDesc: "Apasionada por la inteligencia artificial y redes neuronales",
      longDesc:
        "Estudiante de último año en Ingeniería en Computación. Participante activa en hackathones de Roblox. Busco colaborar en proyectos innovadores que combinen IA y robótica.",
      interests: ["IA", "Robótica", "Python", "OpenCV"],
    },
    {
      id: 2,
      name: "Carlos Méndez",
      age: 24,
      role: "Estudiante de audiovisuales",
      image: profile2,
      shortDesc: "Especialista en Tiktoks",
      longDesc:
        "Soy capucho del poli y me gusta hacer tiktoks, no hay mucho que pueda decir",
      interests: ["Marketing", "Startups", "Data Analytics", "Tiktok"],
    },
    {
      id: 3,
      name: "Travieso Scott",
      age: 22,
      role: "Estudiante de música",
      image: profile3,
      shortDesc: "Todo un travieso",
      longDesc:
        "Soy rapero de santo domingo y me gustan mucho los cantores del chipuco",
      interests: ["Música", "Rap", "ParalytikoZ", "Soundcloud"],
    },
    {
      id: 4,
      name: "Downiel Gonzalez",
      age: 18,
      role: "Estudiante de efectos especiales",
      image: profile4,
      shortDesc: "Soy un poco especial",
      longDesc:
        "En la casa me dicen que soy muy especial, no entiendo el porqué pero eso dicen",
      interests: ["Pokemon", "Digimon", "Hombres", "Efectos"],
    },
    {
      id: 5,
      name: "María Fernández",
      age: 23,
      role: "Diseñadora Gráfica",
      image: profile1,
      shortDesc: "Especialista en diseño UX/UI",
      longDesc: "Apasionada por crear interfaces intuitivas y hermosas.",
      interests: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
    },
    {
      id: 6,
      name: "Juan Pérez",
      age: 25,
      role: "Desarrollador Full Stack",
      image: profile2,
      shortDesc: "Experto en React y Node.js",
      longDesc: "Me encanta crear aplicaciones web completas desde cero.",
      interests: ["JavaScript", "React", "Node.js", "MongoDB"],
    },
  ];

  const [selectedPerson, setSelectedPerson] = useState(null);

  const openDetails = (person) => {
    setSelectedPerson(person);
  };

  const closeDetails = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="people-grid-container">
      <div className="top-pink-section">
        <div className="content-wrapper">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Conoce a tus Compañeros
            <span className="title-decoration"></span>
          </h2>
        </div>
      </div>

      {/* Parte inferior con fondo blanco */}
      <div className="bottom-white-section">
        <div className="content-wrapper">
          <div className="people-grid">
            {people.map((person) => (
              <div key={person.id} className="people-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${person.image})` }}
                >
                  <div className="card-overlay">
                    <h3>
                      {person.name}, {person.age}
                    </h3>
                    <p>{person.shortDesc}</p>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => openDetails(person)}
                  >
                    <FaInfoCircle /> Ver más
                  </button>
                </div>
                <div className="card-footer">
                  <button className="action-button dislike">
                    <FaTimes />
                  </button>
                  <span className="role-badge">
                    <FaUser /> {person.role}
                  </span>
                  <button className="action-button like">
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedPerson && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeDetails}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <div
                className="modal-image"
                style={{ backgroundImage: `url(${selectedPerson.image})` }}
              ></div>
              <div className="modal-title">
                <h3>
                  {selectedPerson.name}, {selectedPerson.age}
                </h3>
                <p>{selectedPerson.role}</p>
              </div>
            </div>

            <div className="modal-body">
              <h4>Sobre mí</h4>
              <p>{selectedPerson.longDesc}</p>

              <h4>Intereses</h4>
              <div className="interests-container">
                {selectedPerson.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="nvidia-button"
                onClick={() => {
                  closeDetails();
                }}
              >
                <FaHeart /> Conectar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeopleCardsGrid;
