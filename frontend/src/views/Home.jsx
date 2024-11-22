import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="homepage">
        <Navbar />
        <Header />
        <Card />
        <Footer />
      </div>
    </>
  );
};

export default Home;
