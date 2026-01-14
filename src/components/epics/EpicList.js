import React from 'react';
import EpicCard from './EpicCard';

function EpicList({ epics, isLoading, onEpicClick, onEdit, onToggle, onDelete }) {
  if (isLoading) {
    return <div className="loading">Завантаження епіків...</div>;
  }

  if (epics.length === 0) {
    return <div className="empty">Поки що епіків немає. Створіть перший!</div>;
  }

  return (
    <div className="epic-list">
      {epics.map(epic => (
        <EpicCard
          key={epic.id}
          epic={epic}
          onClick={() => onEpicClick(epic)}
          onEdit={() => onEdit(epic)}
          onToggle={() => onToggle(epic.id)}
          onDelete={() => onDelete(epic.id)}
        />
      ))}
    </div>
  );
}

export default EpicList;