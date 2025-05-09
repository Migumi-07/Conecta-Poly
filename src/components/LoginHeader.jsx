import "../styles/Header.css";
import logo from "../images/logo.png";
function Header() {
  return (
    <>
      <header className="mainHeaderL">
        <img className="mainLogoL" src={logo} alt="" />
      </header>
    </>
  );
}

export default Header;
