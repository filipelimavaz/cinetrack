// src/pages/About.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

function About() {
  const { user } = useUser();

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Informações sobre o usuário {user?.name}!
      </h2>
      <Link to="/home" className="text-blue-600 underline">
        Voltar para Home
      </Link>
    </div>
  );
}

export default About;
