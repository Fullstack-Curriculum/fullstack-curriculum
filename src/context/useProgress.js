import { useContext, useMemo } from 'react'
import { ProgressContext } from './progressContextDef'

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

// Helper: compute { done, total, pct } for a list of namespaced task keys
export function useStats(keys) {
  const { progress } = useProgress()
  return useMemo(() => {
    const total = keys.length
    const done = keys.filter((k) => progress[k]).length
    const pct = total === 0 ? 0 : Math.round((done / total) * 100)
    return { done, total, pct }
  }, [keys, progress])
}
