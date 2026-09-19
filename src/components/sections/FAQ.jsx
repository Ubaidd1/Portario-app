import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../../data/faq'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
export default function FAQ() {
  const [active, setActive] = useState(0)
  return (
    <section className="section-space border-t border-white/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <span
              aria-hidden="true"
              className="mb-5 block font-display text-[clamp(5rem,10vw,10rem)] leading-none tracking-[-.09em] text-white/10"
            >
              FAQ
            </span>
            <SectionTitle
              number="10"
              label="FAQ"
              title={
                <>
                  Good questions.
                  <br />
                  Honest answers.
                </>
              }
              description="Clear answers before we begin."
            />
          </div>
          <div>
            {faqs.map((faq, index) => (
              <article
                className={`border-b border-white/15 ${active === index ? 'border-b-accent bg-white/[.025]' : ''}`}
                key={faq.question}
              >
                <h3>
                  <button
                    id={`faq-button-${index}`}
                    aria-expanded={active === index}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setActive(active === index ? null : index)}
                    className="flex w-full items-center gap-4 py-6 text-left"
                  >
                    <span className="mr-1 font-mono text-[10px] text-muted">0{index + 1}</span>
                    <span className="flex-1 text-base font-medium tracking-tight sm:text-lg">
                      {faq.question}
                    </span>
                    <Plus
                      size={19}
                      className={`shrink-0 transition-transform ${active === index ? 'rotate-45 text-accent' : ''}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-9 pr-5 text-sm leading-7 text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
