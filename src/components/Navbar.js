import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout, getCredentials } from '../services/authService';

function Navbar({ onLogout }) {
  const location = useLocation();
  const { username } = getCredentials();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>📝 MyNotes</h1>
      </div>
      
      <div className="navbar-links">
        <Link 
          to="/notes" 
          className={location.pathname === '/notes' ? 'active' : ''}
        >
          📝 Нотатки
        </Link>
        <Link 
          to="/todos" 
          className={location.pathname === '/todos' ? 'active' : ''}
        >
          ✓ TODO
        </Link>
      </div>

      <div className="navbar-user">
        <span>Привіт, {username}!</span>
        <button onClick={handleLogout} className="logout-button">
          Вийти
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
