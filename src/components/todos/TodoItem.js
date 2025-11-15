import React from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

function TodoItem({ todo, onToggle, onDelete }) {
  const formattedDate = format(
    new Date(todo.createdAt),
    "dd MMM yyyy, HH:mm",
    { locale: uk }
  );

  const completedDate = todo.completedAt 
    ? format(new Date(todo.completedAt), "dd MMM yyyy, HH:mm", { locale: uk })
    : null;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`}></label>
      </div>

      <div className="todo-content">
        <div className="todo-title">{todo.title}</div>
        
        {/* ← ДОДАНО показ опису */}
        {todo.description && (
          <div className="todo-description-text">
            {todo.description}
          </div>
        )}
        
        <div className="todo-date">
          {todo.completed 
            ? `Виконано: ${completedDate}`
            : `Створено: ${formattedDate}`
          }
        </div>
      </div>

      <button 
        onClick={() => onDelete(todo.id)} 
        className="todo-delete-button"
        title="Видалити"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
