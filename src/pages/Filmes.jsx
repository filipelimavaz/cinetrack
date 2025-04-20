import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Filmes = () => {
  const [generos, setGeneros] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState({});

  useEffect(() => {
    // Buscar todos os gêneros de filmes
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => {
        setGeneros(data.genres);
      });
  }, []);

  useEffect(() => {
    // Para cada gênero, buscar os filmes
    generos.forEach(genero => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&with_genres=${genero.id}`)
        .then(res => res.json())
        .then(data => {
          setFilmesPorGenero(prev => ({
            ...prev,
            [genero.id]: data.results
          }));
        });
    });
  }, [generos]);

  const carrosselRefs = useRef({});

  const scrollLeft = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: -1100, behavior: 'smooth' });
  };

  const scrollRight = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: 1100, behavior: 'smooth' });
  };

  return (
    <div className="home-content">
      {generos.map(genero => (
        <div key={genero.id}>
          <h2>{genero.name}</h2>
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft(genero.id)}>&lt;</button>
            <div
              className="carousel"
              ref={el => (carrosselRefs.current[genero.id] = el)}
            >
              {(filmesPorGenero[genero.id] || []).map(filme => (
                <div key={filme.id} className="carousel-item">
                  <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title} />
                  <Link to={`/avaliar/filme/${filme.id}`} className="avaliar-btn">Avaliar</Link>
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight(genero.id)}>&gt;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filmes;
