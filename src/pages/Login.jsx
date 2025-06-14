import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/LoginHeader";
import "../styles/Login.css";
import { useUser } from "../context/userContext";
import avatar1 from "../images/avatar/avatar1.jpg";
import avatar2 from "../images/avatar/avatar2.jpg";
import avatar3 from "../images/avatar/avatar3.jpg";
import avatar4 from "../images/avatar/avatar4.jpg";
import { useTheme } from "../context/ThemeContext";

function Login() {
   const { isDarkMode } = useTheme();
  const { setUser } = useUser(); 
  const [isLoginForm, setIsLoginForm] = useState(true);

  // Campos de registro
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState(null);
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  // Campos de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  // Validaciones regex
  const soloTextoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@elpoli\.edu\.co$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;

  // Calcular edad
  useEffect(() => {
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(fechaNacimiento);
      let edadCalc = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edadCalc--;
      }
      setEdad(edadCalc >= 0 ? edadCalc : null);

      // Calcular usuario
      const nombres = nombre.trim().split(" ");
      const primerNombre = nombres[0] || "";
      const inicialPrimerNombre = primerNombre.charAt(0).toLowerCase();

      const primerApellido =
        apellidos.trim().split(" ")[0]?.toLowerCase() || "";

      const dia = String(fechaNac.getDate()).padStart(2, "0");
      const mes = String(fechaNac.getMonth() + 1).padStart(2, "0");
      const anio = fechaNac.getFullYear();

      setUsuario(`${inicialPrimerNombre}${primerApellido}${dia}${mes}${anio}`);
    } else {
      setEdad(null);
      setUsuario("");
    }
  }, [fechaNacimiento, nombre, apellidos]);

  // Validaciones individuales
  const nombreValido = soloTextoRegex.test(nombre.trim());
  const apellidosValidos = soloTextoRegex.test(apellidos.trim());
  const fechaValida =
    fechaNacimiento !== "" && new Date(fechaNacimiento) < new Date();
  const edadValida = edad !== null && edad >= 18;
  const correoValido =
    emailRegex.test(correo.trim()) && correo.trim().endsWith("@elpoli.edu.co");
  const passwordValido = passwordRegex.test(password);
  const passwordsCoinciden = password === confirmPassword;
  const imagenValida = imagenSeleccionada !== "";
  const loginEmailValido = emailRegex.test(loginEmail.trim());
  const loginPasswordValido = loginPassword.trim().length >= 8; // o la regla que prefieras

  // Formulario válido solo para registro
  const isFormValid =
    nombreValido &&
    apellidosValidos &&
    fechaValida &&
    edadValida &&
    correoValido &&
    usuario !== "" &&
    passwordValido &&
    passwordsCoinciden &&
    imagenValida;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      if (loginEmail.trim() && loginPassword.trim()) {
        setUser({
          username: loginEmail,
          name: usuario,
          avatar: avatar4,
        });
        navigate("/Home");
      }
    } else {
      // Registro
      if (isFormValid) {
        const selectedImg = imagenes.find(
          (img) => img.id === imagenSeleccionada
        );

        const newUser = {
          username: usuario,
          name: nombre,
          lastName: apellidos,
          email: correo,
          birthDate: fechaNacimiento,
          age: edad,
          avatar: selectedImg.src,
        };

        setUser(newUser);
        navigate("/Home");
      }
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    // Limpiar todo al cambiar formulario
    setNombre("");
    setApellidos("");
    setFechaNacimiento("");
    setEdad(null);
    setCorreo("");
    setUsuario("");
    setPassword("");
    setConfirmPassword("");
    setImagenSeleccionada("");
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleLimpiar = () => {
    setNombre("");
    setApellidos("");
    setFechaNacimiento("");
    setEdad(null);
    setCorreo("");
    setUsuario("");
    setPassword("");
    setConfirmPassword("");
    setImagenSeleccionada("");
  };

  // Imágenes de ejemplo para selección
  const imagenes = [
    { id: "img1", src: avatar1, alt: "Imagen 1" },
    { id: "img2", src: avatar2, alt: "Imagen 2" },
    { id: "img3", src: avatar3, alt: "Imagen 3" },
    { id: "img4", src: avatar4, alt: "Imagen 4" },
  ];

  return (
    <>
         <div
        className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
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
            {isLoginForm ? (
              <>
                <input
                  type="text"
                  placeholder="Correo"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                {!loginEmailValido && loginEmail && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Por favor ingresa un correo válido.
                  </p>
                )}

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {!loginPasswordValido && loginPassword && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    La contraseña debe tener al menos 8 caracteres.
                  </p>
                )}

                <button
                  className={`loginSubmitButton ${
                    loginEmailValido && loginPasswordValido ? "active" : ""
                  }`}
                  type="submit"
                  disabled={!loginEmailValido || !loginPasswordValido}
                >
                  Ingresar
                </button>
              </>
            ) : (
              <>
                {/* Registro */}
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                {!nombreValido && nombre && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Sólo se permiten letras en Nombre
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  required
                />
                {!apellidosValidos && apellidos && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Sólo se permiten letras en Apellidos
                  </p>
                )}

                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  max={new Date().toISOString().split("T")[0]}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                />
                {!fechaValida && fechaNacimiento && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Seleccione una fecha anterior a hoy
                  </p>
                )}

                <p>Edad: {edad !== null ? edad : "-"}</p>
                {!edadValida && edad !== null && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Debes ser mayor o igual a 18 años
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
                {!correoValido && correo && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Debes usar tú correo institucional
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Usuario"
                  value={usuario}
                  readOnly
                  title="Usuario generado automáticamente"
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!passwordValido && password && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Contraseña debe tener mínimo 8 caracteres, al menos 2
                    números, una mayúscula y un carácter especial.
                  </p>
                )}

                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {!passwordsCoinciden && confirmPassword && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Las contraseñas no coinciden
                  </p>
                )}

                <div>
                  <p>Selecciona una imagen:</p>
                  {imagenes.map((img) => (
                    <label
                      key={img.id}
                      style={{ display: "block", marginBottom: "8px" }}
                    >
                      <input
                        type="radio"
                        name="imagen"
                        value={img.id}
                        checked={imagenSeleccionada === img.id}
                        onChange={() => setImagenSeleccionada(img.id)}
                        required
                      />
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "8px",
                          verticalAlign: "middle",
                        }}
                      />
                    </label>
                  ))}
                  {!imagenValida && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Debes seleccionar una imagen
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`loginSubmitButton ${isFormValid ? "active" : ""}`}
                  disabled={!isFormValid}
                >
                  Registrarse
                </button>

                <button
                  type="button"
                  className="loginSubmitButton"
                  style={{ marginLeft: "10px", backgroundColor: "#888" }}
                  onClick={handleLimpiar}
                >
                  Limpiar
                </button>
              </>
            )}
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
      </div>
    </>
  );
}

export default Login;
