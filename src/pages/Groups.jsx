import Header from "../components/Header";
import GroupsCardsGrid from "../components/Groups/GroupsCardsGrid";
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
          <GroupsCardsGrid />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Discover;
