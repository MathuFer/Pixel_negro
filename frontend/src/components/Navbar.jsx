import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductosContext } from "../context/ProductosProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styeComponents/navbar.css"

const Navbar = () => {
  const { cart } = useContext(ProductosContext);

  const totalItemsInCart = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <div className="navbar fixed-top bg-black text-white py-3">
      <div className="container d-flex">
        <div className="d-flex justify-content-start align-items-center">
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">Pixel Negro |</h4>
          </Link>

          <Link to="/Tienda" className="logo-nombre mx-1 mb-0">
            <h6 className="mb-0">Tienda |</h6>
          </Link>

          <Link to="/Contacto" className="logo-nombre mx-1 mb-0">
            <h6 className="mb-0">Contacto |</h6>
          </Link>

          <Link to="/CartShopping" className="logo-nombre mx-1 mb-0">
            <h6 className="mb-0">
              Carrito &#128722;{" "}
              {totalItemsInCart > 0 && <span>({totalItemsInCart})</span>}
            </h6>
          </Link>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <Link to="/Registro" className="logo-nombre mx-1 mb-0">
            <h6>Registrarse |</h6>
          </Link>
          <Link to="/InicioSesion" className="logo-nombre mx-1 mb-0">
            <h6>Iniciar sesión</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
