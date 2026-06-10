import { TYPE_COLORS } from './timeBlockColors'
import PhaseMilestones from './PhaseMilestones'
import CurrentFocus from './CurrentFocus'

// Renders one "card" object from overview.json (legend, timeBlocks, steps,
// items, milestones, paragraphs, resource) — or a dynamic widget if
// card.dynamic is set.
export default function CardRenderer({ card }) {
  if (card.dynamic === 'phaseMilestones') {
    return (
      <div className="card mb-3">
        <div className="card-body">
          {card.heading && <h5 className="card-title mb-3">{card.heading}</h5>}
          <PhaseMilestones />
        </div>
      </div>
    )
  }

  if (card.dynamic === 'currentFocus') {
    return (
      <div className="card mb-3 border-primary">
        <div className="card-body">
          {card.heading && <h5 className="card-title mb-3">{card.heading}</h5>}
          <CurrentFocus />
        </div>
      </div>
    )
  }

  const hasLegend = card.legend && card.legend.length > 0
  const hasTimeBlocks = card.timeBlocks && card.timeBlocks.length > 0
  const hasSteps = card.steps && card.steps.length > 0
  const hasItems = card.items && card.items.length > 0
  const hasMilestones = card.milestones && card.milestones.length > 0
  const hasParagraphs = card.paragraphs && card.paragraphs.length > 0

  return (
    <div className="card mb-3">
      <div className="card-body">
        {card.heading && <h5 className="card-title mb-3">{card.heading}</h5>}

        {hasLegend && (
          <div className="d-flex flex-wrap gap-3 mb-3 small">
            {card.legend.map((l, i) => (
              <span key={i} className="d-flex align-items-center gap-1">
                <span
                  className="d-inline-block rounded-circle"
                  style={{ width: 10, height: 10, backgroundColor: l.color }}
                />
                {l.label}
              </span>
            ))}
          </div>
        )}

        {hasTimeBlocks && (
          <div className="d-flex flex-column gap-2 mb-3">
            {card.timeBlocks.map((tb, i) => (
              <div
                key={i}
                className="rounded p-2 ps-3"
                style={{
                  border: '1px solid #dee2e6',
                  borderLeft: `4px solid ${TYPE_COLORS[tb.type] || '#999'}`,
                }}
              >
                <div className="d-flex justify-content-between flex-wrap">
                  <strong>{tb.title}</strong>
                  <span className="text-muted small">{tb.time}</span>
                </div>
                <div className="text-muted small mt-1">{tb.text}</div>
              </div>
            ))}
          </div>
        )}

        {hasSteps && (
          <ol className="list-group list-group-numbered mb-3">
            {card.steps.map((s, i) => (
              <li key={i} className="list-group-item">
                <div className="fw-semibold">{s.title}</div>
                <div className="text-muted small">{s.text}</div>
              </li>
            ))}
          </ol>
        )}

        {hasItems && (
          <ul className="mb-3">
            {card.items.map((item, i) => (
              <li key={i} className="mb-1">{item}</li>
            ))}
          </ul>
        )}

        {hasMilestones && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {card.milestones.map((m, i) => (
              <span key={i} className="badge text-bg-light border">
                <strong>{m.label}:</strong> {m.text}
              </span>
            ))}
          </div>
        )}

        {hasParagraphs && (
          <pre className="bg-light border rounded p-3 mb-3 small" style={{ whiteSpace: 'pre-wrap' }}>
            {card.paragraphs.join('\n')}
          </pre>
        )}

        {card.resource && (
          <div className="text-muted small fst-italic">{card.resource}</div>
        )}
      </div>
    </div>
  )
}
