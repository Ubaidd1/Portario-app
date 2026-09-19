import { services } from '../data/services'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import TextLink from '../components/common/TextLink'
import ImageReveal from '../components/animations/ImageReveal'
import ServiceVisual from '../components/visuals/ServiceVisual'
import CTA from '../components/sections/CTA'
export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Web, app, AI, data, design, and content expertise connected to your project goals."
      />
      <PageHero
        label="SERVICES / 02"
        title="TECHNOLOGY WITH PURPOSE."
        description="The right expertise at the right moment. From an early idea to a considered release, build the things that matter."
      />
      <Container>
        {services.map((service, index) => (
          <section key={service.slug} className="section-space border-b border-white/15">
            <div className="mb-8 flex items-center justify-between">
              <p className="eyebrow text-accent">
                0{index + 1} / {service.name}
              </p>
              <span className="font-display text-3xl text-white/20">{service.symbol}</span>
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div>
                <h2 className="section-title">{service.title}</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{service.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="eyebrow text-muted">CAPABILITIES</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      {service.capabilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow text-muted">DELIVERABLES</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-8 border-t border-white/15 pt-5 text-xs leading-6 text-muted">
                  {service.stages.join(' → ')}
                </p>
                <TextLink to={`/services/${service.slug}`} className="mt-5">
                  Explore {service.name}
                </TextLink>
              </div>
              <ImageReveal>
                <ServiceVisual type={service.visual} className="lg:!min-h-[460px]" />
              </ImageReveal>
            </div>
          </section>
        ))}
      </Container>
      <section className="py-14">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-2xl tracking-tight">Not sure where to begin?</p>
          <Button to="/contact">Start with a conversation</Button>
        </Container>
      </section>
      <CTA />
    </>
  )
}
