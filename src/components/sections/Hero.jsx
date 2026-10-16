import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import DigitalCore from '../visuals/DigitalCore'
import MagneticButton from '../common/MagneticButton'
import { site, socialLinks } from '../../config/site'
export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fill = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    ['rgba(241,243,245,1)', 'rgba(241,243,245,0)', 'rgba(241,243,245,1)'],
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
            <span className="availability-dot" aria-hidden="true" />
            INDEPENDENT DEVELOPER · AVAILABLE FOR SELECT PROJECTS
          </motion.p>
          <motion.span {...enter(0.1)} className="eyebrow hidden text-muted lg:block">
            {site.location.toUpperCase()}
          </motion.span>
        </div>
        <div className="relative mt-15 md:mt-18">
          <motion.p {...enter(0.12)} className="eyebrow mb-4 text-muted">
            {site.ownerName ? `HELLO, I’M ${site.ownerName.toUpperCase()}, A` : 'HELLO, I’M A'}
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
              DEVELOPER<span className="text-accent-soft">.</span>
            </motion.span>
          </h1>
          <motion.div {...enter(0.3)} className="hero-art">
            <DigitalCore />
          </motion.div>
        </div>
        <motion.div {...enter(0.45)} className="relative z-10 mt-9 max-w-lg">
          <p className="text-xl font-medium tracking-tight sm:text-2xl">
            Thoughtful code. Useful digital experiences.
          </p>
          <p className="mt-4 max-w-[430px] text-base leading-7 text-muted">
            I design and build fast websites, web applications, and AI and data tools, from the
            first prototype through to a reliable, well-documented release.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <MagneticButton to="/projects">Explore My Work</MagneticButton>
            <Button to="/contact" variant="outline">
              Let’s Talk
            </Button>
          </div>
        </motion.div>
        <motion.div
          {...enter(0.55)}
          className="relative z-10 mt-15 flex items-center justify-between border-t border-white/15 py-6"
        >
          <a href="#projects" className="eyebrow group flex items-center gap-3 text-muted">
            <ArrowDown size={15} className="scroll-arrow text-accent-soft" />
            SCROLL TO EXPLORE
          </a>
          {socialLinks.length > 0 && (
            <ul className="flex flex-wrap items-center gap-5 text-xs" aria-label="Profiles">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
