import React from 'react';
import { Link } from 'react-router-dom';

function CardSerie({ serie }) {
  return (
    <div className="bg-white shadow-md rounded p-4 w-60">
      <img src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`} alt={serie.name} className="w-full h-80 object-cover rounded mb-2" />
      <h3 className="text-lg font-bold mb-1">{serie.name}</h3>
      <Link
        to={`/avaliar/serie/${serie.id}`}
        className="text-blue-600 hover:underline"
      >
        Avaliar
      </Link>
    </div>
  );
}

export default CardSerie;
