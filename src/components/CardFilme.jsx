import React from 'react';
import { Link } from 'react-router-dom';

function CardFilme({ filme }) {
  return (
    <div className="bg-white shadow-md rounded p-4 w-60">
      <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} alt={filme.title} className="w-full h-80 object-cover rounded mb-2" />
      <h3 className="text-lg font-bold mb-1">{filme.title}</h3>
      <Link
        to={`/avaliar/filme/${filme.id}`}
        className="text-blue-600 hover:underline"
      >
        Avaliar
      </Link>
    </div>
  );
}

export default CardFilme;
