import { useState, useEffect } from 'react'
import { PROGRAMS } from '../data/programs'

const BASE = import.meta.env.BASE_URL

export default function ProgramModal({ activeSeance, onSelectSeance, onApplyAll }) {
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [progIdx, setProgIdx] = useState(0)
  const [semIdx, setSemIdx] = useState(0)
  const [seancIdx, setSeancIdx] = useState(0)

  useEffect(() => {
    if (!lightbox) return
    const close = e => e.key === 'Escape' && setLightbox(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [lightbox])

  const prog = PROGRAMS[progIdx]
  const semaine = prog.semaines[semIdx] || prog.semaines[0]
  const seance = semaine.seances[seancIdx] || semaine.seances[0]

  function handleChangeProg(i) {
    setProgIdx(i)
    setSemIdx(0)
    setSeancIdx(0)
  }

  function handleChangeSem(i) {
    setSemIdx(i)
    setSeancIdx(0)
  }

  function handleSelect() {
    onSelectSeance({
      programId: prog.id,
      programLabel: prog.label,
      semaineNum: semaine.num,
      seanceNum: seance.num,
      jour: seance.jour,
      label: seance.label,
      tractions: seance.tractions,
      dips: seance.dips,
      pompes: seance.pompes,
    })
    setOpen(false)
  }

  const isActive = activeSeance
    && activeSeance.programId === prog.id
    && activeSeance.semaineNum === semaine.num
    && activeSeance.seanceNum === seance.num

  const imgSrc = seance.page
    ? `${BASE}programs/${prog.id}/${seance.page}`
    : null

  return (
    <>
      <button className="program-fab" onClick={() => setOpen(true)}>
        <span className="program-fab__icon">📋</span>
        <span className="program-fab__label">
          {activeSeance
            ? `${activeSeance.programLabel} · S${activeSeance.semaineNum} · ${activeSeance.jour}`
            : 'Programme'}
        </span>
      </button>

      {open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="prog-modal">
            <div className="prog-modal__header">
              <span className="prog-modal__title">Programme</span>
              <button className="prog-modal__close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="prog-modal__prog-tabs">
              {PROGRAMS.map((p, i) => (
                <button
                  key={p.id}
                  className={`prog-tab${progIdx === i ? ' prog-tab--active' : ''}`}
                  onClick={() => handleChangeProg(i)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="prog-modal__sem-row">
              {prog.semaines.map((s, i) => (
                <button
                  key={s.num}
                  className={`sem-pill${semIdx === i ? ' sem-pill--active' : ''}`}
                  onClick={() => handleChangeSem(i)}
                >
                  Sem.{s.num}
                </button>
              ))}
            </div>

            <div className="prog-modal__jour-row">
              {semaine.seances.map((s, i) => (
                <button
                  key={s.num}
                  className={`jour-pill${seancIdx === i ? ' jour-pill--active' : ''}`}
                  onClick={() => setSeancIdx(i)}
                >
                  {s.jour}
                </button>
              ))}
            </div>

            <div className="prog-modal__page-area">
              {imgSrc
                ? <img
                    src={imgSrc}
                    alt={`${seance.jour} – ${seance.label}`}
                    className="prog-modal__page-img"
                    onClick={() => setLightbox(true)}
                    title="Appuyer pour agrandir"
                  />
                : <div className="prog-modal__no-page">{seance.label}</div>
              }
            </div>

            <div className="prog-modal__footer">
              <div className="prog-modal__footer-info">
                <span className="prog-modal__footer-label">{seance.jour} — {seance.label}</span>
                {activeSeance && (
                  <button className="btn btn--gold" onClick={() => { onApplyAll(); setOpen(false) }}>
                    Appliquer tout
                  </button>
                )}
              </div>
              <button
                className={`btn btn--primary prog-modal__select${isActive ? ' prog-modal__select--active' : ''}`}
                onClick={handleSelect}
              >
                {isActive ? '✓ Sélectionnée' : 'Sélectionner cette séance'}
              </button>
            </div>
          </div>
        </div>
      )}
      {lightbox && imgSrc && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <img src={imgSrc} alt={seance.label} className="lightbox__img" />
          <button className="lightbox__close" onClick={() => setLightbox(false)}>✕</button>
        </div>
      )}
    </>
  )
}
