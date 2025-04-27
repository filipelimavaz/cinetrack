import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    usuario: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const gerarIdUnico = () => {
    if (crypto?.randomUUID) {
      return crypto.randomUUID(); // Gera um UUID v4
    } else {
      // Fallback: timestamp + número aleatório
      return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
  };

  const calcularIdade = (dataNascimento) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposVazios = Object.values(formData).some(val => !val.trim());
    if (camposVazios) {
      alert('Preencha todos os campos.');
      return;
    }

    const idade = calcularIdade(formData.dataNascimento);
    if (idade < 18) {
      alert('Você precisa ter 18 anos ou mais para se cadastrar.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(u => u.usuario === formData.usuario);
    if (usuarioExistente) {
      alert('Nome de usuário já cadastrado!');
      return;
    }

    const novoUsuario = {
      id: gerarIdUnico(),
      ...formData
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert(`Cadastro realizado com sucesso!`);
    navigate('/login');
  };

  return (
    <div className="main">
      <div className="center-main">
        <form onSubmit={handleSubmit} className="form-cadastro">
          <h2 className="text-Cadastrar">Cadastrar</h2>

          <div className="form-row">
            <label className="form-label">Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              className="input-full"
            />

            <label className="form-label">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              placeholder="Seu sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              className="input-full"
            />

            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="input-full"
            />
          </div>

          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            className="subtitle-cadastro"
          />

          <label className="form-label">Nome de usuário</label>
          <input
            type="text"
            name="usuario"
            placeholder="Nome que você usuará para entrar na plataforma"
            value={formData.usuario}
            onChange={handleChange}
            className="subtitle-cadastro"
          />

          <label className="form-label">Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Sua senha"
            value={formData.senha}
            onChange={handleChange}
            className="subtitle-cadastro"
          />

          <button type="submit" className='button-cadastrar'>
            Cadastrar
          </button>

          <div className="text-botton">
            <p className="text">Já possui uma conta?</p>
            <button
              className="button-entrar-Cd"
              type="button"
              onClick={() => navigate('/login')}
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
      <div className='left-main'>
        <img
          src="CineTrack.png"
          alt="Imagem de fundo"
          className="bg-image"
        />
        <h1 className="welcome-text">Conheça já o CineTrack!</h1>
        <p className="description">
          O melhor lugar para acompanhar suas séries e filmes favoritos.
        </p>
        <p className="description">
          Crie sua conta e tenha acesso a um mundo de entretenimento.
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
