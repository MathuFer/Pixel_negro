import { useContext, useEffect } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { Link } from "react-router-dom";
import "../components/styeComponents/Card.css";

const Card = () => {
  const { seleccionarProductosAleatorios, productos, productosAleatorios, addToCart, favoritos, toggleFavorito } = useContext(ProductosContext);

  useEffect(() => {
    seleccionarProductosAleatorios(); 
  }, [productos]);

  return (
    <div className="productos">
      <div className="contenedor-producto">
        {productosAleatorios.map((product) => (
          <div key={product.id} className="producto">
            <Link to={`/product/${product.id}`} className="Nombre-card">
              <h3>{product.name}</h3>
            </Link>
            <div className="centro-card">
              <img src={product.img} alt={product.name} />
              <div className="descripcion-card">
                <p>Descripcion:</p>
                <p>{product.desc}</p>
              </div>
            </div>
            <div className="Footer-card">
              <h4>
                Precio:{" "}
                {product.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </h4>
              <button className="anadir-boton" onClick={() => addToCart(product.id)}>
                Añadir
              </button>
              <div
                className={`favorito-boton ${
                  favoritos.some((fav) => fav.id === product.id) ? "favorito" : ""
                }`}
                onClick={() => toggleFavorito(product.id)}
              >
                ❤️
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link to="/tienda">
          <button className="boton-tienda">Tienda</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
