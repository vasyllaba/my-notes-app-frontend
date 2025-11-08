import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { getAllNotes, createNote } from './services/noteService';
import { isAuthenticated, logout, getCredentials } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Перевіряємо чи є збережені credentials
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      loadNotes();
    }
  }, []);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
      // Якщо 401 - logout
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteCreated = async (content) => {
    const newNote = await createNote(content);
    setNotes([newNote, ...notes]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    loadNotes();
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
    loadNotes();
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setNotes([]);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  const { username } = getCredentials();

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Мої нотатки</h1>
        <div className="user-info">
          <span>Привіт, {username}!</span>
          <button onClick={handleLogout} className="logout-button">
            Вийти
          </button>
        </div>
      </header>
      
      <main className="App-main">
        <NoteForm onNoteCreated={handleNoteCreated} />
        <NoteList notes={notes} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
