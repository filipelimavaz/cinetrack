import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Series = () => {
  const [generos, setGeneros] = useState([]);
  const [seriesPorGenero, setSeriesPorGenero] = useState({});
  const carrosselRefs = useRef({});

  useEffect(() => {
    // Buscar lista de gêneros de séries
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGeneros(data.genres));
  }, []);

  useEffect(() => {
    // Buscar séries para cada gênero
    generos.forEach(genero => {
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&with_genres=${genero.id}`)
        .then(res => res.json())
        .then(data => {
          setSeriesPorGenero(prev => ({
            ...prev,
            [genero.id]: data.results
          }));
        });
    });
  }, [generos]);

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
              {(seriesPorGenero[genero.id] || []).map(serie => (
                <div key={serie.id} className="carousel-item">
                  <Link to={`/detalhes/serie/${serie.id}`}>
                    <img 
                    src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} 
                    alt={serie.name} 
                    className='poster-clickable'
                    />
                  </Link>
                  <Link to={`/avaliar/serie/${serie.id}`} className="avaliar-btn">Avaliar</Link>
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

export default Series;
