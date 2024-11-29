import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Home from "./views/Home";
import TestCORS from "./components/TestCORS";
import Tienda from "./views/Tienda";
import RegistroUsuario from "./views/RegistroUsuario";
import InicioSesion from "./views/InicioSesion";
import Contacto from "./views/Contacto";
import Shopping from "./views/Shopping";
import VistaProducto from "./views/VistaProducto";
import MiPerfil from "./views/MiPerfil";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <>
      {isAuthenticated ? <Navbar2 /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-cors" element={<TestCORS />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cartShopping" element={<Shopping />} />
        <Route path="/product/:id" element={<VistaProducto />} />
        <Route path="/perfil/:id" element={<MiPerfil />} />
      </Routes>
    </>
  );
}

export default App;

// import "./App.css";
// import React, { useContext } from "react";
// import { AuthContext } from "./context/AuthProvider";
// import Navbar from "./components/Navbar";
// import Navbar2 from "./components/Navbar2";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Route, Routes } from "react-router-dom";
// import Home from "./views/Home";
// import TestCORS from "./components/TestCORS";
// import Tienda from "./views/Tienda";
// import RegistroUsuario from "./views/RegistroUsuario";
// import InicioSesion from "./views/InicioSesion";
// import Contacto from "./views/Contacto";
// import Shopping from "./views/Shopping";
// import VistaProducto from "./views/VistaProducto";
// import MiPerfil from "./views/MiPerfil";
// import AuthProvider from "./context/AuthProvider"; 

// const { isAuthenticated } = useContext(AuthContext);

// function App() {
//   return (
//     <AuthProvider> 
//       <div>
//         <Routes>
//           {isAuthenticated ? <Navbar2 /> : <Navbar />}
//           <Route path="/" element={<Home />} />
//           <Route path="/test-cors" element={<TestCORS />} />
//           <Route path="/tienda" element={<Tienda />} />
//           <Route path="/registro" element={<RegistroUsuario />} />
//           <Route path="/inicioSesion" element={<InicioSesion />} />
//           <Route path="/contacto" element={<Contacto />} />
//           <Route path="/cartShopping" element={<Shopping />} />
//           <Route path="/product/:id" element={<VistaProducto />} />
//           <Route path="/perfil/:id" element={<MiPerfil />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
