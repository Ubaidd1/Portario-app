import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import SliderControls from '../common/SliderControls'
export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const [hidden, setHidden] = useState(false)
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.25 })
  const reduced = useReducedMotion()
  const stopped = paused || hover || hidden || reduced || !visible
  useEffect(() => {
    const update = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  useEffect(() => {
    if (stopped) return
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 8000)
    return () => clearInterval(timer)
  }, [stopped])
  const change = (value) => {
    setPaused(true)
    setIndex((value + testimonials.length) % testimonials.length)
  }
  const current = testimonials[index],
    next = testimonials[(index + 1) % testimonials.length]
  return (
    <section ref={ref} className="section-space">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <SectionTitle
              number="08"
              label="TESTIMONIALS"
              title={
                <>
                  Good work
                  <br />
                  starts with trust.
                </>
              }
            />
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              What clients and collaborators say about working together.
            </p>
            <p className="eyebrow mt-7 text-muted">ILLUSTRATIVE CLIENT VOICES</p>
          </div>
          <div
            className="min-w-0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setHover(true)
            }}
            onPointerLeave={() => setHover(false)}
            onFocusCapture={() => setPaused(true)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                change(index + 1)
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                change(index - 1)
              }
            }}
          >
            <span aria-hidden="true" className="block h-18 text-8xl leading-none text-accent">
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px] sm:min-h-[270px]"
                aria-live={stopped ? 'polite' : 'off'}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                style={{ touchAction: 'pan-y' }}
                onDragStart={() => setPaused(true)}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 45) change(index + (info.offset.x < 0 ? 1 : -1))
                }}
              >
                <blockquote className="text-2xl font-medium leading-[1.5] tracking-[-.035em] md:text-3xl">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-9 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-surface font-mono text-xs text-muted">
                    {current.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </span>
                  <div>
                    <span className="block text-sm font-medium">{current.name}</span>
                    <span className="mt-1 block text-xs text-muted">{current.project}</span>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div className="flex items-center gap-4">
                <button
                  className="icon-button"
                  disabled={!!reduced}
                  onClick={() => setPaused((value) => !value)}
                  aria-label={paused || reduced ? 'Play testimonials' : 'Pause testimonials'}
                  aria-pressed={paused || !!reduced}
                >
                  {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
                </button>
                <span className="eyebrow text-muted">
                  {reduced ? 'MANUAL MODE' : paused ? 'PAUSED' : '8 SECOND INTERVAL'}
                </span>
              </div>
              <SliderControls
                index={index}
                total={testimonials.length}
                onChange={change}
                label="testimonial"
              />
            </div>
            <button
              onClick={() => change(index + 1)}
              className="mt-7 w-full border-t border-white/10 pt-5 text-left"
            >
              <span className="eyebrow text-muted">UP NEXT / {next.name}</span>
              <span className="mt-3 block truncate text-lg tracking-tight text-white/40">
                “{next.quote}”
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
