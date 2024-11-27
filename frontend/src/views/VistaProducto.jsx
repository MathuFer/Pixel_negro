import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import ProductDetails from "../components/ProductDetails";
import { AuthContext } from "../context/AuthProvider";


const VistaProducto = () => {
  const { user } = useContext(AuthContext);

    return (
      <>
        {user ? <Navbar2 /> : <Navbar />}
        <ProductDetails />
        <Footer />
      </>
    );
  };
  export default VistaProducto;
  
  