// src/ProtectedLayout.jsx
import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => (
  <>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
  </>
);

export default ProtectedLayout;
