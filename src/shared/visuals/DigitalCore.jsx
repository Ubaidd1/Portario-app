import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery'
export default function DigitalCore({ variant = 'hero', active = true }) {
  const ref = useRef(null)
  const visible = useInView(ref, { margin: '100px' })
  const reduced = useReducedMotion()
  const desktop = useMediaQuery('(hover: hover) and (min-width: 768px)')
  const tx = useMotionValue(0),
    ty = useMotionValue(0)
  const autoRotate = useMotionValue(0)
  const combinedY = useTransform([autoRotate, tx], ([a, t]) => a + t)
  const rotateX = useSpring(ty, { stiffness: 65, damping: 25 }),
    rotateY = useSpring(combinedY, { stiffness: 65, damping: 25 })
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })
  const [dragging, setDragging] = useState(false)
  useAnimationFrame((_, delta) => {
    if (reduced || !visible || !active || dragging) return
    autoRotate.set(autoRotate.get() + delta * 0.03)
  })
  return (
    <div
      ref={ref}
      className={`digital-core core-${variant} ${visible && active && !reduced ? 'core-running' : ''} ${dragging ? 'core-dragging' : ''}`}
      aria-hidden="true"
      data-cursor="image"
      style={{ touchAction: 'none' }}
      onPointerDown={(event) => {
        if (reduced) return
        drag.current = { active: true, lastX: event.clientX, lastY: event.clientY }
        setDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (reduced) return
        if (drag.current.active) {
          const dx = event.clientX - drag.current.lastX
          const dy = event.clientY - drag.current.lastY
          drag.current.lastX = event.clientX
          drag.current.lastY = event.clientY
          tx.set(tx.get() + dx * 0.4)
          ty.set(ty.get() - dy * 0.4)
          return
        }
        if (!desktop || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        tx.set((event.clientX - rect.left - rect.width / 2) * 0.05)
        ty.set((event.clientY - rect.top - rect.height / 2) * -0.05)
      }}
      onPointerUp={(event) => {
        drag.current.active = false
        setDragging(false)
        event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onPointerLeave={() => {
        if (drag.current.active) return
        tx.set(0)
        ty.set(0)
      }}
    >
      <div className="core-grid" />
      <div className="core-halo" />
      <motion.div className="core-perspective" style={{ rotateX, rotateY }}>
        <div className="core-assembly">
          <div className="core-ring ring-one" />
          <div className="core-ring ring-two" />
          <div className="core-ring ring-three" />
          <div className="core-center">
            {Array.from({ length: desktop ? 12 : 6 }, (_, i) => (
              <span className="core-blade" key={i} style={{ '--blade': i }} />
            ))}
            <span className="core-light" />
          </div>
          {Array.from({ length: desktop ? 6 : 3 }, (_, i) => (
            <span key={i} className="core-satellite" style={{ '--satellite': i }} />
          ))}
        </div>
      </motion.div>
      <div className="core-coordinates">
        <span>FORM / FUNCTION / POSSIBILITY</span>
        <span>
          CORE.001 <i /> ACTIVE
        </span>
      </div>
    </div>
  )
}
