import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetalhesAvaliacao.css';

const DetalhesAvaliacao = () => {
  const { tipo, id } = useParams();
  const [avaliacao, setAvaliacao] = useState(null);

  useEffect(() => {
    const avaliacaoSalva = JSON.parse(localStorage.getItem(`avaliacao-${tipo}-${id}`));
    if (avaliacaoSalva) {
      setAvaliacao(avaliacaoSalva);
    }
  }, [tipo, id]);

  if (!avaliacao) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-conteudo">
        <img
          src={`https://image.tmdb.org/t/p/w200${avaliacao.poster_path}`}
          alt={avaliacao.titulo}
          className="poster"
        />
        <div className="informacoes">
          <h2 className="titulo">{avaliacao.titulo}</h2>
          <div className="nota">
            <strong>Nota: {avaliacao.nota}</strong>
          </div>
          <div className="resenha">
            <h3>Resenha:</h3>
            <p>{avaliacao.resenha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesAvaliacao;
