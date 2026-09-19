import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
export default function AdjacentNavigation({ items, current, base, label }) {
  const index = items.findIndex((item) => item.slug === current)
  const previous = items[(index - 1 + items.length) % items.length],
    next = items[(index + 1) % items.length]
  return (
    <nav
      aria-label={`${label} navigation`}
      className="grid gap-6 border-y border-white/15 py-8 sm:grid-cols-2"
    >
      <Link to={`${base}/${previous.slug}`} className="group">
        <span className="eyebrow text-muted">PREVIOUS {label.toUpperCase()}</span>
        <span className="mt-3 flex items-center gap-3 text-lg tracking-tight transition-colors group-hover:text-accent">
          <ArrowLeft size={18} />
          {previous.title || previous.name}
        </span>
      </Link>
      <Link to={`${base}/${next.slug}`} className="group sm:text-right">
        <span className="eyebrow text-muted">NEXT {label.toUpperCase()}</span>
        <span className="mt-3 flex items-center gap-3 text-lg tracking-tight transition-colors group-hover:text-accent sm:justify-end">
          {next.title || next.name}
          <ArrowRight size={18} />
        </span>
      </Link>
    </nav>
  )
}
