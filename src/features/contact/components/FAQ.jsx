import { useState } from 'react'
import { Plus } from 'lucide-react'
import Container from '@/shared/components/Container'
import AccordionItem from '@/shared/components/AccordionItem'
import SectionTitle from '@/shared/components/SectionTitle'
import { faqs } from '../data/faq'
export default function FAQ({ number = '10' }) {
  const [active, setActive] = useState(0)
  return (
    <section className="section-space border-t border-white/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <span
              aria-hidden="true"
              data-text="FAQ"
              className="decorative-text mb-5 block font-display text-[clamp(5rem,10vw,10rem)] leading-none tracking-[-.09em] text-white/10"
            />
            <SectionTitle
              number={number}
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
              <AccordionItem
                key={faq.question}
                idPrefix="faq"
                index={index}
                open={active === index}
                onToggle={() => setActive(active === index ? null : index)}
                className={`border-b border-white/15 ${active === index ? 'border-b-accent bg-white/[.025]' : ''}`}
                buttonClassName="flex w-full items-center gap-4 py-6 text-left"
                header={
                  <>
                    <span className="mr-1 font-mono text-[10px] text-muted">0{index + 1}</span>
                    <span className="flex-1 text-base font-medium tracking-tight sm:text-lg">
                      {faq.question}
                    </span>
                    <Plus
                      size={19}
                      className={`shrink-0 transition-transform ${active === index ? 'rotate-45 text-accent-soft' : ''}`}
                    />
                  </>
                }
              >
                <p className="pb-7 pl-9 pr-5 text-sm leading-7 text-muted">{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
