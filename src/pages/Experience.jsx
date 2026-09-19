import { experience } from '../data/experience'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import TextLink from '../components/common/TextLink'
import FadeIn from '../components/animations/FadeIn'
import Stats from '../components/sections/Stats'
import CTA from '../components/sections/CTA'
export default function Experience() {
  return (
    <>
      <SEO
        title="Experience"
        description="A transparent view of the practice, technical projects, and ongoing learning behind Folioblox."
      />
      <PageHero
        label="EXPERIENCE / THE PRACTICE"
        title="BUILT THROUGH DOING."
        description="A place for the work, the context, and the lessons along the way. Employment and client history will be added only when verified details are available."
      />
      <Container className="py-16">
        {experience.map((item, index) => (
          <FadeIn
            key={item.title}
            className="grid gap-6 border-t border-white/15 py-10 md:grid-cols-[80px_1fr_1fr]"
          >
            <span className="font-mono text-sm text-accent">0{index + 1}</span>
            <div>
              <h2 className="text-3xl tracking-tight">{item.title}</h2>
              <p className="eyebrow mt-4 text-muted">{item.status}</p>
            </div>
            <div>
              <p className="text-sm leading-7 text-muted">{item.description}</p>
              {item.entries.map((entry) => (
                <div className="mt-5" key={entry.title}>
                  <h3>{entry.title}</h3>
                  <p className="text-sm text-muted">{entry.description}</p>
                </div>
              ))}
              {item.to && (
                <TextLink to={item.to} className="mt-5">
                  Explore the work
                </TextLink>
              )}
            </div>
          </FadeIn>
        ))}
      </Container>
      <Stats />
      <CTA />
    </>
  )
}
