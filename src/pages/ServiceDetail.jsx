import { useParams } from 'react-router-dom'
import { services } from '../data/services'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import SectionTitle from '../components/common/SectionTitle'
import AdjacentNavigation from '../components/common/AdjacentNavigation'
import ServiceVisual from '../components/visuals/ServiceVisual'
import ImageReveal from '../components/animations/ImageReveal'
import RelatedProjects from '../components/project/RelatedProjects'
import CTA from '../components/sections/CTA'
import NotFound from './NotFound'
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFound kind="Service" to="/services" />
  return (
    <>
      <SEO title={service.name} description={service.description} />
      <PageHero
        label={`SERVICES / ${service.name.toUpperCase()}`}
        title={service.title.toUpperCase()}
        description={service.description}
      >
        <Button to={`/contact?service=${encodeURIComponent(service.name)}`}>
          Discuss your project
        </Button>
      </PageHero>
      <Container>
        <ImageReveal className="mt-10">
          <ServiceVisual type={service.visual} className="!min-h-[420px] lg:!min-h-[550px]" />
        </ImageReveal>
        <section className="section-space grid gap-12 md:grid-cols-2">
          <div>
            <SectionTitle number="01" label="THE PROBLEM" title="Start with what matters." />
            <p className="mt-6 text-base leading-8 text-muted">{service.problem}</p>
          </div>
          <div>
            <SectionTitle number="02" label="THE APPROACH" title="A practical way forward." />
            <p className="mt-6 text-base leading-8 text-muted">{service.approach}</p>
          </div>
        </section>
        <section className="border-y border-white/15 py-12">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionTitle number="03" label="CAPABILITIES" title="Built around your needs." />
            <div>
              {service.capabilities.map((item, index) => (
                <div
                  className="flex gap-5 border-b border-white/10 py-5 text-xl tracking-tight"
                  key={item}
                >
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  {item}
                </div>
              ))}
              <h3 className="eyebrow mt-8 text-muted">TECHNOLOGY & METHODS</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section-space">
          <SectionTitle number="04" label="PROCESS" title="A clear sequence." />
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {service.stages.map((stage, index) => (
              <li key={stage} className="border-t border-accent/60 pt-6">
                <span className="font-mono text-3xl text-muted">0{index + 1}</span>
                <h3 className="mt-5 text-xl tracking-tight">{stage}</h3>
              </li>
            ))}
          </ol>
        </section>
        <section className="mb-16 grid gap-10 border border-white/15 bg-surface p-6 sm:p-10 md:grid-cols-2">
          <SectionTitle number="05" label="THE HANDOVER" title="Made to move forward." />
          <div>
            <ul className="space-y-5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-4 text-sm">
                  <span className="text-accent">↗</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-xs leading-6 text-muted">
              The final scope and deliverables are agreed in the proposal before work begins.
            </p>
          </div>
        </section>
        <AdjacentNavigation
          items={services.map((item) => ({ ...item, title: item.name }))}
          current={slug}
          base="/services"
          label="service"
        />
      </Container>
      <RelatedProjects slugs={service.related} />
      <CTA />
    </>
  )
}
