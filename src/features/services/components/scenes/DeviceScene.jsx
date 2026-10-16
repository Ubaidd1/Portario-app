import { Sparkles, ArrowUpRight, Plus } from 'lucide-react'
export default function DeviceScene() {
  return (
    <div className="device-concept">
      <div className="mx-auto h-2 w-14 rounded-full bg-black" />
      <div className="mt-6 flex justify-between text-[9px]">
        <span>YOUR SPACE</span>
        <Plus size={12} />
      </div>
      <p className="mt-6 text-3xl tracking-tight">
        A good
        <br />
        day to build.
      </p>
      <div className="mt-6 rounded-2xl bg-accent p-5 text-white">
        <Sparkles size={23} />
        <p className="mt-5 text-sm">One clear next step.</p>
      </div>
      {['Your projects', 'Your progress'].map((label) => (
        <div
          key={label}
          className="mt-4 flex items-center justify-between border-b border-black/15 pb-3 text-[10px]"
        >
          {label}
          <ArrowUpRight size={12} />
        </div>
      ))}
    </div>
  )
}
