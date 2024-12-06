const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { authenticateToken } = require("../middleware"); // Importa el middleware
require("dotenv").config();

// Configura la conexión a la base de datos
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  allowExitOnIdle: true,
  port: parseInt(process.env.DATABASE_PORT, 10), // Parsear a entero
  ssl: {
    rejectUnauthorized: false // Cambia esto según sea necesario
  }  
});

// Ruta para obtener datos de la tabla pedidos (modificada)
router.get("/pedidos", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Obtén el userId del objeto req.user

  try {
    const result = await pool.query(
      "SELECT * FROM pedidos WHERE usuariosid = $1",
      [userId]
    );
    const orders = result.rows;

    if (orders.length === 0) {
      return res
        .status(200)
        .json({ message: "No se encontraron pedidos para este usuario" }); // 200 OK
    }

    res.json(orders);
  } catch (err) {
    console.error("Error al obtener pedidos:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para obtener datos de la tabla detalle pedidos (modificada)

router.get("/detalles", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { pedidoId } = req.query; // Obtén el pedidoId de la query

  if (!pedidoId) {
    return res.status(400).json({ message: "pedidoId es requerido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM detalle_pedidos WHERE usuariosid = $1 AND pedidosid = $2",
      [userId, pedidoId]
    );

    const detalles = result.rows;

    if (detalles.length === 0) {
      return res
        .status(200)
        .json({ message: "No se encontraron detalles para este pedido" });
    }

    res.json(detalles);
  } catch (err) {
    console.error("Error al obtener detalles de pedidos:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para crear un nuevo pedido (modificada)

router.post("/nuevo", authenticateToken, async (req, res) => {
  const userId = req.user.id; // El ID del usuario autenticado
  const { productos } = req.body;

  if (!productos || productos.length === 0) {
    return res.status(400).json({ message: "El carrito está vacío." });
  }

  const fecha = new Date();

  try {
    // Crear un nuevo pedido
    const pedidoResult = await pool.query(
      "INSERT INTO pedidos (usuariosID, fecha) VALUES ($1, $2) RETURNING pedidosID",
      [userId, fecha]
    );
    const pedidoID = pedidoResult.rows[0].pedidosid;

    // Insertar los detalles del pedido
    const detallePromises = productos.map((producto) => {
      const productosID = parseInt(producto.id.slice(1), 10);
      const {quantity: cantidad, price: precio } = producto;
      const sub_total = Math.round(cantidad * precio); 

      return pool.query(
        "INSERT INTO detalle_pedidos (pedidosID, usuariosID, productosID, cantidad, precio, sub_total) VALUES ($1, $2, $3, $4, $5, $6)",
        [pedidoID, userId, productosID, cantidad, Math.round(precio), sub_total]
      );
    });

    await Promise.all(detallePromises);

    res.status(201).json({ message: "Pedido creado con éxito", pedidoID });
  } catch (error) {
    console.error("Error al registrar el pedido:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
