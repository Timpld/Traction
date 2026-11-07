import { useState } from 'react'
import { PROGRAMS } from '../data/programs'

const DIFF_COLOR = {
  '~':  '#6B7A99',
  '+':  '#1A7A5E',
  '++': '#9B2335',
}

function repChips(label, sets) {
  if (!sets || sets.length === 0) return null
  return (
    <span className="seance-ex">
      <span className="seance-ex__label">{label}</span>
      {sets.map((n, i) => (
        <span key={i} className="seance-ex__chip">{n}</span>
      ))}
    </span>
  )
}

function hasReps(seance) {
  return (
    seance.tractions.length > 0 ||
    seance.dips.length > 0 ||
    seance.pompes.length > 0
  )
}

export default function ProgramModal({ activeSeance, onSelectSeance, onApplyAll }) {
  const [open, setOpen] = useState(false)
  const [programIdx, setProgramIdx] = useState(0)

  const program = PROGRAMS[programIdx]

  return (
    <>
      <button className="program-fab" onClick={() => setOpen(true)} title="Programme">
        <span className="program-fab__icon">📋</span>
        <span className="program-fab__label">Programme</span>
      </button>

      {open && (
        <div className="program-overlay" onClick={() => setOpen(false)}>
          <div className="program-modal" onClick={e => e.stopPropagation()}>
            <div className="program-modal__header">
              <h2 className="program-modal__title">Programme</h2>
              <button className="program-modal__close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="program-tabs">
              {PROGRAMS.map((p, i) => (
                <button
                  key={p.id}
                  className={`program-tab${programIdx === i ? ' program-tab--active' : ''}`}
                  onClick={() => setProgramIdx(i)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {activeSeance && (
              <div className="program-active-banner">
                <div className="program-active-banner__info">
                  <span className="program-active-banner__label">Séance active :</span>
                  <span className="program-active-banner__name">
                    {activeSeance.programLabel} · S{activeSeance.semaineNum}·{activeSeance.seanceNum} — {activeSeance.label}
                  </span>
                </div>
                <button
                  className="btn btn--gold program-active-banner__apply"
                  onClick={() => { onApplyAll(); setOpen(false) }}
                >
                  Appliquer tout
                </button>
              </div>
            )}

            <div className="program-body">
              {program.semaines.map(semaine => (
                <div key={semaine.num} className="program-semaine">
                  <div className="program-semaine__title">Semaine {semaine.num}</div>
                  {semaine.seances.map(seance => {
                    const selectable = hasReps(seance)
                    const isActive =
                      activeSeance &&
                      activeSeance.programId === program.id &&
                      activeSeance.semaineNum === semaine.num &&
                      activeSeance.seanceNum === seance.num

                    return (
                      <div
                        key={seance.num}
                        className={`seance-row${isActive ? ' seance-row--active' : ''}${!selectable ? ' seance-row--rest' : ''}`}
                      >
                        <div className="seance-row__meta">
                          <span
                            className="seance-row__diff"
                            style={{ color: DIFF_COLOR[seance.difficulte] || '#6B7A99' }}
                          >
                            {seance.difficulte}
                          </span>
                          <span className="seance-row__jour">{seance.jour}</span>
                          <span className="seance-row__label">{seance.label}</span>
                        </div>

                        <div className="seance-row__reps">
                          {repChips('T', seance.tractions)}
                          {repChips('D', seance.dips)}
                          {repChips('P', seance.pompes)}
                          {!selectable && <span className="seance-row__rest-tag">Repos / Cardio</span>}
                        </div>

                        {selectable && (
                          <button
                            className={`btn seance-row__select${isActive ? ' seance-row__select--active' : ''}`}
                            onClick={() => {
                              onSelectSeance(isActive ? null : {
                                programId: program.id,
                                programLabel: program.label,
                                semaineNum: semaine.num,
                                seanceNum: seance.num,
                                label: seance.label,
                                tractions: seance.tractions,
                                dips: seance.dips,
                                pompes: seance.pompes,
                              })
                              setOpen(false)
                            }}
                          >
                            {isActive ? 'Désélectionner' : 'Sélectionner'}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
