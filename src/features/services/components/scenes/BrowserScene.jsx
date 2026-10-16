import { Code2 } from 'lucide-react'
export default function BrowserScene() {
  return (
    <div className="browser-concept">
      <div className="concept-toolbar">
        <span>● ● ●</span>
        <span>build.with.purpose</span>
        <Code2 size={13} />
      </div>
      <div className="p-7">
        <span className="eyebrow text-accent-soft">FROM IDEA TO INTERFACE</span>
        <p className="mt-6 text-4xl font-medium tracking-tight">
          Hello,
          <br />
          possibility<span className="text-accent-soft">.</span>
        </p>
        <div className="mt-7 flex gap-3">
          <span className="h-9 w-28 bg-accent" />
          <span className="h-9 w-20 border border-white/20" />
        </div>
        <div className="mt-8 font-mono text-[10px] text-muted">
          <span className="text-accent-soft">const</span> future = build(idea)
        </div>
      </div>
    </div>
  )
}
