import axios from 'axios';
import { getAuthHeader } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

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

// Отримати всі таски (з фільтрами та діапазоном дат)
export const getAllTasks = async (filter = 'all', startDate = null, endDate = null) => {
  try {
    const params = {};
    if (filter !== 'all') params.filter = filter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await apiClient.get('/tasks', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Створити нову таску
export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Оновити таску
export const updateTask = async (id, taskData) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Перемкнути completed
export const toggleTask = async (id) => {
  try {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling task:', error);
    throw error;
  }
};

// Видалити таску
export const deleteTask = async (id) => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};