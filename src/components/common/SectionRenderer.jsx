import Callout from './Callout'
import MetricsRow from './MetricsRow'
import CardRenderer from './CardRenderer'
import AskPrompt from './AskPrompt'

// Renders one "section" object from overview.json
export default function SectionRenderer({ section }) {
  return (
    <div>
      <h2>{section.title}</h2>
      {section.subtitle && <p className="text-muted">{section.subtitle}</p>}

      <MetricsRow metrics={section.metrics} />

      {(section.callouts || []).map((c, i) => (
        <Callout key={i} type={c.type} text={c.text} />
      ))}

      {(section.cards || []).map((card, i) => (
        <CardRenderer key={i} card={card} />
      ))}

      <AskPrompt prompt={section.askPrompt} />
    </div>
  )
}
