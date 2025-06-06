import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    costo: '',
    categoria: '',
    fechaRenovacion: ''
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3000/subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error al cargar suscripciones', error);
      Swal.fire('Error', 'No se pudo cargar la información', 'error');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.costo || !form.categoria || !form.fechaRenovacion) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        Swal.fire('Éxito', 'Suscripción registrada', 'success');
        setForm({ nombre: '', costo: '', categoria: '', fechaRenovacion: '' });
        setFormVisible(false);
        fetchSubscriptions();
      } else {
        throw new Error('Error al registrar');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo registrar la suscripción', 'error');
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Mis Suscripciones</h2>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </div>

      <div className="hero-panel">
        <h1 className="hero-title">Bienvenida, Isabela</h1>
        <p className="hero-subtitle">Tienes {subscriptions.length} suscripción{subscriptions.length !== 1 && 'es'} activas</p>

        <button onClick={() => setFormVisible(!formVisible)} className="hero-button">
          {formVisible ? 'Cancelar' : '➕ Nueva suscripción'}
        </button>
      </div>

      {subscriptions.length === 0 && (
        <div className="tarjeta-ejemplo">
          <h3><span style={{ color: '#e50914' }}>Ejemplo:</span> Netflix</h3>
          <p><strong>Categoría:</strong> Streaming</p>
          <p><strong>Costo:</strong> $29.000</p>
          <p><strong>Renovación:</strong> Cada mes</p>
        </div>
      )}

      {formVisible && (
        <form onSubmit={handleCreate} className="formulario">
          <input type="text" name="nombre" placeholder="Nombre del servicio" value={form.nombre} onChange={handleChange} />
          <input type="number" name="costo" placeholder="Costo mensual" value={form.costo} onChange={handleChange} />
          <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
          <input type="date" name="fechaRenovacion" placeholder="Fecha de renovación" value={form.fechaRenovacion} onChange={handleChange} />
          <button type="submit">Registrar</button>
        </form>
      )}

      <div className="grid-subscriptions">
        {subscriptions.map(sub => (
          <div key={sub.id} className="subscription-card">
            <h3>{sub.nombre}</h3>
            <p><strong>Costo:</strong> ${sub.costo}</p>
            <p><strong>Categoría:</strong> {sub.categoria}</p>
            <p><strong>Renovación:</strong> {sub.fechaRenovacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
