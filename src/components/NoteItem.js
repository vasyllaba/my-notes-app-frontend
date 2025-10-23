import React from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

function NoteItem({ note }) {
  // Форматування дати
  const formattedDate = format(
    new Date(note.createdAt),
    "dd MMM yyyy, HH:mm",
    { locale: uk }
  );

  return (
    <div className="note-item">
      <div className="note-content">{note.content}</div>
      <div className="note-date">{formattedDate}</div>
    </div>
  );
}

export default NoteItem;