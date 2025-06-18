import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import "../styles/RateUs.css";

const RateUs = () => {
  const { isDarkMode } = useTheme();
  const [calificacion, setCalificacion] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    asunto: "",
    mensaje: "",
  });
  const [historial, setHistorial] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!calificacion) {
      alert("Por favor selecciona una calificación.");
      return;
    }

    const nuevoComentario = {
      ...formData,
      calificacion,
    };

    setHistorial([...historial, nuevoComentario]);

    alert(
      `Gracias ${formData.nombre}! Calificación: ${calificacion} estrellas`
    );

    // Limpiar formulario
    setFormData({ nombre: "", asunto: "", mensaje: "" });
    setCalificacion(0);
  };

  const calcularPromedio = () => {
    if (historial.length === 0) return 0;
    const suma = historial.reduce((acc, item) => acc + item.calificacion, 0);
    return suma / historial.length;
  };

  const promedio = calcularPromedio();

  return (
    <>
      <div
        className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <section className="calificacion">
          <h2>Califícanos</h2>
          <div className="underline"></div>

          <div className="contenedor-centrado">
            <div className="stars-con-promedio">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (hover || calificacion) ? "checked" : ""}
                    onClick={() => setCalificacion(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <span className="numero-promedio">{promedio.toFixed(1)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              placeholder="Asunto del mensaje"
              value={formData.asunto}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.mensaje}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit">Enviar mensaje</button>
          </form>

          {historial.length > 0 && (
            <div className="historial">
              <h3>Historial de comentarios</h3>
              <ul>
                {historial.map((item, index) => (
                  <li key={index}>
                    <strong>{item.nombre}</strong> ({item.calificacion}★):{" "}
                    {item.asunto} - {item.mensaje}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default RateUs;
