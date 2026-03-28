import './ScoreGauge.css'

// ── ScoreGauge: animated circular SVG score display ─────────────────────────
// Props:
//   score     — number 0–100
//   label     — string shown below gauge
//   color     — CSS variable name like 'var(--accent)'
//   suffix    — '%' or '/100'
export default function ScoreGauge({ score, label, color, suffix = '/100' }) {
  const radius      = 45
  const circumference = 2 * Math.PI * radius   // ~283
  const clampedScore  = Math.min(100, Math.max(0, score))
  const offset        = circumference - (clampedScore / 100) * circumference

  // Color thresholds for score text
  function scoreColor() {
    if (clampedScore >= 75) return 'var(--accent)'
    if (clampedScore >= 50) return 'var(--gold)'
    return 'var(--red)'
  }

  function scoreLabel() {
    if (clampedScore >= 75) return 'Strong'
    if (clampedScore >= 50) return 'Average'
    return 'Weak'
  }

  return (
    <div className="gauge-wrap">
      <svg className="gauge-svg" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="7"
        />
        {/* Animated progress arc */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="gauge-arc"
          style={{ '--offset': offset, '--circ': circumference }}
        />
        {/* Score number */}
        <text
          x="50" y="46"
          textAnchor="middle"
          dominantBaseline="middle"
          className="gauge-number"
          fill={scoreColor()}
        >
          {clampedScore}
        </text>
        {/* Suffix */}
        <text
          x="50" y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          className="gauge-suffix"
          fill="var(--text-muted)"
        >
          {suffix}
        </text>
      </svg>

      <div className="gauge-label">{label}</div>
      <div className="gauge-grade" style={{ color: scoreColor() }}>
        {scoreLabel()}
      </div>
    </div>
  )
}
