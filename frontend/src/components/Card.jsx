import { useContext, useEffect } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { Link } from "react-router-dom";
import "../components/styeComponents/Card.css";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";



const Card = () => {
  const { seleccionarProductosAleatorios, productos, productosAleatorios, addToCart, favoritos, toggleFavorito } = useContext(ProductosContext);

  useEffect(() => {
    seleccionarProductosAleatorios(); 
  }, [productos]);

const { user } = useContext(AuthContext); 


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
