import React from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

function EpicCard({ epic, onClick, onEdit, onToggle, onDelete }) {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const createdDate = format(new Date(epic.createdAt), 'dd MMM yyyy', { locale: uk });

  return (
    <div
      className={`epic-card ${epic.completed ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className="epic-card-header">
        <div className="epic-card-title-row">
          <input
            type="checkbox"
            checked={epic.completed}
            onChange={handleToggleClick}
            onClick={(e) => e.stopPropagation()}
            className="epic-checkbox"
          />
          <h3 className="epic-card-title">{epic.title}</h3>
        </div>
        <div className="epic-card-actions">
          <button
            className="epic-edit-btn"
            onClick={handleEditClick}
            title="Редагувати"
          >
            ✏️
          </button>
          <button
            className="epic-delete-btn"
            onClick={handleDeleteClick}
            title="Видалити"
          >
            🗑️
          </button>
        </div>
      </div>

      {epic.description && (
        <div className="epic-card-description">{epic.description}</div>
      )}

      <div className="epic-card-footer">
        <span className="epic-date">Створено: {createdDate}</span>
        <span className="epic-click-hint">Натисніть для деталей →</span>
      </div>
    </div>
  );
}

export default EpicCard;