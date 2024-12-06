import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/styeComponents/LoginForm.css";
import { AuthContext } from "../context/AuthProvider";

export const URL_BASE = import.meta.env.VITE_URL_BASE;
console.log(URL_BASE);

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });
  const [loginError, setLoginError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(JSON.stringify(formData));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); 
    console.log(formData);
    try {
      const response = await fetch(URL_BASE + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); //Obtener detalles del error
        throw new Error(errorData.message || "Error de inicio de sesión");
      }

      const data = await response.json();
      const token = data.token;
      const usuarioID = data.usuariosid;
      console.log("Token recibido:", token); // Imprime el token en la consola
      console.log("Usuario:", usuarioID);

      //Guarda el token en localStorage (o una solución de gestión de estado más robusta)
      localStorage.setItem("token", token);

      login(token); // Llama a tu función de login en AuthContext para guardar el token
      navigate(`/perfil/${usuarioID}`); // Redirige a la ruta del perfil. Asegúrate que existe la ruta "/perfil"
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setLoginError(error.message); // Muestra el mensaje de error desde el backend
    }
  };

  return (
    <Container className="login-container">
      <h1>¡Inicia Sesión!</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar su correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresar su contraseña"
            name="contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {loginError && <p className="text-danger">{loginError}</p>}

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
        <Button variant="link" className="reset-password-link" href="#">
          Restablecer contraseña
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;







// import React, { useState, useEffect, useContext } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import "../components/styeComponents/LoginForm.css";

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loginError, setLoginError] = useState("");
//   const [clientsData, setClientsData] = useState([]);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("/Clients.json")
//       .then((response) => response.json())
//       .then((data) => setClientsData(data))
//       .catch((error) => console.error("Error al cargar datos:", error));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const user = clientsData.find(
//       (client) =>
//         client.Email === formData.email && client.Pasword === formData.password
//     );

//     if (user) {
//       console.log("Inicio de sesión exitoso:", user);
//       setLoginError("");
//       login(user);
//       navigate(`/perfil/${user.id}`);

//     } else {
//       console.log("Credenciales incorrectas");
//       setLoginError("Correo o contraseña incorrectos");
//     }
//   };

//   return (
//     <Container className="login-container">
//       <h1>¡Inicia Sesión!</h1>
//       <hr />
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Correo electrónico</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Ingresar su correo"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formBasicPassword">
//           <Form.Label>Contraseña</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Ingresar su contraseña"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         {loginError && <p className="text-danger">{loginError}</p>}

//         <Button variant="primary" type="submit">
//           Ingresar
//         </Button>
//         <Button variant="link" className="reset-password-link" href="#">
//           Restablecer contraseña
//         </Button>
//       </Form>
//     </Container>
//   );
// }

// export default LoginForm;
