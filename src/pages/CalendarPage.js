import React, { useState } from 'react';
import '../styles/CalendarPage.css';

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quickTasks, setQuickTasks] = useState([
    { id: 1, title: 'Купити молоко', completed: false },
    { id: 2, title: 'Подзвонити лікарю', completed: false },
    { id: 3, title: 'Відповісти на email', completed: false }
  ]);
  const [epics, setEpics] = useState([
    { id: 1, title: 'Курс React Advanced', progress: 65, completed: 26, total: 40, unit: 'год' },
    { id: 2, title: 'Англійська B2', progress: 40, completed: 48, total: 120, unit: 'год' },
    { id: 3, title: 'Проект Portfolio', progress: 25, completed: 10, total: 40, unit: 'год' }
  ]);
  const [quickNote, setQuickNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, content: 'Цікава ідея для додатку', date: new Date() }
  ]);
  const [reflection, setReflection] = useState({
    sleepTime: '23:30',
    wakeTime: '07:00',
    sleepQuality: 'Добре',
    activity: 'Середня',
    stress: 4,
    efficiency: 7
  });

  // Генеруємо тиждень
  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Понеділок
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
  const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const toggleQuickTask = (id) => {
    setQuickTasks(quickTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const saveQuickNote = () => {
    if (quickNote.trim()) {
      setSavedNotes([
        { id: Date.now(), content: quickNote, date: new Date() },
        ...savedNotes
      ]);
      setQuickNote('');
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now.getDate() - date.getDate();
    if (diff === 0) return 'Сьогодні';
    if (diff === 1) return 'Вчора';
    return date.toLocaleDateString('uk-UA');
  };

  return (
    <div className="calendar-page">
      <div className="main-grid">
        {/* Ліва панель: Швидкі завдання */}
        <div className="card quick-tasks-panel">
          <div className="card-header">
            <span>⚡ Швидкі завдання</span>
            <button className="add-btn-small">+</button>
          </div>
          <div className="quick-tasks-list">
            {quickTasks.map(task => (
              <div key={task.id} className={`quick-task ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleQuickTask(task.id)}
                />
                <span>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Центр: Календар */}
        <div className="card calendar-panel">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button className="nav-arrow" onClick={() => navigateWeek(-1)}>←</button>
              <h2>
                {weekDays[0].getDate()}-{weekDays[6].getDate()} {monthNames[weekDays[0].getMonth()]} {weekDays[0].getFullYear()}
              </h2>
              <button className="nav-arrow" onClick={() => navigateWeek(1)}>→</button>
            </div>
            <button className="add-btn" onClick={goToToday}>Сьогодні</button>
          </div>
          
          <div className="week-calendar">
            <div className="week-grid">
              <div className="day-header"></div>
              {weekDays.map((day, idx) => (
                <div key={idx} className="day-header">
                  {dayNames[idx]}<br/>{day.getDate()} {monthNames[day.getMonth()]}
                </div>
              ))}

              {timeSlots.map((time, timeIdx) => (
                <React.Fragment key={time}>
                  <div className="time-slot">{time}</div>
                  {weekDays.map((day, dayIdx) => (
                    <div 
                      key={`${timeIdx}-${dayIdx}`} 
                      className="calendar-cell"
                      onClick={() => console.log(`Clicked: ${day.toDateString()} at ${time}`)}
                    >
                      {/* Тут будуть таски */}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Права панель: Епіки */}
        <div className="card epics-panel">
          <div className="card-header">
            <span>🎯 Активні епіки</span>
            <button className="add-btn-small">+</button>
          </div>
          <div className="epics-list">
            {epics.map(epic => (
              <div key={epic.id} className="epic-item">
                <div className="epic-title">{epic.title}</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${epic.progress}%` }}></div>
                </div>
                <div className="progress-text">
                  {epic.progress}% • {epic.completed}/{epic.total} {epic.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        {/* Швидкі записи */}
        <div className="card quick-notes-panel">
          <div className="card-header">
            <span>✍️ Швидкі записи</span>
          </div>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="Швидкі думки, ідеї, нотатки..."
            rows="4"
          />
          <button className="add-btn" onClick={saveQuickNote}>💾 Зберегти запис</button>
          
          <div className="saved-notes">
            {savedNotes.map(note => (
              <div key={note.id} className="saved-note">
                {note.content}
                <div className="note-date">{formatDate(note.date)}, {note.date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Щоденна рефлексія */}
        <div className="card reflection-panel">
          <div className="card-header">
            <span>🌙 Щоденна рефлексія</span>
          </div>
          <div className="reflection-form">
            <div className="time-inputs">
              <div className="form-row">
                <label>🛏️ Ліг спати</label>
                <input
                  type="time"
                  value={reflection.sleepTime}
                  onChange={(e) => setReflection({ ...reflection, sleepTime: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>☀️ Прокинувся</label>
                <input
                  type="time"
                  value={reflection.wakeTime}
                  onChange={(e) => setReflection({ ...reflection, wakeTime: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <label>😴 Якість сну</label>
              <select
                value={reflection.sleepQuality}
                onChange={(e) => setReflection({ ...reflection, sleepQuality: e.target.value })}
              >
                <option>Відмінно</option>
                <option>Добре</option>
                <option>Задовільно</option>
                <option>Погано</option>
              </select>
            </div>

            <div className="form-row">
              <label>💪 Фізична активність</label>
              <select
                value={reflection.activity}
                onChange={(e) => setReflection({ ...reflection, activity: e.target.value })}
              >
                <option>Висока</option>
                <option>Середня</option>
                <option>Низька</option>
                <option>Відсутня</option>
              </select>
            </div>

            <div className="form-row">
              <label>😰 Рівень стресу (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={reflection.stress}
                onChange={(e) => setReflection({ ...reflection, stress: parseInt(e.target.value) })}
              />
              <span className="range-value">{reflection.stress}</span>
            </div>

            <div className="form-row">
              <label>⚡ Ефективність (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={reflection.efficiency}
                onChange={(e) => setReflection({ ...reflection, efficiency: parseInt(e.target.value) })}
              />
              <span className="range-value">{reflection.efficiency}</span>
            </div>

            <button className="add-btn full-width">Зберегти рефлексію</button>
            <button className="stats-btn">📊 Переглянути статистику</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;