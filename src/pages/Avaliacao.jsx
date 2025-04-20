import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Avaliacao.css';

const Avaliacao = () => {
  const { tipo, id } = useParams();
  const { user } = useUser();
  const [titulo, setTitulo] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [nota, setNota] = useState(0);
  const [resenha, setResenha] = useState('');
  const [status, setStatus] = useState('deseja_assistir');
  const [carregando, setCarregando] = useState(true);

  const tipoAPI = tipo === 'filme' ? 'movie' : tipo === 'serie' ? 'tv' : tipo;

  useEffect(() => {
    setCarregando(true);

    fetch(
      `https://api.themoviedb.org/3/${tipoAPI}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`
    )
      .then((res) => res.json())
      .then((data) => {
        setTitulo(data.title || data.name); // Obtendo título do filme ou série
        setPosterPath(data.poster_path || '');
      })
      .catch((err) => console.error('Erro ao carregar dados:', err))
      .finally(() => setCarregando(false));
  }, [tipoAPI, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status !== 'deseja_assistir' && (nota < 1 || nota > 10)) {
      alert('A nota deve ser entre 1 e 10.');
      return;
    }

    const avaliacao = {
      tipo: tipoAPI,
      id,
      titulo,
      poster_path: posterPath,
      nota,
      resenha,
      status,
      usuario: user?.usuario || 'Anônimo',
      usuarioId: user?.id || null
    };

    const chave = `avaliacao-${tipoAPI}-${id}-${user?.id || 'anonimo'}`;
    localStorage.setItem(chave, JSON.stringify(avaliacao));
    alert('Avaliação salva com sucesso!');
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="container">
      

      <div className="titulo-poster-container">
        {/* Exibindo o pôster e a nota ao lado */}
        {posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt={titulo}
            className="poster"
          />
        )}

<div className="info-container">
  <h2 className="titulo-pagina">Avaliar: {titulo}</h2>

  {status !== 'deseja_assistir' && (
    <div className="nota-container">
      <label>
        Nota (1 a 10):
        <input
          type="number"
          min="1"
          max="10"
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </label>
    </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Resenha:
          <textarea
            value={resenha}
            onChange={(e) => setResenha(e.target.value)}
            className="border p-2 w-full text-left"
            placeholder={
              status === 'deseja_assistir'
                ? 'Escreva sua expectativa sobre o filme...'
                : 'Compartilhe sua opinião sobre o filme'
            }
          />
        </label>

        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="visto">Visto</option>
            <option value="dropado">Dropado</option>
            <option value="deseja_assistir">Desejo Assistir</option>
          </select>
        </label>

        <button type="submit" className="botao-salvar">
          Salvar Avaliação
        </button>
      </form>
    </div>
  );
};

export default Avaliacao;
