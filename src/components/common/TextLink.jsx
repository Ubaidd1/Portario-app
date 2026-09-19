import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function TextLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`text-link group inline-flex min-h-11 items-center gap-5 border-b border-white/25 py-2 text-sm ${className}`}
    >
      {children}
      <ArrowUpRight
        size={17}
        className="text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </Link>
  )
}
