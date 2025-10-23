import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { getAllNotes, createNote } from './services/noteService';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Завантажити нотатки при старті
  useEffect(() => {
    loadNotes();
  }, []); // Пустий масив [] означає "виконати один раз при монтуванні"

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteCreated = async (content) => {
    const newNote = await createNote(content);
    // Додати нову нотатку на початок списку
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Мої нотатки</h1>
      </header>
      
      <main className="App-main">
        <NoteForm onNoteCreated={handleNoteCreated} />
        <NoteList notes={notes} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;