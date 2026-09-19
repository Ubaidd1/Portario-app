import { stats } from '../../data/experience'
import Container from '../common/Container'
import StaggerChildren from '../animations/StaggerChildren'
import TextLink from '../common/TextLink'
export default function Stats() {
  return (
    <section className="section-space bg-surface">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent">06 / THE PRACTICE</p>
            <h2 className="section-title mt-5">Breadth meets intention.</h2>
          </div>
          <TextLink to="/experience">Experience & ongoing work</TextLink>
        </div>
        <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="border-t border-white/20 pt-6">
              <p className="font-display text-3xl tracking-[-.06em]">{stat.value}</p>
              <p className="mt-3 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
