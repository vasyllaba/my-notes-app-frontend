import React from 'react';
import { format, parseISO } from 'date-fns';

function TaskCard({ task, onClick, onToggle, onDelete }) {
  const handleToggleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const dueTime = format(parseISO(task.dueDate), 'HH:mm');

  return (
    <div
      className={`task-card ${task.completed ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleClick}
          onClick={(e) => e.stopPropagation()}
          className="task-checkbox-small"
        />
        <span className="task-time">{dueTime}</span>
        {task.estimationHours && (
          <span className="task-estimation">⏱ {task.estimationHours}h</span>
        )}
      </div>

      <div className="task-card-title">{task.title}</div>

      {task.description && (
        <div className="task-card-description">{task.description}</div>
      )}

      <button
        className="task-delete-btn-small"
        onClick={handleDeleteClick}
        title="Видалити"
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskCard;