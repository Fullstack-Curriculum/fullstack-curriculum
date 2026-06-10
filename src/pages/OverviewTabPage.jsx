import { Navigate, useParams } from 'react-router-dom'
import { overview } from '../data'
import SectionRenderer from '../components/common/SectionRenderer'

export default function OverviewTabPage() {
  const { tabId } = useParams()
  const section = overview.sections.find((s) => s.id === tabId)

  if (!section) {
    return <Navigate to={`/plan/${overview.tabs[0].id}`} replace />
  }

  return <SectionRenderer section={section} />
}
