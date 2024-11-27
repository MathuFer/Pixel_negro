import { createContext, useEffect, useState } from "react";

export const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosAleatorios, setProductosAleatorios] = useState([]); // Asegúrate de tener este estado
  const [clients, setClients] = useState([]); 
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [favoritos, setFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const productosResponse = await fetch("/productos.json");
        if (!productosResponse.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        const productos = await productosResponse.json();
        setProductos(productos);

  
        const clientsResponse = await fetch("/Clients.json");
        if (!clientsResponse.ok) {
          throw new Error("No se pudieron cargar los datos de usuarios");
        }
        const clients = await clientsResponse.json();
        setClients(clients);
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

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  const toggleFavorito = (id) => {
    if (favoritos.some((fav) => fav.id === id)) {
      setFavoritos((prevFavoritos) => prevFavoritos.filter((fav) => fav.id !== id));
    } else {
      const product = productos.find((prod) => prod.id === id);
      if (product) {
        setFavoritos((prevFavoritos) => [...prevFavoritos, product]);
      }
    }
  };

  const eliminarDelFavorito = (id) => {
    setFavoritos((prevFavoritos) => prevFavoritos.filter((fav) => fav.id !== id));
  };
  

  const eliminarDelPedido = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };


  const loginUser = (email, password) => {
    const user = clients.find(
      (client) => client.Email === email && client.Pasword === password
    );
    if (user) {
      setLoggedInUser(user);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logoutUser = () => {
    setLoggedInUser(null);
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
        producto.id === id ? { ...producto, quantity: producto.quantity + 1 } : producto
      )
    );
  } else {
    const productToAdd = productos.find((producto) => producto.id === id);
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
  }
};

// Efecto 3 imagenes aleatorias en la portada

const getRandomProducts = (count = 3) => {
  const shuffled = [...productos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const seleccionarProductosAleatorios = () => {
  const productosMezclados = [...productos].sort(() => Math.random() - 0.5); // Mezcla los productos
  const productosSeleccionados = productosMezclados.slice(0, 3); // Selecciona los primeros 3
  setProductosAleatorios(productosSeleccionados); // Actualiza el estado con los productos aleatorios
};

  return (
    <ProductosContext.Provider
        value={{
          productos,
          setProductos,
          clients,
          cart,
          setCart,
          favoritos,
          toggleFavorito,
          eliminarDelFavorito,
          eliminarDelPedido,
          loggedInUser,
          loginUser,
          logoutUser,
          getFilteredProducts,
          productosAleatorios,
          seleccionarProductosAleatorios,
          getCategories,
          addToCart,
          getRandomProducts,
        }}
      >
        {children}
    </ProductosContext.Provider>

  );
};

export default ProductosProvider;
