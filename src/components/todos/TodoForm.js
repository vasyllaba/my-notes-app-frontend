import React, { useState } from 'react';

function TodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Будь ласка, введіть назву завдання');
      return;
    }

    setIsLoading(true);
    try {
      await onTodoCreated(title);
      setTitle('');
    } catch (error) {
      alert('Помилка при створенні завдання');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Що потрібно зробити?"
        disabled={isLoading}
        className="todo-input"
      />
      <button type="submit" disabled={isLoading} className="todo-add-button">
        {isLoading ? 'Додавання...' : '+ Додати'}
      </button>
    </form>
  );
}

export default TodoForm;
