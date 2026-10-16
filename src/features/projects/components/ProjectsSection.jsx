import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import useFocusTrap from '../../hooks/useFocusTrap'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import SliderControls from '../common/SliderControls'
import ProjectMedia from '../project/ProjectMedia'
import ProjectLinks from '../project/ProjectLinks'
import { projects, statusLabels } from '../../data/projects'
import Button from '../common/Button'
function ProjectDialog({ project, close }) {
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
        <div className="my-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
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
export default function Projects({ number = '03' }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const dragged = useRef(false)
  const close = useCallback(() => setSelected(null), [])
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const change = (value) => {
    dragged.current = false
    setIndex(value)
  }
  return (
    <section id="projects" className="section-space overflow-hidden bg-surface">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionTitle
            number={number}
            label="SELECTED WORK"
            title={
              <>
                Good ideas.
                <br />
                <span className="text-muted">Made real.</span>
              </>
            }
            description="Selected projects and technical explorations, from interface design to application architecture."
          />
          <span className="eyebrow shrink-0 text-muted">
            {String(projects.length).padStart(2, '0')} PROJECTS
          </span>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected projects"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              change((index + 1) % projects.length)
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              change((index + projects.length - 1) % projects.length)
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.article
              className={`project-slide relative grid border border-white/10 bg-background ${index % 2 ? 'project-reversed lg:grid-cols-[1fr_1.65fr]' : 'lg:grid-cols-[1.65fr_1fr]'}`}
              key={project.id}
              initial={{ opacity: 0, x: 25, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragStart={() => {
                dragged.current = true
              }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60)
                  change((index + (info.offset.x < 0 ? 1 : projects.length - 1)) % projects.length)
              }}
              style={{ touchAction: 'pan-y' }}
            >
              <ProjectMedia project={project} />
              <div className="flex flex-col p-6 sm:p-9 lg:p-10">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>PROJECT / {project.id}</span>
                  <span>{statusLabels[project.status]?.toUpperCase()}</span>
                </div>
                <div className="mt-10 lg:mt-auto">
                  <span className="eyebrow text-accent-soft">{project.category}</span>
                  <h3 className="mt-4 text-3xl font-medium leading-tight tracking-[-.05em] sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    className="mt-9 flex w-full items-center justify-between border-t border-white/15 pt-5 text-sm group"
                    onClick={() => {
                      if (!dragged.current) setSelected(project)
                      dragged.current = false
                    }}
                    onPointerDown={() => {
                      dragged.current = false
                    }}
                  >
                    Quick Preview{' '}
                    <ArrowUpRight
                      size={21}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 text-accent-soft"
                    />
                  </button>
                  <Link
                    to={`/projects/${project.slug}`}
                    data-cursor="project"
                    className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-accent-soft"
                  >
                    Read the case study <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="eyebrow hidden text-muted sm:block">
              DRAG TO EXPLORE <span className="ml-4 text-white">← →</span>
            </p>
            <div className="mx-5 hidden h-px flex-1 bg-white/10 md:block">
              <div
                style={{ width: `${((index + 1) / projects.length) * 100}%` }}
                className="h-px bg-accent transition-all duration-500"
              />
            </div>
            <SliderControls
              index={index}
              total={projects.length}
              onChange={change}
              label="project"
            />
          </div>
          <button
            className="mt-8 flex w-full items-center justify-between border-b border-white/15 py-5 text-left group"
            onClick={() => change((index + 1) % projects.length)}
          >
            <div>
              <span className="eyebrow text-muted">UP NEXT / {next.id}</span>
              <p className="mt-2 text-xl tracking-tight group-hover:text-accent-soft transition-colors">
                {next.title}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden h-22 w-36 overflow-hidden sm:block" aria-hidden="true">
                <ProjectMedia project={next} className="next-project-preview" />
              </div>
              <ArrowUpRight className="text-muted" />
            </div>
          </button>
        </div>
        <Link
          to="/projects"
          className="mt-8 inline-flex min-h-11 items-center gap-5 border-b border-white/20 text-sm"
        >
          View all selected work <ArrowUpRight size={16} />
        </Link>
      </Container>
      {createPortal(
        <AnimatePresence>
          {selected && <ProjectDialog project={selected} close={close} />}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
