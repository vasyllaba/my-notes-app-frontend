import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/notes';

// Отримати всі нотатки
export const getAllNotes = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Створити нову нотатку
export const createNote = async (content) => {
  try {
    const response = await axios.post(API_BASE_URL, { content });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};