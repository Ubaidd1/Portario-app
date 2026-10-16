import { Search } from 'lucide-react'
export default function SearchScene() {
  return (
    <div className="search-concept">
      <div className="flex items-center gap-4 rounded-full border border-white/30 px-5 py-4">
        <Search size={17} className="text-accent-soft" />
        <span className="text-sm">The right result.</span>
        <span className="ml-auto h-4 w-px animate-pulse bg-accent" />
      </div>
      {['Structure that makes sense', 'Content with a purpose', 'A better way to be found'].map(
        (text, i) => (
          <div className="mt-5 border-b border-white/10 pb-4" key={text}>
            <span className="font-mono text-[9px] text-accent-soft">
              0{i + 1} / ORGANIC DISCOVERY
            </span>
            <p className="mt-2 text-lg">{text}</p>
            <div className="mt-3 h-1 w-4/5 bg-white/10" />
          </div>
        ),
      )}
    </div>
  )
}
