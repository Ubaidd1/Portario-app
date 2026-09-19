import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { services } from '../../data/services'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import FadeIn from '../animations/FadeIn'
export default function Services() {
  const [active, setActive] = useState(0)
  return (
    <section id="services" className="section-space border-t border-white/10">
      <Container>
        <div className="mb-14 grid gap-7 lg:grid-cols-[1fr_1fr]">
          <SectionTitle
            number="04"
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
              <article
                className={`service-row border-t border-white/15 ${active === index ? 'active' : ''}`}
              >
                <h3>
                  <button
                    id={`service-trigger-${index}`}
                    aria-expanded={active === index}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setActive(active === index ? null : index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setActive(index)
                    }}
                    className="flex w-full items-center gap-5 py-6 text-left md:gap-12 md:py-7"
                  >
                    <span className="w-6 shrink-0 font-mono text-xs text-muted">0{index + 1}</span>
                    <span className="flex-1 text-xl font-medium tracking-[-.04em] sm:text-3xl">
                      {service.name}
                    </span>
                    <Plus
                      size={21}
                      className={`shrink-0 transition-transform ${active === index ? 'rotate-45 text-accent' : 'text-muted'}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      id={`service-panel-${index}`}
                      role="region"
                      aria-labelledby={`service-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 pb-8 pl-11 md:grid-cols-[1fr_150px] md:pl-18">
                        <div>
                          <p className="text-base font-medium">{service.title}</p>
                          <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                            {service.description}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span className="tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={`/services/${service.slug}`}
                            className="mt-5 inline-flex items-center gap-2 text-xs text-accent"
                          >
                            Explore this service <ArrowUpRight size={15} />
                          </Link>
                        </div>
                        <div
                          aria-hidden="true"
                          className="service-symbol hidden items-center justify-center text-6xl text-accent md:flex"
                        >
                          {service.symbol}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
