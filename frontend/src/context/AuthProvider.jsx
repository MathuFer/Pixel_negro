import React, { createContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../components/tokenUtils";
import { URL_BASE } from "../config/constants";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await fetch(`${URL_BASE}/api/auth/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("authUser", JSON.stringify(userData)); // Guardar en localStorage
          } else {
            removeToken();
            localStorage.removeItem("authUser");
          }
        } catch (error) {
          console.error("Error al verificar autenticación:", error);
          removeToken();
          localStorage.removeItem("authUser");
        }
      } else {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (token, userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    removeToken();
    localStorage.removeItem("authUser");
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <AuthContext.Provider 
        value={{ 
          user, 
          isAuthenticated, 
          login, 
          logout 
        }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;