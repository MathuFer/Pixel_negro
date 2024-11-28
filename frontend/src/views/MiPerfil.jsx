import React, { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import { getToken } from "../components/tokenUtils";
import { URL_BASE } from "../config/constants";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import Favoritos from "../components/Favoritos";
import Navbar from "../components/Navbar";
import "./styleViews/MiPerfil.css";

const MiPerfil = () => {
  const { loggedInUser } = useContext(ProductosContext);
  const [compras, setCompras] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Token no encontrado");
        }

        // Obtener compras
        const responseCompras = await fetch(`${URL_BASE}/api/compras`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!responseCompras.ok) {
          throw new Error(
            `Error al obtener compras: ${responseCompras.status}`
          );
        }

        const dataCompras = await responseCompras.json();

        // Obtener detalles de cada compra
        const comprasConDetalles = await Promise.all(
          dataCompras.map(async (compra) => {
            const responseDetalles = await fetch(
              `${URL_BASE}/api/compras/detalles/${compra.id}`, // Ruta específica de detalles
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!responseDetalles.ok) {
              throw new Error(
                `Error al obtener detalles de la compra ${compra.id}: ${responseDetalles.status}`
              );
            }

            const dataDetalles = await responseDetalles.json();
            return { ...compra, detalles: dataDetalles };
          })
        );

        setCompras(comprasConDetalles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {loggedInUser ? <Navbar2 /> : <Navbar />}
      <div className="contenedor-usuario">
        <div className="Datos-usuario">
          <h1>Datos del Usuario</h1>
          {loggedInUser ? (
            <div className="info-usuario">
              <p><strong>ID: </strong> {loggedInUser.id}</p>
              <p><strong>Nombre: </strong> {loggedInUser.nombre}</p>
              <p><strong>Email: </strong> {loggedInUser.email}</p>
            </div>
          ) : (
            <p>No hay usuario autenticado. Por favor, inicia sesión.</p>
          )}
        </div>

        <div className="contenedor-compras">
          <div className="Datos-mis-compras">
            <h2>Mis Compras</h2>
            <div className="compras-container">
              {compras.length > 0 ? (
                <ul className="compras-list">
                  {compras.map((compra) => (
                    <li key={compra.id} className="compra-item">
                      <h3>Compra #{compra.id}</h3>
                      <ul className="detalles-list">
                        {compra.detalles.map((detalle) => (
                          <li key={detalle.id} className="detalle-item">
                            <span>{detalle.nombre}</span> -{" "}
                            <span>Cantidad: {detalle.cantidad}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay compras registradas.</p>
              )}
            </div>
          </div>

          <div className="Datos-mis-favoritos">
            <h2>Mis Favoritos</h2>
            <Favoritos />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MiPerfil;






// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import Navbar2 from "../components/Navbar2";
// import Footer from "../components/Footer";
// import "./styleViews/MiPerfil.css";
// import Favoritos from "../components/Favoritos";
// import Navbar from "../components/Navbar";
// import Carrito from "../components/Carrito";

// const MiPerfil = () => {
//   const { user } = useContext(AuthContext);
  
//   return (
//     <div>
//       {user ? <Navbar2 /> : <Navbar />}
//       <div className="contenedor-usuario">
//         <div className="Datos-usuario">
//           <div className="titulo-usuario">
//             <h1>Datos del Usuario</h1>
//           </div>
//           {user ? (
//             <div className="info-usuario">
//               <p><strong>ID: N°</strong> {user.id}</p>
//               <p><strong>Nombre: </strong> {user.Name}</p>
//               <p><strong>Email: </strong> {user.Email}</p>
//             </div>
//           ) : (
//             <p>No hay usuario autenticado. Por favor, inicia sesión.</p>
//           )}
//         </div>
//         <div className="contenedor-compras">
//           <div className="Datos-mis-compras">
//             <div className="titulo-mis-compras">
//               <h2>Mis compras</h2>
//             </div>
//             <div className="cuadro-carrito">
//                 <Carrito />
//             </div>
//           </div>
//           <div className="Datos-mis-favoritos">
//             <h2>Mis favoritos</h2>
//             <div className="favoritos-listado">
//               <Favoritos />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MiPerfil;

