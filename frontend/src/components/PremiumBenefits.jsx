// eslint-disable-next-line no-unused-vars
import React from "react";
import "../components/styeComponents/PremiumBenefits.css";

function PremiumBenefits() {
  const benefits = [
    "Envío gratis en todos tus pedidos.",
    "Acceso exclusivo a ofertas y promociones.",
    "Descuentos especiales en productos seleccionados.",
    "Prioridad en atención al cliente.",
    "Contenido exclusivo y acceso anticipado a nuevos productos.",
    // Add more benefits as needed
  ];

  return (
    <div className="premium-benefits">
      <h2>Beneficios Premium</h2>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}

export default PremiumBenefits;
