import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Header.css';

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showHeader, setShowHeader] = useState(true); // Estado para mostrar ou esconder o header
  let lastScrollY = 0;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Rolando para baixo, esconde o header
        setShowHeader(false);
      } else if (window.scrollY < lastScrollY) {
        // Rolando para cima, mostra o header
        setShowHeader(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${showHeader ? '' : 'hidden'}`}>
      <Link to="/home" className="logo">
        <h1>CineTrack</h1>
      </Link>

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
