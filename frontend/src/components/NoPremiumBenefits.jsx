// eslint-disable-next-line no-unused-vars
import React from "react";
import "../components/styeComponents/PremiumBenefits.css";

function NoPremiumBenefits() {
  const benefits = [
    "Envío gratis a partir de 500$.",
    "Descuentos especiales en productos seleccionados.",
    "Contenido exclusivo.",
    "Acceso a descuentos con fila virtual",
    "Disfruta de descuentos de temporada",
    // Add more benefits as needed
  ];

  return (
    <div className="premium-benefits">
      <h2>Beneficios Free Users</h2>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoPremiumBenefits;
