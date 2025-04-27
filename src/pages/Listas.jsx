import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Listas.css';
import StarRate from '../components/StarRate';

const Listas = () => {
  const [avaliacoes, setAvaliacoes] = useState({
    visto: [],
    dropado: [],
    deseja_assistir: [],
  });

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const allAvaliacoes = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('avaliacao-')) {
        const avaliacao = JSON.parse(localStorage.getItem(key));

        if (key.endsWith(`-${user.id}`)) {
          allAvaliacoes.push(avaliacao);
        }
      }
    });

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
  }, [user]);

  const renderList = (categoria, avaliacoes) => {
    if (avaliacoes.length === 0) {
      return <p>Nenhum item nesta categoria.</p>;
    }

    return (
      <div className="lista-carousel-container">
        <button className="lista-carrossel-btn lista-carrossel-btn-left" onClick={() => scrollLeft(categoria)}>&lt;</button>
        <div className="lista-carousel" ref={el => carrosselRefs.current[categoria] = el}>
          {avaliacoes.map((avaliacao, index) => (
            <Link
              key={index}
              to={`/detalhesAvaliacao/${avaliacao.tipo}/${avaliacao.id}`}
              className="lista-carousel-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${avaliacao.poster_path}`}
                alt={avaliacao.titulo}
                className="poster-clickable"
              />
              {avaliacao.status !== 'deseja_assistir' && (
                <div className="nota">
                  <StarRate rate={avaliacao.nota} onRate={() => {}} readonly={true} size={20}/>
                </div>
              )}
            </Link>
          ))}
        </div>
        <button className="lista-carrossel-btn lista-carrossel-btn-right" onClick={() => scrollRight(categoria)}>&gt;</button>
      </div>
    );
  };

  if (!user) {
    return <p>Você precisa estar logado para ver suas listas.</p>;
  }

  const carrosselRefs = useRef({});

  const scrollLeft = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: -1100, behavior: 'smooth' });
  };

  const scrollRight = (id) => {
    carrosselRefs.current[id]?.scrollBy({ left: 1100, behavior: 'smooth' });
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
