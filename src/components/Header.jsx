import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">CineTrack</h1>
      {user && (
        <nav className="space-x-4">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/filmes" className="hover:underline">Filmes</Link>
          <Link to="/series" className="hover:underline">Séries</Link>
          <Link to="/sobre" className="hover:underline">Sobre</Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-600">Logout</button>
        </nav>
      )}
    </header>
  );
}

export default Header;
