import { createPortal } from 'react-dom'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Container from '@/shared/components/Container'
import SectionTitle from '@/shared/components/SectionTitle'
import SliderControls from '@/shared/components/SliderControls'
import TagList from '@/shared/components/TagList'
import useCarousel from '@/shared/hooks/useCarousel'
import { projects, statusLabels } from '../data/projects'
import ProjectMedia from './ProjectMedia'
import ProjectDialog from './ProjectDialog'
export default function ProjectsSection({ number = '03' }) {
  const {
    index,
    go: change,
    onKeyDown,
    onDragEnd,
  } = useCarousel(projects.length, {
    dragThreshold: 60,
  })
  const [selected, setSelected] = useState(null)
  const dragged = useRef(false)
  const close = useCallback(() => setSelected(null), [])
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
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
          onKeyDown={onKeyDown}
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
              onDragEnd={onDragEnd}
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
                  <TagList items={project.technologies} className="mt-6" />
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
            onClick={() => change(index + 1)}
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
