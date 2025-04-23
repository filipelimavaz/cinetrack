import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Login.css'; // Adicione o caminho correto para o seu CSS

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuariosSalvos.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (usuarioEncontrado) {
      // Armazena os dados completos, inclusive ID
      login(usuarioEncontrado);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado)); // opcional, se quiser manter login
      navigate('/home');
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="main">
      <div className="left-login">
        <img
          src="CineTrack.png" // Substitua pelo URL da sua imagem
          alt="Imagem de fundo"
          className="bg-image"
        />
        <h1 className="welcome-text">Bem-vindo ao CineTrack</h1>
        <p className="description">
          O melhor lugar para acompanhar suas séries e filmes favoritos.
        </p>
      </div>
      <div className="right-login">
        <form
          onSubmit={handleSubmit}
          className="form-login"
        >
          <h2 className="title-login">Login</h2>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border p-2 mb-4"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border p-2 mb-4"
          />

          <button
            type="submit"
            className="button-entrar"
          >
            Entrar
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">Não tem uma conta?</p>
            <button
              type="button"
              onClick={() => navigate('/cadastro')}
              className="button-cadastrar"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
