import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage ao iniciar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      setUser(JSON.parse(usuarioSalvo));
    }
  }, []);

  const login = (usuarioCompleto) => {
    setUser(usuarioCompleto);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioCompleto)); // mantém no localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuarioLogado');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
