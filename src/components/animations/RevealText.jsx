import { motion, useReducedMotion } from 'framer-motion'
export default function RevealText({ text, className = '', as: Tag = 'h2' }) {
  const reduced = useReducedMotion()
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true }}
        variants={{ shown: { transition: { staggerChildren: reduced ? 0 : 0.045 } } }}
      >
        {text.split(' ').map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-top mr-[.22em]"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduced ? 0 : '105%', opacity: 0 },
                shown: { y: 0, opacity: 1 },
              }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
