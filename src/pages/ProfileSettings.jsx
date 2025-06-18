import React, { useState } from "react";

import { useLanguage } from "../context/LanguageContext";
import defaultAvatar from "../images/default-avatar.jpg";
import "../styles/ProfileSettings.css";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
const ProfileSettings = () => {
  const { isDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();

  const [profile, setProfile] = useState({
    username: "",
    email: "usuario@example.com",
    password: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados exitosamente");
    // Enviar datos al backend si aplica
  };

  return (
    <>
      <div
        className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <Header />
        <div className="profile-container">
          <h2>Perfil y cuenta</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="avatar-section">
              <img
                src={profile.avatar || defaultAvatar}
                alt="Avatar"
                className="avatar"
              />
              <input type="file" onChange={handleAvatarChange} />
            </div>

            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />

            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled // 👈 No se puede editar
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
            />

            <label>Biografía</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Cuéntanos algo sobre ti..."
            ></textarea>

            <hr />

            <button type="submit">Guardar cambios</button>
            <button type="button" className="danger">
              Eliminar cuenta
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfileSettings;
