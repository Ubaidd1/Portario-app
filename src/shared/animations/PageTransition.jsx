import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
const positions = new Map()
export default function PageTransition({ children, path, hash, navigationType }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const navigationMode = useRef(navigationType)
  useLayoutEffect(() => {
    const top = navigationMode.current === 'POP' ? positions.get(path) || 0 : 0
    window.scrollTo({ top, behavior: 'instant' })
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
      ref.current?.focus({ preventScroll: true })
    })
    return () => {
      cancelAnimationFrame(frame)
      positions.set(path, window.scrollY)
    }
  }, [path, hash])
  return (
    <motion.main
      ref={ref}
      tabIndex={-1}
      id="main-content"
      className="outline-none"
      initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{
        opacity: 0,
        y: reduced ? 0 : -8,
        scale: reduced ? 1 : 0.99,
        filter: reduced ? 'blur(0px)' : 'blur(3px)',
      }}
      transition={{ duration: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
