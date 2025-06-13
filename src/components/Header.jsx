import { useState } from "react";
import "../styles/Header.css";
import userPic from "../images/userPic.jpg";
import logo from "../images/logo.png";
import { FaBell, FaTimes } from "react-icons/fa";
import { FaMessage, FaUser, FaHouse, FaUserGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Iconos de sol y luna
import { IconContext } from "react-icons";
function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === `/${path}`;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="mainHeader">
        <img className="mainLogo" src={logo} alt="Logo Conecta Poly" />

        {/* Menú hamburguesa */}
        <div
          className={`hamburger-menu ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

        {/* Menú principal*/}
        <nav className="headerNav">
          <ul className="headerNavOptions">
            <li>
              <a
                href="Home"
                className={`navItem ${isActive("Home") ? "active" : ""}`}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="Discover"
                className={`navItem ${isActive("Discover") ? "active" : ""}`}
              >
                Conocer Compañeros
              </a>
            </li>
            <li>
              <a
                href="Noticias"
                className={`navItem ${isActive("Noticias") ? "active" : ""}`}
              >
                Explorar grupos
              </a>
            </li>
          </ul>
        </nav>

        <div className="rightOptions">
          <FaMessage className="rightIcons" />
          <FaBell className="rightIcons" />
          <IconContext.Provider
            value={{
              size: "1.5em",
              style: {
                cursor: "pointer",
                verticalAlign: "middle",
                marginLeft: "10px",
              },
            }}
          >
            <div onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </div>
          </IconContext.Provider>
          <img
            className="userPicture"
            src={user?.avatar || userPic}
            alt="Foto de perfil"
          />
          {user?.name ? (
            <span className="userName">{user.name}</span>
          ) : user?.username ? (
            <span className="userName">{user.username}</span>
          ) : null}
        </div>
      </header>

      {/* Mobile View */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>

      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <FaTimes
            className="mobile-menu-close"
            onClick={toggleMenu}
            size={24}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          />
        </div>

        <a href="Home" className="mobile-menu-item">
          <i>
            <FaHouse />
          </i>{" "}
          Inicio
        </a>
        <a href="." className="mobile-menu-item">
          <i>
            <FaUser />
          </i>{" "}
          Perfil
        </a>
        <a
          href="Discover"
          className={`mobile-menu-item ${isActive("Home") ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <i>
            <IoMdPersonAdd />
          </i>{" "}
          Conocer compañeros
        </a>

        <a
          href="Grupos"
          className={`mobile-menu-item ${isActive("Grupos") ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <i>
            <FaUserGroup />
          </i>{" "}
          Grupos
        </a>

        <div className="mobile-menu-divider"></div>

        <a href="." className="mobile-menu-item">
          <i>
            <FaMessage />
          </i>{" "}
          Mensajes
        </a>

        <a href="." className="mobile-menu-item">
          <i>
            <FaBell />
          </i>{" "}
          Notificaciones
        </a>
      </div>
    </>
  );
}

export default Header;
