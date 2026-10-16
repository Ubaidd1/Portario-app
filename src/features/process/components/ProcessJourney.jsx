import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Container from '@/shared/components/Container'
import { ServiceVisual } from '@/features/services'
import { workflow } from '../data/process'
export default function ProcessJourney() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) =>
    setActive(Math.min(workflow.length - 1, Math.floor(value * workflow.length))),
  )
  const step = workflow[active]
  const select = (index) => {
    const rect = ref.current.getBoundingClientRect()
    const start = window.scrollY + rect.top
    const range = ref.current.offsetHeight - window.innerHeight
    window.scrollTo({ top: start + (range * (index + 0.25)) / workflow.length, behavior: 'smooth' })
  }
  return (
    <section ref={ref} className="process-journey">
      <div className="sticky top-0 flex min-h-screen items-center py-28">
        <Container>
          <div className="mb-10 flex items-center justify-between">
            <p className="eyebrow text-muted">THE PROCESS / SCROLL TO EXPLORE</p>
            <span className="font-mono text-xs text-accent-soft">0{active + 1} / 07</span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[.5fr_1.2fr_1fr]">
            <div>
              <span className="process-display-number">0{active + 1}</span>
              <nav aria-label="Process steps" className="mt-8 flex flex-col items-start">
                {workflow.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => select(index)}
                    aria-current={active === index ? 'step' : undefined}
                    className={`min-h-10 text-xs transition-colors ${active === index ? 'text-accent-soft' : 'text-muted'}`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ServiceVisual type={step.visual} className="!min-h-[420px]" />
              </motion.div>
            </AnimatePresence>
            <div aria-live="polite">
              <p className="eyebrow text-accent-soft">{step.word}</p>
              <h2 className="mt-5 text-4xl tracking-tight">{step.title}</h2>
              <p className="mt-6 text-sm leading-8 text-muted">{step.description}</p>
              <div className="mt-8 border-t border-white/20 pt-5">
                <p className="eyebrow text-muted">WHAT YOU LEAVE WITH</p>
                <p className="mt-3 text-sm leading-7">{step.output}</p>
              </div>
            </div>
          </div>
          <div className="mt-12 h-px bg-white/15">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </Container>
      </div>
    </section>
  )
}
