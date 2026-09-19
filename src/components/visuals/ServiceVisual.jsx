import { Code2, Search, Sparkles, ArrowUpRight, Check, Layers, Plus } from 'lucide-react'
const graph = [20, 32, 27, 45, 38, 68, 55, 80, 71, 92, 81, 100]
export default function ServiceVisual({ type = 'browser', className = '' }) {
  return (
    <div
      className={`service-visual scene-${type} ${className}`}
      role="img"
      aria-label={`${type} interface concept`}
      data-cursor="image"
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-composition" aria-hidden="true">
        {type === 'browser' && (
          <div className="browser-concept">
            <div className="concept-toolbar">
              <span>● ● ●</span>
              <span>build.with.purpose</span>
              <Code2 size={13} />
            </div>
            <div className="p-7">
              <span className="eyebrow text-accent">FROM IDEA TO INTERFACE</span>
              <p className="mt-6 text-4xl font-medium tracking-tight">
                Hello,
                <br />
                possibility<span className="text-accent">.</span>
              </p>
              <div className="mt-7 flex gap-3">
                <span className="h-9 w-28 bg-accent" />
                <span className="h-9 w-20 border border-white/20" />
              </div>
              <div className="mt-8 font-mono text-[10px] text-muted">
                <span className="text-accent">const</span> future = build(idea)
              </div>
            </div>
          </div>
        )}
        {type === 'device' && (
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
        )}
        {type === 'neural' && (
          <div className="neural-concept">
            <svg viewBox="0 0 360 280" className="absolute inset-0 h-full w-full">
              <g stroke="currentColor" strokeWidth="1">
                {[45, 140, 235].flatMap((y) =>
                  [70, 140, 210].map((z) => (
                    <path key={`${y}-${z}`} d={`M35 ${y} L180 ${z} L325 ${y}`} />
                  )),
                )}
              </g>
            </svg>
            {[0, 1, 2].flatMap((column) =>
              [0, 1, 2].map((row) => (
                <span
                  key={`${column}-${row}`}
                  className={`neuron ${column === 1 ? 'central' : ''}`}
                  style={{
                    left: `${10 + column * 40}%`,
                    top: `${16 + row * 33}%`,
                    animationDelay: `${row + column}s`,
                  }}
                >
                  {column === 1 && row === 1 ? <Sparkles size={20} /> : ''}
                </span>
              )),
            )}
            <span className="absolute -bottom-9 left-0 right-0 text-center font-mono text-[10px] text-muted">
              INPUT → CONTEXT → USEFUL OUTPUT
            </span>
          </div>
        )}
        {type === 'data' && (
          <div className="data-concept">
            <div className="flex justify-between">
              <span className="eyebrow text-muted">READING THE SIGNAL</span>
              <span className="text-accent">↗</span>
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
        )}
        {type === 'search' && (
          <div className="search-concept">
            <div className="flex items-center gap-4 rounded-full border border-white/30 px-5 py-4">
              <Search size={17} className="text-accent" />
              <span className="text-sm">The right result.</span>
              <span className="ml-auto h-4 w-px animate-pulse bg-accent" />
            </div>
            {[
              'Structure that makes sense',
              'Content with a purpose',
              'A better way to be found',
            ].map((text, i) => (
              <div className="mt-5 border-b border-white/10 pb-4" key={text}>
                <span className="font-mono text-[9px] text-accent">
                  0{i + 1} / ORGANIC DISCOVERY
                </span>
                <p className="mt-2 text-lg">{text}</p>
                <div className="mt-3 h-1 w-4/5 bg-white/10" />
              </div>
            ))}
          </div>
        )}
        {type === 'social' && (
          <div className="social-concept">
            {['A clear voice.', 'A useful story.', 'A real connection.'].map((text, i) => (
              <div className="social-fragment" style={{ '--card': i }} key={text}>
                <span className="eyebrow">STUDIO / NOTES</span>
                <p className="mt-10 text-3xl leading-tight tracking-tight">{text}</p>
                <span className="mt-8 block text-5xl">✳</span>
                <p className="mt-8 text-[9px]">CONTENT WITH INTENTION ↗</p>
              </div>
            ))}
          </div>
        )}
        {type === 'interface' && (
          <div className="interface-concept">
            <div className="interface-sheet">
              <div className="flex justify-between">
                <Layers size={20} />
                <span className="eyebrow">SYSTEM / 01</span>
              </div>
              <p className="mt-7 text-5xl tracking-tight">Aa Bb</p>
              <div className="mt-6 flex gap-3">
                {['#eeeae2', '#999995', '#f04436', '#101010'].map((color) => (
                  <span
                    key={color}
                    className="h-10 w-10 rounded-full border border-white/20"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="mt-7 h-px bg-white/20" />
              <p className="mt-5 text-xs text-muted">A considered visual language.</p>
            </div>
            <div className="interface-toast">
              <Check size={17} className="text-accent" />
              Every detail, connected.
            </div>
          </div>
        )}
        {type === 'content' && (
          <div className="content-concept">
            <div className="mb-5 flex justify-between">
              <span className="eyebrow">YOUR CONTENT. YOUR CONTROL.</span>
              <Layers size={16} className="text-accent" />
            </div>
            {['Create', 'Refine', 'Publish'].map((text, i) => (
              <div key={text} className="content-block">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="text-xl">{text}</span>
                <span className="ml-auto text-muted">{i === 2 ? '↗' : '+'}</span>
              </div>
            ))}
            <div className="mt-5 border border-dashed border-white/20 p-5 text-center text-xs text-muted">
              Room for what comes next.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
