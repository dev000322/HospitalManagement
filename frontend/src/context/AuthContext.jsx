import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Helper to safely read name from localStorage
function getStoredName() {
  const name = localStorage.getItem("userName");
  return name && name !== "undefined" && name !== "null" ? name : null;
}

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(getStoredName);

  const login = (name, token, email) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);
    setUserName(name); // immediately update React state
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserName(null); // immediately clear React state
  };

  // Expose a manual refresh in case state ever drifts from localStorage
  const refreshUser = () => {
    setUserName(getStoredName());
  };

  return (
    <AuthContext.Provider value={{ userName, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
