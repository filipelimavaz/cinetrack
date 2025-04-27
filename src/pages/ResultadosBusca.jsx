import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/ResultadoBusca.css';
import '../styles/Home.css';


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
          item =>
            (item.media_type === 'movie' || item.media_type === 'tv') &&
            item.poster_path // filtra apenas os que têm imagem
        );
        setResultados(resultadosFiltrados);
      });
  }, [termo]);

  return (
    <div>
      <h2 className="resultados-titulo">Resultados para: {termo}</h2>
      <div className="grid-container">
        {resultados.map(item => (
          <div key={item.id} className="carousel-item">
            <Link to={`/detalhes/${item.media_type}/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title || item.name}
                className="poster-clickable"
              />
            </Link>
            <Link to={`/avaliar/${item.media_type}/${item.id}`} className="avaliar-btn">
              Avaliar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultadoBusca;
