import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, isLoading, onToggle, onDelete }) {
  if (isLoading) {
    return <div className="loading">Завантаження завдань...</div>;
  }

  if (todos.length === 0) {
    return <div className="empty">Завдань немає. Створіть перше!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
