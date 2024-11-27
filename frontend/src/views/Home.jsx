import { useContext } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto

  return (
    <div className="homepage">
      {user ? <Navbar2 /> : <Navbar />}
      <Header />
      <Card />
      <Footer />
    </div>
  );
};

export default Home;
