
import React, { createContext, useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";

// 1. Create the context
export const AuthContext = createContext();

// 2. Provide the context to children
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate()
  // load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};