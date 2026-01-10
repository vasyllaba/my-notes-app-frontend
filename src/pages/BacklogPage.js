import React, { useState } from 'react';
import '../styles/BacklogPage.css';

function BacklogPage() {
  const [filter, setFilter] = useState('all'); // all, tasks, epics
  const [backlogTasks, setBacklogTasks] = useState([
    { id: 1, title: 'Вивчити TypeScript Generics', type: 'task', tags: ['Навчання', 'Програмування'] },
    { id: 2, title: 'Прочитати книгу про психологію', type: 'task', tags: ['Психологія', 'Читання'] },
    { id: 3, title: 'Зробити ремонт кімнати', type: 'task', tags: ['Дім', 'Сім\'я'] }
  ]);
  const [backlogEpics, setBacklogEpics] = useState([
    {
      id: 1,
      title: 'Курс Node.js',
      description: 'Повний курс по Backend розробці',
      tags: ['Навчання', 'Програмування'],
      tasks: [
        { id: 1, title: 'Модуль 1: Основи', estimated: 0, scheduled: false },
        { id: 2, title: 'Модуль 2: Express', estimated: 0, scheduled: false },
        { id: 3, title: 'Модуль 3: Database', estimated: 0, scheduled: false }
      ]
    },
    {
      id: 2,
      title: 'Спортивна форма',
      description: 'План тренувань на рік',
      tags: ['Здоров\'я', 'Спорт'],
      tasks: [
        { id: 1, title: 'Кардіо 30 хв', estimated: 0, scheduled: false },
        { id: 2, title: 'Силові вправи', estimated: 0, scheduled: false }
      ]
    }
  ]);
  const [selectedEpic, setSelectedEpic] = useState(null);

  const filteredTasks = filter === 'all' || filter === 'tasks' ? backlogTasks : [];
  const filteredEpics = filter === 'all' || filter === 'epics' ? backlogEpics : [];

  const hasUnscheduledTasks = (epic) => {
    return epic.tasks.some(task => task.estimated === 0 || !task.scheduled);
  };

  const openEpicModal = (epic) => {
    setSelectedEpic(epic);
  };

  const closeEpicModal = () => {
    setSelectedEpic(null);
  };

  return (
    <div className="backlog-page">
      <div className="page-header">
        <h2>📋 Backlog</h2>
        <p>Завдання та епіки без запланованої дати</p>
      </div>

      <div className="backlog-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Всі ({backlogTasks.length + backlogEpics.length})
        </button>
        <button
          className={`filter-btn ${filter === 'tasks' ? 'active' : ''}`}
          onClick={() => setFilter('tasks')}
        >
          Завдання ({backlogTasks.length})
        </button>
        <button
          className={`filter-btn ${filter === 'epics' ? 'active' : ''}`}
          onClick={() => setFilter('epics')}
        >
          Епіки ({backlogEpics.length})
        </button>
      </div>

      <div className="backlog-actions">
        <button className="add-btn">+ Нове завдання</button>
        <button className="add-btn">+ Новий епік</button>
      </div>

      <div className="backlog-content">
        {/* Епіки */}
        {filteredEpics.map(epic => (
          <div
            key={epic.id}
            className="backlog-epic"
            onClick={() => openEpicModal(epic)}
          >
            <div className="epic-header">
              <div className="epic-info">
                <h3>{epic.title}</h3>
                <p className="epic-description">{epic.description}</p>
              </div>
              <div className="epic-status">
                {hasUnscheduledTasks(epic) && (
                  <span className="status-badge warning">Потребує планування</span>
                )}
              </div>
            </div>
            <div className="epic-tags">
              {epic.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <div className="epic-tasks-count">
              {epic.tasks.length} завдань
            </div>
          </div>
        ))}

        {/* Незалежні таски */}
        {filteredTasks.map(task => (
          <div key={task.id} className="backlog-task">
            <div className="task-info">
              <h4>{task.title}</h4>
              <div className="task-tags">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="task-actions">
              <button className="btn-icon">📅</button>
              <button className="btn-icon">✏️</button>
              <button className="btn-icon">🗑️</button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && filteredEpics.length === 0 && (
          <div className="empty-state">
            <p>📭 Backlog порожній</p>
            <p className="empty-hint">Створіть нові завдання або епіки</p>
          </div>
        )}
      </div>

      {/* Модальне вікно для епіка */}
      {selectedEpic && (
        <div className="modal-overlay" onClick={closeEpicModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEpic.title}</h2>
              <button className="close-btn" onClick={closeEpicModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="epic-description-full">
                <strong>Опис:</strong>
                <p>{selectedEpic.description}</p>
              </div>
              <div className="epic-tags">
                {selectedEpic.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <div className="epic-tasks-list">
                <h3>Завдання ({selectedEpic.tasks.length})</h3>
                {selectedEpic.tasks.map(task => (
                  <div key={task.id} className="epic-task-item">
                    <input type="checkbox" checked={task.scheduled} readOnly />
                    <div className="task-details">
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        {task.estimated > 0 ? (
                          <span className="estimated">⏱️ {task.estimated} год</span>
                        ) : (
                          <span className="no-estimate">⚠️ Без оцінки</span>
                        )}
                        {task.scheduled ? (
                          <span className="scheduled">📅 Заплановано</span>
                        ) : (
                          <span className="not-scheduled">📅 Не заплановано</span>
                        )}
                      </div>
                    </div>
                    <div className="task-actions">
                      <button className="btn-icon">⏱️</button>
                      <button className="btn-icon">📅</button>
                      <button className="btn-icon">✏️</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="epic-comments">
                <h3>Коментарі</h3>
                <textarea placeholder="Додати коментар..." rows="3"></textarea>
                <button className="add-btn">Додати коментар</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BacklogPage;