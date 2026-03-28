import { useState, useRef } from 'react'
import './UploadSection.css'

// ── UploadSection: handles resume file pick + job description input ─────────
export default function UploadSection({ onAnalyze, loading, hasResults, onReset }) {
  const [file, setFile]           = useState(null)
  const [jd, setJd]               = useState('')
  const [dragOver, setDragOver]   = useState(false)
  const fileInputRef              = useRef(null)

  // Handle drag-and-drop
  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
    }
  }

  function handleFileChange(e) {
    const picked = e.target.files[0]
    if (picked) setFile(picked)
  }

  function handleSubmit() {
    if (!file || !jd.trim()) return
    onAnalyze(file, jd)
  }

  const canSubmit = file && jd.trim().length > 20 && !loading

  return (
    <section className="upload-section">
      <div className="section-label">
        <span className="label-num">01</span>
        <span>Upload & Analyze</span>
      </div>

      <div className="upload-grid">
        {/* ── LEFT: PDF Upload ── */}
        <div className="upload-card">
          <div className="card-title">
            <span className="card-icon">📄</span>
            Resume PDF
          </div>

          <div
            className={`dropzone ${dragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {file ? (
              <div className="file-info">
                <div className="file-icon">✓</div>
                <div className="file-name">{file.name}</div>
                <div className="file-size">
                  {(file.size / 1024).toFixed(1)} KB
                </div>
                <button
                  className="file-remove"
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="dropzone-prompt">
                <div className="drop-icon">⬆</div>
                <div className="drop-text">Drop PDF here or click to browse</div>
                <div className="drop-hint">Only .pdf files accepted</div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Job Description ── */}
        <div className="upload-card">
          <div className="card-title">
            <span className="card-icon">📋</span>
            Job Description
            <span className="char-count">{jd.length} chars</span>
          </div>

          <textarea
            className="jd-textarea"
            placeholder="Paste the full job description here...&#10;&#10;Include requirements, responsibilities, and skills. The more complete, the better your ATS score will be."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </div>
      </div>

      {/* ── Submit / Reset ── */}
      <div className="upload-actions">
        {hasResults && (
          <button className="btn-reset" onClick={onReset}>
            ↺ Analyze Another
          </button>
        )}
        <button
          className={`btn-analyze ${canSubmit ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner" />
              Analyzing...
            </span>
          ) : (
            '⚡ Analyze Resume'
          )}
        </button>
      </div>

      {/* Validation hints */}
      {!file && (
        <p className="hint">Upload your resume PDF to get started.</p>
      )}
      {file && jd.trim().length < 20 && (
        <p className="hint">Paste a job description (at least 20 characters).</p>
      )}
    </section>
  )
}
