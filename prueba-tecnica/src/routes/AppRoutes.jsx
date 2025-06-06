import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';          // ✅ Nueva página de inicio
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página inicial tipo Netflix */}
      <Route path="/" element={<Home />} />

      {/* Login y Registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Cualquier ruta inválida va al home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
