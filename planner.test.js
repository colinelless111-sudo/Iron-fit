import { describe, it, expect } from 'vitest'
import { generateSoviet, generatePeak } from '../App.jsx'

const oneRMs = { Snatch:110, "Clean & Jerk":128, "Back Squat":200, "Front Squat":140, Press:100 }

function findTopSets(plan) {
  return plan.flatMap(s => s.items.filter(it => /\(top\)|\(heavy\)/.test(it.variation||'') || it.variation?.includes('heavy')))
}

describe('Planner logic', () => {
  it('auto-caps heavy sets to singles when set reduction >= 40%', () => {
    const plan = generatePeak({ daysPerWeek: 3, oneRMs, roundTo: 0.5, injuryPct: 100, setReduction: 40 })
    const tops = findTopSets(plan)
    expect(tops.length).toBeGreaterThan(0)
    expect(tops.every(t => Number(t.reps) <= 1)).toBe(true)
  })

  it('reduces sets globally with setReduction', () => {
    const base = generateSoviet({ daysPerWeek: 3, oneRMs, roundTo: 0.5, injuryPct: 100, setReduction: 0 })
    const deload = generateSoviet({ daysPerWeek: 3, oneRMs, roundTo: 0.5, injuryPct: 100, setReduction: 50 })
    const sumSets = (p) => p.reduce((a,s)=>a + s.items.reduce((aa,it)=>aa + Number(it.sets),0),0)
    expect(sumSets(deload)).toBeLessThan(sumSets(base))
  })

  it('scales weights by injuryPct and rounds to step', () => {
    const a = generateSoviet({ daysPerWeek: 3, oneRMs, roundTo: 0.5, injuryPct: 100, setReduction: 0 })
    const b = generateSoviet({ daysPerWeek: 3, oneRMs, roundTo: 0.5, injuryPct: 80, setReduction: 0 })
    const sumW = (p) => p.reduce((a,s)=>a + s.items.reduce((aa,it)=>aa + Number(it.weight),0),0)
    expect(sumW(b)).toBeLessThan(sumW(a))
    const allStepsOk = b.every(s => s.items.every(it => Math.abs((Number(it.weight)*2) - Math.round(Number(it.weight)*2)) < 1e-6))
    expect(allStepsOk).toBe(true)
  })
})
