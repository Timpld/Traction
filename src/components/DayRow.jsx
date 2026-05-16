import { useState, useRef } from 'react'
import { formatDate, isToday } from '../utils/dateUtils'

export default function DayRow({ iso, entry, cumul, onUpdate, isOpen, onToggle }) {
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef(null)

  const sets = entry?.sets || []
  const rest = entry?.rest || false
  const total = sets.reduce((a, b) => a + b, 0)
  const maxSet = sets.length > 0 ? Math.max(...sets) : null
  const today = isToday(iso)

  function handleAddSet() {
    const n = parseInt(inputVal, 10)
    if (!n || n <= 0) return
    const newSets = [...sets, n]
    onUpdate({ sets: newSets, rest: false })
    setInputVal('')
    inputRef.current?.focus()
  }

  function handleRemoveSet(idx) {
    const newSets = sets.filter((_, i) => i !== idx)
    onUpdate({ sets: newSets, rest: false })
  }

  function handleToggleRest() {
    if (rest) {
      onUpdate({ sets: [], rest: false })
    } else {
      onUpdate({ sets: [], rest: true })
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddSet()
  }

  let setsDisplay = '—'
  if (rest) setsDisplay = 'Repos'
  else if (sets.length > 0) setsDisplay = sets.join(' + ')

  return (
    <div className={`day-row${today ? ' day-row--today' : ''}${isOpen ? ' day-row--open' : ''}`}>
      <div className="day-row__summary" onClick={onToggle}>
        <span className="day-row__date">
          {today && <span className="day-row__arrow">→ </span>}
          {formatDate(iso)}
        </span>
        <span className={`day-row__sets ${rest ? 'day-row__sets--rest' : ''}`}>{setsDisplay}</span>
        <span className="day-row__total">{total > 0 ? total : '—'}</span>
        <span className="day-row__max">{maxSet !== null ? maxSet : '—'}</span>
        <span className="day-row__cumul">{cumul > 0 ? cumul : '—'}</span>
      </div>

      {isOpen && (
        <div className="day-row__editor">
          {sets.length > 0 && (
            <div className="day-row__badges">
              {sets.map((s, i) => (
                <span key={i} className="badge">
                  {s}
                  <button className="badge__remove" onClick={() => handleRemoveSet(i)} aria-label="Supprimer">×</button>
                </span>
              ))}
            </div>
          )}

          {!rest && (
            <div className="day-row__input-row">
              <input
                ref={inputRef}
                type="number"
                min="1"
                placeholder="Reps"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="day-row__input"
              />
              <button className="btn btn--primary" onClick={handleAddSet}>Ajouter une série</button>
            </div>
          )}

          <div className="day-row__actions">
            {rest ? (
              <button className="btn btn--outline" onClick={handleToggleRest}>Annuler repos</button>
            ) : (
              <button className="btn btn--outline" onClick={handleToggleRest}>Repos</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
