// Codigo para crear un producto

import React, { useState, useContext } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./styeComponents/CreacionProducto.css";

const CreacionProducto = () => {
  const { user } = useContext(AuthContext);
  const { agregarProducto } = useContext(ProductosContext);
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("No estás autorizado para realizar esta acción.");
      return;
    }

    // Llama a la función agregarProducto del contexto para añadir el nuevo producto
    agregarProducto(nuevoProducto);
    alert("Producto creado exitosamente.");
    navigate("/tienda"); // Redirige al catálogo
  };

  return (
    <div className="creacion-producto">
      <h1>Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Producto:
          <input
            type="text"
            name="name"
            value={nuevoProducto.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="desc"
            value={nuevoProducto.desc}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={nuevoProducto.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
            Categoría:
        <select
            name="category"
            value={nuevoProducto.category}
            onChange={handleChange}
            required
        >
            <option value="" disabled>
            Selecciona una categoría
            </option>
            <option value="Aros">Aros</option>
            <option value="Imanes">Imanes</option>
            <option value="Chupon">Chupon</option>
            <option value="Llavero">Llavero</option>
            <option value="Marcador">Marcador</option>
        </select>
        </label>

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreacionProducto;

