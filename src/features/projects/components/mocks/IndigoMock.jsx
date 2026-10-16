import { Plus } from 'lucide-react'
export default function IndigoMock() {
  return (
    <div className="mock-app indigo-app">
      <div className="flex justify-between text-[9px] font-semibold">
        <span>indigo®</span>
        <span>
          Independent creative studio <Plus size={9} className="ml-4 inline" />
        </span>
      </div>
      <div className="mt-10 text-[62px] font-black leading-[.86] tracking-[-.08em]">
        GOOD
        <br />
        <span className="text-accent">DIFFERENT.</span>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <p className="max-w-36 text-[8px] leading-relaxed">
          A different point of view.
          <br />
          An unmistakable kind of energy.
          <br />
          We build brands that feel something.
        </p>
        <span className="text-7xl leading-none text-accent">✳</span>
      </div>
      <div className="mt-6 flex justify-between border-t border-black/20 pt-3 text-[7px]">
        <span>DESIGN WITH A POINT OF VIEW.</span>
        <span>LET’S TALK ↗</span>
      </div>
    </div>
  )
}
