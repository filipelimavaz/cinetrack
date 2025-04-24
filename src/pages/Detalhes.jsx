import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Detalhes.css';
import StarRate from '../components/starRate';

const Detalhes = () => {
  const { tipo, id } = useParams();
  const { user } = useUser();
  const [conteudo, setConteudo] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tipoAPI = tipo === 'filme' ? 'movie' : tipo === 'serie' ? 'tv' : tipo;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.themoviedb.org/3/${tipoAPI}/${id}` +
        `?api_key=${import.meta.env.VITE_TMDB_API_KEY}` +
        `&language=pt-BR&append_to_response=credits`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data) => setConteudo(data))
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar os detalhes.');
      })
      .finally(() => setLoading(false));
  }, [tipoAPI, id]);

  useEffect(() => {
    const prefix = `avaliacao-${tipoAPI}-${id}`;
    const all = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        try {
          const av = JSON.parse(localStorage.getItem(key));
          all.push(av);
        } catch {}
      }
    }
    setAvaliacoes(all);
  }, [tipoAPI, id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!conteudo) return null;

  const diretores =
    (conteudo.credits?.crew || [])
      .filter((c) => c.job === 'Director')
      .map((d) => d.name)
      .join(', ') || '—';

  const generos =
    (conteudo.genres || []).map((g) => g.name).join(', ') || '—';

  return (
    <div className="detalhes-container">
      <div className="detalhes-main">

        <img
          className="detalhes-poster"
          src={`https://image.tmdb.org/t/p/w300${conteudo.poster_path}`}
          alt={conteudo.title || conteudo.name}
        />

        

        <div className="detalhes-info">
        <h1 className="detalhes-titulo">{conteudo.title || conteudo.name}</h1>
          {tipoAPI === 'movie' ? (
            <p><strong>Diretor(es):</strong> {diretores}</p>
          ) : (
            <p><strong>Temporadas:</strong> {conteudo.number_of_seasons || '—'}</p>
          )}
          <p><strong>Gêneros:</strong> {generos}</p>
          <p className="detalhes-overview">
            <strong>Sinopse:</strong> {conteudo.overview || '—'}
          </p>
        </div>
      </div>
      <div className="detalhes-avaliacoes">
        <h2>Avaliações</h2>
        <StarRate />   {/* Componente da estrela de avaliação*/}      
        {avaliacoes.length === 0 && <p>Nenhuma avaliação ainda.</p>}
        {avaliacoes.map((av, idx) => (
        <div key={idx} className="avaliacao-card">
         <div className="avaliacao-header">
            <span className="avaliador">
              <strong>{av.usuario}</strong> {av.status && ` (${av.status})`}
            </span>
            {av.nota != null && (
            <span className="avaliacao-nota">Nota: {av.nota}</span>
            )}
          </div>
          <p className="avaliacao-resenha">{av.resenha}</p>
          </div>
        ))}
        </div>
      </div>
  );
};

export default Detalhes;