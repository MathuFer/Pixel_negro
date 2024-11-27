import { useContext } from "react";
import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import { AuthContext } from "../context/AuthProvider";


const Tienda = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <Navbar2 /> : <Navbar />}
      <Catalogo />
      <Footer/>
    </>
  );
};

export default Tienda;

