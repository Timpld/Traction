import { useState, useEffect } from 'react'
import Stats from './components/Stats'
import Chart from './components/Chart'
import DayList from './components/DayList'
import { exportToExcel } from './utils/exportExcel'
import './App.css'

const GITHUB_API = 'https://api.github.com/repos/Timpld/Traction/contents/data/tractions.json'
const TOKEN_KEY = 'gh-token'

async function loadFromGitHub() {
  const res = await fetch(GITHUB_API, {
    headers: { 'Accept': 'application/vnd.github.v3+json' },
  })
  if (!res.ok) throw new Error('Load failed')
  const file = await res.json()
  const content = atob(file.content.replace(/\s/g, ''))
  return { data: JSON.parse(content), sha: file.sha }
}

async function saveToGitHub(data, token) {
  const fileRes = await fetch(GITHUB_API, {
    headers: { 'Accept': 'application/vnd.github.v3+json' },
  })
  const file = await fileRes.json()
  const content = btoa(JSON.stringify(data, null, 2))
  const res = await fetch(GITHUB_API, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: 'update traction data',
      content,
      sha: file.sha,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`${res.status} — ${err.message || 'erreur inconnue'}`)
  }
}

export default function App() {
  const [data, setData] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [tokenInput, setTokenInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    loadFromGitHub()
      .then(({ data }) => setData(data))
      .catch(() => setData({}))
  }, [])

  function handleSaveToken() {
    const t = tokenInput.trim()
    if (!t) return
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
    setTokenInput('')
  }

  async function handleUpdate(newData) {
    setData(newData)
    if (!token) return
    setSaving(true)
    setSaveError(false)
    try {
      await saveToGitHub(newData, token)
    } catch (e) {
      setSaveError(e.message || true)
    } finally {
      setSaving(false)
    }
  }

  if (!data) return <div className="app-loading">Chargement…</div>

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-title">Tractions</h1>
          <p className="app-subtitle">
            Suivi depuis le 13 avril 2026 · Départ max 10 reps
            {saving && <span className="saving-indicator"> · Sauvegarde…</span>}
            {saveError && <span className="save-error"> · Erreur : {saveError}</span>}
          </p>
          <div className="app-divider" />
        </div>
      </header>

      <main className="app-main">
        {!token && (
          <div className="token-setup">
            <strong>Configuration requise</strong>
            <p>Entre ton token GitHub pour sauvegarder tes séances sur tous tes appareils.</p>
            <div className="token-input-row">
              <input
                type="password"
                placeholder="github_pat_..."
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveToken()}
                className="day-row__input"
                style={{ width: '100%', maxWidth: 340 }}
              />
              <button className="btn btn--primary" onClick={handleSaveToken}>Enregistrer</button>
            </div>
          </div>
        )}

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
