import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/shared/components/Container'
import SectionTitle from '@/shared/components/SectionTitle'
import SliderControls from '@/shared/components/SliderControls'
import useCarousel from '@/shared/hooks/useCarousel'
import { awards } from '../data/awards'
export default function Awards({ number = '09' }) {
  const { index, go, onKeyDown, onDragEnd } = useCarousel(awards.length)
  const award = awards[index]
  if (!award) return null
  return (
    <section className="section-space">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionTitle
            number={number}
            label="RECOGNITION"
            title={
              <>
                Proud moments.
                <br />
                Shared success.
              </>
            }
          />
        </div>
        <div
          className="mt-12 border-y border-white/15"
          role="region"
          aria-roledescription="carousel"
          aria-label="Recognition"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
              className="grid items-center gap-8 py-10 md:grid-cols-[1fr_1.3fr_auto]"
              style={{ touchAction: 'pan-y' }}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
            >
              <div className="award-emblem">
                <span>{award.mark}</span>
                <span className="award-index">0{index + 1}</span>
              </div>
              <div aria-live="polite">
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">{award.name}</h3>
                <p className="mt-3 text-sm text-muted">{award.distinction}</p>
              </div>
              <span className="font-mono text-sm text-accent-soft">↗ {award.year}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {awards.map((item, i) => (
              <button
                key={item.name}
                className="flex h-11 w-8 items-center"
                aria-label={`Show ${item.name}`}
                aria-pressed={index === i}
                onClick={() => go(i)}
              >
                <span className={`h-0.5 w-full ${i === index ? 'bg-accent' : 'bg-white/20'}`} />
              </button>
            ))}
          </div>
          <SliderControls index={index} total={awards.length} onChange={go} label="award" />
        </div>
      </Container>
    </section>
  )
}
