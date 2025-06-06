// src/services/subscriptionService.js

const API_URL = 'http://localhost:3001/subscriptions';

// Obtener todas las suscripciones
export async function getAllSubscriptions() {
  const resp = await fetch(API_URL);
  if (!resp.ok) throw new Error('Error al cargar suscripciones');
  return resp.json();
}

// Obtener una suscripción por id
export async function getSubscriptionById(id) {
  const resp = await fetch(`${API_URL}/${id}`);
  if (!resp.ok) throw new Error('Suscripción no encontrada');
  return resp.json();
}

// Crear nueva suscripción
export async function createSubscription({ nombre, costo, categoria, fechaRenovacion }) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, costo, categoria, fechaRenovacion }),
  });
  if (!resp.ok) throw new Error('Error al crear suscripción');
  return resp.json();
}

// Actualizar una suscripción existente
export async function updateSubscription(id, { nombre, costo, categoria, fechaRenovacion }) {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, costo, categoria, fechaRenovacion }),
  });
  if (!resp.ok) throw new Error('Error al actualizar suscripción');
  return resp.json();
}

// Eliminar una suscripción
export async function deleteSubscription(id) {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!resp.ok) throw new Error('Error al eliminar suscripción');
  return true;
}
