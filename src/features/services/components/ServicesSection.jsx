import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'
import Container from '@/shared/components/Container'
import AccordionItem from '@/shared/components/AccordionItem'
import SectionTitle from '@/shared/components/SectionTitle'
import FadeIn from '@/shared/animations/FadeIn'
import TagList from '@/shared/components/TagList'
import { services } from '../data/services'
export default function ServicesSection({ number = '04' }) {
  const [active, setActive] = useState(0)
  return (
    <section id="services" className="section-space border-t border-white/10">
      <Container>
        <div className="mb-14 grid gap-7 lg:grid-cols-[1fr_1fr]">
          <SectionTitle
            number={number}
            label="SERVICES"
            title={
              <>
                The right skills.
                <br />
                For your next move.
              </>
            }
          />
          <p className="max-w-sm self-end text-sm leading-7 text-muted lg:justify-self-end">
            What I can help you with — from websites and apps to AI, data, and growth, I connect
            technical delivery with business goals.
          </p>
        </div>
        <div>
          {services.map((service, index) => (
            <FadeIn key={service.name}>
              <AccordionItem
                idPrefix="service"
                index={index}
                open={active === index}
                onToggle={() => setActive(active === index ? null : index)}
                onHover={() => setActive(index)}
                className={`service-row border-t border-white/15 ${active === index ? 'active' : ''}`}
                buttonClassName="flex w-full items-center gap-5 py-6 text-left md:gap-12 md:py-7"
                transition={{ duration: 0.3 }}
                header={
                  <>
                    <span className="w-6 shrink-0 font-mono text-xs text-muted">0{index + 1}</span>
                    <span className="flex-1 text-xl font-medium tracking-[-.04em] sm:text-3xl">
                      {service.name}
                    </span>
                    <Plus
                      size={21}
                      className={`shrink-0 transition-transform ${active === index ? 'rotate-45 text-accent-soft' : 'text-muted'}`}
                    />
                  </>
                }
              >
                <div className="grid gap-5 pb-8 pl-11 md:grid-cols-[1fr_150px] md:pl-18">
                  <div>
                    <p className="text-base font-medium">{service.title}</p>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                      {service.description}
                    </p>
                    <TagList items={service.tags} className="mt-5" />
                    <Link
                      to={`/services/${service.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-xs text-accent-soft"
                    >
                      Explore this service <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <div
                    aria-hidden="true"
                    className="service-symbol hidden items-center justify-center text-6xl text-accent-soft md:flex"
                  >
                    {service.symbol}
                  </div>
                </div>
              </AccordionItem>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
