import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../../styles/ScrollToTopArrow.css";

function ScrollToTopArrow() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const eventoDestacadoSection = document.getElementById("Noticias");
      if (eventoDestacadoSection) {
        const sectionPosition =
          eventoDestacadoSection.getBoundingClientRect().top;
        setShowArrow(window.scrollY > sectionPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-to-top ${showArrow ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <FaArrowUp className="arrow-icon" />
    </div>
  );
}

export default ScrollToTopArrow;
