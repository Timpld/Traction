import { useState } from 'react'
import { getAllDays } from '../utils/dateUtils'
import DayRow from './DayRow'

export default function DayList({ data, onUpdate }) {
  const [openDay, setOpenDay] = useState(null)

  const days = getAllDays().slice().reverse()

  // Cumulative totals in chronological order
  const cumulMap = {}
  let running = 0
  getAllDays().forEach(iso => {
    running += (data[iso]?.sets || []).reduce((a, b) => a + b, 0)
    cumulMap[iso] = running
  })

  function handleToggle(iso) {
    setOpenDay(prev => (prev === iso ? null : iso))
  }

  function handleUpdate(iso, entry) {
    const newData = { ...data }
    if (entry.sets.length === 0 && !entry.rest) {
      delete newData[iso]
    } else {
      newData[iso] = entry
    }
    onUpdate(newData)
  }

  return (
    <div className="day-list">
      <div className="day-list__header">
        <span>Date / Jour</span>
        <span>Séries</span>
        <span>Total</span>
        <span>Max série</span>
        <span>Cumul</span>
      </div>
      {days.map(iso => (
        <DayRow
          key={iso}
          iso={iso}
          entry={data[iso]}
          cumul={cumulMap[iso]}
          onUpdate={entry => handleUpdate(iso, entry)}
          isOpen={openDay === iso}
          onToggle={() => handleToggle(iso)}
        />
      ))}
    </div>
  )
}
