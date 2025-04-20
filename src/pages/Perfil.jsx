import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../styles/Perfil.css';

function Perfil() {
  const { user } = useUser();
  const [avaliacoesRecentes, setAvaliacoesRecentes] = useState([]);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const idade = user?.nascimento ? calcularIdade(user.nascimento) : null;

  useEffect(() => {
    // Pega todas as avaliações do localStorage
    const allAvaliacoes = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('avaliacao-')) {
        const avaliacao = JSON.parse(localStorage.getItem(key));
        allAvaliacoes.push(avaliacao);
      }
    });

    // Filtra por avaliações com status "visto" ou "dropado"
    const feitas = allAvaliacoes.filter(a =>
      a.status === 'visto' || a.status === 'dropado'
    );

    // Ordena pela data (se existir) ou apenas pega as mais recentes
    const recentes = feitas.slice(-10).reverse(); // Últimas 10

    setAvaliacoesRecentes(recentes);
  }, []);

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <h2>Perfil de {user?.usuario}</h2>
        <div className="perfil-info">
          <p><span>Idade:</span> {idade} anos</p>
          <p><span>Email:</span> {user?.email}</p>
        </div>

        <div className="avaliacoes-recentes">
          <h3>Avaliações Recentes</h3>
          {avaliacoesRecentes.length === 0 ? (
            <p>Você ainda não avaliou nenhum título.</p>
          ) : (
            <div className="carrossel">
              {avaliacoesRecentes.map((avaliacao, index) => (
                <Link
                  key={index}
                  to={`/detalhesAvaliacao/${avaliacao.tipo}/${avaliacao.id}`}
                  className="card"
                  style={{ width: '140px', textAlign: 'center' }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${avaliacao.poster_path}`}
                    alt={avaliacao.titulo}
                    className="poster"
                  />
                  <p className="nota">Nota: {avaliacao.nota}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
