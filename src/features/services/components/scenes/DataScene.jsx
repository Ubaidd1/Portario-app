const graph = [20, 32, 27, 45, 38, 68, 55, 80, 71, 92, 81, 100]
export default function DataScene() {
  return (
    <div className="data-concept">
      <div className="flex justify-between">
        <span className="eyebrow text-muted">READING THE SIGNAL</span>
        <span className="text-accent-soft">↗</span>
      </div>
      <p className="mt-5 text-3xl tracking-tight">Clarity in the noise.</p>
      <div className="mt-8 flex h-40 items-end gap-2">
        {graph.map((height, i) => (
          <span
            key={i}
            className="data-bar"
            style={{ height: `${height}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between font-mono text-[8px] text-muted">
        <span>ILLUSTRATIVE DATA</span>
        <span>EXPLORE / UNDERSTAND</span>
      </div>
    </div>
  )
}
