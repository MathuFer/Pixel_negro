// eslint-disable-next-line no-unused-vars
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

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, complete la información requerida.");
      return;
    }

    try {
      // SIMULATED API CALL - REPLACE THIS WITH YOUR ACTUAL API CALL
      const response = await fetch("/api/register", {
        //Your actual API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); //Try to get error details from the server
        const errorMessage =
          errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSuccess(true); //Set success state after a successful API call
      setFormData({ name: "", email: "", password: "", fechaNacimiento:"", direccion:""}); // Clear the form
    } catch (error) {
      setError(error.message); //Handle errors from the API call
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
