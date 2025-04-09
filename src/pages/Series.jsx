import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setSeries(data.results));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Séries Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {series.map(serie => (
          <div key={serie.id} className="border p-2 rounded shadow">
            <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt={serie.name} />
            <h3 className="mt-2 font-semibold text-center">{serie.name}</h3>
            <Link to={`/avaliar/serie/${serie.id}`} className="block text-blue-500 text-center mt-2">Avaliar</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
