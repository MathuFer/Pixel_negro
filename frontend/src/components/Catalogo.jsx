import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductosContext } from "../context/ProductosProvider";
import "./styeComponents/Catalogo.css";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    favoritos,
    toggleFavorito,
    addToCart,
    getCategories,
    getFilteredProducts,
  } = useContext(ProductosContext);

  const categories = getCategories();
  const filteredProducts = getFilteredProducts(selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="Galeria">
      <div className="Galeria-Filtro">
        {user && (
          <Link to="/crear-producto">
            <button className="boton-crear-producto">Crear Producto</button>
          </Link>
        )}

        <h1>Tienda</h1>
        <hr />
        <div className="filtro">
          <label htmlFor="category">Filtrar por categoría:</label>
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "Todas" : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="productos-listado">
        {filteredProducts.map((product) => (
          <div key={product.id} className="producto-galeria">
            {user ? (
              <div
                className={`favorito-boton`}
                onClick={() => toggleFavorito(product.id)}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: favoritos.some((fav) => fav.id === product.id) ? "red" : "gray",
                    cursor: "pointer",
                  }}
                />
              </div>
            ) : (
              <div></div>
            )}

            <img
              src={product.img || "https://via.placeholder.com/150"}
              alt={product.name || "Imagen no disponible"}
              className="producto-imagen"
            />
            <h2>{product.name || "Nombre no disponible"}</h2>
            <p>{product.desc || "Descripción no disponible"}</p>
            <p className="precio">
              {product.price !== undefined && product.price !== null
                ? product.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })
                : "Precio no disponible"}
            </p>
            <button
              className="ver-detalles"
              onClick={() => addToCart(product.id)}
              disabled={!product.id}
            >
              Añadir
            </button>
            <Link to={`/product/${product.id || "#"}`} className="ver-detalles">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
