import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import NotesPage from './pages/NotesPage';
import TodoPage from './pages/TodoPage';
import { isAuthenticated } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} />
        
        <main className="App-main">
          <Routes>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/todos" element={<TodoPage />} />
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="*" element={<Navigate to="/notes" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;