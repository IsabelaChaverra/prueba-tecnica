import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // Cargar email desde localStorage si existe
  useEffect(() => {
    const savedEmail = localStorage.getItem('preEmail');
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const exists = users.find(u => u.email === form.email);

    if (exists) {
      return Swal.fire("Error", "El usuario ya existe", "error");
    }

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    Swal.fire("Éxito", "Usuario registrado correctamente", "success");

    // Limpiar email temporal
    localStorage.removeItem('preEmail');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
