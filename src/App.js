// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Discover from './pages/Discover';
import Groups from './pages/Groups'
import { UserProvider } from './context/userContext';
import { ThemeProvider } from './context/ThemeContext';
import ProfileSettings from './pages/ProfileSettings';
import { LanguageProvider } from './context/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/About Us" element={<AboutUs />} />
              <Route path="/Discover" element={<Discover />} />
              <Route path="/Grupos" element={<Groups />} />
              <Route path="/perfil" element={<ProfileSettings />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </UserProvider>
    </LanguageProvider>
  );
}


export default App;
