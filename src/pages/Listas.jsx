import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Listas.css';

const Listas = () => {
  const [avaliacoes, setAvaliacoes] = useState({
    visto: [],
    dropado: [],
    deseja_assistir: [],
  });

  useEffect(() => {
    // Recupera todas as avaliações do localStorage
    const allAvaliacoes = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('avaliacao-')) {
        const avaliacao = JSON.parse(localStorage.getItem(key));
        allAvaliacoes.push(avaliacao);
      }
    });

    // Organiza as avaliações nas categorias
    const categorias = {
      visto: [],
      dropado: [],
      deseja_assistir: [],
    };

    allAvaliacoes.forEach(avaliacao => {
      if (avaliacao.status === 'visto') {
        categorias.visto.push(avaliacao);
      } else if (avaliacao.status === 'dropado') {
        categorias.dropado.push(avaliacao);
      } else if (avaliacao.status === 'deseja_assistir') {
        categorias.deseja_assistir.push(avaliacao);
      }
    });

    setAvaliacoes(categorias);
  }, []);

  const renderList = (categoria, avaliacoes) => {
    if (avaliacoes.length === 0) {
      return <p>Nenhum item nesta categoria.</p>;
    }

    return (
      <div className="carrossel">
        {avaliacoes.map((avaliacao, index) => (
          <Link
            key={index}
            to={`/detalhesAvaliacao/${avaliacao.tipo}/${avaliacao.id}`} // Redireciona para a página de detalhes
            className="card"
            style={{
              width: '140px',  // Tamanho fixo para os cards
              textAlign: 'center',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${avaliacao.poster_path}`}
              alt={avaliacao.titulo}
              className="poster"
            />
            {/* Exibe a nota apenas */}
            {avaliacao.status !== 'deseja_assistir' && (
              <p className="nota">Nota: {avaliacao.nota}</p>
            )}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="listas-container">
      <h2 className="titulo-pagina">Suas Listas</h2>

      <div className="secao-lista">
        <h3 className="titulo-categoria">Vistos</h3>
        {renderList('visto', avaliacoes.visto)}
      </div>

      <div className="secao-lista">
        <h3 className="titulo-categoria">Dropados</h3>
        {renderList('dropado', avaliacoes.dropado)}
      </div>

      <div className="secao-lista">
        <h3 className="titulo-categoria">Desejo Assistir</h3>
        {renderList('deseja_assistir', avaliacoes.deseja_assistir)}
      </div>
    </div>
  );
};

export default Listas;
