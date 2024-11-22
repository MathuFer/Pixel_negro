import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductosContext } from "../context/ProductosProvider"; 
import data from "../../public/productos.json";
import "./styeComponents/Catalogo.css";

function Catalogo() { 
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { productos, cart, setCart } = useContext(ProductosContext);

  const categories = ["all", ...new Set(data.map(product => product.categoria))];
  const filteredProducts = selectedCategory === "all"
    ? productos
    : productos.filter(product => product.categoria === selectedCategory);

  const addToCart2 = (id) => {
    const existingProduct = cart.find((producto) => producto.id === id);
  
    if (existingProduct) {
      setCart(
        cart.map((producto) =>
          producto.id === id ? { ...producto, quantity: producto.quantity + 1 } : producto
        )
      );
    } else {
      const productToAdd = productos.find((producto) => producto.id === id);
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
  };

  const { favoritos, toggleFavorito } = useContext(ProductosContext);


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);  
  };

  return (
    <div className='Galeria'>
      <div className='Galeria-Filtro'>
        <h1>Tienda</h1>
        <hr />
        <div className="filtro">
          <label htmlFor="category">Filtrar por categoría:</label>
          <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "Todas" : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="productos-listado">
        {filteredProducts.map(product => (
          <div key={product.id} className="producto-galeria">
            <div
                  className={`favorito-boton-catalogo ${favoritos.some((fav) => fav.id === product.id) ? "favorito" : ""}`}
                  onClick={() => toggleFavorito(product.id)}
                >
                  ❤️
              </div>
            <img 
              src={product.img} 
              alt={product.name} 
              className="producto-imagen" 
            />
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p className="precio">{product.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</p>
            <button
              className="ver-detalles"
              onClick={() => addToCart2(product.id)} 
            >
              Añadir
            </button>
            <Link to={`/product/${product.id}`} className="ver-detalles">Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
