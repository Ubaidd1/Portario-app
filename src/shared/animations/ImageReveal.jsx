import { motion, useReducedMotion } from 'framer-motion'
export default function ImageReveal({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, clipPath: reduced ? 'inset(0%)' : 'inset(8% 0 8% 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0%)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 0.65 }}
    >
      <motion.div
        initial={{ scale: reduced ? 1 : 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
