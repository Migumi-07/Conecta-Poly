import "../../styles/Home/Home.css";

function NavHome() {
  return (
    <>
      <nav className="homeNavContainer">
        <ul className="homeNavOptions">
          <li>
            <a href="#Noticias" className="navItem">
              Noticias
            </a>
          </li>

          <li>
            <a href="#EventoDestacado" className="navItem">
              Evento destacado
            </a>
          </li>
          <li>
            <a href="#Contact" className="navItem">
              Contáctanos
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavHome;
