import Header from "../components/Header";
import PeopleCards from "../components/Discover/PeopleCards";
import "../styles/Discover/PeopleCards.css";
function Discover() {
  return (
    <>
      <Header />
      <div className="main-background">
        <PeopleCards />
      </div>
    </>
  );
}
export default Discover;
