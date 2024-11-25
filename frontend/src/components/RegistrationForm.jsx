import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "../components/styeComponents/RegistrationForm.css";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    direccion:""

  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, complete la información requerida.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setFormData({ name: "", email: "", password: "", fechaNacimiento:"", direccion:""}); 
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <Container className="registration-container">
      <h1>¡Registrate!</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar su nombre y apellido"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar su correo electrónico"
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
            placeholder="Ingresa una contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicFechaNacimiento">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingresar su fecha de nacimiento"
            name="nacimiento"
            value={formData.nacimiento}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicDireccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar su dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Su registro fue existoso!</Alert>}
    </Container>
  );
};

export default RegistrationForm;
