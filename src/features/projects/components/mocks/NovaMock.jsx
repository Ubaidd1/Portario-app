import { ArrowUpRight, Sparkles } from 'lucide-react'
export default function NovaMock() {
  return (
    <div className="mock-app nova-app">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="flex items-center gap-2 text-sm">
          <Sparkles size={15} className="text-accent-soft" />
          nova
        </span>
        <span className="text-[8px] text-gray-400">YOUR EVERYDAY CO-PILOT</span>
      </div>
      <div className="flex flex-col items-center py-9">
        <div className="nova-spark">✳</div>
        <h4 className="mt-4 text-2xl tracking-tight">A little help. A lot of possibility.</h4>
        <p className="mt-2 text-[9px] text-gray-400">What can we make happen today?</p>
        <div className="mt-6 grid w-full grid-cols-3 gap-2">
          {['Explore an idea ↗', 'Make a plan ↗', 'Find an insight ↗'].map((label) => (
            <div
              key={label}
              className="rounded border border-white/10 p-3 text-[8px] text-gray-300"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg border border-white/20 bg-white/5 p-3 text-[9px] text-gray-400">
        <span>Ask anything. Start something.</span>
        <span className="rounded bg-accent p-1.5 text-white">
          <ArrowUpRight size={12} />
        </span>
      </div>
      <p className="mt-3 text-center text-[6px] text-gray-400">
        THOUGHTFUL INTELLIGENCE. HUMAN POSSIBILITIES.
      </p>
    </div>
  )
}
