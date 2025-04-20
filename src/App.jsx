import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Avaliacao from './pages/Avaliacao';
import { useUser } from './context/UserContext';
import Header from './components/Header';
import ResultadosBusca from './pages/ResultadosBusca';
import Listas from './pages/Listas';  // Corrija o caminho de importação
import DetalhesAvaliacao from './pages/DetalhesAvaliacao';

const ProtectedLayout = () => (
  <>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
  </>
);

// Rota protegida
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} /> {/* ⬅️ Nova rota */}

      {/* Páginas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/series" element={<Series />} />
        <Route path="/avaliar/:tipo/:id" element={<Avaliacao />} />
        <Route path="/busca" element={<ResultadosBusca />} />
        <Route path="/listas" element={<Listas />} />
        <Route path="/detalhes/:tipo/:id" element={<DetalhesAvaliacao />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
