import React, { useState } from 'react';
import { register, saveCredentials } from '../services/authService';

function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    if (password.length < 4) {
      setError('Пароль має бути мінімум 4 символи');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, password);
      // Після успішної реєстрації - автоматично логінимо
      saveCredentials(username, password);
      onRegister();
    } catch (err) {
      setError(err || 'Помилка реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Реєстрація</h2>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Реєстрація...' : 'Зареєструватись'}
          </button>
        </form>
        <p className="auth-switch">
          Вже є акаунт?{' '}
          <button onClick={onSwitchToLogin} className="link-button">
            Увійти
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
