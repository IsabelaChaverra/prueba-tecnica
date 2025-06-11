# 📺 Prueba Técnica: Gestión de Suscripciones Digitales

Este proyecto es una aplicación web desarrollada con **React** como parte de la prueba técnica para optar al título de Técnica en Desarrollo de Software en el CESDE. Su objetivo es permitir a los usuarios gestionar sus suscripciones digitales de forma práctica y segura.

---

## 🌐 Funcionalidades principales

✅ Inicio de sesión con autenticación simulada mediante JSON Server  
✅ Validación de credenciales desde la API (`json-server`)  
✅ Registro de nuevos usuarios (opcional como funcionalidad "plus")  
✅ Protección de rutas privadas (no accesibles sin login)  
✅ Panel principal con información personalizada del usuario logueado  
✅ Registro de nuevas suscripciones con los siguientes datos:
- Nombre del servicio
- Costo mensual
- Categoría
- Fecha de renovación

✅ Listado de suscripciones en forma de tarjetas  
✅ Buscador para filtrar por nombre o categoría  
✅ Edición de suscripciones  
✅ Eliminación de suscripciones con confirmación por SweetAlert2  
✅ Cierre de sesión con limpieza del estado de usuario

---

## 🚀 Tecnologías usadas

- **React**
- **React Router DOM**
- **JSON Server** para simular un backend
- **SweetAlert2** para alertas amigables
- **CSS personalizado** inspirado en la interfaz de Netflix

---

## 🖼️ Pantalla principal

La aplicación inicia en una pantalla tipo portada de Netflix, con un botón de "Iniciar sesión" en la parte superior, y un campo para ingresar correo electrónico como pre-registro.

---

## 🔐 Login de prueba

Puedes usar alguno de estos usuarios de ejemplo (cargados en `db.json`):

```json
{
  "email": "admin@pixelhub.com",
  "password": "123456",
  "name": "Admin"
}
```

---

## ⚙️ Instalación y ejecución local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/prueba-tecnica.git

# Entrar al proyecto
cd prueba-tecnica

# Instalar dependencias
npm install

# Iniciar servidor JSON
json-server --watch db.json --port 3000

# En otra terminal, correr el frontend
npm run dev
```

---

## 📁 Estructura del proyecto

```
src/
│
├── components/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── Home.jsx
├── routes/
│   └── AppRoutes.jsx
│   └── PrivateRoute.jsx
├── styles/
│   └── *.css
├── App.jsx
└── main.jsx
```

---

## 📌 Requisitos técnicos cumplidos

- [x] Inicio de sesión
- [x] Validación contra la API (json-server)
- [x] Redirección al dashboard
- [x] Protección de rutas
- [x] Registro de usuario (plus)
- [x] Registrar suscripciones
- [x] Listado de suscripciones
- [x] Búsqueda de suscripciones
- [x] Edición y eliminación
- [x] Cierre de sesión

---

## ✨ Autora

**Isabela Chaverra Cano**  
Técnica en Desarrollo de Software  
CESDE
