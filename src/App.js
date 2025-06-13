// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Discover from './pages/Discover';
import { UserProvider } from './context/userContext';
import { ThemeProvider } from './context/ThemeContext';
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About Us" element={<AboutUs />} />
          <Route path="/Discover" element={<Discover />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
