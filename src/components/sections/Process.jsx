import TextLink from '../common/TextLink'
import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { process } from '../../data/process'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
export default function Process() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 30%'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) =>
    setActive(Math.min(3, Math.floor(value * 4))),
  )
  return (
    <section ref={ref} className="section-space bg-surface border-y border-white/10">
      <Container>
        <div className="flex items-end justify-between gap-8">
          <SectionTitle
            number="05"
            label="THE PROCESS"
            title={
              <>
                Ideas in motion.
                <br />
                Products with purpose.
              </>
            }
          />
          <p className="eyebrow hidden text-muted md:block">A CLEAR PATH. NO GUESSWORK.</p>
        </div>
        <div className="timeline relative mt-16 grid gap-8 md:grid-cols-4 md:gap-6">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-white/15 md:block">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          {process.map((step, index) => (
            <button
              key={step.title}
              onClick={() => setActive(index)}
              className={`process-step relative text-left ${active === index ? 'active' : ''}`}
              aria-pressed={active === index}
            >
              <span className="timeline-dot" />
              <span className="process-number block font-mono text-4xl text-muted transition-all duration-300 md:text-5xl">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              <ArrowUpRight
                size={18}
                className={`mt-5 ${active === index ? 'text-accent' : 'text-white/20'}`}
              />
            </button>
          ))}
        </div>
        <TextLink to="/process" className="mt-10">
          Explore the complete process
        </TextLink>
      </Container>
    </section>
  )
}
