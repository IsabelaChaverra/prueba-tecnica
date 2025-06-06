// src/services/authService.js

const USERS_URL = 'http://localhost:3001/users';

// Intentar iniciar sesión con email + password
export async function login({ email, password }) {
  const resp = await fetch(
    `${USERS_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  if (!resp.ok) throw new Error('Error de red en login');

  const usuarios = await resp.json();
  if (usuarios.length === 0) {
    throw new Error('Email o contraseña incorrectos');
  }
  return usuarios[0];
}

// Registrar nuevo usuario
export async function register({ email, password, name }) {
  const respCheck = await fetch(`${USERS_URL}?email=${encodeURIComponent(email)}`);
  const existentes = await respCheck.json();
  if (existentes.length > 0) {
    throw new Error('Ese correo ya está registrado');
  }
  const resp = await fetch(USERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!resp.ok) throw new Error('Error al registrar usuario');
  return resp.json();
}
