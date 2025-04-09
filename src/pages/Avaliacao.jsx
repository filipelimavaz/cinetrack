import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Avaliacao = () => {
  const { tipo, id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState(0);
  const [resenha, setResenha] = useState('');

  useEffect(() => {
    const url = tipo === 'filme'
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`
      : `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`;

    fetch(url)
      .then(res => res.json())
      .then(data => setTitulo(data.title || data.name));
  }, [tipo, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avaliacao = { tipo, id, titulo, nota, resenha };
    localStorage.setItem(`avaliacao-${tipo}-${id}`, JSON.stringify(avaliacao));
    alert('Avaliação salva com sucesso!');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Avaliar: {titulo}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Nota (1 a 5):
          <input
            type="number"
            min="1"
            max="5"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          Resenha:
          <textarea
            value={resenha}
            onChange={(e) => setResenha(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Salvar Avaliação</button>
      </form>
    </div>
  );
};

export default Avaliacao;
