import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
export default function EditorialTimeline({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  return (
    <div ref={ref} className="editorial-timeline relative pl-8 sm:pl-14">
      <div className="absolute bottom-0 left-1 top-0 w-px bg-white/15">
        <motion.div
          className="h-full w-full origin-top bg-accent"
          style={{ scaleY: scrollYProgress }}
        />
      </div>
      {items.map((item, index) => (
        <FadeIn key={item.title} className="relative border-b border-white/15 py-9">
          <motion.span
            className="timeline-node"
            initial={{ backgroundColor: '#171717' }}
            whileInView={{ backgroundColor: '#f04436' }}
            viewport={{ amount: 1 }}
          />
          <div className="grid gap-6 md:grid-cols-[.7fr_1.5fr]">
            <div>
              <p className="eyebrow text-muted">
                0{index + 1} / {item.status || 'THE PRACTICE'}
              </p>
              <h3 className="mt-4 text-3xl tracking-tight">{item.title}</h3>
            </div>
            <p className="max-w-lg text-base leading-8 text-muted">{item.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
