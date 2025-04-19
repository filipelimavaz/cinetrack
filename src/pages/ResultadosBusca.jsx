import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/ResultadoBusca.css';

function ResultadoBusca() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const termo = queryParams.get('q') || '';
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (!termo) return;

    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(termo)}`)
      .then(res => res.json())
      .then(data => {
        const resultadosFiltrados = data.results.filter(
          item => item.media_type === 'movie' || item.media_type === 'tv'
        );
        setResultados(resultadosFiltrados);
      });
  }, [termo]);

  return (
    <div className="resultados-container">
      <h2 className="resultados-titulo">Resultados para: {termo}</h2>
      <div className="resultados-grid">
        {resultados.map((item) => (
          <div key={item.id} className="resultado-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.title || item.name}
            />
            <Link to={`/avaliar/${item.media_type}/${item.id}`}>Avaliar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultadoBusca;
