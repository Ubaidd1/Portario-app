import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Container from '@/shared/components/Container'
import AccordionItem from '@/shared/components/AccordionItem'
import SectionTitle from '@/shared/components/SectionTitle'
import TextLink from '@/shared/components/TextLink'
import { capabilities } from '../data/capabilities'
import ServiceVisual from './ServiceVisual'
export default function Capabilities({ number = '01' }) {
  const [active, setActive] = useState(0)
  return (
    <section id="capabilities" className="section-space">
      <Container>
        <SectionTitle
          number={number}
          label="TECHNICAL EXPERTISE"
          title="What I build."
          description="Different disciplines. One connected way of thinking."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {capabilities.map((item, index) => (
              <AccordionItem
                key={item.title}
                idPrefix="capability"
                index={index}
                open={active === index}
                onToggle={() => setActive(active === index ? null : index)}
                onHover={() => setActive(index)}
                className={`border-t ${active === index ? 'border-accent' : 'border-white/15'}`}
                buttonClassName="flex w-full items-center gap-5 py-5 text-left"
                header={
                  <>
                    <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                    <span className="flex-1 text-2xl tracking-tight md:text-3xl">{item.title}</span>
                    <Plus
                      size={18}
                      className={active === index ? 'rotate-45 text-accent-soft' : 'text-muted'}
                    />
                  </>
                }
              >
                <div className="pb-7 pl-9">
                  <p className="max-w-sm text-sm leading-7 text-muted">{item.description}</p>
                  <TextLink to={item.to} className="mt-3">
                    Explore the possibilities
                  </TextLink>
                </div>
              </AccordionItem>
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
