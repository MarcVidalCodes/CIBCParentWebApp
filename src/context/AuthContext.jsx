import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

  const saveToken = (newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};