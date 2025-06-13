import { useState } from "react";
import { FaUsers, FaUserPlus, FaTimes, FaInfoCircle, FaCheck } from "react-icons/fa";
import "../../styles/Groups/Groups.css";
import mathImage from "../../images/Groups/math.jpg";
import literatureImage from "../../images/Groups/literature.jpg";
import programmingImage from "../../images/Groups/programming.jpg";
import designImage from "../../images/Groups/design.jpg";
import musicImage from "../../images/Groups/music.jpg";

function GroupCardsGrid() {
  const groups = [
    {
      id: 1,
      name: "Matemáticas Avanzadas",
      course: "MAT-402",
      members: 24,
      image: mathImage,
      shortDesc: "Grupo de estudio para cálculo multivariable",
      longDesc:
        "Este grupo está enfocado en ayudar a estudiantes de ingeniería con los conceptos más complejos de cálculo multivariable y álgebra lineal. Organizamos sesiones semanales de estudio y resolución de problemas.",
      interests: ["Matemáticas", "Cálculo", "Álgebra", "Ingeniería"],
    },
    {
      id: 2,
      name: "Literatura Contemporánea",
      course: "LET-305",
      members: 18,
      image: literatureImage,
      shortDesc: "Análisis de obras literarias modernas",
      longDesc:
        "Grupo de discusión sobre literatura contemporánea. Leemos y analizamos obras de autores modernos, con énfasis en técnicas narrativas y contexto histórico.",
      interests: ["Literatura", "Escritura", "Crítica", "Libros"],
    },
    {
      id: 3,
      name: "Programación Competitiva",
      course: "INF-410",
      members: 32,
      image: programmingImage,
      shortDesc: "Prepárate para competencias de programación",
      longDesc:
        "Nos enfocamos en resolver problemas algorítmicos complejos y prepararnos para competencias como ICPC y Google Code Jam. Sesiones de entrenamiento semanales con problemas desafiantes.",
      interests: ["Algoritmos", "Python", "C++", "Competencias"],
    },
    {
      id: 4,
      name: "Diseño UX/UI",
      course: "DIS-201",
      members: 15,
      image: designImage,
      shortDesc: "Para amantes del diseño de interfaces",
      longDesc:
        "Exploramos las últimas tendencias en diseño de interfaces de usuario y experiencia de usuario. Compartimos recursos, hacemos críticas de diseño y colaboramos en proyectos.",
      interests: ["Figma", "Adobe XD", "Prototipado", "Research"],
    },
    {
      id: 5,
      name: "Producción Musical",
      course: "MUS-105",
      members: 12,
      image: musicImage,
      shortDesc: "Creación y producción de música digital",
      longDesc:
        "Aprende sobre producción musical, mezcla y masterización. Colaboramos en proyectos musicales y compartimos conocimientos sobre DAWs como Ableton y FL Studio.",
      interests: ["Ableton", "FL Studio", "Composición", "Sonido"],
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([]);

  const openDetails = (group) => {
    setSelectedGroup(group);
  };

  const closeDetails = () => {
    setSelectedGroup(null);
  };

  const toggleJoinGroup = (groupId) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  return (
    <div className="people-grid-container">
      <div className="top-pink-section">
        <div className="content-wrapper">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Explora Grupos de Estudio
            <span className="title-decoration"></span>
          </h2>
        </div>
      </div>

      {/* Parte inferior con fondo blanco */}
      <div className="bottom-white-section">
        <div className="content-wrapper">
          <div className="people-grid">
            {groups.map((group) => (
              <div key={group.id} className="people-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${group.image})` }}
                >
                  <div className="card-overlay">
                    <h3>{group.name}</h3>
                    <p>{group.shortDesc}</p>
                    <div className="group-meta">
                      <span><FaUsers /> {group.members} miembros</span>
                      <span>{group.course}</span>
                    </div>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => openDetails(group)}
                  >
                    <FaInfoCircle /> Ver más
                  </button>
                </div>
                <div className="card-footer">
                  <button 
                    className={`action-button ${joinedGroups.includes(group.id) ? 'joined' : 'join'}`}
                    onClick={() => toggleJoinGroup(group.id)}
                  >
                    {joinedGroups.includes(group.id) ? <FaCheck /> : <FaUserPlus />}
                  </button>
                  <span className="role-badge">
                    {group.course}
                  </span>
                  <div className="members-count">
                    <FaUsers /> {group.members}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedGroup && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeDetails}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <div
                className="modal-image"
                style={{ backgroundImage: `url(${selectedGroup.image})` }}
              ></div>
              <div className="modal-title">
                <h3>{selectedGroup.name}</h3>
                <p>{selectedGroup.course} • {selectedGroup.members} miembros</p>
              </div>
            </div>

            <div className="modal-body">
              <h4>Descripción</h4>
              <p>{selectedGroup.longDesc}</p>

              <h4>Intereses</h4>
              <div className="interests-container">
                {selectedGroup.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className={`nvidia-button ${joinedGroups.includes(selectedGroup.id) ? 'joined' : ''}`}
                onClick={() => {
                  toggleJoinGroup(selectedGroup.id);
                  closeDetails();
                }}
              >
                {joinedGroups.includes(selectedGroup.id) ? (
                  <>
                    <FaCheck /> Unido
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Unirse
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupCardsGrid;