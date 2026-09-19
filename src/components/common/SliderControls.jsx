import { ArrowLeft, ArrowRight } from 'lucide-react'
export default function SliderControls({ index, total, onChange, label }) {
  return (
    <div className="flex items-center gap-5">
      <span className="font-mono text-xs tabular-nums" aria-live="polite">
        {String(index + 1).padStart(2, '0')}{' '}
        <span className="text-muted">/ {String(total).padStart(2, '0')}</span>
      </span>
      <div className="flex gap-2">
        <button
          className="icon-button"
          aria-label={`Previous ${label}`}
          onClick={() => onChange((index - 1 + total) % total)}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="icon-button"
          aria-label={`Next ${label}`}
          onClick={() => onChange((index + 1) % total)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
