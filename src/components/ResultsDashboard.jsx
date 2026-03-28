import ScoreGauge from './ScoreGauge.jsx'
import KeywordTags from './KeywordTags.jsx'
import AnalysisPanel from './AnalysisPanel.jsx'
import './ResultsDashboard.css'

// ── ResultsDashboard: assembles all result components ────────────────────────
// Props:
//   results — full JSON from Flask API
export default function ResultsDashboard({ results }) {
  const {
    ats_score,
    score,          // LLM score
    summary,
    strengths,
    weaknesses,
    suggestions,
    matched_keywords,
    missing_keywords,
    detected_skills,
  } = results

  return (
    <section className="results-section">
      {/* Section label */}
      <div className="section-label">
        <span className="label-num">02</span>
        <span>Analysis Results</span>
      </div>

      {/* ── SCORES ROW ── */}
      <div className="scores-row">
        <div className="scores-gauges">
          <ScoreGauge
            score={Math.round(ats_score)}
            label="ATS Match Score"
            color="var(--blue)"
            suffix="%"
          />
          <div className="score-divider" />
          <ScoreGauge
            score={score}
            label="AI Resume Score"
            color="var(--accent)"
            suffix="/100"
          />
        </div>

        {/* Score explanation */}
        <div className="scores-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--blue)' }} />
            <div>
              <div className="legend-title">ATS Match Score</div>
              <div className="legend-desc">
                How closely your resume matches the job description using
                TF-IDF + Cosine Similarity — the same technique real ATS systems use.
              </div>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--accent)' }} />
            <div>
              <div className="legend-title">AI Resume Score</div>
              <div className="legend-desc">
                Overall resume quality rated by Groq LLM — considers structure,
                clarity, impact, and relevance.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KEYWORDS ROW ── */}
      <div className="keywords-row">
        <KeywordTags
          keywords={matched_keywords}
          variant="matched"
          title="Matched Keywords"
          icon="✓"
        />
        <KeywordTags
          keywords={missing_keywords}
          variant="missing"
          title="Missing Keywords"
          icon="✗"
        />
      </div>

      {/* ── DETECTED SKILLS ── */}
      {detected_skills?.length > 0 && (
        <KeywordTags
          keywords={detected_skills}
          variant="skill"
          title="Detected Skills (NLP)"
          icon="⚙"
        />
      )}

      {/* ── AI ANALYSIS ── */}
      <div className="section-label" style={{ marginTop: 8 }}>
        <span className="label-num">03</span>
        <span>AI Analysis</span>
      </div>

      <AnalysisPanel
        summary={summary}
        strengths={strengths}
        weaknesses={weaknesses}
        suggestions={suggestions}
      />
    </section>
  )
}
