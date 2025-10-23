import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, isLoading }) {
  if (isLoading) {
    return <div className="loading">Завантаження нотаток...</div>;
  }

  if (notes.length === 0) {
    return <div className="empty">Поки що нотаток немає. Створіть першу!</div>;
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;