import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import { useProgress } from '../../context/useProgress'

// tasks: [{ key, text, description, concept }], rendered as checkboxes namespaced by phaseId
export default function TaskList({ tasks, phaseId }) {
  const { isChecked, toggleTask } = useProgress()
  if (!tasks || tasks.length === 0) return null

  return (
    <div className="mb-2">
      {tasks.map((task) => {
        const fullKey = `${phaseId}:${task.key}`
        const checked = isChecked(fullKey)
        return (
          <Form.Check
            key={fullKey}
            id={fullKey}
            type="checkbox"
            checked={checked}
            onChange={() => toggleTask(fullKey)}
            label={
              <span className={checked ? 'text-decoration-line-through text-muted' : ''}>
                <div>
                  {task.text}
                  {task.concept && (
                    <Badge bg="secondary" className="ms-2 fw-normal">
                      {task.concept}
                    </Badge>
                  )}
                </div>
                {task.description && <div className="text-muted small fst-italic">{task.description}</div>}
              </span>
            }
            className="mb-1"
          />
        )
      })}
    </div>
  )
}
