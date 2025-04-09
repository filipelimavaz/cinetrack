import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4">404 - Página não encontrada</h1>
      <Link to="/" className="text-blue-600 underline">Voltar ao início</Link>
    </div>
  );
}

export default NotFound;