import { useState } from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getAllDaysFrom, formatDateShort, START_DATES, subDays, EXERCISE_CONFIG } from '../utils/dateUtils'

const EXERCISES = [
  { id: 'tractions', ...EXERCISE_CONFIG.tractions },
  { id: 'dips',      ...EXERCISE_CONFIG.dips },
  { id: 'pompes',    ...EXERCISE_CONFIG.pompes },
]

const RANGES = [
  { label: '7j',   value: 7 },
  { label: '30j',  value: 30 },
  { label: '90j',  value: 90 },
  { label: 'Tout', value: 'all' },
]

const MA_WINDOW = 3

export default function OverviewPage({ allData }) {
  const [visible, setVisible] = useState({ tractions: true, dips: true, pompes: true })
  const [range, setRange] = useState(30)

  let days = getAllDaysFrom(START_DATES.tractions)
  if (range !== 'all') {
    const cutoff = subDays(range)
    days = days.filter(d => d >= cutoff)
  }

  const rawPoints = days.map(iso => {
    const point = { date: formatDateShort(iso) }
    EXERCISES.forEach(ex => {
      point[ex.id] = (allData[ex.id]?.[iso]?.sets || []).reduce((a, b) => a + b, 0)
    })
    return point
  })

  const chartData = rawPoints.map((point, i) => {
    const dayTotal = EXERCISES.reduce((acc, ex) => acc + (visible[ex.id] ? point[ex.id] : 0), 0)
    const slice = rawPoints.slice(Math.max(0, i - MA_WINDOW + 1), i + 1)
    const nonZero = slice.filter(p => EXERCISES.some(ex => visible[ex.id] && p[ex.id] > 0))
    const avg = nonZero.length > 0
      ? Math.round(
          nonZero.reduce((acc, p) => acc + EXERCISES.reduce((a, ex) => a + (visible[ex.id] ? p[ex.id] : 0), 0), 0)
          / nonZero.length * 10
        ) / 10
      : null
    return { ...point, movingAvg: dayTotal > 0 ? avg : null }
  })

  const stats = EXERCISES.map(ex => {
    const entries = Object.values(allData[ex.id] || {})
    const total = entries.flatMap(e => e.sets || []).reduce((a, b) => a + b, 0)
    const sessions = entries.filter(e => e.sets?.length > 0).length
    return { ...ex, total, sessions }
  })

  return (
    <div className="overview-page">
      <div className="overview-stats">
        {stats.map(s => (
          <div key={s.id} className="overview-stat-card" style={{ '--ex-color': s.color }}>
            <div className="overview-stat-title" style={{ color: s.color }}>{s.label}</div>
            <div className="overview-stat-total">{s.total}</div>
            <div className="overview-stat-sub">{s.sessions} séance{s.sessions !== 1 ? 's' : ''}</div>
          </div>
        ))}
      </div>

      <div className="chart-wrapper">
        <div className="chart-controls">
          <div className="chart-toggles">
            {EXERCISES.map(ex => (
              <button
                key={ex.id}
                className={`chart-toggle${visible[ex.id] ? ' chart-toggle--active' : ''}`}
                style={{ '--toggle-color': ex.color }}
                onClick={() => setVisible(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <div className="chart-ranges">
            {RANGES.map(r => (
              <button
                key={r.value}
                className={`range-btn${range === r.value ? ' range-btn--active' : ''}`}
                onClick={() => setRange(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7A99' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 11, fill: '#6B7A99' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={{ borderRadius: 6, border: '1px solid #E8ECF3', fontSize: 13 }} />
            {EXERCISES.map(ex => visible[ex.id] && (
              <Bar key={ex.id} dataKey={ex.id} stackId="a" fill={ex.color} name={ex.label} maxBarSize={16} />
            ))}
            <Line type="monotone" dataKey="movingAvg" stroke="#C9921A" strokeWidth={2} dot={false} name="Moy. mobile" connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
