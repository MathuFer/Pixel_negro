import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import "./styleViews/MiPerfil.css";
import Favoritos from "../components/Favoritos";
import Navbar from "../components/Navbar";
import Carrito from "../components/Carrito";

const MiPerfil = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? <Navbar2 /> : <Navbar />}
      <div className="contenedor-usuario">
        <div className="Datos-usuario">
          <div className="titulo-usuario">
            <h1>Datos del Usuario</h1>
          </div>
          {user ? (
            <div className="info-usuario">
              <p><strong>ID: N°</strong> {user.id}</p>
              <p><strong>Nombre: </strong> {user.Name}</p>
              <p><strong>Email: </strong> {user.Email}</p>
            </div>
          ) : (
            <p>No hay usuario autenticado. Por favor, inicia sesión.</p>
          )}
        </div>
        <div className="contenedor-compras">
          <div className="Datos-mis-compras">
            <div className="titulo-mis-compras">
              <h2>Mis compras</h2>
            </div>
            <div className="cuadro-carrito">
                <Carrito />
            </div>
          </div>
          <div className="Datos-mis-favoritos">
            <h2>Mis favoritos</h2>
            <div className="favoritos-listado">
              <Favoritos />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MiPerfil;

