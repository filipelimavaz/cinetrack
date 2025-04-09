import { useState } from 'react';

function SearchMovie() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
    );
    const data = await res.json();
    setMovies(data.results || []);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscar Filmes</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme"
          className="border p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded p-4">
            <h2 className="font-semibold text-lg">{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mt-2"
              />
            )}
            <p className="mt-2 text-sm text-gray-600">
              {movie.overview || 'Sem sinopse disponível.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovie;
