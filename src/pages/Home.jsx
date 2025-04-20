import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [generosFilmes, setGenerosFilmes] = useState([]);
  const [generosSeries, setGenerosSeries] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState({});
  const [seriesPorGenero, setSeriesPorGenero] = useState({});
  const carrosselRefs = useRef({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setLancamentos(data.results));

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGenerosFilmes(data.genres));

    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGenerosSeries(data.genres));
  }, []);

  useEffect(() => {
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
      <h1>Lançamentos</h1>
      <div className="carousel-container">
        <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft('lancamentos')}>&lt;</button>
        <div className="carousel" ref={el => (carrosselRefs.current['lancamentos'] = el)}>
          {lancamentos.map(item => (
            <div key={item.id} className="carousel-item">
              <Link to={`/detalhes/${item.media_type}/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  className="poster-clickable"
                />
              </Link>
            <Link to={`/avaliar/${item.media_type}/${item.id}`} className="avaliar-btn">Avaliar</Link>
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight('lancamentos')}>&gt;</button>
      </div>

      {generosFilmes.map((genero) => {
        const filmes = filmesPorGenero[genero.id] || [];
        const series = seriesPorGenero[genero.id] || [];

        if (filmes.length === 0 && series.length === 0) return null;

        return (
          <div key={`bloco-${genero.id}`}>
            {filmes.length > 0 && (
              <>
                <h2>{genero.name} (Filmes)</h2>
                <div className="carousel-container">
                  <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft(`filme-${genero.id}`)}>&lt;</button>
                  <div className="carousel" ref={el => (carrosselRefs.current[`filme-${genero.id}`] = el)}>
                    {filmes.map(filme => (
                      <div key={filme.id} className="carousel-item">
                        <Link to={`/detalhes/movie/${filme.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                            alt={filme.title}
                            className="poster-clickable"
                          />
                        </Link>
                    <Link to={`/avaliar/filme/${filme.id}`} className="avaliar-btn">Avaliar</Link>                      
                    </div>
                    ))}
                  </div>
                  <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight(`filme-${genero.id}`)}>&gt;</button>
                </div>
              </>
            )}

            {series.length > 0 && (
              <>
                <h2>{genero.name} (Séries)</h2>
                <div className="carousel-container">
                  <button className="carousel-btn carousel-btn-left" onClick={() => scrollLeft(`serie-${genero.id}`)}>&lt;</button>
                  <div className="carousel" ref={el => (carrosselRefs.current[`serie-${genero.id}`] = el)}>
                    {series.map(serie => (
                      <div key={serie.id} className="carousel-item">
                        <Link to={`/detalhes/tv/${serie.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`}
                            alt={serie.name}
                            className="poster-clickable"
                          />
                        </Link>
                      <Link to={`/avaliar/serie/${serie.id}`} className="avaliar-btn">Avaliar</Link>                      </div>
                    ))}
                  </div>
                  <button className="carousel-btn carousel-btn-right" onClick={() => scrollRight(`serie-${genero.id}`)}>&gt;</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
