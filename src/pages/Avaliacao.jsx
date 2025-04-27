import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Avaliacao.css';
import StarRate from '../components/starRate';

const Avaliacao = () => {
  const { tipo, id } = useParams();
  const { user } = useUser();
  const [titulo, setTitulo] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [nota, setNota] = useState(0);
  const [resenha, setResenha] = useState('');
  const [status, setStatus] = useState('deseja_assistir');
  const [carregando, setCarregando] = useState(true);

  const navigate = useNavigate();
  const tipoAPI = tipo === 'filme' ? 'movie' : tipo === 'serie' ? 'tv' : tipo;

  useEffect(() => {
    setCarregando(true);

    fetch(
      `https://api.themoviedb.org/3/${tipoAPI}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`
    )
      .then((res) => res.json())
      .then((data) => {
        setTitulo(data.title || data.name);
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

    navigate(-1); // Voltar para a página anterior
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="container">
      <div className="titulo-poster-container">
        {posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt={titulo}
            className="poster"
          />
        )}

        <div className="info-container">
          <h2 className="titulo-pagina">Avaliar: {titulo}</h2>

          <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="visto">Visto</option>
            <option value="dropado">Dropado</option>
            <option value="deseja_assistir">Desejo Assistir</option>
          </select>
        </label>

          {status !== 'deseja_assistir' && (
            <StarRate
              rate={nota}
              onRate={setNota}
            />
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Resenha:
          <textarea
            value={resenha}
            onChange={(e) => setResenha(e.target.value)}
            placeholder={
              status === 'deseja_assistir'
                ? 'Escreva sua expectativa sobre o filme...'
                : 'Compartilhe sua opinião sobre o filme'
            }
          />
        </label>

        <button type="submit" className="botao-salvar">
          Salvar Avaliação
      </button>

      </form>

    </div>
  );
};

export default Avaliacao;
