import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { awards } from '../../data/awards'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import SliderControls from '../common/SliderControls'
export default function Awards() {
  const [index, setIndex] = useState(0)
  const award = awards[index]
  return (
    <section className="section-space">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionTitle
            number="09"
            label="RECOGNITION"
            title={
              <>
                Proud moments.
                <br />
                Shared success.
              </>
            }
            description="A recognition showcase using the supplied sample records. These entries are not verified awards."
          />
          <div className="flex flex-col justify-end">
            <p className="eyebrow text-muted lg:text-right">
              SAMPLE RECOGNITION · NOT VERIFIED AWARDS
            </p>
          </div>
        </div>
        <div
          className="mt-12 border-y border-white/15"
          role="region"
          aria-roledescription="carousel"
          aria-label="Recognition"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') setIndex((index + 1) % awards.length)
            if (event.key === 'ArrowLeft') setIndex((index + awards.length - 1) % awards.length)
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 45)
                  setIndex((index + (info.offset.x < 0 ? 1 : awards.length - 1)) % awards.length)
              }}
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
              <span className="font-mono text-sm text-accent">↗ {award.year}</span>
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
                onClick={() => setIndex(i)}
              >
                <span className={`h-0.5 w-full ${i === index ? 'bg-accent' : 'bg-white/20'}`} />
              </button>
            ))}
          </div>
          <SliderControls index={index} total={awards.length} onChange={setIndex} label="award" />
        </div>
      </Container>
    </section>
  )
}
