import React from 'react';

function TodoFilters({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'Всі', count: counts.all },
    { key: 'active', label: 'Активні', count: counts.active },
    { key: 'completed', label: 'Завершені', count: counts.completed }
  ];

  return (
    <div className="todo-filters">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;
