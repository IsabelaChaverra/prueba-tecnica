// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleComenzar = () => {
    if (!email) { 
      alert('Por favor ingresa tu email');
      return;
    }

    // Guardamos el email en localStorage para usarlo en Login o Register
    localStorage.setItem('preEmail', email);
    navigate('/register'); // o puedes poner '/login' si prefieres
  };

  return (
    <>
      <div className="overlay"></div>

      <div className="top-bar">
        <button className="login-btn" onClick={() => navigate('/login')}>
          Iniciar sesión
        </button>
      </div>

      <div className="home-container">
        <h1 className="home-title">Películas y series ilimitadas y mucho más</h1>
        <p className="home-subtitle">A partir de $18.900. Cancela cuando quieras.</p>
        <p className="home-description">
          ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.
        </p>

        <div className="email-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="start-btn" onClick={handleComenzar}>
            Comenzar <span className="arrow">➤</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
