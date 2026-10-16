import { useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import useFocusTrap from '@/shared/hooks/useFocusTrap'
import Button from '@/shared/components/Button'
import TagList from '@/shared/components/TagList'
import { statusLabels } from '../data/projects'
import ProjectMedia from './ProjectMedia'
import ProjectLinks from './ProjectLinks'
export default function ProjectDialog({ project, close }) {
  const ref = useRef(null)
  useFocusTrap(ref, true, close)
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto border border-white/15 bg-surface p-6 sm:p-10"
      >
        <div className="mb-7 flex justify-between">
          <span className="eyebrow text-accent-soft">
            {statusLabels[project.status]?.toUpperCase()} / {project.year}
          </span>
          <button aria-label="Close project" className="icon-button" onClick={close}>
            <X size={20} />
          </button>
        </div>
        <h2 id="project-dialog-title" className="section-title">
          {project.title}
        </h2>
        <p className="mt-4 text-muted">{project.description}</p>
        <ProjectMedia project={project} className="my-7 !min-h-0 !h-[300px]" />
        <h3 className="text-xl font-medium">The idea</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{project.summary}</p>
        <h3 className="mt-6 text-xl font-medium">The approach</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{project.approach}</p>
        <TagList items={project.technologies} className="my-6" />
        {project.status === 'concept' && (
          <p className="mb-7 text-xs leading-6 text-muted">
            A self-initiated concept study with illustrative data.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button to={`/projects/${project.slug}`} onClick={close}>
            Read the case study
          </Button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.div>
  )
}
