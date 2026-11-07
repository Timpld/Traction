export default function Stats({ data }) {
  const entries = Object.values(data)
  const allSets = entries.flatMap(e => e.sets || [])

  const total = allSets.reduce((a, b) => a + b, 0)
  const sessions = entries.filter(e => e.sets?.length > 0).length
  const recordSession = sessions > 0
    ? Math.max(...entries.map(e => (e.sets || []).reduce((a, b) => a + b, 0)))
    : 0
  const recordSet = allSets.length > 0 ? Math.max(...allSets) : 0

  const cards = [
    { label: 'Total', value: total, unit: 'reps' },
    { label: 'Séances', value: sessions, unit: 'jours' },
    { label: 'Record séance', value: recordSession, unit: 'reps' },
    { label: 'Série max', value: recordSet, unit: 'reps' },
  ]

  return (
    <div className="stats-grid">
      {cards.map(c => (
        <div key={c.label} className="stat-card">
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
          <div className="stat-unit">{c.unit}</div>
        </div>
      ))}
    </div>
  )
}
