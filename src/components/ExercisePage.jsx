import { useState } from 'react'
import Stats from './Stats'
import Chart from './Chart'
import ChartAllDays from './ChartAllDays'
import DayList from './DayList'
import { EXERCISE_CONFIG, START_DATES } from '../utils/dateUtils'
import { exportToExcel } from '../utils/exportExcel'

function getTodayISO() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function ExercisePage({ exerciseId, data, onUpdate, prefillSets, seanceLabel }) {
  const cfg = EXERCISE_CONFIG[exerciseId]
  const startDate = START_DATES[exerciseId]
  const [prefillDismissed, setPrefillDismissed] = useState(false)

  const hasPrefill = prefillSets && prefillSets.length > 0
  const showBanner = hasPrefill && !prefillDismissed

  function handleApplyPrefill() {
    const today = getTodayISO()
    onUpdate({ ...data, [today]: { sets: prefillSets, rest: false } })
    setPrefillDismissed(true)
  }

  return (
    <div className="exercise-page">
      <div className="exercise-page__header">
        <h2 className="exercise-page__title" style={{ color: cfg.color }}>{cfg.label}</h2>
        <p className="exercise-page__subtitle">{cfg.subtitle}</p>
        <div className="exercise-page__bar" style={{ background: cfg.color }} />
      </div>

      {showBanner && (
        <div className="prefill-banner" style={{ '--ex-color': cfg.color }}>
          <div className="prefill-banner__info">
            <span className="prefill-banner__prog">{seanceLabel}</span>
            <span className="prefill-banner__reps">
              Séries suggérées : {prefillSets.map((n, i) => (
                <span key={i} className="prefill-banner__chip">{n}</span>
              ))}
            </span>
          </div>
          <div className="prefill-banner__actions">
            <button className="btn prefill-banner__apply" style={{ background: cfg.color }} onClick={handleApplyPrefill}>
              Pré-remplir aujourd'hui
            </button>
            <button className="prefill-banner__dismiss" onClick={() => setPrefillDismissed(true)}>✕</button>
          </div>
        </div>
      )}

      <Stats data={data} color={cfg.color} />
      <Chart data={data} color={cfg.color} startDate={startDate} />
      <ChartAllDays data={data} startDate={startDate} color={cfg.color} />

      <div className="section-actions">
        <button
          className="btn btn--export"
          style={{ background: cfg.color }}
          onClick={() => exportToExcel(data, exerciseId, startDate)}
        >
          Exporter Excel
        </button>
      </div>

      <DayList data={data} onUpdate={onUpdate} startDate={startDate} />
    </div>
  )
}
