import Header from "../components/Header";
import PeopleCards from "../components/Discover/PeopleCards";
import "../styles/Discover/PeopleCards.css";
import { useTheme } from "../context/ThemeContext";
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
      </div>
    </>
  );
}
export default Discover;
