import React, { useState } from 'react';

function TodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Будь ласка, введіть назву завдання');
      return;
    }

    setIsLoading(true);
    try {
      await onTodoCreated(title, description);
      setTitle('');
       setDescription('');
    } catch (error) {
      alert('Помилка при створенні завдання');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-form-fields">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Що потрібно зробити?"
          disabled={isLoading}
          className="todo-input"
        />
        
        {/* ← ДОДАНО поле опису */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис (опціонально)"
          disabled={isLoading}
          className="todo-description"
          rows="2"
        />
      </div>
      
      <button type="submit" disabled={isLoading} className="todo-add-button">
        {isLoading ? 'Додавання...' : '+ Додати'}
      </button>
    </form>
  );
}

export default TodoForm;
