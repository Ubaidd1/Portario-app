import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import Container from '@/shared/components/Container'
import CTA from '@/shared/components/CTA'
import { projects } from '../data/projects'
import { projectFilters } from '../data/caseStudies'
import ProjectCard from '../components/ProjectCard'
// Only offer filters that match at least one published project.
const filters = projectFilters.filter(
  (category) => category === 'All' || projects.some((project) => project.filter === category),
)
export default function ProjectsPage() {
  const [params, setParams] = useSearchParams()
  const filter = filters.includes(params.get('category')) ? params.get('category') : 'All'
  const visible = projects.filter((project) => filter === 'All' || project.filter === filter)
  return (
    <>
      <SEO
        title="Projects"
        description="Selected web, data, AI, and interface projects, each with the problem, the approach, the architecture, and the decisions behind it."
      />
      <PageHero
        label="SELECTED WORK"
        title="PROJECTS THAT SOLVE REAL PROBLEMS."
        description="Each project walks through the problem, the approach, and the technical decisions behind it. Concept studies are labelled as such, and only verified results are reported."
      />
      <Container className="py-14">
        <div
          className="flex flex-wrap gap-2 border-b border-white/15 pb-8"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((category) => (
            <button
              key={category}
              onClick={() =>
                setParams(category === 'All' ? {} : { category }, { preventScrollReset: true })
              }
              aria-pressed={category === filter}
              className={`filter-button ${category === filter ? 'selected' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="eyebrow mt-5 text-muted" role="status">
          {visible.length} {visible.length === 1 ? 'PROJECT' : 'PROJECTS'} / {filter.toUpperCase()}
        </p>
        <motion.div layout className="mt-10 grid items-start gap-x-12 gap-y-16 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        {!visible.length && (
          <div className="py-24 text-center">
            <span className="text-6xl text-white/20" aria-hidden="true">
              ↗
            </span>
            <h2 className="mt-6 text-3xl tracking-tight">Room for what comes next.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
              Nothing in this category yet. Explore the full collection instead.
            </p>
            <button className="button button-outline mt-7" onClick={() => setParams({})}>
              View all projects
            </button>
          </div>
        )}
      </Container>
      <CTA />
    </>
  )
}
