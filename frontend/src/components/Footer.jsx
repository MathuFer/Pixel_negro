import "./styeComponents/Footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="about">
        <h3>Sobre Nosotros</h3>
        <p>
          En Pixel Negro, nos apasiona transformar pequeños detalles en grandes sonrisas. Somos un equipo de artesanos
          creativos dedicados a diseñar accesorios únicos hechos con beans, una técnica especial que combina colores
          vibrantes y patrones innovadores. Desde llaveros personalizados hasta marcadores que inspiran, cada pieza
          cuenta una historia, la tuya.
        </p>
        <p>
          ¿Quiénes somos? Personas que valoran la creatividad, la sostenibilidad y la conexión. Trabajamos con
          materiales de alta calidad y procesos amigables con el medio ambiente, porque cuidar del planeta es parte de
          nuestra misión.
        </p>
        <p>
          ✨ Explora, personaliza y encuentra el accesorio perfecto para ti o para regalar a quienes amas.
          <strong> Pixel Negro:</strong> donde los detalles creativos cuentan. ✨
        </p>
      </div>
      <div className="contact">
        <h3>Detalles de contacto</h3>
        <ul>
          <li>
            <FaMapMarkerAlt className="icon" /> En alguna parte de Ñuñoa, Santiago de Chile
          </li>
          <li>
            <FaPhoneAlt className="icon" /> +569 8000 9000
          </li>
          <li>
            <FaEnvelope className="icon" /> contacto@unpixelnegro.cl
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
