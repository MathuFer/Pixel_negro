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


// Ruta: Crear un nuevo producto 

router.post("/agregarproducto", async (req, res) => {
  const {name, desc, category, price} = req.body;

  // Validar que los campos requeridos no estén vacíos
  if (!name || !desc || !category || !price) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const query = `
      INSERT INTO productos (nombre_producto, descripcion, categoria, precio, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, desc, category, parseFloat(price), 100];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});



module.exports = router;
