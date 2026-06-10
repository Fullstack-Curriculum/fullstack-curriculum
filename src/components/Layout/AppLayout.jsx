import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar bg="dark" variant="dark" className="d-lg-none px-3" sticky="top">
        <button
          className="btn btn-outline-light me-2"
          onClick={() => setShowSidebar(true)}
          aria-label="Open menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Navbar.Brand className="mb-0">Fullstack Curriculum</Navbar.Brand>
      </Navbar>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          responsive="lg"
          placement="start"
          className="border-end"
          style={{ width: 260 }}
        >
          <Offcanvas.Header closeButton className="d-lg-none">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0 overflow-auto">
            <Sidebar onNavigate={() => setShowSidebar(false)} />
          </Offcanvas.Body>
        </Offcanvas>

        <main className="flex-grow-1 overflow-auto">
          <div className="container-fluid p-3 p-md-4" style={{ maxWidth: 1100 }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
