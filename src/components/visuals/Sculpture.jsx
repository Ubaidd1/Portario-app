import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
export default function Sculpture({ compact = false }) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 70, damping: 25 }),
    rotateY = useSpring(x, { stiffness: 70, damping: 25 })
  const move = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16)
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -16)
  }
  return (
    <div
      aria-hidden="true"
      className={`sculpture-stage ${compact ? 'compact' : ''}`}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="sculpture-cross cross-one">+</div>
      <div className="sculpture-cross cross-two">+</div>
      <motion.div className="sculpture-parallax" style={{ rotateX, rotateY }}>
        <div className="sculpture-object">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="sculpture-ribbon" style={{ '--i': i }} />
          ))}
        </div>
      </motion.div>
      <div className="sculpture-caption">
        <span>CREATIVE ENGINEERING</span>
        <span>FIG. 001 — INFINITE POSSIBILITIES</span>
      </div>
    </div>
  )
}
