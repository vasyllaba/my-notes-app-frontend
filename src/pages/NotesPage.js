import React, { useState, useEffect } from 'react';
import '../styles/NotesHistoryPage.css';
import { getAllNotes, createNote } from '../services/noteService';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

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

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      try {
        const createdNote = await createNote(newNote);
        setNotes([createdNote, ...notes]);
        setNewNote('');
        setShowNewNoteForm(false);
      } catch (error) {
        alert('Помилка при створенні запису');
      }
    }
  };

  // Групуємо записи по днях
  const groupNotesByDate = (notes) => {
    const groups = {};
    notes.forEach(note => {
      const date = new Date(note.createdAt);
      const dateKey = date.toLocaleDateString('uk-UA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(note);
    });
    return groups;
  };

  const groupedNotes = groupNotesByDate(notes);

  return (
    <div className="notes-history-page">
      <div className="page-header">
        <div>
          <h2>📝 Історія записів</h2>
          <p>Всі ваші швидкі записи та нотатки</p>
        </div>
        <button 
          className="add-btn"
          onClick={() => setShowNewNoteForm(!showNewNoteForm)}
        >
          {showNewNoteForm ? '✕ Закрити' : '+ Новий запис'}
        </button>
      </div>

      {showNewNoteForm && (
        <div className="new-note-form">
          <form onSubmit={handleCreateNote}>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Напишіть ваш запис..."
              rows="5"
              autoFocus
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                💾 Зберегти
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowNewNoteForm(false);
                  setNewNote('');
                }}
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Завантаження записів...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>📭 Поки що немає записів</p>
          <p className="empty-hint">Створіть свій перший запис</p>
        </div>
      ) : (
        <div className="notes-timeline">
          {Object.entries(groupedNotes).map(([date, dayNotes]) => (
            <div key={date} className="day-group">
              <div className="day-separator">
                <span className="day-label">{date}</span>
              </div>
              <div className="notes-list">
                {dayNotes.map(note => (
                  <div key={note.id} className="note-card">
                    <div className="note-time">
                      {new Date(note.createdAt).toLocaleTimeString('uk-UA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="note-content">{note.content}</div>
                    <div className="note-actions">
                      <button className="btn-icon" title="Редагувати">✏️</button>
                      <button className="btn-icon" title="Видалити">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;