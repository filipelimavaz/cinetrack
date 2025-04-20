import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [generosFilmes, setGenerosFilmes] = useState([]);
  const [generosSeries, setGenerosSeries] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState({});
  const [seriesPorGenero, setSeriesPorGenero] = useState({});

  const carrosselRefs = useRef({});

  useEffect(() => {
    // Buscar gêneros de filmes e séries
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGenerosFilmes(data.genres));

    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGenerosSeries(data.genres));
  }, []);

  useEffect(() => {
    // Buscar filmes por gênero
    generosFilmes.forEach(genero => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&with_genres=${genero.id}`)
        .then(res => res.json())
        .then(data => {
          setFilmesPorGenero(prev => ({
            ...prev,
            [genero.id]: data.results
          }));
        });
    });
  }, [generosFilmes]);

  useEffect(() => {
    // Buscar séries por gênero
    generosSeries.forEach(genero => {
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&with_genres=${genero.id}`)
        .then(res => res.json())
        .then(data => {
          setSeriesPorGenero(prev => ({
            ...prev,
            [genero.id]: data.results
          }));
        });
    });
  }, [generosSeries]);

  const scrollLeft = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: -1100, behavior: 'smooth' });
  };

  const scrollRight = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: 1100, behavior: 'smooth' });
  };

  return (
    <div className="home-content">
      <h1>Filmes Populares por Gênero</h1>
      {generosFilmes.map(genero => (
        <div key={`filme-${genero.id}`}>
          <h2>{genero.name}</h2>
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft(`filme-${genero.id}`)}>&lt;</button>
            <div className="carousel" ref={el => (carrosselRefs.current[`filme-${genero.id}`] = el)}>
              {(filmesPorGenero[genero.id] || []).map(filme => (
                <div key={filme.id} className="carousel-item">
                  <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title} />
                  <Link to={`/avaliar/filme/${filme.id}`} className="avaliar-btn">Avaliar</Link>
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight(`filme-${genero.id}`)}>&gt;</button>
          </div>
        </div>
      ))}

      <h1>Séries Populares por Gênero</h1>
      {generosSeries.map(genero => (
        <div key={`serie-${genero.id}`}>
          <h2>{genero.name}</h2>
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft(`serie-${genero.id}`)}>&lt;</button>
            <div className="carousel" ref={el => (carrosselRefs.current[`serie-${genero.id}`] = el)}>
              {(seriesPorGenero[genero.id] || []).map(serie => (
                <div key={serie.id} className="carousel-item">
                  <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt={serie.name} />
                  <Link to={`/avaliar/serie/${serie.id}`} className="avaliar-btn">Avaliar</Link>
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight(`serie-${genero.id}`)}>&gt;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
