import curriculum from '../../data/fullstack_curriculum.json'
import overview from '../../data/overview.json'
import phase1 from '../../data/phase1_weekly_plan.json'
import phase2 from '../../data/phase2_weekly_plan.json'
import phase3 from '../../data/phase3_weekly_plan.json'
import phase4 from '../../data/phase4_weekly_plan.json'
import phase5 from '../../data/phase5_weekly_plan.json'

export const phasePlans = {
  p1: phase1,
  p2: phase2,
  p3: phase3,
  p4: phase4,
  p5: phase5,
}

export { curriculum, overview }

// Returns ["p1:1-1", "p1:1-2", ...] — namespaced so identical raw keys
// across different phase files (e.g. "pj-1") never collide.
export function taskKeysForPhase(phaseId) {
  const plan = phasePlans[phaseId]
  if (!plan) return []
  const keys = []
  for (const week of plan.weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        keys.push(`${phaseId}:${task.key}`)
      }
    }
    for (const card of week.projectCards || []) {
      for (const task of card.tasks || []) {
        keys.push(`${phaseId}:${task.key}`)
      }
    }
  }
  return keys
}

export function allPhaseIds() {
  return curriculum.phases.map((p) => p.id)
}
