import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';
import logo from '../assets/CineTrack.png'; 

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const gerarIdUnico = () => {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    } else {
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach(key => {
      if (!formData[key].trim() && key !== 'confirmarSenha') {
        newErrors[key] = 'Este campo é obrigatório';
        isValid = false;
      }
    });

    if (formData.dataNascimento) {
      const idade = calcularIdade(formData.dataNascimento);
      if (idade < 18) {
        newErrors.dataNascimento = 'Você precisa ter 18 anos ou mais';
        isValid = false;
      }
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(u => u.usuario === formData.usuario);
    if (usuarioExistente) {
      newErrors.usuario = 'Nome de usuário já cadastrado';
      isValid = false;
    }

    if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const novoUsuario = {
      id: gerarIdUnico(),
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      dataNascimento: formData.dataNascimento,
      usuario: formData.usuario,
      senha: formData.senha
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

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
              className={`input-full ${errors.nome ? 'input-error' : ''}`}
            />
            {errors.nome && <p className="error-message">{errors.nome}</p>}

            <label className="form-label">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              placeholder="Seu sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              className={`input-full ${errors.sobrenome ? 'input-error' : ''}`}
            />
            {errors.sobrenome && <p className="error-message">{errors.sobrenome}</p>}

            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className={`input-full ${errors.dataNascimento ? 'input-error' : ''}`}
            />
            {errors.dataNascimento && <p className="error-message">{errors.dataNascimento}</p>}
          </div>

          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            className={`subtitle-cadastro ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label className="form-label">Nome de usuário</label>
          <input
            type="text"
            name="usuario"
            placeholder="Nome que você usará para entrar na plataforma"
            value={formData.usuario}
            onChange={handleChange}
            className={`subtitle-cadastro ${errors.usuario ? 'input-error' : ''}`}
          />
          {errors.usuario && <p className="error-message">{errors.usuario}</p>}

          <label className="form-label">Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Sua senha (mínimo 6 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            className={`subtitle-cadastro ${errors.senha ? 'input-error' : ''}`}
          />
          {errors.senha && <p className="error-message">{errors.senha}</p>}

          <label className="form-label">Confirmar Senha</label>
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            className={`subtitle-cadastro ${errors.confirmarSenha ? 'input-error' : ''}`}
          />
          {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha}</p>}

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
          src={logo}
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