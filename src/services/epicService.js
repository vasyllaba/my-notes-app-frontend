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

// Отримати всі епіки (з фільтром)
export const getAllEpics = async (filter = 'all') => {
  try {
    const params = filter !== 'all' ? { filter } : {};
    const response = await apiClient.get('/epics', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching epics:', error);
    throw error;
  }
};

// Отримати епік з тасками
export const getEpicWithTasks = async (epicId) => {
  try {
    const response = await apiClient.get(`/epics/${epicId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching epic:', error);
    throw error;
  }
};

// Створити новий епік
export const createEpic = async (epicData) => {
  try {
    const response = await apiClient.post('/epics', epicData);
    return response.data;
  } catch (error) {
    console.error('Error creating epic:', error);
    throw error;
  }
};

// Оновити епік
export const updateEpic = async (id, epicData) => {
  try {
    const response = await apiClient.put(`/epics/${id}`, epicData);
    return response.data;
  } catch (error) {
    console.error('Error updating epic:', error);
    throw error;
  }
};

// Перемкнути completed
export const toggleEpic = async (id) => {
  try {
    const response = await apiClient.patch(`/epics/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling epic:', error);
    throw error;
  }
};

// Видалити епік
export const deleteEpic = async (id) => {
  try {
    await apiClient.delete(`/epics/${id}`);
  } catch (error) {
    console.error('Error deleting epic:', error);
    throw error;
  }
};

// Додати таску до епіка
export const addTaskToEpic = async (epicId, taskId) => {
  try {
    await apiClient.post(`/epics/${epicId}/tasks/${taskId}`);
  } catch (error) {
    console.error('Error adding task to epic:', error);
    throw error;
  }
};

// Видалити таску з епіка
export const removeTaskFromEpic = async (taskId) => {
  try {
    await apiClient.delete(`/epics/tasks/${taskId}`);
  } catch (error) {
    console.error('Error removing task from epic:', error);
    throw error;
  }
};