import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Реєстрація
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Збереження credentials
export const saveCredentials = (username, password) => {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
};

// Отримання credentials
export const getCredentials = () => {
  return {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password')
  };
};

// Перевірка чи залогінений
export const isAuthenticated = () => {
  const { username, password } = getCredentials();
  return !!(username && password);
};

// Logout
export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
};

// Створення Basic Auth header
export const getAuthHeader = () => {
  const { username, password } = getCredentials();
  if (username && password) {
    const token = btoa(`${username}:${password}`); // Base64 encode
    return `Basic ${token}`;
  }
  return null;
};