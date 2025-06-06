import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    costo: '',
    categoria: '',
    fechaRenovacion: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.costo || !form.categoria || !form.fechaRenovacion) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const url = `http://localhost:3000/subscriptions${editingId ? `/${editingId}` : ''}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        Swal.fire(
          editingId ? 'Actualizado' : 'Registrado',
          `Suscripción ${editingId ? 'actualizada' : 'registrada'} correctamente`,
          'success'
        );
        setForm({ nombre: '', costo: '', categoria: '', fechaRenovacion: '' });
        setFormVisible(false);
        setEditingId(null);
        fetchSubscriptions();
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar la suscripción', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás segura?',
      text: 'Esta suscripción se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e50914',
      cancelButtonColor: '#333',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/subscriptions/${id}`, {
          method: 'DELETE'
        });
        Swal.fire('Eliminado', 'La suscripción ha sido eliminada', 'success');
        fetchSubscriptions();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar la suscripción', 'error');
      }
    }
  };

  const handleEdit = (sub) => {
    setForm(sub);
    setEditingId(sub.id);
    setFormVisible(true);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Mis Suscripciones</h2>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </div>

      <div className="bienvenida">
        <h1>Bienvenida, {user?.name || user?.email || 'Usuario'}</h1>
        <p>Tienes <strong>{subscriptions.length}</strong> suscripciones activas.</p>
      </div>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {subscriptions.length === 0 && (
        <div className="tarjeta-ejemplo">
          <h3><span style={{ color: '#e50914' }}>Ejemplo:</span> Netflix</h3>
          <p><strong>Categoría:</strong> Streaming</p>
          <p><strong>Costo:</strong> $29.000</p>
          <p><strong>Renovación:</strong> Cada mes</p>
        </div>
      )}

      {!formVisible && (
        <button onClick={() => setFormVisible(true)} className="toggle-form-btn">
          ➕ Nueva suscripción
        </button>
      )}

      {formVisible && (
        <>
          <form onSubmit={handleCreateOrUpdate} className="formulario">
            <input type="text" name="nombre" placeholder="Nombre del servicio" value={form.nombre} onChange={handleChange} />
            <input type="number" name="costo" placeholder="Costo mensual" value={form.costo} onChange={handleChange} />
            <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
            <input type="date" name="fechaRenovacion" placeholder="Fecha de renovación" value={form.fechaRenovacion} onChange={handleChange} />
            <button type="submit">{editingId ? 'Actualizar' : 'Registrar'}</button>
          </form>

          <button
            onClick={() => {
              setFormVisible(false);
              setForm({ nombre: '', costo: '', categoria: '', fechaRenovacion: '' });
              setEditingId(null);
            }}
            className="cancelar-btn"
          >
            Cancelar
          </button>
        </>
      )}

      <div className="grid-subscriptions">
        {filteredSubscriptions.map(sub => (
          <div key={sub.id} className="subscription-card">
            <h3>{sub.nombre}</h3>
            <p><strong>Costo:</strong> ${sub.costo}</p>
            <p><strong>Categoría:</strong> {sub.categoria}</p>
            <p><strong>Renovación:</strong> {sub.fechaRenovacion}</p>
            <button className="delete-btn" onClick={() => handleDelete(sub.id)}>
              🗑️ Eliminar
            </button>
            <button className="edit-btn" onClick={() => handleEdit(sub)}>
              ✏️ Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
