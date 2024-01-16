import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const initialState = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
}

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      navigate('/login');
      localStorage.removeItem('token');
    }
  }, [token, navigate]);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}
