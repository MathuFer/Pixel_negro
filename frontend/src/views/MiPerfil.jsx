import React, { useContext } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import Navbar2 from "../components/Navbar_2";
import Footer from "../components/Footer";
import "./styleViews/MiPerfil.css";

const MiPerfil = () => {
  const { favoritos, loggedInUser } = useContext(ProductosContext);

  return (
    <div>
      <Navbar2 />
      <div className="contenedor-usuario">
        <div className="Datos-usuario">
          <h2>Datos del Usuario</h2>
          {loggedInUser ? (
            <div>
              <p><strong>Nombre: </strong> {loggedInUser.Name}</p>
              <p><strong>Email: </strong> {loggedInUser.Email}</p>
            </div>
          ) : (
            <p>No hay usuario autenticado. Por favor, inicia sesión.</p>
          )}
        </div>
        <div className="contenedor-compras">
          <div className="Datos-mis-compras">
            <h2>Mis compras</h2>
          </div>
          <div className="Datos-mis-favoritos">
            <h2>Mis favoritos</h2>
            <div className="favoritos-listado">
              {favoritos.map((product) => (
                <div key={product.id} className="favorito-item">
                  <img src={product.img} alt={product.name} className="favorito-imagen" />
                  <h6>{product.name}</h6>
                  <p>
                    {product.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
                  </p>
                </div>
              ))}
              {favoritos.length === 0 && <p>No tienes productos favoritos aún.</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MiPerfil;
