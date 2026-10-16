import { Check, Layers } from 'lucide-react'
export default function InterfaceScene() {
  return (
    <div className="interface-concept">
      <div className="interface-sheet">
        <div className="flex justify-between">
          <Layers size={20} />
          <span className="eyebrow">SYSTEM / 01</span>
        </div>
        <p className="mt-7 text-5xl tracking-tight">Aa Bb</p>
        <div className="mt-6 flex gap-3">
          {['--color-light', '--color-muted', '--color-accent', '--color-background'].map(
            (color) => (
              <span
                key={color}
                className="h-10 w-10 rounded-full border border-white/20"
                style={{ background: `var(${color})` }}
              />
            ),
          )}
        </div>
        <div className="mt-7 h-px bg-white/20" />
        <p className="mt-5 text-xs text-muted">A considered visual language.</p>
      </div>
      <div className="interface-toast">
        <Check size={17} className="text-accent-soft" />
        Every detail, connected.
      </div>
    </div>
  )
}
