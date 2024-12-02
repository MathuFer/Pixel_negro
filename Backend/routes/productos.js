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
});

// Ruta: Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta: Obtener producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM productos WHERE productosid = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
