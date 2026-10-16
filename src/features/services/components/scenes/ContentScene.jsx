import { Layers } from 'lucide-react'
export default function ContentScene() {
  return (
    <div className="content-concept">
      <div className="mb-5 flex justify-between">
        <span className="eyebrow">YOUR CONTENT. YOUR CONTROL.</span>
        <Layers size={16} className="text-accent-soft" />
      </div>
      {['Create', 'Refine', 'Publish'].map((text, i) => (
        <div key={text} className="content-block">
          <span className="font-mono text-xs text-accent-soft">0{i + 1}</span>
          <span className="text-xl">{text}</span>
          <span className="ml-auto text-muted">{i === 2 ? '↗' : '+'}</span>
        </div>
      ))}
      <div className="mt-5 border border-dashed border-white/20 p-5 text-center text-xs text-muted">
        Room for what comes next.
      </div>
    </div>
  )
}
