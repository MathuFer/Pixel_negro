import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/styeComponents/LoginForm.css";
import { AuthContext } from "../context/AuthProvider";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [clientsData, setClientsData] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Clients.json")
      .then((response) => response.json())
      .then((data) => setClientsData(data))
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = clientsData.find(
      (client) =>
        client.Email === formData.email && client.Pasword === formData.password
    );

    if (user) {
      console.log("Inicio de sesión exitoso:", user);
      setLoginError("");
      login(user);
      navigate(`/perfil/${user.id}`);
    } else {
      console.log("Credenciales incorrectas");
      setLoginError("Correo o contraseña incorrectos");
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
            name="password"
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
