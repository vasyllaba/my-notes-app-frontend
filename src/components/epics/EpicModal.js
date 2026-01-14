import React, { useState, useEffect } from 'react';

function EpicModal({ epic, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (epic) {
      setFormData({
        title: epic.title || '',
        description: epic.description || ''
      });
    }
  }, [epic]);

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
      alert('Введіть назву епіка');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content epic-modal-small" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{epic ? 'Редагувати епік' : 'Новий епік'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="epic-form">
          <div className="form-group">
            <label>Назва *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Назва епіка"
              required
            />
          </div>

          <div className="form-group">
            <label>Опис</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опис епіка (опціонально)"
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Скасувати
            </button>
            <button type="submit" className="btn-save">
              {epic ? 'Зберегти' : 'Створити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EpicModal;