import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import EditorialTimeline from '../components/common/EditorialTimeline'
import FadeIn from '../components/animations/FadeIn'
import DigitalCore from '../components/visuals/DigitalCore'
import Lab from '../components/sections/Lab'
import CTA from '../components/sections/CTA'
import { principles, journey } from '../data/experience'
export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="The thinking behind Folioblox: clear interfaces, thoughtful architecture, and practical collaboration."
      />
      <PageHero
        label="ABOUT / 01"
        title="I BUILD TECHNOLOGY THAT FEELS SIMPLE."
        description="Developer. Problem solver. Technical partner. Bringing logic and imagination into the same conversation."
      />
      <section className="section-space">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="h-[400px] border border-white/15 bg-surface">
              <DigitalCore variant="about" />
            </div>
            <FadeIn>
              <p className="eyebrow text-accent">01 / A CONNECTED WAY OF THINKING</p>
              <h2 className="section-title mt-6">
                The best work lives
                <br />
                between disciplines.
              </h2>
              <p className="mt-7 text-base leading-8 text-muted">
                I turn complex ideas into clear digital experiences. From the first prototype to a
                reliable release, I care about how your product looks, how it works, and how it
                grows.
              </p>
              <p className="mt-5 text-base leading-8 text-muted">
                My approach connects interface design, software structure, AI, and data around a
                practical question: what will make this genuinely useful to the person on the other
                side of the screen?
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>
      <section className="section-space border-y border-white/10">
        <Container>
          <SectionTitle number="02" label="PHILOSOPHY" title="Thoughtful by design." />
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {principles.map((item, index) => (
              <FadeIn key={item.title} className="border-t border-white/20 pt-6">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="mt-5 text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted">{item.description}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-space">
        <Container>
          <SectionTitle
            number="03"
            label="AN ONGOING JOURNEY"
            title="Always a work in progress."
            description="A working philosophy, not a dated employment history."
          />
          <div className="mt-12">
            <EditorialTimeline items={journey} />
          </div>
        </Container>
      </section>
      <Lab />
      <CTA />
    </>
  )
}
