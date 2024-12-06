const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

// Configuración de conexión a la base de datos
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT, 10),
  allowExitOnIdle: true,
  ssl: {
    rejectUnauthorized: false // Cambia esto según sea necesario
  }  
});

// Ruta: Obtener carrito
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM carrito");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
