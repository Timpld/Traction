import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Line, ComposedChart, CartesianGrid,
} from 'recharts'
import { getAllDays, formatDateShort } from '../utils/dateUtils'

const NAVY = '#1B2D4F'
const GOLD = '#C9921A'

function movingAvg(arr, window = 3) {
  return arr.map((_, i) => {
    const slice = arr.slice(Math.max(0, i - window + 1), i + 1)
    return slice.reduce((a, b) => a + b, 0) / slice.length
  })
}

export default function Chart({ data }) {
  const days = getAllDays()
  const sessions = days
    .map(iso => {
      const sets = data[iso]?.sets || []
      const total = sets.reduce((a, b) => a + b, 0)
      return total > 0 ? { iso, total } : null
    })
    .filter(Boolean)

  if (sessions.length === 0) return null

  const maxTotal = Math.max(...sessions.map(s => s.total))
  const avgs = movingAvg(sessions.map(s => s.total))

  const chartData = sessions.map((s, i) => ({
    date: formatDateShort(s.iso),
    total: s.total,
    avg: Math.round(avgs[i] * 10) / 10,
    isRecord: s.total === maxTotal,
  }))

  const CustomBar = (props) => {
    const { x, y, width, height, isRecord } = props
    return <rect x={x} y={y} width={width} height={height} fill={isRecord ? GOLD : NAVY} rx={2} />
  }

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6B7A99' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7A99' }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{ borderRadius: 6, border: '1px solid #E8ECF3', fontSize: 13 }}
            formatter={(val, name) => [val, name === 'avg' ? 'Moyenne 3j' : 'Total']}
          />
          <Bar dataKey="total" shape={<CustomBar />} maxBarSize={40} />
          <Line
            type="monotone"
            dataKey="avg"
            stroke={GOLD}
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
