import React, { useState } from 'react';
import './App.css';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard userId={userId!} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
