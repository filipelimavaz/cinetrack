import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user } = useUser();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Olá, {user.name}!</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/filmes" className="text-blue-500 hover:underline">Ver Filmes</Link>
        <Link to="/series" className="text-blue-500 hover:underline">Ver Séries</Link>
        <Link to="/sobre" className="text-blue-500 hover:underline">Sobre</Link>
      </nav>
    </div>
  );
};

export default Home;