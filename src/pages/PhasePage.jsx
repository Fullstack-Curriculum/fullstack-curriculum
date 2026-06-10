import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Nav from 'react-bootstrap/Nav'
import { curriculum, phasePlans, taskKeysForPhase } from '../data'
import { useStats } from '../context/useProgress'
import TaskList from '../components/common/TaskList'
import AskPrompt from '../components/common/AskPrompt'

export default function PhasePage() {
  const { phaseId, weekId } = useParams()
  const phase = curriculum.phases.find((p) => p.id === phaseId)
  const plan = phasePlans[phaseId]
  const keys = taskKeysForPhase(phaseId)
  const { done, total, pct } = useStats(keys)

  if (!phase || !plan) {
    return <Navigate to="/curriculum" replace />
  }

  if (!weekId) {
    return <Navigate to={`/phase/${phaseId}/${plan.nav[0].id}`} replace />
  }

  const week = plan.weeks.find((w) => w.id === weekId)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-1">
        <div>
          <span className="badge text-bg-secondary me-2">{phase.badge}</span>
          <span className="text-muted">{phase.meta}</span>
        </div>
        <Link to="/curriculum" className="small">← Curriculum overview</Link>
      </div>
      <h2>{phase.title}</h2>
      <ProgressBar now={pct} label={`${pct}%`} variant="success" className="mb-1" />
      <div className="text-muted small mb-3">{done} / {total} tasks done</div>

      <div className="row g-3 mb-3">
        {phase.topics.map((topic, i) => (
          <div className="col-12 col-md-6" key={i}>
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title">{topic.heading}</h6>
                <ul className="mb-0 small">
                  {topic.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {phase.tip && <div className="alert alert-info">{phase.tip}</div>}

      <Nav variant="pills" activeKey={weekId} className="mb-3 flex-wrap">
        {plan.nav.map((navItem) => (
          <Nav.Item key={navItem.id}>
            <Nav.Link as={Link} to={`/phase/${phaseId}/${navItem.id}`} eventKey={navItem.id}>
              {navItem.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {week && <WeekContent week={week} phaseId={phaseId} phase={phase} />}
    </div>
  )
}

function WeekContent({ week, phaseId, phase }) {
  return (
    <div>
      <h4>{week.title}</h4>
      {week.description && <p className="text-muted">{week.description}</p>}

      {(week.days || []).map((day, i) => (
        <div className="card mb-3" key={i}>
          <div className="card-body">
            <div className="text-muted small">{day.label}</div>
            <h6 className="card-title">{day.title}</h6>
            <TaskList tasks={day.tasks} phaseId={phaseId} />
            {day.resource && <div className="text-muted small fst-italic">{day.resource}</div>}
          </div>
        </div>
      ))}

      {(week.projectCards || []).map((card, i) => (
        <div className="card mb-3" key={i}>
          <div className="card-body">
            <h6 className="card-title">{card.heading}</h6>
            {card.text && <p className="card-text small">{card.text}</p>}
            <TaskList tasks={card.tasks} phaseId={phaseId} />
          </div>
        </div>
      ))}

      {week.id === 'proj' && phase.project && (
        <div className="card mb-3 bg-light">
          <div className="card-body">
            <h6 className="card-title">{phase.project.heading}</h6>
            <p className="card-text small mb-0">{phase.project.text}</p>
          </div>
        </div>
      )}

      {week.tip && <div className="alert alert-info">{week.tip}</div>}

      <AskPrompt prompt={week.askPrompt} />
    </div>
  )
}
