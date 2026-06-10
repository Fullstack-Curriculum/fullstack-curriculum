import Alert from 'react-bootstrap/Alert'

const VARIANTS = {
  warn: 'warning',
  tip: 'info',
  success: 'success',
}

export default function Callout({ type, text }) {
  return <Alert variant={VARIANTS[type] || 'secondary'}>{text}</Alert>
}
