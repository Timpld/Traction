import {
  ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Line, CartesianGrid,
} from 'recharts'
import { getAllDaysFrom, formatDateShort } from '../utils/dateUtils'

const GOLD = '#C9921A'

function movingAvg(arr, w = 7) {
  return arr.map((_, i) => {
    const sl = arr.slice(Math.max(0, i - w + 1), i + 1)
    const nonZero = sl.filter(v => v > 0)
    if (nonZero.length === 0) return 0
    return Math.round(nonZero.reduce((a, b) => a + b, 0) / nonZero.length * 10) / 10
  })
}

export default function ChartAllDays({ data, startDate, color = '#1B2D4F' }) {
  const days = getAllDaysFrom(startDate)
  const totals = days.map(iso => (data[iso]?.sets || []).reduce((a, b) => a + b, 0))
  const maxTotal = Math.max(...totals, 0)
  const avgs = movingAvg(totals)

  const chartData = days.map((iso, i) => ({
    date: formatDateShort(iso),
    total: totals[i],
    avg: avgs[i],
    isRecord: totals[i] === maxTotal && totals[i] > 0,
  }))

  const CustomBar = (props) => {
    const { x, y, width, height, total, isRecord } = props
    if (!total) {
      return <rect x={x + width * 0.2} y={y + height - 3} width={width * 0.6} height={3} fill="#DDE3EF" rx={1} />
    }
    return <rect x={x} y={y} width={width} height={height} fill={isRecord ? GOLD : color} rx={2} />
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-label">Tous les jours <span className="chart-label__sub">(tirets = pas de séance)</span></div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7A99' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11, fill: '#6B7A99' }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={{ borderRadius: 6, border: '1px solid #E8ECF3', fontSize: 13 }}
            formatter={(val, name) => [val || '—', name === 'avg' ? 'Moy. 7j' : 'Total']}
          />
          <Bar dataKey="total" shape={<CustomBar />} maxBarSize={30} />
          <Line type="monotone" dataKey="avg" stroke={GOLD} strokeWidth={2} strokeDasharray="5 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
