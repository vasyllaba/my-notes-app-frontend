import React, { useState, useEffect } from 'react';
import EpicList from '../components/epics/EpicList';
import EpicModal from '../components/epics/EpicModal';
import EpicDetailsModal from '../components/epics/EpicDetailsModal';
import { getAllEpics, createEpic, updateEpic, toggleEpic, deleteEpic } from '../services/epicService';
import '../styles/Epics.css';

function EpicsPage() {
  const [epics, setEpics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEpic, setEditingEpic] = useState(null);
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEpics();
  }, [filter]);

  const loadEpics = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEpics(filter);
      setEpics(data);
    } catch (error) {
      console.error('Failed to load epics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEpic = () => {
    setEditingEpic(null);
    setIsCreateModalOpen(true);
  };

  const handleEditEpic = (epic) => {
    setEditingEpic(epic);
    setIsCreateModalOpen(true);
  };

  const handleSaveEpic = async (epicData) => {
    try {
      if (editingEpic) {
        await updateEpic(editingEpic.id, epicData);
      } else {
        await createEpic(epicData);
      }
      setIsCreateModalOpen(false);
      setEditingEpic(null);
      loadEpics();
    } catch (error) {
      alert('Помилка при збереженні епіка');
    }
  };

  const handleToggleEpic = async (id) => {
    try {
      await toggleEpic(id);
      loadEpics();
      if (selectedEpic && selectedEpic.epic.id === id) {
        setSelectedEpic(null);
      }
    } catch (error) {
      alert('Помилка при оновленні епіка');
    }
  };

  const handleDeleteEpic = async (id) => {
    if (!window.confirm('Видалити цей епік? Таски залишаться, але втратять зв\'язок з епіком.')) return;
    try {
      await deleteEpic(id);
      loadEpics();
      if (selectedEpic && selectedEpic.epic.id === id) {
        setSelectedEpic(null);
      }
    } catch (error) {
      alert('Помилка при видаленні епіка');
    }
  };

  const handleOpenEpicDetails = (epic) => {
    setSelectedEpic(epic);
  };

  const handleCloseEpicDetails = () => {
    setSelectedEpic(null);
    loadEpics();
  };

  return (
    <div className="epics-page">
      <div className="epics-header">
        <div>
          <h2>🎯 Епіки</h2>
          <p>Великі цілі, що складаються з кількох тасок</p>
        </div>
        <button onClick={handleCreateEpic} className="create-epic-btn">
          + Створити епік
        </button>
      </div>

      <div className="epic-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Всі
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активні
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Завершені
        </button>
      </div>

      <EpicList
        epics={epics}
        isLoading={isLoading}
        onEpicClick={handleOpenEpicDetails}
        onEdit={handleEditEpic}
        onToggle={handleToggleEpic}
        onDelete={handleDeleteEpic}
      />

      {isCreateModalOpen && (
        <EpicModal
          epic={editingEpic}
          onSave={handleSaveEpic}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingEpic(null);
          }}
        />
      )}

      {selectedEpic && (
        <EpicDetailsModal
          epicId={selectedEpic.id}
          onClose={handleCloseEpicDetails}
        />
      )}
    </div>
  );
}

export default EpicsPage;