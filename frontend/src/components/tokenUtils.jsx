export const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  };
  
  export const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  