import React, { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { getToken } from "../components/tokenUtils";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import Favoritos from "../components/Favoritos";
import { useParams } from "react-router-dom";
import "./styleViews/MiPerfil.css";

const URL_BASE = import.meta.env.VITE_URL_BASE;
console.log(URL_BASE);

const MiPerfil = () => {
  const { loggedInUser } = useContext(ProductosContext);
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Token no encontrado");
        }
        const responsePedidos = await fetch(
          `${URL_BASE}/api/pedidos/pedidos`, // URL para pedidos del usuario
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!responsePedidos.ok) {
          throw new Error(
            `Error al obtener pedidos: ${responsePedidos.status}`
          );
        }

        const dataPedidos = await responsePedidos.json();

        // Validar si no hay pedidos
        if (!Array.isArray(dataPedidos) || dataPedidos.length === 0) {
          setPedidos([]); // No hay pedidos
          return;
        }

        // Para cada pedido, obtener detalles
        const pedidosConDetalles = await Promise.all(
          dataPedidos.map(async (pedido) => {
            try {
              const responseDetalles = await fetch(
                `${URL_BASE}/api/pedidos/detalles`, // URL con id del pedido
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!responseDetalles.ok) {
                console.warn(
                  `Error al obtener detalles del pedido ${pedido.id}: ${responseDetalles.status}`
                );
                return { ...pedido, detalles: [] }; // Continuar aunque falle
              }

              const dataDetalles = await responseDetalles.json();
              return { ...pedido, detalles: dataDetalles };
            } catch (detalleError) {
              console.warn(`Error al procesar detalles del pedido ${pedido.id}`);
              return { ...pedido, detalles: [] }; // Manejar errores por pedido
            }
          })
        );

        setPedidos(pedidosConDetalles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar2 />
      <div className="contenedor-usuario">
        <div className="Datos-usuario">
          {loggedInUser ? (
            <div>
              <h1>Bienvenido, {loggedInUser.Name}</h1>
              <p>Email: {loggedInUser.Email}</p>
            </div>
          ) : (
            <p>No se pudo cargar la información del usuario.</p>
          )}
        </div>
        <div className="contenedor-compras">
          <div className="Datos-mis-compras">
            <h2>Mis compras</h2>
            <div className="pedidos-container">
              {Array.isArray(pedidos) && pedidos.length > 0 ? (
                <ul className="pedidos-list">
                  {pedidos.map((pedido) => (
                    <li key={pedido.id} className="pedido-item">
                      <div className="pedido-header">
                        <h3>Pedido #{pedido.id}</h3>
                      </div>
                      <ul className="detalles-list">
                        {pedido.detalles.map((detalle) => (
                          <li key={detalle.id} className="detalle-item">
                            <span className="detalle-nombre">
                              {detalle.nombre}
                            </span>{" "}
                            -{" "}
                            <span className="detalle-cantidad">
                              Cantidad: {detalle.cantidad}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay pedidos registrados.</p>
              )}
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



