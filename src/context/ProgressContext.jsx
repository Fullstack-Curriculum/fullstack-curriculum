import { useEffect, useMemo, useState } from 'react'
import { STORAGE_KEY, ProgressContext } from './progressContextDef'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const value = useMemo(() => {
    const toggleTask = (key) => {
      setProgress((prev) => ({ ...prev, [key]: !prev[key] }))
    }
    const isChecked = (key) => !!progress[key]
    return { progress, toggleTask, isChecked }
  }, [progress])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
