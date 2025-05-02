import { useEffect, useRef } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const systemRef = useRef(null);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const currentFooterRef = footerRef.current;
    const currentBrandRef = brandRef.current;
    const currentSystemRef = systemRef.current;
    const currentSocialRef = socialRef.current;
    const currentCopyrightRef = copyrightRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (currentFooterRef) observer.observe(currentFooterRef);
    if (currentBrandRef) observer.observe(currentBrandRef);
    if (currentSystemRef) observer.observe(currentSystemRef);
    if (currentSocialRef) observer.observe(currentSocialRef);
    if (currentCopyrightRef) observer.observe(currentCopyrightRef);

    return () => {
      if (currentFooterRef) observer.unobserve(currentFooterRef);
      if (currentBrandRef) observer.unobserve(currentBrandRef);
      if (currentSystemRef) observer.unobserve(currentSystemRef);
      if (currentSocialRef) observer.unobserve(currentSocialRef);
      if (currentCopyrightRef) observer.unobserve(currentCopyrightRef);
    };
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-brand" ref={brandRef}>
          <h3 className="footer-title">Conecta Poly</h3>
          <p className="footer-slogan">Conectando la comunidad politécnica</p>
          <div className="footer-contact">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:conectapoly@gmail.com" className="footer-email">
              conectapoly@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-system" ref={systemRef}>
          <h4 className="system-title">Sobre Nosotros</h4>
          <div className="system-items">
            <a href="." className="social-link">
              <FaUsers className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-social" ref={socialRef}>
          <h4 className="social-title">Síguenos</h4>
          <div className="social-links">
            <a href="." className="social-link" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="." className="social-link" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="." className="social-link" aria-label="Twitter/X">
              <FaTwitter className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright" ref={copyrightRef}>
        <p>
          © {new Date().getFullYear()} Conecta Poly. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;