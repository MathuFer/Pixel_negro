import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductosContext } from "../context/ProductosProvider";
import "./styeComponents/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { productos, cart, setCart } = useContext(ProductosContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (productos.length > 0 && id) {
      const foundItem = productos.find((product) => product.id === id);
      if (foundItem) {
        setItem(foundItem);
      } else {
        console.error(`Producto con ID ${id} no encontrado`);
      }
    }
  }, [id, productos]);

  if (!item) {
    return <div>Cargando...</div>;
  }

  const addToCart = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((producto) => producto.id === item.id);

      if (existingProduct) {
        const updatedCart = prevCart.map((producto) =>
          producto.id === item.id ? { ...producto, quantity: producto.quantity + 1 } : producto
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  return (
    <div className="producto-detalle">
      <div className="contenedor-detalle">
        <div key={item.id} className="detalle-producto">
          {item.img && (
            <img src={item.img} alt={item.name} className="imagen-producto" />
          )}
          <h1>{item.name}</h1>
          <p>{item.desc}</p>
          <p className="precio">
            Precio: {item.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
          </p>
          <button className="ver-detalles" onClick={addToCart}>
            Añadir al carrito
          </button>
          <button className="boton-tienda">
            <a href="/tienda" className="enlace-tienda">Volver a la Tienda</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
