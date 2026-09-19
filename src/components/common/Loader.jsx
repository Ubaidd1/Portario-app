import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
export default function Loader() {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduced ? 0 : 1050)
    return () => clearTimeout(timer)
  }, [reduced])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none"
          exit={{ opacity: 0, y: reduced ? 0 : '-8%' }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-4xl font-extrabold tracking-[-.06em] sm:text-7xl">
            FOLIOBLOX<span className="text-accent">®</span>
          </span>
          <div className="mt-7 h-px w-48 bg-white/10">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.9 }}
            />
          </div>
          <span className="eyebrow mt-5 text-muted">IDEAS INTO EXPERIENCES</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
