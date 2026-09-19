import { useState } from 'react'
import { experiments } from '../../data/technologies'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import DigitalCore from '../visuals/DigitalCore'
import ServiceVisual from '../visuals/ServiceVisual'
export default function Lab() {
  const [index, setIndex] = useState(1)
  const [moving, setMoving] = useState(true)
  const experiment = experiments[index]
  return (
    <section id="lab" className="section-space bg-surface">
      <Container>
        <SectionTitle
          number="04"
          label="ONGOING EXPLORATION"
          title="The lab."
          description="Experiments, prototypes, and ideas that may become something bigger."
        />
        <div className="mt-12 grid border-y border-white/15 lg:grid-cols-[.8fr_1.2fr]">
          <div className="py-7 lg:pr-10">
            {experiments.map((item, i) => (
              <button
                key={item.title}
                className={`lab-tab group flex w-full items-center gap-4 border-b border-white/10 py-5 text-left ${index === i ? 'text-accent' : ''}`}
                onClick={() => setIndex(i)}
                aria-pressed={index === i}
              >
                <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block text-lg tracking-tight">{item.title}</span>
                  <span className="mt-2 block text-[10px] text-muted">{item.category}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="min-w-0 py-7 lg:border-l lg:border-white/15 lg:pl-10">
            <div className="relative h-[360px] overflow-hidden border border-white/15">
              {experiment.visual === 'core' ? (
                <DigitalCore variant="lab" active={moving} />
              ) : (
                <ServiceVisual type={experiment.visual} className="h-full !min-h-0 !border-0" />
              )}
              {experiment.visual === 'core' && (
                <button
                  className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-background px-4 py-2 text-xs"
                  onClick={() => setMoving(!moving)}
                  aria-pressed={!moving}
                >
                  {moving ? 'Pause motion' : 'Resume motion'}
                </button>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <h3 className="text-xl tracking-tight">{experiment.title}</h3>
              <span className="tag text-accent">{experiment.status}</span>
            </div>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{experiment.detail}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
