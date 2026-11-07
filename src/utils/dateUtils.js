const START_DATE = '2026-04-13'

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MONTHS_FR = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

export function getAllDays() {
  const days = []
  const start = new Date(START_DATE + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cur = new Date(start)
  while (cur <= today) {
    days.push(toISO(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  const day = DAYS_FR[d.getDay()]
  const num = d.getDate()
  const month = MONTHS_FR[d.getMonth()]
  return `${day} ${num} ${month}`
}

export function formatDateShort(iso) {
  const d = new Date(iso + 'T00:00:00')
  const num = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${num}/${month}`
}

export function isToday(iso) {
  return iso === toISO(new Date())
}
