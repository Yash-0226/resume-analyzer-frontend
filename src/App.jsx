import { useState } from 'react'
import UploadSection from './components/UploadSection.jsx'
import ResultsDashboard from './components/ResultsDashboard.jsx'
import './App.css'

// ── App is the root component. It owns all state and passes it down. ────────
export default function App() {
  const [results, setResults] = useState(null)   // null = no results yet
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // Called by UploadSection when user submits resume + JD
  async function handleAnalyze(resumeFile, jobDescription) {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // Build multipart form data to send file + text to Flask
      const formData = new FormData()
      formData.append('resume', resumeFile)
      formData.append('job_description', jobDescription)

      const response = await fetch('https://resume-analyzer-backend-production-39b1.up.railway.app/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Something went wrong')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setResults(null)
    setError(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-bracket">[</span>
            ResumeAI
            <span className="logo-bracket">]</span>
          </div>
          <p className="tagline">ATS Score · AI Analysis · Keyword Match</p>
        </div>
        <div className="header-line" />
      </header>

      <main className="app-main">
        {/* Always show upload section */}
        <UploadSection
          onAnalyze={handleAnalyze}
          loading={loading}
          hasResults={!!results}
          onReset={handleReset}
        />

        {/* Show error if any */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Show results dashboard once data arrives */}
        {results && <ResultsDashboard results={results} />}
      </main>

      <footer className="app-footer">
        <span>Built with React + Flask + Groq + scikit-learn</span>
      </footer>
    </div>
  )
}
