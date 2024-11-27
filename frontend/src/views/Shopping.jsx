import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import ShoppingCart from "../components/ShoppingCart";
import { AuthContext } from "../context/AuthProvider";


const Shopping = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <Navbar2 /> : <Navbar />}
      <ShoppingCart />
      <Footer />
    </>
  );
};

export default Shopping;
