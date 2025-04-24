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

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposVazios = Object.values(formData).some(val => !val.trim());
    if (camposVazios) {
      alert('Preencha todos os campos.');
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

          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="subtitle-cadastro"
          />
          <input
            type="text"
            name="sobrenome"
            placeholder="Sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            className="subtitle-cadastro"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="subtitle-cadastro"
          />
          <input
            type="date"
            name="dataNascimento"
            placeholder="Data de nascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="subtitle-cadastro"
          />
          <input
            type="text"
            name="usuario"
            placeholder="Nome de usuário"
            value={formData.usuario}
            onChange={handleChange}
            className="subtitle-cadastro"
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
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
              className="button-entrar"
              type="button"
              onClick={() => navigate('/login')}
            
            >
              Entre
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
