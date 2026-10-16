import { engagements, experience } from '../data/experience'
import { capabilities } from '../data/technologies'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import TextLink from '../components/common/TextLink'
import FadeIn from '../components/animations/FadeIn'
import ExperienceSection from '../components/sections/ExperienceSection'
import CTA from '../components/sections/CTA'
export default function Experience() {
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
