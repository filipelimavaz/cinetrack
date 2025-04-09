import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Filmes = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setFilmes(data.results));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Filmes Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filmes.map(filme => (
          <div key={filme.id} className="border p-2 rounded shadow">
            <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title} />
            <h3 className="mt-2 font-semibold text-center">{filme.title}</h3>
            <Link to={`/avaliar/filme/${filme.id}`} className="block text-blue-500 text-center mt-2">Avaliar</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filmes;
