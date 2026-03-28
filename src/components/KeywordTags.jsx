import './KeywordTags.css'

// ── KeywordTags: renders a list of keywords as colored pill tags ─────────────
// Props:
//   keywords  — array of strings
//   variant   — 'matched' | 'missing' | 'skill'
//   title     — section heading
//   icon      — emoji/char for the heading
export default function KeywordTags({ keywords = [], variant = 'skill', title, icon }) {
  if (!keywords.length) return null

  return (
    <div className={`keyword-section kw-${variant}`}>
      <div className="kw-header">
        <span className="kw-icon">{icon}</span>
        <span className="kw-title">{title}</span>
        <span className="kw-count">{keywords.length}</span>
      </div>
      <div className="kw-tags">
        {keywords.map((kw, i) => (
          <span key={i} className={`tag tag-${variant}`}>
            {variant === 'matched' && <span className="tag-dot">●</span>}
            {variant === 'missing' && <span className="tag-dot">○</span>}
            {kw}
          </span>
        ))}
      </div>
    </div>
  )
}
