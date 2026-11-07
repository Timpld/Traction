import { EXERCISE_CONFIG } from '../utils/dateUtils'

const TABS = [
  { id: 'overview',   label: 'Général',   color: '#C9921A' },
  { id: 'tractions',  label: 'Tractions', color: EXERCISE_CONFIG.tractions.color },
  { id: 'dips',       label: 'Dips',      color: EXERCISE_CONFIG.dips.color },
  { id: 'pompes',     label: 'Pompes',    color: EXERCISE_CONFIG.pompes.color },
]

export default function TabNav({ active, onChange }) {
  return (
    <nav className="tab-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn${active === tab.id ? ' tab-btn--active' : ''}`}
          style={{ '--tab-color': tab.color }}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
