import Stats from './Stats'
import Chart from './Chart'
import ChartAllDays from './ChartAllDays'
import DayList from './DayList'
import { EXERCISE_CONFIG, START_DATES } from '../utils/dateUtils'
import { exportToExcel } from '../utils/exportExcel'

export default function ExercisePage({ exerciseId, data, onUpdate }) {
  const cfg = EXERCISE_CONFIG[exerciseId]
  const startDate = START_DATES[exerciseId]

  return (
    <div className="exercise-page">
      <div className="exercise-page__header">
        <h2 className="exercise-page__title" style={{ color: cfg.color }}>{cfg.label}</h2>
        <p className="exercise-page__subtitle">{cfg.subtitle}</p>
        <div className="exercise-page__bar" style={{ background: cfg.color }} />
      </div>

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
