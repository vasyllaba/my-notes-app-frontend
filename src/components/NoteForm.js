import React, { useState } from 'react';

function NoteForm({ onNoteCreated }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Запобігає перезавантаженню сторінки
    
    if (content.trim() === '') {
      alert('Будь ласка, введіть текст нотатки');
      return;
    }

    setIsLoading(true);
    try {
      await onNoteCreated(content);
      setContent(''); // Очистити поле після успішного створення
    } catch (error) {
      alert('Помилка при створенні нотатки');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введіть вашу нотатку..."
        rows="5"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Збереження...' : 'Додати нотатку'}
      </button>
    </form>
  );
}

export default NoteForm;