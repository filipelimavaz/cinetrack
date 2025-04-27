import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../styles/Perfil.css';
import StarRate from '../components/StarRate';

function Perfil() {
  const { user } = useUser();
  const [avaliacoesRecentes, setAvaliacoesRecentes] = useState([]);
  const [desejos, setDesejos] = useState([]);
  const carrosselRefs = useRef({});

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return null;

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const idade = user?.dataNascimento ? calcularIdade(user.dataNascimento) : null;

  useEffect(() => {
    if (!user) return;

    const allAvaliacoes = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('avaliacao-') && key.endsWith(`-${user.id}`)) {
        const avaliacao = JSON.parse(localStorage.getItem(key));
        allAvaliacoes.push(avaliacao);
      }
    });

    const feitas = allAvaliacoes.filter(a =>
      a.status === 'visto' || a.status === 'dropado'
    );
    const recentes = feitas.slice(-10).reverse();
    setAvaliacoesRecentes(recentes);

    const desejosAssistir = allAvaliacoes.filter(a => a.status === 'deseja_assistir');
    setDesejos(desejosAssistir);
  }, [user]);

  const scrollLeft = (key) => {
    const carousel = carrosselRefs.current[key];
    if (carousel) {
      carousel.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };
  
  const scrollRight = (key) => {
    const carousel = carrosselRefs.current[key];
    if (carousel) {
      carousel.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <h2>Perfil de {user?.usuario}</h2>
        <div className="perfil-info">
          <p><span>Idade:</span> {idade !== null ? `${idade} anos` : 'Idade não informada'}</p>
          <p><span>Email:</span> {user?.email}</p>
        </div>

        <div className="assistidos-recentemente">
          <h3>Assistidos recentemente</h3>

          {avaliacoesRecentes.length === 0 ? (
            <p>Você ainda não adicionou nenhum título como "desejo assistir".</p>
          ) : (
            <div className="perfil-carousel-container">
              <button className="perfil-carousel-btn perfil-carousel-btn-left" onClick={() => scrollLeft(`perfil-serie-${user.id}`)}>
                &lt;
              </button>

              <div id={`perfil-serie-${user.id}`} className="perfil-carrossel" ref={el => carrosselRefs.current[`perfil-serie-${user.id}`] = el}>
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
                    <div className="nota">
                      <StarRate rate={avaliacao.nota} onRate={() => {}} readonly={true} size={20} />
                    </div>
                  </Link>
                ))}
              </div>

              <button className="perfil-carousel-btn perfil-carousel-btn-right" onClick={() => scrollRight(`perfil-serie-${user.id}`)}>&gt;</button>
            </div>
          )}
        </div>

        <div className="desejos-assistir">
          <h3>Pretendo Assistir</h3>

          {desejos.length === 0 ? (
            <p>Você ainda não adicionou nenhum título como "desejo assistir".</p>
          ) : (
            <div className="perfil-carousel-container">
              <button className="perfil-carousel-btn perfil-carousel-btn-left" onClick={() => scrollLeft(`perfil-desejos-${user.id}`)}>&lt;</button>

              <div id={`perfil-desejos-${user.id}`} className="perfil-carrossel" ref={el => carrosselRefs.current[`perfil-desejos-${user.id}`] = el}>
                {desejos.map((desejo, index) => (
                  <Link
                    key={index}
                    to={`/detalhesAvaliacao/${desejo.tipo}/${desejo.id}`}
                    className="card"
                    style={{ width: '140px', textAlign: 'center' }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${desejo.poster_path}`}
                      alt={desejo.titulo}
                      className="poster"
                    />
                    <p className="titulo">{desejo.titulo}</p>
                  </Link>
                ))}
              </div>

              <button className="perfil-carousel-btn perfil-carousel-btn-right" onClick={() => scrollRight(`perfil-desejos-${user.id}`)}>&gt;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
