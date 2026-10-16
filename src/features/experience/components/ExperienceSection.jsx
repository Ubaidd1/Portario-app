import Container from '@/shared/components/Container'
import SectionTitle from '@/shared/components/SectionTitle'
import TextLink from '@/shared/components/TextLink'
import FadeIn from '@/shared/animations/FadeIn'
import TagList from '@/shared/components/TagList'
import { experience } from '../data/experience'
/** Verified roles, newest first. Renders nothing until `experience` has entries. */
export default function ExperienceSection({ number = '05', limit, showLink = true }) {
  if (!experience.length) return null
  const items = limit ? experience.slice(0, limit) : experience
  return (
    <section className="section-space border-t border-white/10">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle number={number} label="EXPERIENCE" title="Where I’ve been building." />
          {showLink && experience.length > items.length && (
            <TextLink to="/experience">Full experience</TextLink>
          )}
        </div>
        <ol className="mt-12">
          {items.map((item) => (
            <li key={`${item.role}-${item.organisation}-${item.period}`}>
              <FadeIn className="grid gap-4 border-t border-white/15 py-8 md:grid-cols-[200px_1fr_1.2fr] md:gap-10">
                <p className="font-mono text-sm text-muted">{item.period}</p>
                <div>
                  <h3 className="text-2xl tracking-tight">{item.role}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:text-text hover:underline"
                      >
                        {item.organisation}
                      </a>
                    ) : (
                      item.organisation
                    )}
                    {item.type && ` · ${item.type}`}
                  </p>
                </div>
                <div>
                  {item.summary && <p className="text-sm leading-7 text-muted">{item.summary}</p>}
                  {item.highlights?.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-6">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="text-accent-soft" aria-hidden="true">
                            ↗
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  <TagList items={item.technologies} className="mt-5" />
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
