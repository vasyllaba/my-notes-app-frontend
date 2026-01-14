import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function TaskModal({ task, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimationHours: '',
    dueDate: '',
    dueTime: ''
  });

  useEffect(() => {
    if (task) {
      const dueDate = new Date(task.dueDate);
      setFormData({
        title: task.title || '',
        description: task.description || '',
        estimationHours: task.estimationHours || '',
        dueDate: format(dueDate, 'yyyy-MM-dd'),
        dueTime: format(dueDate, 'HH:mm')
      });
    } else {
      const now = new Date();
      setFormData({
        title: '',
        description: '',
        estimationHours: '',
        dueDate: format(now, 'yyyy-MM-dd'),
        dueTime: format(now, 'HH:mm')
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Введіть назву таски');
      return;
    }

    if (!formData.dueDate || !formData.dueTime) {
      alert('Виберіть дату та час виконання');
      return;
    }

    const dueDateTimeString = `${formData.dueDate}T${formData.dueTime}:00`;
    const dueDateTime = new Date(dueDateTimeString);

    const taskData = {
      title: formData.title,
      description: formData.description,
      estimationHours: formData.estimationHours ? parseFloat(formData.estimationHours) : null,
      dueDate: dueDateTime.toISOString()
    };

    onSave(taskData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{task ? 'Редагувати таску' : 'Нова таска'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Назва *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Назва таски"
              required
            />
          </div>

          <div className="form-group">
            <label>Опис</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опис таски (опціонально)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Оцінка часу (години)</label>
            <input
              type="number"
              name="estimationHours"
              value={formData.estimationHours}
              onChange={handleChange}
              placeholder="Наприклад: 2.5"
              step="0.5"
              min="0"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Дата виконання *</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Час виконання *</label>
              <input
                type="time"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Скасувати
            </button>
            <button type="submit" className="btn-save">
              {task ? 'Зберегти' : 'Створити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;