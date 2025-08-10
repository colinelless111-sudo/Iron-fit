import { describe, it, expect } from 'vitest'
import { groupByWeek, groupIntensityByWeek } from '../App.jsx'

describe('Chart aggregations', () => {
  const rows = [
    { date:'2025-01-01', lift:'Snatch', sets:'3', reps:'3', weight:'60' },
    { date:'2025-01-02', lift:'Snatch', sets:'3', reps:'2', weight:'80' },
    { date:'2025-01-10', lift:'Back Squat', sets:'5', reps:'3', weight:'150' },
  ]

  it('groups tonnage by week', () => {
    const data = groupByWeek(rows)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    const total = data.reduce((a,d)=>a + d.tonnage, 0)
    const expected = 3*3*60 + 3*2*80 + 5*3*150
    expect(total).toBe(expected)
  })

  it('splits intensity buckets', () => {
    const data = groupIntensityByWeek(rows)
    const totals = data.reduce((a,d)=>a + d.volLt70 + d.vol70to85 + d.vol85p, 0)
    const expected = 3*3*60 + 3*2*80 + 5*3*150
    expect(totals).toBe(expected)
  })
})
