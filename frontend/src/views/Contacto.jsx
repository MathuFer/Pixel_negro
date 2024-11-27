import { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Contactopage from "../components/Contactopage"
import Navbar2 from "../components/Navbar2";
import { AuthContext } from "../context/AuthProvider";


const Contacto = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
        {user ? <Navbar2 /> : <Navbar />}
        <Contactopage />
        <Footer />
        </>
    )
}

export default Contacto;