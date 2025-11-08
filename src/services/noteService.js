import axios from 'axios';
import { getAuthHeader } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Створюємо axios instance з автоматичним додаванням Auth header
const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// Interceptor для додавання Authorization header
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

// Отримати всі нотатки
export const getAllNotes = async () => {
  try {
    const response = await apiClient.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Створити нову нотатку
export const createNote = async (content) => {
  try {
    const response = await apiClient.post('/notes', { content });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};
