import React, { useState } from 'react';
import '../styles/StatisticsPage.css';

function StatisticsPage() {
  const [viewMode, setViewMode] = useState('month'); // day, week, month, year
  const [selectedMetric, setSelectedMetric] = useState('hours'); // hours, stress, sleep, activity

  // Приклад даних (потім буде з API)
  const monthlyStats = {
    totalHours: 120,
    categories: {
      'Навчання': 65,
      'Робота': 35,
      'Англійська': 12,
      'Спорт': 8
    },
    completedEpics: ['Курс React Advanced'],
    averageStress: 6,
    averageSleep: 8,
    averageActivity: 'Середня',
    averageEfficiency: 7.5
  };

  const dailyData = [
    { day: 'ПН', hours: 8, stress: 5, sleep: 7, efficiency: 8 },
    { day: 'ВТ', hours: 6, stress: 7, sleep: 6, efficiency: 6 },
    { day: 'СР', hours: 10, stress: 4, sleep: 8, efficiency: 9 },
    { day: 'ЧТ', hours: 7, stress: 6, sleep: 7, efficiency: 7 },
    { day: 'ПТ', hours: 5, stress: 8, sleep: 6, efficiency: 5 },
    { day: 'СБ', hours: 3, stress: 3, sleep: 9, efficiency: 8 },
    { day: 'НД', hours: 2, stress: 2, sleep: 9, efficiency: 9 }
  ];

  const getMaxValue = () => {
    if (selectedMetric === 'hours') return 12;
    if (selectedMetric === 'sleep') return 10;
    return 10;
  };

  const getValue = (day) => {
    return day[selectedMetric] || 0;
  };

  const getMetricLabel = () => {
    const labels = {
      hours: 'Години роботи',
      stress: 'Рівень стресу',
      sleep: 'Години сну',
      efficiency: 'Ефективність'
    };
    return labels[selectedMetric];
  };

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h2>📈 Статистика</h2>
        <p>Аналіз вашої продуктивності</p>
      </div>

      {/* Перемикач періоду */}
      <div className="view-mode-selector">
        <button
          className={`mode-btn ${viewMode === 'day' ? 'active' : ''}`}
          onClick={() => setViewMode('day')}
        >
          День
        </button>
        <button
          className={`mode-btn ${viewMode === 'week' ? 'active' : ''}`}
          onClick={() => setViewMode('week')}
        >
          Тиждень
        </button>
        <button
          className={`mode-btn ${viewMode === 'month' ? 'active' : ''}`}
          onClick={() => setViewMode('month')}
        >
          Місяць
        </button>
        <button
          className={`mode-btn ${viewMode === 'year' ? 'active' : ''}`}
          onClick={() => setViewMode('year')}
        >
          Рік
        </button>
      </div>

      {/* Основна статистика */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <div className="stat-value">{monthlyStats.totalHours} год</div>
            <div className="stat-label">Всього відпрацьовано</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">😰</div>
          <div className="stat-info">
            <div className="stat-value">{monthlyStats.averageStress}/10</div>
            <div className="stat-label">Середній стрес</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">😴</div>
          <div className="stat-info">
            <div className="stat-value">{monthlyStats.averageSleep} год</div>
            <div className="stat-label">Середній сон</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <div className="stat-value">{monthlyStats.averageEfficiency}/10</div>
            <div className="stat-label">Середня ефективність</div>
          </div>
        </div>
      </div>

      {/* Графік */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>{getMetricLabel()}</h3>
          <div className="metric-selector">
            <button
              className={`metric-btn ${selectedMetric === 'hours' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('hours')}
            >
              ⏱️ Години
            </button>
            <button
              className={`metric-btn ${selectedMetric === 'stress' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('stress')}
            >
              😰 Стрес
            </button>
            <button
              className={`metric-btn ${selectedMetric === 'sleep' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('sleep')}
            >
              😴 Сон
            </button>
            <button
              className={`metric-btn ${selectedMetric === 'efficiency' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('efficiency')}
            >
              ⚡ Ефективність
            </button>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            {dailyData.map((day, idx) => (
              <div key={idx} className="chart-bar">
                <div
                  className="bar"
                  style={{
                    height: `${(getValue(day) / getMaxValue()) * 100}%`
                  }}
                >
                  <span className="bar-value">{getValue(day)}</span>
                </div>
                <div className="bar-label">{day.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Категорії */}
      <div className="categories-section">
        <h3>📊 Години по категоріях</h3>
        <div className="categories-grid">
          {Object.entries(monthlyStats.categories).map(([category, hours]) => (
            <div key={category} className="category-card">
              <div className="category-header">
                <span className="category-name">{category}</span>
                <span className="category-hours">{hours} год</span>
              </div>
              <div className="category-bar">
                <div
                  className="category-fill"
                  style={{
                    width: `${(hours / monthlyStats.totalHours) * 100}%`
                  }}
                ></div>
              </div>
              <div className="category-percentage">
                {Math.round((hours / monthlyStats.totalHours) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Завершені епіки */}
      <div className="completed-epics-section">
        <h3>🎯 Завершені епіки цього місяця</h3>
        <div className="completed-epics">
          {monthlyStats.completedEpics.length > 0 ? (
            monthlyStats.completedEpics.map((epic, idx) => (
              <div key={idx} className="completed-epic">
                <span className="epic-icon">✓</span>
                <span className="epic-name">{epic}</span>
              </div>
            ))
          ) : (
            <div className="no-completed">Ще немає завершених епіків</div>
          )}
        </div>
      </div>

      {/* Активність */}
      <div className="activity-section">
        <h3>💪 Фізична активність</h3>
        <div className="activity-level">
          Середній рівень: <strong>{monthlyStats.averageActivity}</strong>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;