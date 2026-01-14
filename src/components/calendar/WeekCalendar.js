import React from 'react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';
import TaskCard from './TaskCard';

function WeekCalendar({
  tasks,
  isLoading,
  weekStart,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onTaskClick,
  onTaskToggle,
  onTaskDelete
}) {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getTasksForDay = (day) => {
    return tasks.filter(task => {
      const taskDate = parseISO(task.dueDate);
      return isSameDay(taskDate, day);
    });
  };

  const isToday = (day) => isSameDay(day, new Date());

  if (isLoading) {
    return <div className="calendar-loading">Завантаження...</div>;
  }

  return (
    <div className="week-calendar">
      <div className="week-navigation">
        <button onClick={onPreviousWeek} className="nav-btn">← Попередній тиждень</button>
        <button onClick={onToday} className="today-btn">Сьогодні</button>
        <button onClick={onNextWeek} className="nav-btn">Наступний тиждень →</button>
      </div>

      <div className="week-grid">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentDay = isToday(day);

          return (
            <div key={index} className={`day-column ${isCurrentDay ? 'today' : ''}`}>
              <div className="day-header">
                <div className="day-name">{format(day, 'EEEE', { locale: uk })}</div>
                <div className="day-date">{format(day, 'd MMM', { locale: uk })}</div>
              </div>

              <div className="day-tasks">
                {dayTasks.length === 0 ? (
                  <div className="no-tasks">Немає завдань</div>
                ) : (
                  dayTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onTaskClick(task)}
                      onToggle={() => onTaskToggle(task.id)}
                      onDelete={() => onTaskDelete(task.id)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekCalendar;