/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect } from "react";
import { getToken, removeToken } from "../components/tokenUtils";
import { URL_BASE } from "../config/constants";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await fetch(URL_BASE + "/api/auth/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            removeToken();
          }
        } catch (error) {
          console.error("Error al verificar autenticación:", error);
          removeToken();
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  //Renderiza el componente sólo cuando la carga esté completa
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };