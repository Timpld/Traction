import { useState, useEffect } from 'react'
import Stats from './components/Stats'
import Chart from './components/Chart'
import DayList from './components/DayList'
import { exportToExcel } from './utils/exportExcel'
import './App.css'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2_FaUnwRcl1XEWXmAKpu_HTo-a0w2uQxBsKSV77mHNM4WGFeppeCkUy1kn69r9c2v/exec'

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

function fetchData() {
  return new Promise((resolve) => {
    const callbackName = '__cb_' + Date.now()
    const script = document.createElement('script')
    const timer = setTimeout(() => {
      cleanup()
      resolve(INITIAL_DATA)
    }, 10000)

    function cleanup() {
      clearTimeout(timer)
      delete window[callbackName]
      if (script.parentNode) script.parentNode.removeChild(script)
    }

    window[callbackName] = (data) => {
      cleanup()
      resolve(data && Object.keys(data).length > 0 ? data : INITIAL_DATA)
    }

    script.src = APPS_SCRIPT_URL + '?callback=' + callbackName
    script.onerror = () => { cleanup(); resolve(INITIAL_DATA) }
    document.head.appendChild(script)
  })
}

async function saveData(data) {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
    redirect: 'follow',
  })
}

export default function App() {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData().then(setData).catch(() => setData(INITIAL_DATA))
  }, [])

  async function handleUpdate(newData) {
    setData(newData)
    setSaving(true)
    try {
      await saveData(newData)
    } finally {
      setSaving(false)
    }
  }

  if (!data) {
    return <div className="app-loading">Chargement…</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-title">Tractions</h1>
          <p className="app-subtitle">
            Suivi depuis le 13 avril 2026 · Départ max 10 reps
            {saving && <span className="saving-indicator"> · Sauvegarde…</span>}
          </p>
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

