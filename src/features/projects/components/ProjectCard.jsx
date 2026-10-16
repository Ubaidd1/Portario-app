import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { statusLabels } from '../../data/projects'
import ProjectMedia from './ProjectMedia'
export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className={`min-w-0 ${index % 2 ? 'lg:mt-20' : ''}`}
    >
      <Link to={`/projects/${project.slug}`} data-cursor="project" className="group block">
        <div className="overflow-hidden border border-white/10 transition-colors group-hover:border-accent/60">
          <ProjectMedia project={project} />
        </div>
        <div className="mt-6 flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow text-accent-soft">
              {project.category} / {statusLabels[project.status] || project.year}
            </p>
            <h3 className="mt-3 text-3xl tracking-[-.05em] transition-colors group-hover:text-accent-soft">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((tech) => (
                <li className="tag" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <ArrowUpRight
            className="mt-2 shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-soft"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.article>
  )
}
