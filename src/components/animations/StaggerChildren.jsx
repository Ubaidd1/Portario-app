import { Children } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
export default function StaggerChildren({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.07 } } }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{ hidden: { opacity: 0, y: reduced ? 0 : 15 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: reduced ? 0 : 0.45 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
