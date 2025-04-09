import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import Avaliacao from './pages/Avaliacao';
import { useUser } from './context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sobre"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/filmes"
        element={
          <ProtectedRoute>
            <Filmes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/series"
        element={
          <ProtectedRoute>
            <Series />
          </ProtectedRoute>
        }
      />
      <Route
        path="/avaliar/:tipo/:id"
        element={
          <ProtectedRoute>
            <Avaliacao />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
