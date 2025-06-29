import React from 'react';
import { useNavigate } from 'react-router-dom';
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate()
  const [user, setUser] = React.useState(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  } catch (err) {
    console.error("Invalid user JSON in localStorage", err);
    return null;
  }
});


    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
  function logOutHandler() {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
    window.location.reload();

  }
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, logOutHandler }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
