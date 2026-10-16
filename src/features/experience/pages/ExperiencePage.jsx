import { capabilities } from '@/features/services/data/capabilities'
import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import Container from '@/shared/components/Container'
import SectionTitle from '@/shared/components/SectionTitle'
import TextLink from '@/shared/components/TextLink'
import FadeIn from '@/shared/animations/FadeIn'
import CTA from '@/shared/components/CTA'
import { engagements, experience } from '../data/experience'
import ExperienceSection from '../components/ExperienceSection'
export default function ExperiencePage() {
  return (
    <>
      <SEO
        title="Experience"
        description="Experience, areas of practice, and the ways clients can work with Folioblox on websites, applications, AI, and data projects."
      />
      <PageHero
        label="EXPERIENCE / THE PRACTICE"
        title="BUILT THROUGH DOING."
        description="The areas I work across, the ways we can work together, and the projects that show the thinking behind them."
      />
      <ExperienceSection number="01" showLink={false} />
      <section className="section-space">
        <Container>
          <SectionTitle
            number={experience.length ? '02' : '01'}
            label="AREAS OF PRACTICE"
            title="Different disciplines. One way of thinking."
          />
          <div className="mt-12 grid gap-x-12 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <FadeIn key={item.title} className="border-t border-white/15 py-8">
                <span className="font-mono text-sm text-accent-soft">0{index + 1}</span>
                <h2 className="mt-4 text-2xl tracking-tight">{item.title}</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{item.description}</p>
                <TextLink to={item.to} className="mt-4">
                  Explore <span className="sr-only">{item.title}</span>
                </TextLink>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-space bg-surface">
        <Container>
          <SectionTitle
            number={experience.length ? '03' : '02'}
            label="WORKING TOGETHER"
            title="Ways we can work together."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {engagements.map((item) => (
              <FadeIn key={item.title} className="border-t border-accent/60 pt-6">
                <h2 className="text-xl tracking-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </FadeIn>
            ))}
          </div>
          <TextLink to="/projects" className="mt-12">
            See selected projects
          </TextLink>
        </Container>
      </section>
      <CTA />
    </>
  )
}
