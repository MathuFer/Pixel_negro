import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from "../context/AuthProvider";
import { getToken } from "../components/tokenUtils";
import Footer from "../components/Footer";
import Favoritos from "../components/Favoritos";
import { useParams } from "react-router-dom";
import "./styleViews/MiPerfil.css";

const URL_BASE = import.meta.env.VITE_URL_BASE;


const MiPerfil = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState({});

  console.log(URL_BASE);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Token no encontrado");
        }
    
        const responsePedidos = await fetch(
          `${URL_BASE}/api/pedidos/pedidos`, // URL para obtener los pedidos del usuario
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (!responsePedidos.ok) {
          throw new Error(`Error al obtener pedidos: ${responsePedidos.status}`);
        }
    
        const dataPedidos = await responsePedidos.json();
    
        if (!Array.isArray(dataPedidos) || dataPedidos.length === 0) {
          setPedidos([]); // No hay pedidos
          return;
        }
    
        const pedidosConDetalles = await Promise.all(
          dataPedidos.map(async (pedido) => {
            try {
              const responseDetalles = await fetch(
                `${URL_BASE}/api/pedidos/detalles?pedidoId=${pedido.pedidosid}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
    
              if (!responseDetalles.ok) {
                console.warn(`Error al obtener detalles del pedido ${pedido.id}`);
                return { ...pedido, detalles: [] };
              }
    
              const dataDetalles = await responseDetalles.json();
              
              return { ...pedido, detalles: dataDetalles };
            } catch (detalleError) {
              console.warn(`Error al procesar detalles del pedido ${pedido.id}`);
              return { ...pedido, detalles: [] }; 
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
        
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${URL_BASE}/api/productos`); // URL de productos
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.status}`);
        }
        const dataProductos = await response.json();
        setProductos(dataProductos);
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      }
    };

    fetchProductos();
  }, []);

  
            
if (loading) {
return <p>Cargando...</p>;
}
            
if (error) {
return <p>Error: {error}</p>;
}

console.log("Datos del usuario:", user);

  return (
    <div>
      <div className="contenedor-usuario">
        <div className="Datos-usuario">
          {user ? (
            <div>
              <h3>Hola! <strong className="nombre-usuario"> {user.nombre}</strong></h3>
              <hr />
              <p>Tu correo electronico: <strong>{user.email}</strong></p>
              <p>Este es tu ID: <strong>{user.usuariosid}</strong></p>
            </div>
          ) : (
            <p>No se pudo cargar la información del usuario.</p>
          )}
        </div>
        <div className="contenedor-compras">
        <div className="Datos-mis-compras">
            <h2>Mis compras</h2>
            <div className="pedidos-container">
              {pedidos.length > 0 ? (
                <ul className="pedidos-list">
                  {pedidos.map((pedido) => {
                    return (
                      <li key={pedido.pedidosid} className="pedido-item">
                          <div className="titulo-item-pedido">
                            <h5 className="pedido-header">Pedido #{pedido.pedidosid}</h5>
                            <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
                          </div>
                        <div className="detalles-list">
                          {pedido.detalles && pedido.detalles.length > 0 ? (
                            <div>
                              {pedido.detalles.map((detalle, index) => {
                                const producto = productos.find((p) => p.productosid === detalle.productosid);
                                const nombreProducto = producto ? producto.descripcion : "Producto no encontrado";

                                return (
                                  <ul key={index} className="detalle-item">
                                    <li>Producto: {nombreProducto}</li>
                                    <li>Cantidad: {detalle.cantidad}</li>
                                    <li>
                                      Total:{" "}
                                      {detalle.sub_total.toLocaleString("es-CL", {
                                        style: "currency",
                                        currency: "CLP",
                                      })}
                                    </li>
                                  </ul>
                                );
                              })}

                            </div>
                          ) : (
                            <p>No hay detalles disponibles para este pedido.</p>
                          )}
                        </div>
                      </li>
                    );
                  })}


              </ul>
            ) : (
              <p>No hay compras registradas.</p>
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




