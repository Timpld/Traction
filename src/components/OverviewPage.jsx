import { useState } from 'react'
import {
  ComposedChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { getAllDaysFrom, formatDateShort, START_DATES, subDays, toISO, EXERCISE_CONFIG } from '../utils/dateUtils'

const EXERCISES = [
  { id: 'tractions', ...EXERCISE_CONFIG.tractions },
  { id: 'dips',      ...EXERCISE_CONFIG.dips },
  { id: 'pompes',    ...EXERCISE_CONFIG.pompes },
]

const RANGES = [
  { label: '7j', value: 7 },
  { label: '30j', value: 30 },
  { label: '90j', value: 90 },
  { label: 'Tout', value: 'all' },
]

export default function OverviewPage({ allData }) {
  const [visible, setVisible] = useState({ tractions: true, dips: true, pompes: true })
  const [range, setRange] = useState(30)

  const earliestStart = START_DATES.tractions
  let days = getAllDaysFrom(earliestStart)
  if (range !== 'all') {
    const cutoff = subDays(range)
    days = days.filter(d => d >= cutoff)
  }

  const chartData = days.map(iso => {
    const point = { date: formatDateShort(iso) }
    EXERCISES.forEach(ex => {
      point[ex.id] = (allData[ex.id]?.[iso]?.sets || []).reduce((a, b) => a + b, 0)
    })
    return point
  })

  const stats = EXERCISES.map(ex => {
    const entries = Object.values(allData[ex.id] || {})
    const total = entries.flatMap(e => e.sets || []).reduce((a, b) => a + b, 0)
    const sessions = entries.filter(e => e.sets?.length > 0).length
    return { ...ex, total, sessions }
  })

  const grandTotal = stats.reduce((a, s) => a + s.total, 0)

  return (
    <div className="overview-page">
      <div className="overview-grand">
        <span className="overview-grand__num">{grandTotal}</span>
        <span className="overview-grand__label">reps au total</span>
      </div>

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
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#6B7A99' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 11, fill: '#6B7A99' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip
              contentStyle={{ borderRadius: 6, border: '1px solid #E8ECF3', fontSize: 13 }}
            />
            {EXERCISES.map(ex => visible[ex.id] && (
              <Line
                key={ex.id}
                type="monotone"
                dataKey={ex.id}
                stroke={ex.color}
                strokeWidth={2}
                dot={false}
                name={ex.label}
                connectNulls
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
