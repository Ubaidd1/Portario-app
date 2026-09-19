import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import Button from './Button'
export default function MagneticButton(props) {
  const reduced = useReducedMotion()
  const targetX = useMotionValue(0),
    targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 250, damping: 22 }),
    y = useSpring(targetY, { stiffness: 250, damping: 22 })
  return (
    <motion.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        targetX.set((event.clientX - rect.left - rect.width / 2) * 0.12)
        targetY.set((event.clientY - rect.top - rect.height / 2) * 0.15)
      }}
      onPointerLeave={() => {
        targetX.set(0)
        targetY.set(0)
      }}
    >
      <Button {...props} />
    </motion.span>
  )
}
