import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProjectVisual from '../visuals/ProjectVisual'
export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className={index % 2 ? 'lg:mt-20' : ''}
    >
      <Link to={`/projects/${project.slug}`} data-cursor="project" className="group block">
        <div className="overflow-hidden">
          <ProjectVisual kind={project.kind} />
        </div>
        <div className="mt-6 flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow text-accent">
              {project.category} / {project.year}
            </p>
            <h3 className="mt-3 text-3xl tracking-[-.05em] transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-muted">{project.description}</p>
          </div>
          <ArrowUpRight className="mt-2 shrink-0 text-muted" />
        </div>
      </Link>
    </motion.article>
  )
}
