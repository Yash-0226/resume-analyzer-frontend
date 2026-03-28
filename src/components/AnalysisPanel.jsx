import './AnalysisPanel.css'

// ── AnalysisPanel: renders strengths, weaknesses, suggestions from LLM ───────
// Props:
//   summary     — string
//   strengths   — array of strings
//   weaknesses  — array of strings
//   suggestions — array of strings
export default function AnalysisPanel({ summary, strengths, weaknesses, suggestions }) {
  return (
    <div className="analysis-panel">
      {/* Summary */}
      {summary && (
        <div className="analysis-summary">
          <span className="summary-bar" />
          <p>{summary}</p>
        </div>
      )}

      <div className="analysis-grid">
        {/* Strengths */}
        <div className="analysis-card card-strength">
          <div className="ac-header">
            <span className="ac-icon">✦</span>
            <span className="ac-title">Strengths</span>
          </div>
          <ul className="ac-list">
            {strengths?.map((s, i) => (
              <li key={i} className="ac-item">
                <span className="ac-bullet bullet-green">▸</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="analysis-card card-weakness">
          <div className="ac-header">
            <span className="ac-icon">⚠</span>
            <span className="ac-title">Weaknesses</span>
          </div>
          <ul className="ac-list">
            {weaknesses?.map((w, i) => (
              <li key={i} className="ac-item">
                <span className="ac-bullet bullet-red">▸</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="analysis-card card-suggestion">
          <div className="ac-header">
            <span className="ac-icon">💡</span>
            <span className="ac-title">Suggestions</span>
          </div>
          <ol className="ac-list">
            {suggestions?.map((s, i) => (
              <li key={i} className="ac-item">
                <span className="ac-num">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
