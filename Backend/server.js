const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const corsOptions = {
  origin: "https://pixel-negro-dqdv.onrender.com/", // Reemplaza con tu URL de frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

// Configura la conexión a la base de datos
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  allowExitOnIdle: true,
  port: parseInt(process.env.DATABASE_PORT, 10), // Parsear a entero
});

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS funcionando correctamente!" });
});

// Usuarios
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// Autenticacion
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Productos
const productosRoutes = require("./routes/productos");
app.use("/api/productos", productosRoutes);

// Pedidos
const pedidosRoutes = require("./routes/pedidos");
app.use("/api/pedidos", pedidosRoutes);

// Carrito
const carritoRoutes = require("./routes/carrito");
app.use("/api/carrito", carritoRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
