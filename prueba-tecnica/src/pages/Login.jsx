import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // ✅ Si hay email guardado, precargarlo
  useEffect(() => {
    const savedEmail = localStorage.getItem('preEmail');
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users?email=${form.email}&password=${form.password}`);
      const data = await response.json();

      if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');

        // ✅ Limpiar email temporal después del login
        localStorage.removeItem('preEmail');

        navigate('/dashboard');
      } else {
        Swal.fire('Error', 'Correo o contraseña incorrectos', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
      console.error(error);
    }
  };

  return (
    <>
      <div className="overlay"></div>

      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
