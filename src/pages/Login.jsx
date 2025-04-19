import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

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
      login(usuarioEncontrado);
      navigate('/home');
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>

        {/* Botão para cadastro */}
        <div className="mt-4 text-center">
          <p className="text-sm mb-2">Não tem uma conta?</p>
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="text-blue-600 hover:underline"
          >
            Criar conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
