import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);

  const filmesRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setFilmes(data.results));

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setSeries(data.results));
  }, []);

  const handleScrollRight = (ref) => {
    ref.current.scrollBy({ left: 1100, behavior: 'smooth' });
  };

  const handleScrollLeft = (ref) => {
    ref.current.scrollBy({ left: -1100, behavior: 'smooth' });
  };

  return (
    <div className="home-content">
      <h2>Lançamentos</h2>
      <div className="carousel-container">
        <button className="carousel-btn carousel-btn-left" onClick={() => handleScrollLeft(filmesRef)}>&lt;</button>
        <div className="carousel" ref={filmesRef}>
          {filmes.map(filme => (
            <div key={filme.id} className="carousel-item">
              <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title} />
              <Link to={`/avaliar/filme/${filme.id}`} className="avaliar-btn">Avaliar</Link>
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-btn-right" onClick={() => handleScrollRight(filmesRef)}>&gt;</button>
      </div>

      <h2>Séries Populares</h2>
      <div className="carousel-container">
        <button className="carousel-btn carousel-btn-left" onClick={() => handleScrollLeft(seriesRef)}>&lt;</button>
        <div className="carousel" ref={seriesRef}>
          {series.map(serie => (
            <div key={serie.id} className="carousel-item">
              <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt={serie.name} />
              <Link to={`/avaliar/serie/${serie.id}`} className="avaliar-btn">Avaliar</Link>
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-btn-right" onClick={() => handleScrollRight(seriesRef)}>&gt;</button>
      </div>
    </div>
  );
};

export default Home;
