// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const ProfileView = () => {
  const { user } = useContext(AuthContext);  // Accede al contexto de usuario
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;  // Asegúrate de que hay un usuario logueado

      try {
        const response = await fetch(`/api/profile/${user.id}`); // Usa el ID del usuario
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  // Muestra un mensaje mientras se cargan los datos
  if (!user) return <p>Please log in to view your profile.</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profileData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      {/* Puedes agregar más detalles del perfil aquí */}
    </div>
  );
};

export default ProfileView;
