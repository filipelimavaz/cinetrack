import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Importa contexto do usuário
import '../styles/DetalhesAvaliacao.css';
import StarRate from '../components/StarRate';


const DetalhesAvaliacao = () => {
  const { tipo, id } = useParams();
  const { user } = useUser(); // Obtém o usuário logado
  const [avaliacao, setAvaliacao] = useState(null);

  useEffect(() => {
    if (!user) return; // Se não há usuário, não tenta buscar avaliação

    const chave = `avaliacao-${tipo}-${id}-${user.id}`;
    const avaliacaoSalva = JSON.parse(localStorage.getItem(chave));
    console.log('🔍 Avaliação do usuário carregada do localStorage:', avaliacaoSalva);

    if (avaliacaoSalva) {
      setAvaliacao(avaliacaoSalva);
    }
  }, [tipo, id, user]);

  if (!user) {
    return <p>Você precisa estar logado para ver sua avaliação.</p>;
  }

  if (!avaliacao) {
    return <p>Você ainda não avaliou este título.</p>;
  }

  const statusLabel = {
    visto: 'Visto',
    dropado: 'Dropado',
    deseja_assistir: 'Deseja Assistir'
  };

  return (
    <div className="detalhes-container">
      <div className="detalhes-conteudo">
        {avaliacao.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${avaliacao.poster_path}`}
            alt={avaliacao.titulo}
            className="poster"
          />
        )}

        <div className="informacoes">
          <h2 className="titulo">{avaliacao.titulo}</h2>

          <div className="status">
            <strong>Status:</strong> {statusLabel[avaliacao.status] || 'Indefinido'}
          </div>

          {avaliacao.status !== 'deseja_assistir' && (
              <div>
              <StarRate rate={avaliacao.nota} onRate={() => {}} readonly={true} size={20}/>
            </div>
          )}

          {avaliacao.resenha && (
            <div className="resenha">
              <h3>Resenha:</h3>
              <p>{avaliacao.resenha}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesAvaliacao;
