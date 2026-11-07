import { useState, useEffect } from 'react'
import Stats from './components/Stats'
import Chart from './components/Chart'
import DayList from './components/DayList'
import { exportToExcel } from './utils/exportExcel'
import './App.css'

const STORAGE_KEY = 'tractions-data'

const INITIAL_DATA = {
  "2026-04-13": { "sets": [10] },
  "2026-04-14": { "sets": [10, 5, 25] },
  "2026-04-15": { "sets": [20, 30] },
  "2026-04-16": { "sets": [20, 20, 10] },
  "2026-04-17": { "sets": [10, 20, 10] },
  "2026-04-24": { "sets": [5] },
  "2026-04-30": { "sets": [20, 10] },
  "2026-05-01": { "sets": [10, 10, 5] },
  "2026-05-02": { "sets": [24] },
  "2026-05-13": { "sets": [15, 5] },
  "2026-05-14": { "sets": [15, 5] },
  "2026-05-15": { "sets": [10, 10, 15, 15] },
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return INITIAL_DATA
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export default function App() {
  const [data, setData] = useState(() => loadData())

  function handleUpdate(newData) {
    setData(newData)
    saveData(newData)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-title">Tractions</h1>
          <p className="app-subtitle">Suivi depuis le 13 avril 2026 · Départ max 10 reps</p>
          <div className="app-divider" />
        </div>
      </header>

      <main className="app-main">
        <Stats data={data} />
        <Chart data={data} />

        <div className="section-actions">
          <button className="btn btn--export" onClick={() => exportToExcel(data)}>
            Exporter Excel
          </button>
        </div>

        <DayList data={data} onUpdate={handleUpdate} />
      </main>
    </div>
  )
}
