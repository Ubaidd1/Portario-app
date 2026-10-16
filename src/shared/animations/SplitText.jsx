import { motion, useReducedMotion } from 'framer-motion'
export default function SplitText({ text, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <span aria-label={text} className={className}>
      {Array.from(text).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={index}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : index * 0.015 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}
