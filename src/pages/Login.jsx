import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Login.css';
import logo from '../assets/CineTrack.png'; 

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const { login } = useUser();
  const navigate = useNavigate();
  const toastRef = useRef(null);

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.add('fade-out');
          setTimeout(() => setErro(null), 500);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  const handleClose = () => {
    if (toastRef.current) {
      toastRef.current.classList.add('fade-out');
      setTimeout(() => setErro(null), 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuariosSalvos.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      navigate('/home');
    } else {
      setErro('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="main">
      {erro && (
        <div className="error-toast" ref={toastRef}>
          <div className="error-toast-content">
            <div className="error-toast-message">
              <span className="error-icon">!</span>
              {erro}
            </div>
            <button 
              className="error-toast-close" 
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="left-login">
        <img
          src={logo}
          alt="Imagem de fundo"
          className="bg-image"
        />
        <h1 className="welcome-text">Bem-vindo ao CineTrack</h1>
        <p className="description">
          O melhor lugar para acompanhar suas séries e filmes favoritos.
        </p>
      </div>
      <div className="right-login">
        <form onSubmit={handleSubmit} className="form-login">
          <h2 className="title-login">Login</h2>
          
          <p className="subtitle-login">Nome ou email de usuario</p>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="box-user"
          />
          
          <p className="subtitle-senha">Senha</p>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="box-senha"
          />

          <button type="submit" className="button-entrar">
            Entrar
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">Não tem uma conta? </p>
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