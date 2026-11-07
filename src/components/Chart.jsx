import {
  ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Line, CartesianGrid,
} from 'recharts'
import { getAllDaysFrom, formatDateShort } from '../utils/dateUtils'

const GOLD = '#C9921A'

function movingAvg(arr, w = 3) {
  return arr.map((_, i) => {
    const sl = arr.slice(Math.max(0, i - w + 1), i + 1)
    return Math.round(sl.reduce((a, b) => a + b, 0) / sl.length * 10) / 10
  })
}

export default function Chart({ data, color = '#1B2D4F', startDate }) {
  const days = startDate ? getAllDaysFrom(startDate) : getAllDaysFrom('2026-04-13')
  const sessions = days
    .map(iso => {
      const sets = data[iso]?.sets || []
      const total = sets.reduce((a, b) => a + b, 0)
      return total > 0 ? { iso, total } : null
    })
    .filter(Boolean)

  if (sessions.length === 0) return (
    <div className="chart-wrapper chart-wrapper--empty">
      <span>Aucune séance enregistrée</span>
    </div>
  )

  const maxTotal = Math.max(...sessions.map(s => s.total))
  const avgs = movingAvg(sessions.map(s => s.total))

  const chartData = sessions.map((s, i) => ({
    date: formatDateShort(s.iso),
    total: s.total,
    avg: avgs[i],
    isRecord: s.total === maxTotal,
  }))

  const CustomBar = (props) => {
    const { x, y, width, height, isRecord } = props
    return <rect x={x} y={y} width={width} height={height} fill={isRecord ? GOLD : color} rx={2} />
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-label">Séances uniquement</div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B7A99' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#6B7A99' }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={{ borderRadius: 6, border: '1px solid #E8ECF3', fontSize: 13 }}
            formatter={(val, name) => [val, name === 'avg' ? 'Moy. 3j' : 'Total']}
          />
          <Bar dataKey="total" shape={<CustomBar />} maxBarSize={40} />
          <Line type="monotone" dataKey="avg" stroke={GOLD} strokeWidth={2} strokeDasharray="5 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
