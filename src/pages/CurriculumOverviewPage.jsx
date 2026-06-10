import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { curriculum, taskKeysForPhase } from '../data'
import { useStats } from '../context/useProgress'

export default function CurriculumOverviewPage() {
  return (
    <div>
      <h2>{curriculum.title}</h2>
      <p className="text-muted">{curriculum.subtitle}</p>

      <div className="row g-3 mb-3">
        {curriculum.overview.cards.map((card) => (
          <PhaseCard key={card.target} card={card} />
        ))}
      </div>

      <div className="row g-3 mb-3">
        {curriculum.overview.infoBoxes.map((box, i) => (
          <div className="col-12 col-md-6" key={i}>
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title">{box.heading}</h6>
                <p className="card-text small text-muted">{box.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {curriculum.overview.tip && (
        <div className="alert alert-info">{curriculum.overview.tip}</div>
      )}
    </div>
  )
}

function PhaseCard({ card }) {
  const keys = taskKeysForPhase(card.target)
  const { done, total, pct } = useStats(keys)

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={`/phase/${card.target}`} className="text-decoration-none text-reset">
        <div className="card h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h3 className="mb-1" style={{ color: card.color }}>{card.num}</h3>
              <span className="text-muted small">{card.duration}</span>
            </div>
            <h5 className="card-title">{card.title}</h5>
            <ProgressBar now={pct} label={`${pct}%`} variant="success" />
            <div className="text-muted small mt-1">{done} / {total} tasks done</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
