// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('authUser');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <span className="navbar-brand">PixelHub</span>
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
