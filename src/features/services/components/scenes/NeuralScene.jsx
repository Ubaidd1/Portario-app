import { Sparkles } from 'lucide-react'
export default function NeuralScene() {
  return (
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
  )
}
