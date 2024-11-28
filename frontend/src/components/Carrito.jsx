import React, { useContext } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styeComponents/Carrito.css";

const Carrito = () => {
  const { misCompras, eliminarDeMisCompras } = useContext(ProductosContext);
  
  return (
    <>
      {misCompras.length === 0 ? (
        <p>No has realizado compras aún.</p>
      ) : (
        <ul>
          {misCompras.map((compra, index) => (
            <li className="lista-compras" key={index}>
              <img src={compra.img} className="compra-imagen" alt={compra.desc} />
              {compra.desc} - {compra.quantity} unidades -{" "}
              {compra.price.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
              <button
                className="eliminar-de-compras"
                onClick={() => eliminarDeMisCompras(compra.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Carrito;
