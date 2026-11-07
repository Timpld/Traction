export const START_DATES = {
  tractions: '2026-04-13',
  dips: '2026-11-07',
  pompes: '2026-11-07',
}

export const EXERCISE_CONFIG = {
  tractions: { label: 'Tractions', color: '#1B2D4F', subtitle: 'Suivi depuis le 13 avril 2026' },
  dips:      { label: 'Dips',      color: '#1A7A5E', subtitle: 'Suivi depuis le 7 novembre 2026' },
  pompes:    { label: 'Pompes',    color: '#9B2335', subtitle: 'Suivi depuis le 7 novembre 2026' },
}

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MONTHS_FR = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

export function getAllDaysFrom(startDate) {
  const days = []
  const start = new Date(startDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const cur = new Date(start)
  while (cur <= today) {
    days.push(toISO(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

export function getAllDays() {
  return getAllDaysFrom(START_DATES.tractions)
}

export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`
}

export function formatDateShort(iso) {
  const d = new Date(iso + 'T00:00:00')
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function isToday(iso) {
  return iso === toISO(new Date())
}

export function subDays(n) {
  const d = new Date()
  d.setDate(d.getDate() - n + 1)
  d.setHours(0, 0, 0, 0)
  return toISO(d)
}
