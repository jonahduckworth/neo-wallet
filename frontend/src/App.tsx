import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import LogoutButton from './components/LogoutButton';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (id: string) => {
    console.log("Logged in as:", id);
    setIsLoggedIn(true);
    setUserId(id);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="App">
        <AppRoutes isLoggedIn={isLoggedIn} userId={userId} handleLogin={handleLogin} />
        {isLoggedIn && <LogoutButton handleLogout={handleLogout} />}
      </div>
    </Router>
  );
}

export default App;
