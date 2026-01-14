import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { getAllNotes, createNote } from '../services/noteService';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

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
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Мої нотатки </h2>
        <p>Записуйте свої думки та ідеї</p>
      </div>
      
      <NoteForm onNoteCreated={handleNoteCreated} />
      <NoteList notes={notes} isLoading={isLoading} />
    </div>
  );
}

export default NotesPage;
