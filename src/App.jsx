import { useState, useEffect, useRef } from 'react'
import TabNav from './components/TabNav'
import OverviewPage from './components/OverviewPage'
import ExercisePage from './components/ExercisePage'
import './App.css'

const GITHUB_API = 'https://api.github.com/repos/Timpld/Traction/contents/data/exercises.json'
const TOKEN_KEY = 'gh-token'

const EMPTY_DATA = { tractions: {}, dips: {}, pompes: {} }

async function loadFromGitHub() {
  const res = await fetch(GITHUB_API + '?t=' + Date.now(), {
    cache: 'no-store',
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  if (!res.ok) throw new Error(`${res.status}`)
  const file = await res.json()
  const content = atob(file.content.replace(/\s/g, ''))
  return { data: JSON.parse(content), sha: file.sha }
}

async function saveToGitHub(data, token) {
  const fileRes = await fetch(GITHUB_API + '?t=' + Date.now(), {
    cache: 'no-store',
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  const file = await fileRes.json()
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))
  const res = await fetch(GITHUB_API, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({ message: 'update exercise data', content, sha: file.sha }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`${res.status} — ${err.message || 'erreur inconnue'}`)
  }
}

export default function App() {
  const [allData, setAllData] = useState(EMPTY_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saveStatus, setSaveStatus] = useState(null)
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem(TOKEN_KEY) || '' } catch { return '' }
  })
  const [showToken, setShowToken] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const saveTimer = useRef(null)

  useEffect(() => {
    loadFromGitHub()
      .then(({ data }) => {
        setAllData({ tractions: {}, dips: {}, pompes: {}, ...data })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function handleUpdate(exerciseId, exerciseData) {
    const newAllData = { ...allData, [exerciseId]: exerciseData }
    setAllData(newAllData)

    if (!token) {
      setSaveStatus('⚠ Token manquant')
      setTimeout(() => setSaveStatus(null), 3000)
      return
    }

    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('Sauvegarde…')
    saveTimer.current = setTimeout(() => {
      saveToGitHub(newAllData, token)
        .then(() => {
          setSaveStatus('Sauvegardé ✓')
          setTimeout(() => setSaveStatus(null), 2000)
        })
        .catch(err => {
          setSaveStatus(`Erreur — ${err.message}`)
          setTimeout(() => setSaveStatus(null), 5000)
        })
    }, 600)
  }

  function handleSaveToken() {
    const t = tokenInput.trim()
    if (!t) return
    try { localStorage.setItem(TOKEN_KEY, t) } catch {}
    setToken(t)
    setTokenInput('')
    setShowToken(false)
  }

  function handleRemoveToken() {
    try { localStorage.removeItem(TOKEN_KEY) } catch {}
    setToken('')
    setShowToken(false)
  }

  if (loading) return <div className="app-loading">Chargement…</div>
  if (error) return (
    <div className="app-error">
      <span>Erreur de chargement</span>
      <code>{error}</code>
    </div>
  )

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__top">
            <div>
              <h1 className="app-title">Traction</h1>
              <p className="app-subtitle">Suivi musculation · Tractions · Dips · Pompes</p>
            </div>
            <div className="app-header__actions">
              {saveStatus && <span className="save-status">{saveStatus}</span>}
              <button
                className="btn btn--outline btn--token"
                onClick={() => { setShowToken(v => !v); setTokenInput(token) }}
              >
                {token ? '🔑 Token' : '🔑 Configurer'}
              </button>
            </div>
          </div>

          {showToken && (
            <div className="token-panel">
              <p className="token-panel__hint">Token GitHub (accès <code>contents:write</code>)</p>
              <div className="token-panel__row">
                <input
                  className="token-panel__input"
                  type="password"
                  placeholder="ghp_…"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSaveToken()}
                  autoComplete="off"
                />
                <button className="btn btn--primary" onClick={handleSaveToken}>Enregistrer</button>
                {token && (
                  <button className="btn btn--outline" onClick={handleRemoveToken}>Supprimer</button>
                )}
              </div>
            </div>
          )}

          <TabNav active={activeTab} onChange={setActiveTab} />
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'overview' && (
          <OverviewPage allData={allData} />
        )}
        {activeTab === 'tractions' && (
          <ExercisePage
            exerciseId="tractions"
            data={allData.tractions}
            onUpdate={d => handleUpdate('tractions', d)}
          />
        )}
        {activeTab === 'dips' && (
          <ExercisePage
            exerciseId="dips"
            data={allData.dips}
            onUpdate={d => handleUpdate('dips', d)}
          />
        )}
        {activeTab === 'pompes' && (
          <ExercisePage
            exerciseId="pompes"
            data={allData.pompes}
            onUpdate={d => handleUpdate('pompes', d)}
          />
        )}
      </main>
    </div>
  )
}
