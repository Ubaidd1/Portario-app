import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery'
export default function CustomCursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
  const reduced = useReducedMotion()
  const xTarget = useMotionValue(-200),
    yTarget = useMotionValue(-200)
  const x = useSpring(xTarget, { stiffness: 600, damping: 40 }),
    y = useSpring(yTarget, { stiffness: 600, damping: 40 })
  const [mode, setMode] = useState('normal')
  const modeRef = useRef('normal')
  useEffect(() => {
    if (!enabled || reduced) return
    const move = (event) => {
      xTarget.set(event.clientX)
      yTarget.set(event.clientY)
      const target = event.target.closest('[data-cursor], a, button, input, textarea, select')
      const next = target?.dataset.cursor || (target ? 'link' : 'normal')
      if (modeRef.current !== next) {
        modeRef.current = next
        setMode(next)
      }
    }
    const leave = () => {
      xTarget.set(-200)
      yTarget.set(-200)
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, reduced, xTarget, yTarget])
  if (!enabled || reduced) return null
  return (
    <motion.div aria-hidden="true" className={`custom-cursor cursor-${mode}`} style={{ x, y }}>
      <span>
        {mode === 'project'
          ? 'VIEW PROJECT ↗'
          : mode === 'image'
            ? 'EXPLORE'
            : mode === 'cta'
              ? '↗'
              : ''}
      </span>
    </motion.div>
  )
}
