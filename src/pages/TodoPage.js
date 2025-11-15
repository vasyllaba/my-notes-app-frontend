import React, { useState, useEffect } from 'react';
import TodoForm from '../components/todos/TodoForm';
import TodoList from '../components/todos/TodoList';
import TodoFilters from '../components/todos/TodoFilters';
import { getAllTodos, createTodo, toggleTodo, deleteTodo } from '../services/todoService';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, [filter]);

  useEffect(() => {
    // Завантажуємо всі TODO для підрахунку
    loadAllTodos();
  }, [todos]);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTodos(filter);
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllTodos = async () => {
    try {
      const data = await getAllTodos('all');
      setAllTodos(data);
    } catch (error) {
      console.error('Failed to load all todos:', error);
    }
  };

  const handleTodoCreated = async (title) => {
    const newTodo = await createTodo(title);
    if (filter === 'all' || filter === 'active') {
      setTodos([newTodo, ...todos]);
    }
    setAllTodos([newTodo, ...allTodos]);
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await toggleTodo(id);
      
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ).filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      }));

      setAllTodos(allTodos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      alert('Помилка при оновленні завдання');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Видалити це завдання?')) return;
    
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setAllTodos(allTodos.filter(todo => todo.id !== id));
    } catch (error) {
      alert('Помилка при видаленні завдання');
    }
  };

  const counts = {
    all: allTodos.length,
    active: allTodos.filter(t => !t.completed).length,
    completed: allTodos.filter(t => t.completed).length
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>✓ TODO List</h2>
        <p>Керуйте своїми завданнями</p>
      </div>

      <TodoForm onTodoCreated={handleTodoCreated} />
      
      <TodoFilters 
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      <TodoList 
        todos={todos}
        isLoading={isLoading}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default TodoPage;
