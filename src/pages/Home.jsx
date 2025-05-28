import Header from "../components/Header";
import "../styles/Home/Home.css";
import Nav from "../components/Home/NavHome";
import CardCarousel from "../components/Home/CardCarousel";
import NewsGrid from "../components/Home/NewsGrid";
import FeatureHighlight from "../components/Home/FeatureHighlight";
import Footer from "../components/Footer";
import ContactSection from "../components/Home/ContactSection";
import ScrollToTopArrow from "../components/Home/ScrollToTopArrow";
import License from "../components/Home/License";
function Home() {
  return (
    <>
      <Header />
      <CardCarousel />
      <Nav />
      <NewsGrid />
      <FeatureHighlight />
      <License />
      <ContactSection />
      <ScrollToTopArrow />

      <Footer />
    </>
  );
}

export default Home;
