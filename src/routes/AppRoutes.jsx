// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';           // Pantalla principal tipo Netflix
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';  // Ruta protegida

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1) Al abrir "/", mostrar Home */}
      <Route path="/" element={<Home />} />

      {/* 2) Rutas públicas de login y registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 3) Ruta protegida "/dashboard" */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* 4) Cualquier otra ruta inválida → redirigir a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
