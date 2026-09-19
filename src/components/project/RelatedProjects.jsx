import { projects } from '../../data/projects'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import ProjectCard from './ProjectCard'
export default function RelatedProjects({ slugs }) {
  const selected = projects.filter((project) => slugs.includes(project.slug)).slice(0, 2)
  return (
    <section className="section-space">
      <Container>
        <SectionTitle number="NEXT" label="RELATED PROJECTS" title="More to explore." />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {selected.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
