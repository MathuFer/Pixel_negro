import Navbar from "../components/Navbar";
import RegistrationForm from "../components/RegistrationForm";
import WelcomeMessage from "../components/WelcomeMessage";
import PremiumBenefits from "../components/PremiumBenefits";
import NoPremiumBenefits from "../components/NoPremiumBenefits";
import Footer from "../components/Footer"

import "../views/styleViews/RegistroUsuario.css";

const RegistroUsuario = () => {
  return (
    <>
      <Navbar />
      <div className="Registro">
        <RegistrationForm />
        <div className="RegistroMensajes">
          <WelcomeMessage />
          <div className="Beneficios">
            <PremiumBenefits />
            <NoPremiumBenefits />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegistroUsuario;
