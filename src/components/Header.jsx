import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Header.css'
function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <header className="header">
      <h1 className="logo">CineTrack</h1>
      {user && (
        <nav className="nav-links">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar filme ou série"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          
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
