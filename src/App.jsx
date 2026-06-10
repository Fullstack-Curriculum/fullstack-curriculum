import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout'
import CurriculumOverviewPage from './pages/CurriculumOverviewPage'
import OverviewTabPage from './pages/OverviewTabPage'
import PhasePage from './pages/PhasePage'
import { ProgressProvider } from './context/ProgressContext'

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/curriculum" replace />} />
          <Route path="curriculum" element={<CurriculumOverviewPage />} />
          <Route path="plan/:tabId" element={<OverviewTabPage />} />
          <Route path="phase/:phaseId" element={<PhasePage />} />
          <Route path="phase/:phaseId/:weekId" element={<PhasePage />} />
          <Route path="*" element={<Navigate to="/curriculum" replace />} />
        </Route>
      </Routes>
    </ProgressProvider>
  )
}
