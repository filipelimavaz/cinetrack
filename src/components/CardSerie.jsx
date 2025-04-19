import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardFilme from '../components/CardFilme';  // Importando o CardFilme
import CardSerie from '../components/CardSerie';  // Importando o CardSerie

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const [filmes, setFilmes] = useState({
    populares: [],
    lancamentos: [],
    acao: [],
  });
  const [series, setSeries] = useState({
    populares: [],
    lancamentos: [],
    acao: [],
  });

  // Função para buscar dados por categoria
  const fetchCategoryData = (category, type) => {
    fetch(`${BASE_URL}/${type}/${category}?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => {
        if (type === 'movie') {
          setFilmes((prev) => ({ ...prev, [category]: data.results }));
        } else if (type === 'tv') {
          setSeries((prev) => ({ ...prev, [category]: data.results }));
        }
      })
      .catch((err) => console.error(`Erro ao carregar ${type} de categoria ${category}:`, err));
  };

  useEffect(() => {
    // Buscar categorias para filmes
    fetchCategoryData('popular', 'movie');
    fetchCategoryData('upcoming', 'movie');
    fetchCategoryData('action', 'movie'); // Pode mudar a categoria, por exemplo, 'action'

    // Buscar categorias para séries
    fetchCategoryData('popular', 'tv');
    fetchCategoryData('on_the_air', 'tv');
    fetchCategoryData('action', 'tv'); // Também podemos alterar para outra categoria
  }, []);

  return (
    <div className="p-6 space-y-10">
      {/* Filmes Populares */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Filmes Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filmes.populares.map((filme) => (
            <CardFilme key={filme.id} filme={filme} />
          ))}
        </div>
      </section>

      {/* Filmes de Lançamento */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Lançamentos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filmes.lancamentos.map((filme) => (
            <CardFilme key={filme.id} filme={filme} />
          ))}
        </div>
      </section>

      {/* Filmes de Ação */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Filmes de Ação</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filmes.acao.map((filme) => (
            <CardFilme key={filme.id} filme={filme} />
          ))}
        </div>
      </section>

      {/* Séries Populares */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Séries Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.populares.map((serie) => (
            <CardSerie key={serie.id} serie={serie} />
          ))}
        </div>
      </section>

      {/* Séries de Lançamento */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Séries em Lançamento</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.lancamentos.map((serie) => (
            <CardSerie key={serie.id} serie={serie} />
          ))}
        </div>
      </section>

      {/* Séries de Ação */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Séries de Ação</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.acao.map((serie) => (
            <CardSerie key={serie.id} serie={serie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
