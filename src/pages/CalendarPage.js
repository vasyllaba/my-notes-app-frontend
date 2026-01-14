import React, { useState, useEffect } from 'react';
import WeekCalendar from '../components/calendar/WeekCalendar';
import TaskModal from '../components/calendar/TaskModal';
import { getAllTasks, createTask, updateTask, toggleTask, deleteTask } from '../services/taskService';
import '../styles/Calendar.css';

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday(new Date()));

  useEffect(() => {
    loadTasks();
  }, [currentWeekStart]);

  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const weekStart = new Date(currentWeekStart);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      weekEnd.setHours(23, 59, 59, 999);

      const data = await getAllTasks('all', weekStart.toISOString(), weekEnd.toISOString());
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      alert('Помилка при збереженні таски');
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
      loadTasks();
    } catch (error) {
      alert('Помилка при оновленні таски');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Видалити цю таску?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      alert('Помилка при видаленні таски');
    }
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    setCurrentWeekStart(getMonday(new Date()));
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>📅 Календар завдань</h2>
        <button onClick={handleCreateTask} className="create-task-btn">
          + Створити таску
        </button>
      </div>

      <WeekCalendar
        tasks={tasks}
        isLoading={isLoading}
        weekStart={currentWeekStart}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onToday={goToToday}
        onTaskClick={handleEditTask}
        onTaskToggle={handleToggleTask}
        onTaskDelete={handleDeleteTask}
      />

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default CalendarPage;