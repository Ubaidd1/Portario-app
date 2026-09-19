import {
  ArrowUpRight,
  BarChart3,
  Command,
  Folder,
  LayoutDashboard,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
const bars = [28, 43, 35, 60, 47, 72, 62, 50, 81, 69, 92, 77, 62, 85, 100, 89]
export default function ProjectVisual({ kind, className = '' }) {
  return (
    <div
      className={`project-visual visual-${kind} ${className}`}
      role="img"
      aria-label={`${kind === 'forma' ? 'Forma workspace dashboard with task columns and team activity' : kind === 'frequency' ? 'Frequency analytics dashboard with red data charts' : kind === 'nova' ? 'Nova AI assistant conversation interface' : 'Orange Studio editorial website concept'}. Illustrative project concept.`}
    >
      <div aria-hidden="true" className="project-art-inner">
        {kind === 'forma' && (
          <div className="mock-app forma-app">
            <aside className="mock-sidebar">
              <div className="flex items-center gap-1.5 text-[13px] font-bold">
                <Command size={15} />
                forma<span className="text-accent">.</span>
              </div>
              <div className="mt-7 mock-nav active">
                <LayoutDashboard size={10} />
                Overview
              </div>
              <div className="mock-nav">
                <Folder size={10} />
                Projects
              </div>
              <div className="mock-nav">
                <BarChart3 size={10} />
                Insights
              </div>
              <div className="mt-auto text-[8px] text-gray-500">YOUR WORK, IN FOCUS.</div>
            </aside>
            <div className="mock-main">
              <div className="flex justify-between border-b border-black/10 pb-3 text-[8px] text-gray-500">
                <span>Workspace / Overview</span>
                <Search size={10} />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-[17px] font-semibold tracking-tight">
                    Let’s make things happen.
                  </div>
                  <div className="mt-1 text-[8px] text-gray-500">
                    A little focus goes a long way.
                  </div>
                </div>
                <span className="rounded bg-[#222] px-2 py-1 text-[7px] text-white">
                  + New project
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ['12', 'Active projects'],
                  ['86%', 'On track'],
                  ['24', 'Tasks completed'],
                ].map(([value, label]) => (
                  <div key={label} className="mock-stat">
                    <span className="text-[8px] text-gray-500">{label}</span>
                    <strong className="mt-2 block text-xl font-medium">
                      {value}
                      <span className="ml-2 text-[7px] text-accent">↗</span>
                    </strong>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between text-[10px] font-semibold">
                <span>Your projects</span>
                <span className="text-gray-500">•••</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {['To do', 'In progress', 'Complete'].map((label, i) => (
                  <div className="rounded bg-[#ececea] p-2" key={label}>
                    <span className="text-[7px] text-gray-500">● {label}</span>
                    {[0, 1].map((n) => (
                      <div key={n} className="mt-2 rounded bg-white p-2">
                        <div
                          className={`h-1 w-8 rounded ${i === 1 ? 'bg-red-300' : 'bg-gray-300'}`}
                        />
                        <p className="mt-2 text-[7px]">
                          {['Website experience', 'Design exploration', 'Product strategy'][i]}
                        </p>
                        <div className="mt-3 flex justify-between">
                          <span className="text-[6px] text-gray-500">June {12 + n}</span>
                          <span className="h-3 w-3 rounded-full bg-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {kind === 'frequency' && (
          <div className="mock-app frequency-app">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-semibold tracking-tight">
                frequency<span className="text-accent">↗</span>
              </span>
              <span className="text-[8px] text-gray-400">OVERVIEW / ANALYTICS</span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-lg font-medium">The bigger picture.</div>
              <span className="tag !text-[7px]">Last 30 days ↗</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {['$48,920', '24,816', '+32.6%'].map((value, i) => (
                <div key={value} className="border border-white/10 p-3">
                  <p className="text-[7px] text-gray-400">
                    {['TOTAL REVENUE', 'ACTIVE USERS', 'GROWTH RATE'][i]}
                  </p>
                  <p className="mt-2 text-xl tracking-tight">{value}</p>
                  <p className="mt-1 text-[7px] text-red-400">↗ Up this month</p>
                </div>
              ))}
            </div>
            <div className="mt-5 border border-white/10 p-4">
              <span className="text-[9px]">Revenue performance</span>
              <div className="mt-4 flex h-28 items-end gap-2">
                {bars.map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="flex-1 bg-gradient-to-t from-red-950 to-red-500"
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[6px] text-gray-500">
                <span>JUN 01</span>
                <span>JUN 15</span>
                <span>JUN 30</span>
              </div>
            </div>
          </div>
        )}
        {kind === 'nova' && (
          <div className="mock-app nova-app">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="flex items-center gap-2 text-sm">
                <Sparkles size={15} className="text-accent" />
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
            <p className="mt-3 text-center text-[6px] text-gray-500">
              THOUGHTFUL INTELLIGENCE. HUMAN POSSIBILITIES.
            </p>
          </div>
        )}
        {kind === 'orange' && (
          <div className="mock-app orange-app">
            <div className="flex justify-between text-[9px] font-semibold">
              <span>orange®</span>
              <span>
                Independent creative studio <Plus size={9} className="ml-4 inline" />
              </span>
            </div>
            <div className="mt-10 text-[62px] font-black leading-[.86] tracking-[-.08em]">
              GOOD
              <br />
              <span className="text-[#ee382a]">DIFFERENT.</span>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <p className="max-w-36 text-[8px] leading-relaxed">
                A different point of view.
                <br />
                An unmistakable kind of energy.
                <br />
                We build brands that feel something.
              </p>
              <span className="text-7xl leading-none text-[#ee382a]">✳</span>
            </div>
            <div className="mt-6 flex justify-between border-t border-black/20 pt-3 text-[7px]">
              <span>DESIGN WITH A POINT OF VIEW.</span>
              <span>LET’S TALK ↗</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
