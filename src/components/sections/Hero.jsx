import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import DigitalCore from '../visuals/DigitalCore'
import MagneticButton from '../common/MagneticButton'
export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fill = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    ['rgba(244,243,239,1)', 'rgba(244,243,239,0)', 'rgba(244,243,239,1)'],
  )
  const enter = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay + 0.1, ease: [0.22, 1, 0.36, 1] },
  })
  return (
    <section ref={ref} id="home" className="hero relative overflow-hidden">
      <Container className="relative pt-35 sm:pt-43">
        <div className="relative z-10 flex items-center justify-between">
          <motion.p {...enter(0)} className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            INDEPENDENT DEVELOPER & CREATIVE THINKER
          </motion.p>
          <motion.span {...enter(0.1)} className="eyebrow hidden text-muted lg:block">
            BASED ONLINE. BUILDING WORLDWIDE.
          </motion.span>
        </div>
        <div className="relative mt-15 md:mt-18">
          <motion.p {...enter(0.12)} className="eyebrow mb-4 text-muted">
            HELLO, I’M A
          </motion.p>
          <h1 className="hero-title relative z-10 pointer-events-none">
            <motion.span {...enter(0.18)} className="block">
              FULL-STACK
            </motion.span>
            <motion.span
              {...enter(0.3)}
              className="block hero-outline"
              style={{ color: reduced ? undefined : fill }}
            >
              DEVELOPER<span className="text-accent">.</span>
            </motion.span>
          </h1>
          <motion.div {...enter(0.3)} className="hero-art">
            <DigitalCore />
          </motion.div>
        </div>
        <motion.div {...enter(0.45)} className="relative z-10 mt-9 max-w-lg">
          <p className="text-xl font-medium tracking-tight sm:text-2xl">
            Great technology should feel effortless.
          </p>
          <p className="mt-4 max-w-[405px] text-sm leading-7 text-muted">
            Websites, apps, AI, automation, and digital experiences built with purpose and designed
            to perform.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <MagneticButton to="/projects">Explore My Work</MagneticButton>
            <Button to="/contact" variant="outline">
              Start a Project
            </Button>
          </div>
        </motion.div>
        <motion.div
          {...enter(0.55)}
          className="relative z-10 mt-15 flex items-center justify-between border-t border-white/15 py-6"
        >
          <a href="#capabilities" className="eyebrow group flex items-center gap-3 text-muted">
            <ArrowDown size={15} className="scroll-arrow text-accent" />
            SCROLL TO EXPLORE
          </a>
          <span className="hidden items-center gap-2 text-xs sm:flex">
            <span className="availability-dot" />
            AVAILABLE FOR SELECTED PROJECTS
            <ArrowUpRight size={14} className="ml-2 text-muted" />
          </span>
          <span className="font-mono text-[10px] text-muted sm:hidden">PORTFOLIO / 2026</span>
        </motion.div>
      </Container>
    </section>
  )
}
