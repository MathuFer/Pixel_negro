import React, { useState, useEffect } from "react";

function TestCORS() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test") // Asegúrate de que la URL sea correcta, considerando el proxy de desarrollo si lo tienes
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Prueba CORS</h1>
      <p>{message}</p>
    </div>
  );
}

export default TestCORS;
