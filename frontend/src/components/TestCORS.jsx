import React, { useState, useEffect } from "react";

function TestCORS() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test") 
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
