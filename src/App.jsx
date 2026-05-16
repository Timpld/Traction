import { useState, useEffect } from 'react'
import Stats from './components/Stats'
import Chart from './components/Chart'
import DayList from './components/DayList'
import { exportToExcel } from './utils/exportExcel'
import './App.css'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Impossible de charger les données. Le serveur est-il démarré ?'))
  }, [])

  async function handleUpdate(newData) {
    setData(newData)
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })
    } catch {
      console.error('Erreur de sauvegarde')
    }
  }

  if (error) {
    return (
      <div className="app-error">
        <p>{error}</p>
        <p>Lancez <code>npm run dev</code> dans votre terminal.</p>
      </div>
    )
  }

  if (!data) {
    return <div className="app-loading">Chargement…</div>
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
