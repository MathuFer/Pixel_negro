import React, { useContext } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import "../views/styleViews/MiPerfil.css";

const Favoritos = () => {
  const { favoritos, eliminarDelFavorito } = useContext(ProductosContext);

  return (
    <div className="favoritos-listado">
      {favoritos.map((product) => (
        <div key={product.id} className="favorito-item">
          <img src={product.img} className="favorito-imagen" />
          <h6>{product.name}</h6>
          <p>
            {product.price.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </p>
          <button
            className="eliminar-favorito-btn"
            onClick={() => eliminarDelFavorito(product.id)}
          >
            Borrar
          </button>
        </div>
      ))}
      {favoritos.length === 0 && <p>No tienes productos favoritos aún.</p>}
    </div>
  );
};

export default Favoritos;
