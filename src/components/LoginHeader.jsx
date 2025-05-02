import "../styles/Header.css";
import logo from "../images/logo.png";
function Header() {
  return (
    <>
      <header className="mainHeader">
        <img className="mainLogo" src={logo} alt="" />
      </header>
    </>
  );
}

export default Header;
