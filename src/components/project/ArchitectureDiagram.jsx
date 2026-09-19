import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
export default function ArchitectureDiagram({ nodes }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="architecture-diagram grid gap-4 md:grid-cols-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.name}
            className="relative"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <button
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setActive(index)
              }}
              className={`architecture-node ${Math.abs(active - index) <= 1 ? 'connected' : ''} ${active === index ? 'active' : ''}`}
            >
              <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
              <span className="mt-5 block text-lg tracking-tight">{node.name}</span>
              <span className="mt-5 block text-xs text-muted">
                {index === 0 ? 'INPUT' : index === nodes.length - 1 ? 'OUTPUT' : 'TRANSFORM'}
              </span>
            </button>
            {index < nodes.length - 1 && (
              <>
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="absolute -right-4 top-1/2 hidden text-accent md:block"
                />
                <ArrowDown
                  aria-hidden="true"
                  size={15}
                  className="mx-auto mt-3 text-accent md:hidden"
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-6 border-l-2 border-accent bg-white/[.025] p-6" aria-live="polite">
        <h3 className="text-base font-medium">{nodes[active].name}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{nodes[active].detail}</p>
      </div>
      <p className="mt-4 text-xs text-muted">
        Proposed architecture for the concept. Select a node to explore its responsibility.
      </p>
    </div>
  )
}
