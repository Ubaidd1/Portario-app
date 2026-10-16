import { BarChart3, Command, Folder, LayoutDashboard, Search } from 'lucide-react'
export default function FormaMock() {
  return (
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
        <div className="mt-auto text-[8px] text-gray-600">YOUR WORK, IN FOCUS.</div>
      </aside>
      <div className="mock-main">
        <div className="flex justify-between border-b border-black/10 pb-3 text-[8px] text-gray-600">
          <span>Workspace / Overview</span>
          <Search size={10} />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-[17px] font-semibold tracking-tight">
              Let’s make things happen.
            </div>
            <div className="mt-1 text-[8px] text-gray-600">A little focus goes a long way.</div>
          </div>
          <span className="rounded bg-ink px-2 py-1 text-[7px] text-white">+ New project</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ['12', 'Active projects'],
            ['86%', 'On track'],
            ['24', 'Tasks completed'],
          ].map(([value, label]) => (
            <div key={label} className="mock-stat">
              <span className="text-[8px] text-gray-600">{label}</span>
              <strong className="mt-2 block text-xl font-medium">
                {value}
                <span className="ml-2 text-[7px] text-accent">↗</span>
              </strong>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between text-[10px] font-semibold">
          <span>Your projects</span>
          <span className="text-gray-600">•••</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['To do', 'In progress', 'Complete'].map((label, i) => (
            <div className="rounded bg-light p-2" key={label}>
              <span className="text-[7px] text-gray-600">● {label}</span>
              {[0, 1].map((n) => (
                <div key={n} className="mt-2 rounded bg-white p-2">
                  <div className={`h-1 w-8 rounded ${i === 1 ? 'bg-accent/50' : 'bg-gray-300'}`} />
                  <p className="mt-2 text-[7px]">
                    {['Website experience', 'Design exploration', 'Product strategy'][i]}
                  </p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-[6px] text-gray-600">June {12 + n}</span>
                    <span className="h-3 w-3 rounded-full bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
