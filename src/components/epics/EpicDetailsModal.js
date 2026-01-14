import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';
import { getEpicWithTasks, addTaskToEpic, removeTaskFromEpic } from '../../services/epicService';
import { getAllTasks, createTask } from '../../services/taskService';
import TaskModal from '../calendar/TaskModal';

function EpicDetailsModal({ epicId, onClose }) {
  const [epicData, setEpicData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

  useEffect(() => {
    loadEpicData();
  }, [epicId]);

  const loadEpicData = async () => {
    setIsLoading(true);
    try {
      const data = await getEpicWithTasks(epicId);
      setEpicData(data);
    } catch (error) {
      console.error('Failed to load epic:', error);
      alert('Помилка завантаження епіка');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableTasks = async () => {
    try {
      const tasks = await getAllTasks();
      // Фільтруємо таски без епіка
      const tasksWithoutEpic = tasks.filter(task => !task.epicId);
      setAvailableTasks(tasksWithoutEpic);
      setIsAddingTask(true);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      alert('Помилка завантаження тасок');
    }
  };

  const handleAddExistingTask = async (taskId) => {
    try {
      await addTaskToEpic(epicId, taskId);
      setIsAddingTask(false);
      loadEpicData();
    } catch (error) {
      alert('Помилка при додаванні таски');
    }
  };

  const handleRemoveTask = async (taskId) => {
    if (!window.confirm('Видалити таску з епіка? Таска залишиться, але втратить зв\'язок з епіком.')) return;
    try {
      await removeTaskFromEpic(taskId);
      loadEpicData();
    } catch (error) {
      alert('Помилка при видаленні таски');
    }
  };

  const handleCreateNewTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      await addTaskToEpic(epicId, newTask.id);
      setIsCreatingNewTask(false);
      loadEpicData();
    } catch (error) {
      alert('Помилка при створенні таски');
    }
  };

  if (isLoading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content epic-details-modal">
          <div className="loading">Завантаження...</div>
        </div>
      </div>
    );
  }

  if (!epicData) return null;

  const { epic, tasks, totalEstimationHours, completedTasksCount, totalTasksCount } = epicData;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content epic-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{epic.title}</h3>
            {epic.description && <p className="epic-description">{epic.description}</p>}
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="epic-stats">
          <div className="stat-card">
            <div className="stat-value">{totalTasksCount}</div>
            <div className="stat-label">Всього тасок</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedTasksCount}</div>
            <div className="stat-label">Виконано</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalEstimationHours.toFixed(1)}h</div>
            <div className="stat-label">Всього годин</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0}%
            </div>
            <div className="stat-label">Прогрес</div>
          </div>
        </div>

        <div className="epic-tasks-section">
          <div className="section-header">
            <h4>Таски епіка</h4>
            <div className="add-task-buttons">
              <button
                className="btn-add-task"
                onClick={() => setIsCreatingNewTask(true)}
              >
                + Створити нову
              </button>
              <button
                className="btn-add-task secondary"
                onClick={loadAvailableTasks}
              >
                + Додати існуючу
              </button>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-tasks">
              Поки що тасок немає. Додайте першу!
            </div>
          ) : (
            <div className="epic-tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`epic-task-item ${task.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="task-checkbox-small"
                  />
                  <div className="task-info">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span className="task-due-date">
                        📅 {format(parseISO(task.dueDate), 'dd MMM yyyy, HH:mm', { locale: uk })}
                      </span>
                      {task.estimationHours && (
                        <span className="task-estimation">⏱ {task.estimationHours}h</span>
                      )}
                    </div>
                  </div>
                  <button
                    className="btn-remove-task"
                    onClick={() => handleRemoveTask(task.id)}
                    title="Видалити з епіка"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAddingTask && (
          <div className="add-task-panel">
            <div className="panel-header">
              <h4>Додати існуючу таску</h4>
              <button onClick={() => setIsAddingTask(false)}>✕</button>
            </div>
            {availableTasks.length === 0 ? (
              <div className="empty-tasks">Немає доступних тасок без епіка</div>
            ) : (
              <div className="available-tasks-list">
                {availableTasks.map(task => (
                  <div key={task.id} className="available-task-item" onClick={() => handleAddExistingTask(task.id)}>
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span>📅 {format(parseISO(task.dueDate), 'dd MMM yyyy', { locale: uk })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isCreatingNewTask && (
          <TaskModal
            task={null}
            onSave={handleCreateNewTask}
            onClose={() => setIsCreatingNewTask(false)}
          />
        )}
      </div>
    </div>
  );
}

export default EpicDetailsModal;