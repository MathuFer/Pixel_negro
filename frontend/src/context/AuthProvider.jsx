import React, { useState, createContext, useEffect } from "react";
import { getToken, removeToken } from "../components/tokenUtils";
import { URL_BASE } from "../config/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (token) => {
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
        throw new Error("No autorizado");
      }
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      removeToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        await fetchUserProfile(token);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserProfile(token);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
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
export { AuthContext };
