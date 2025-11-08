import React, { useState } from 'react';
import { saveCredentials } from '../services/authService';
import axios from 'axios';

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Перевіряємо credentials через запит до /api/auth/me
      const token = btoa(`${username}:${password}`);
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
      
      await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });

      // Якщо успішно - зберігаємо
      saveCredentials(username, password);
      onLogin();
    } catch (err) {
      setError('Невірний логін або пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
        <p className="auth-switch">
          Немає акаунту?{' '}
          <button onClick={onSwitchToRegister} className="link-button">
            Зареєструватись
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
