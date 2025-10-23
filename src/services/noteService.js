import axios from 'axios';

// Використовуємо environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

console.log('API URL:', API_BASE_URL); // Для дебагу

// Отримати всі нотатки
export const getAllNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Створити нову нотатку
export const createNote = async (content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notes`, { content });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};
