import { NavLink } from 'react-router-dom'
import { curriculum, overview } from '../../data'

const phaseTabs = curriculum.tabs.filter((t) => t.id !== 'overview')

export default function Sidebar({ onNavigate }) {
  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active fw-semibold' : ' link-body-emphasis')

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="mb-3">
        <h5 className="mb-0">Fullstack Curriculum</h5>
        <div className="text-muted small">Manoj's learning tracker</div>
      </div>

      <nav className="nav nav-pills flex-column mb-3">
        <NavLink to="/curriculum" className={linkClass} onClick={onNavigate} end>
          Curriculum overview
        </NavLink>
      </nav>

      <div className="text-uppercase text-muted small fw-bold mt-2 mb-1">Your plan</div>
      <nav className="nav nav-pills flex-column mb-3">
        {overview.tabs.map((tab) => (
          <NavLink key={tab.id} to={`/plan/${tab.id}`} className={linkClass} onClick={onNavigate}>
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className="text-uppercase text-muted small fw-bold mt-2 mb-1">Phases</div>
      <nav className="nav nav-pills flex-column mb-3">
        {phaseTabs.map((tab) => (
          <NavLink key={tab.id} to={`/phase/${tab.id}`} className={linkClass} onClick={onNavigate}>
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
