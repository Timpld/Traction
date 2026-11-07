import * as XLSX from 'xlsx'
import { getAllDays, formatDate } from './dateUtils'

export function exportToExcel(data) {
  const days = getAllDays().slice().reverse()

  let cumul = 0
  const sessionDays = days.filter(d => data[d]?.sets?.length > 0)
  // compute cumul in chronological order first
  const cumulMap = {}
  let running = 0
  getAllDays().forEach(d => {
    const sets = data[d]?.sets || []
    running += sets.reduce((a, b) => a + b, 0)
    cumulMap[d] = running
  })

  const rows = days.map(iso => {
    const entry = data[iso] || {}
    const sets = entry.sets || []
    const total = sets.reduce((a, b) => a + b, 0)
    const maxSet = sets.length > 0 ? Math.max(...sets) : 0
    return {
      Date: iso,
      Jour: formatDate(iso),
      Séries: sets.length > 0 ? sets.join(' + ') : entry.rest ? 'Repos' : '—',
      Total: total || '',
      'Max série': maxSet || '',
      Cumul: cumulMap[iso] || '',
    }
  })

  const totalReps = Object.values(data).reduce((acc, e) => acc + (e.sets || []).reduce((a, b) => a + b, 0), 0)
  const sessions = Object.values(data).filter(e => e.sets?.length > 0).length
  const recordSession = Math.max(...Object.values(data).map(e => (e.sets || []).reduce((a, b) => a + b, 0)))
  const recordSet = Math.max(...Object.values(data).flatMap(e => e.sets || [0]))

  rows.push({})
  rows.push({
    Date: 'STATS',
    Jour: '',
    Séries: '',
    Total: `Total: ${totalReps}`,
    'Max série': `Séances: ${sessions}`,
    Cumul: `Record: ${recordSession} | Max série: ${recordSet}`,
  })

  const ws = XLSX.utils.json_to_sheet(rows)

  // Column widths
  ws['!cols'] = [
    { wch: 12 },
    { wch: 22 },
    { wch: 20 },
    { wch: 8 },
    { wch: 10 },
    { wch: 10 },
  ]

  // Style header row (navy background)
  const range = XLSX.utils.decode_range(ws['!ref'])
  for (let C = range.s.c; C <= range.e.c; C++) {
    const cellAddr = XLSX.utils.encode_cell({ r: 0, c: C })
    if (!ws[cellAddr]) continue
    ws[cellAddr].s = {
      fill: { fgColor: { rgb: '1B2D4F' } },
      font: { color: { rgb: 'FFFFFF' }, bold: true },
    }
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Tractions')
  XLSX.writeFile(wb, 'tractions.xlsx')
}
