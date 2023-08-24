import React from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { Routes, Route, Navigate } from 'react-router-dom';

interface RouteProps {
  isLoggedIn: boolean;
  userId: string | null;
  handleLogin: (id: string) => void;
}

const AppRoutes: React.FC<RouteProps> = ({ isLoggedIn, userId, handleLogin }) => {
  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard userId={userId!} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
