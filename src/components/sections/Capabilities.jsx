import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { capabilities } from '../../data/technologies'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import TextLink from '../common/TextLink'
import ServiceVisual from '../visuals/ServiceVisual'
export default function Capabilities() {
  const [active, setActive] = useState(0)
  return (
    <section id="capabilities" className="section-space">
      <Container>
        <SectionTitle
          number="01"
          label="CAPABILITIES"
          title="What I build."
          description="Different disciplines. One connected way of thinking."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {capabilities.map((item, index) => (
              <article
                key={item.title}
                className={`border-t ${active === index ? 'border-accent' : 'border-white/15'}`}
              >
                <h3>
                  <button
                    className="flex w-full items-center gap-5 py-5 text-left"
                    id={`capability-${index}`}
                    aria-expanded={active === index}
                    aria-controls={`capability-detail-${index}`}
                    onClick={() => setActive(active === index ? null : index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setActive(index)
                    }}
                  >
                    <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                    <span className="flex-1 text-2xl tracking-tight md:text-3xl">{item.title}</span>
                    <Plus
                      size={18}
                      className={active === index ? 'rotate-45 text-accent' : 'text-muted'}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      id={`capability-detail-${index}`}
                      role="region"
                      aria-labelledby={`capability-${index}`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="pb-7 pl-9">
                        <p className="max-w-sm text-sm leading-7 text-muted">{item.description}</p>
                        <TextLink to={item.to} className="mt-3">
                          Explore the possibilities
                        </TextLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
          <div className="hidden lg:block self-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active ?? 0}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ServiceVisual type={capabilities[active ?? 0].visual} className="!min-h-[470px]" />
              </motion.div>
            </AnimatePresence>
            <p className="eyebrow mt-5 text-muted">
              A CONNECTED PRACTICE / {String((active ?? 0) + 1).padStart(2, '0')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
