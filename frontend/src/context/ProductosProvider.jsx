import { createContext, useEffect, useState } from "react";

export const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosAleatorios, setProductosAleatorios] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [favoritos, setFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });
  const [misCompras, setMisCompras] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await fetch("/productos.json");
        if (!productosResponse.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        const productos = await productosResponse.json();
        setProductos(productos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {
    if (favoritos.some((fav) => fav.id === id)) {
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((fav) => fav.id !== id)
      );
    } else {
      const product = productos.find((prod) => prod.id === id);
      if (product) {
        setFavoritos((prevFavoritos) => [...prevFavoritos, product]);
      }
    }
  };

  const eliminarDelFavorito = (id) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((fav) => fav.id !== id)
    );
  };

  const eliminarDelPedido = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Filtrar productos por categoría
  const getFilteredProducts = (selectedCategory) => {
    return selectedCategory === "all"
      ? productos
      : productos.filter((product) => product.categoria === selectedCategory);
  };

  // Obtener las categorías únicas
  const getCategories = () => {
    return ["all", ...new Set(productos.map((product) => product.categoria))];
  };

  // Agregar al carrito
  const addToCart = (id) => {
    const existingProduct = cart.find((producto) => producto.id === id);

    if (existingProduct) {
      setCart(
        cart.map((producto) =>
          producto.id === id
            ? { ...producto, quantity: producto.quantity + 1 }
            : producto
        )
      );
    } else {
      const productToAdd = productos.find((producto) => producto.id === id);
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
  };

  // Efecto de 3 imágenes aleatorias en la portada
  const getRandomProducts = (count = 3) => {
    const shuffled = [...productos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const seleccionarProductosAleatorios = () => {
    const productosMezclados = [...productos].sort(() => Math.random() - 0.5);
    const productosSeleccionados = productosMezclados.slice(0, 3);
    setProductosAleatorios(productosSeleccionados);
  };

  // Mis compras: Funciones para agregar y eliminar productos
  const eliminarDeMisCompras = (id) => {
    setMisCompras((prevCompras) => prevCompras.filter((item) => item.id !== id));
  };

  const agregarACompras = (productos) => {
    setMisCompras((prevCompras) => [...prevCompras, ...productos]);
    setCart([]); 
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        cart,
        setCart,
        favoritos,
        toggleFavorito,
        eliminarDelFavorito,
        eliminarDelPedido,
        getFilteredProducts,
        productosAleatorios,
        seleccionarProductosAleatorios,
        getCategories,
        addToCart,
        getRandomProducts,
        misCompras,
        eliminarDeMisCompras,
        agregarACompras,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductosProvider;
