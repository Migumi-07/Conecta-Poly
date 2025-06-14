import "../styles/Header.css";
import logo from "../images/logo.png";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <header className="mainHeaderL">
          <img className="mainLogoL" src={logo} alt="" />
          <div onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
