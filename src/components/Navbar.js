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
        <h1>📊 Productivity Tracker</h1>
      </div>
      
      <div className="navbar-links">
        <Link
          to="/calendar"
          className={location.pathname === '/calendar' ? 'active' : ''}
        >
          📅 Календар
        </Link>
        <Link
          to="/backlog"
          className={location.pathname === '/backlog' ? 'active' : ''}
        >
          📋 Backlog
        </Link>
        <Link
          to="/notes"
          className={location.pathname === '/notes' ? 'active' : ''}
        >
          📝 Записи
        </Link>
        <Link
          to="/statistics"
          className={location.pathname === '/statistics' ? 'active' : ''}
        >
          📈 Статистика
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