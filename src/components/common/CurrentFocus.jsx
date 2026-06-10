import { Link } from 'react-router-dom'
import { curriculum, phasePlans } from '../../data'
import { useProgress } from '../../context/useProgress'

// Finds the first incomplete task across the whole curriculum and surfaces it
// as "what to do next" — driven entirely by localStorage progress.
export default function CurrentFocus() {
  const { progress } = useProgress()

  for (const phase of curriculum.phases) {
    const plan = phasePlans[phase.id]
    if (!plan) continue

    for (const week of plan.weeks) {
      for (const day of week.days || []) {
        for (const task of day.tasks || []) {
          const fullKey = `${phase.id}:${task.key}`
          if (!progress[fullKey]) {
            return (
              <Focus
                phase={phase}
                weekLabel={week.title}
                weekId={week.id}
                contextLabel={day.label ? `${day.label} — ${day.title}` : day.title}
                taskText={task.text}
              />
            )
          }
        }
      }
      for (const card of week.projectCards || []) {
        for (const task of card.tasks || []) {
          const fullKey = `${phase.id}:${task.key}`
          if (!progress[fullKey]) {
            return (
              <Focus
                phase={phase}
                weekLabel={week.title}
                weekId={week.id}
                contextLabel={card.heading}
                taskText={task.text}
              />
            )
          }
        }
      }
    }
  }

  return (
    <div className="alert alert-success mb-0">
      Every task in the curriculum is checked off. Time to pick the next phase or revisit a project!
    </div>
  )
}

function Focus({ phase, weekLabel, weekId, contextLabel, taskText }) {
  return (
    <div className="d-flex flex-column gap-1">
      <div>
        <span className="badge text-bg-secondary me-2">{phase.badge}</span>
        <strong>{phase.title}</strong>
        <span className="text-muted"> · {weekLabel}</span>
      </div>
      <div className="text-muted small">{contextLabel}</div>
      <div className="fw-semibold">Next up: {taskText}</div>
      <div>
        <Link to={`/phase/${phase.id}/${weekId}`} className="btn btn-sm btn-primary mt-1">
          Go to this task
        </Link>
      </div>
    </div>
  )
}
