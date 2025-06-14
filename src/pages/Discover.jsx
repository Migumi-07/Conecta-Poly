import Header from "../components/Header";
import PeopleCards from "../components/Discover/PeopleCards";
import "../styles/Discover/PeopleCards.css";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
function Discover() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div
        className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <Header />
        <div className="main-background">
          <PeopleCards />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Discover;
