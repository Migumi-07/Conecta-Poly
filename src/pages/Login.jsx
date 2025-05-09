import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/LoginHeader";
import "../styles/Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // Nuevo estado para controlar qué formulario mostrar
  const navigate = useNavigate();

  const isFormValid = user.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/Home");
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setUser("");
    setPassword("");
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <div className="loginContent">
          <div className="loginTextContainer">
            <h1>Conecta Poly</h1>
            <p>
              {isLoginForm
                ? "Ingresa tú Correo y contraseña"
                : "Crea una nueva cuenta"}
            </p>
          </div>
          <form className="inputContainer" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Correo"
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

            {!isLoginForm && (
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                required
              />
            )}

            <button
              className={`loginSubmitButton ${isFormValid ? "active" : ""}`}
              type="submit"
              disabled={!isFormValid}
            >
              {isLoginForm ? "Ingresar" : "Registrarse"}
            </button>
          </form>

          <div className="toggleFormText">
            {isLoginForm ? (
              <p>
                ¿No tienes una cuenta?{" "}
                <span
                  onClick={toggleForm}
                  style={{
                    cursor: "pointer",
                    color: "#00c3a5",
                    textDecoration: "underline",
                  }}
                >
                  Regístrate aquí 
                </span>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta?{" "}
                <span
                  onClick={toggleForm}
                  style={{
                    cursor: "pointer",
                    color: "#00c3a5",
                    textDecoration: "underline",
                  }}
                >
                  Inicia sesión
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
