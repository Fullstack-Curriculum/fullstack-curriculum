import { useState } from 'react'

export default function AskPrompt({ prompt }) {
  const [copied, setCopied] = useState(false)
  if (!prompt) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body">
        <h6 className="card-title">Ask your AI assistant</h6>
        <p className="card-text small">{prompt}</p>
        <button className="btn btn-sm btn-outline-secondary" onClick={copy}>
          {copied ? 'Copied!' : 'Copy prompt'}
        </button>
      </div>
    </div>
  )
}
