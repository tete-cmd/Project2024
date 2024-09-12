// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            setAuth({
              isAuthenticated: true,
              user: response.data.user,
              role: response.data.user.role,
            });
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          setAuth({ isAuthenticated: false, user: null, role: null });
        }
      }
    };

    checkToken();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };