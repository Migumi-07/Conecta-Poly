import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/LoginHeader";
import "../styles/Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = user.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/Home");
    }
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <div className="loginContent">
          <div className="loginTextContainer">
            <h1>Conecta Poly</h1>
            <p>Introduzca su usuario y contraseña</p>
          </div>
          <form className="inputContainer" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className={`loginSubmitButton ${isFormValid ? "active" : ""}`}
              type="submit"
              disabled={!isFormValid}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
