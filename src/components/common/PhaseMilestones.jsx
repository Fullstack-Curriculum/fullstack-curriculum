import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { curriculum, taskKeysForPhase } from '../../data'
import { useProgress } from '../../context/useProgress'

export default function PhaseMilestones() {
  const { progress } = useProgress()

  return (
    <div className="row g-3">
      {curriculum.phases.map((phase) => {
        const keys = taskKeysForPhase(phase.id)
        const done = keys.filter((k) => progress[k]).length
        const total = keys.length
        const pct = total === 0 ? 0 : Math.round((done / total) * 100)
        return (
          <div className="col-12 col-md-6" key={phase.id}>
            <Link to={`/phase/${phase.id}`} className="text-decoration-none text-reset">
              <div className="border rounded p-3 h-100">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <span className="badge text-bg-secondary me-2">{phase.badge}</span>
                    <strong>{phase.title}</strong>
                  </div>
                  <span className="text-muted small">{phase.meta}</span>
                </div>
                <div className="text-muted small mb-2">
                  {phase.project?.text}
                </div>
                <ProgressBar now={pct} label={`${pct}%`} />
                <div className="text-muted small mt-1">{done} / {total} tasks done</div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
