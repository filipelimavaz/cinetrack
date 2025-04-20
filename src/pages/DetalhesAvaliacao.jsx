import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetalhesAvaliacao.css';

const DetalhesAvaliacao = () => {
  const { tipo, id } = useParams();
  const [avaliacao, setAvaliacao] = useState(null);

  useEffect(() => {
    const chave = `avaliacao-${tipo}-${id}`;
    const avaliacaoSalva = JSON.parse(localStorage.getItem(chave));
    console.log('🔍 Avaliação carregada do localStorage:', avaliacaoSalva);

    if (avaliacaoSalva) {
      setAvaliacao(avaliacaoSalva);
    }
  }, [tipo, id]);

  if (!avaliacao) {
    return <p>Carregando...</p>;
  }

  const statusLabel = {
    visto: 'Visto',
    dropado: 'Dropado',
    deseja_assistir: 'Deseja Assistir'
  };

  return (
    <div className="detalhes-container">
      <div className="detalhes-conteudo">
        <img
          src={`https://image.tmdb.org/t/p/w300${avaliacao.poster_path}`}
          alt={avaliacao.titulo}
          className="poster"
        />

        <div className="informacoes">
          <h2 className="titulo">{avaliacao.titulo}</h2>

          <div className="status">
            <strong>Status:</strong> {statusLabel[avaliacao.status] || 'Indefinido'}
          </div>

          {avaliacao.status !== 'deseja_assistir' && (
            <div className="nota">
              <strong>Nota:</strong> {avaliacao.nota}
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
