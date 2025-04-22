import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Cadastrar</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de nascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="usuario"
          placeholder="Nome de usuário"
          value={formData.usuario}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
