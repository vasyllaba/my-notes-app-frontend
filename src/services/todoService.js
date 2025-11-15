import axios from 'axios';
import { getAuthHeader } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// Додаємо Auth header до кожного запиту
apiClient.interceptors.request.use(
  (config) => {
    const authHeader = getAuthHeader();
    if (authHeader) {
      config.headers.Authorization = authHeader;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Отримати всі TODO (з фільтром)
export const getAllTodos = async (filter = 'all') => {
  try {
    const params = filter !== 'all' ? { filter } : {};
    const response = await apiClient.get('/todos', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Створити новий TODO
export const createTodo = async (title) => {
  try {
    const response = await apiClient.post('/todos', { title });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Перемкнути completed
export const toggleTodo = async (id) => {
  try {
    const response = await apiClient.patch(`/todos/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

// Видалити TODO
export const deleteTodo = async (id) => {
  try {
    await apiClient.delete(`/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
