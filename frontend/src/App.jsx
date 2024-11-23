import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import RegistroUsuario from "./views/RegistroUsuario";
import InicioSesion from "./views/InicioSesion";
import Shopping from "./views/Shopping";
import MiPerfil from "./views/MiPerfil";
import Tienda from "./views/Tienda";
import Contacto from "./views/Contacto";
import VistaProducto from "./views/VistaProducto";
import AuthProvider from "./context/AuthProvider"; 


function App() {
  return (
    <AuthProvider> 
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/cartShopping" element={<Shopping />} />
          <Route path="/product/:id" element={<VistaProducto />} />
          <Route path="/perfil/:id" element={<MiPerfil />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
