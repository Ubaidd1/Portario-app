import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { projectFilters } from '../data/caseStudies'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import ProjectCard from '../components/project/ProjectCard'
import CTA from '../components/sections/CTA'
export default function Projects() {
  const [params, setParams] = useSearchParams()
  const filter = projectFilters.includes(params.get('category')) ? params.get('category') : 'All'
  const visible = projects.filter((project) => filter === 'All' || project.filter === filter)
  return (
    <>
      <SEO
        title="Projects"
        description="Explore original workspace, analytics, AI, and studio interface studies with technical context and proposed architecture."
      />
      <PageHero
        label="SELECTED WORK / 04"
        title="PROJECTS THAT SOLVE REAL PROBLEMS."
        description="Original interface and technical explorations. These are concept studies, with proposed approaches clearly separated from measured results."
      />
      <Container className="py-14">
        <div
          className="flex flex-wrap gap-2 border-b border-white/15 pb-8"
          role="group"
          aria-label="Filter projects"
        >
          {projectFilters.map((category) => (
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
          {visible.length} {visible.length === 1 ? 'STUDY' : 'STUDIES'} / {filter.toUpperCase()}
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
              No {filter.toLowerCase()} case studies are published yet. Explore the current
              collection while new work takes shape.
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
