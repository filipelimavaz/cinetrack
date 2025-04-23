import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Header.css';
import logo from '../assets/CineTrack.png'; // 👈 adicione essa linha

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else if (window.scrollY < lastScrollY) {
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
        <img src={logo} alt="CineTrack Logo" className="logo-img" />
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

          <Link to="/home">Home</Link>
          <Link to="/filmes">Filmes</Link>
          <Link to="/series">Séries</Link>
          <Link to="/listas">Minha Lista</Link>

          <div className="perfil-dropdown">
            <div className="perfil-icon" onClick={toggleDropdown}>
              <span>P</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/perfil">Perfil</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
