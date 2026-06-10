export default function MetricsRow({ metrics }) {
  if (!metrics || metrics.length === 0) return null
  return (
    <div className="row g-3 mb-3">
      {metrics.map((m, i) => (
        <div key={i} className="col-6 col-md-3">
          <div className="border rounded p-3 text-center h-100 bg-light">
            <div className="fs-3 fw-bold">{m.num}</div>
            <div className="text-muted small">{m.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
