import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import "../styles/About.css"

function About() {
  const { user } = useUser();

  // Função para calcular a idade
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

  return (
    <div className="about-page">
      <div className="about-container">
        <h2>Perfil de {user?.usuario}</h2>
        <div className="about-info">
          <p><span>Idade:</span> {idade} anos</p>
          <p><span>Email:</span> {user?.email}</p>
        </div>
        <Link to="/home">Voltar para Home</Link>
      </div>
    </div>
  );
}

export default About;
