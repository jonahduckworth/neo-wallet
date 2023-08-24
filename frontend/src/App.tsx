import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

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
        <AppRoutes isLoggedIn={isLoggedIn} userId={userId} handleLogin={handleLogin} />
      </div>
    </Router>
  );
}

export default App;
