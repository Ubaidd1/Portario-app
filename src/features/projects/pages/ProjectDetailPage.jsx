import { useParams } from 'react-router-dom'
import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import Container from '@/shared/components/Container'
import SectionTitle from '@/shared/components/SectionTitle'
import AdjacentNavigation from '@/shared/components/AdjacentNavigation'
import ImageReveal from '@/shared/animations/ImageReveal'
import StaggerChildren from '@/shared/animations/StaggerChildren'
import CTA from '@/shared/components/CTA'
import NotFoundPage from '@/shared/pages/NotFoundPage'
import TagList from '@/shared/components/TagList'
import { projects, statusLabels } from '../data/projects'
import ProjectMedia from '../components/ProjectMedia'
import ProjectLinks from '../components/ProjectLinks'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import ProjectGallery from '../components/ProjectGallery'
import RelatedProjects from '../components/RelatedProjects'
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage kind="Project" to="/projects" />
  const concept = project.status === 'concept'
  let section = 0
  const number = () => String(++section).padStart(2, '0')
  return (
    <>
      <SEO title={project.title} description={project.summary} />
      <PageHero
        label={`${project.category.toUpperCase()} / ${(statusLabels[project.status] || '').toUpperCase()} / ${project.year}`}
        title={project.title.toUpperCase()}
        description={project.description}
      >
        <ProjectLinks project={project} />
      </PageHero>
      <Container>
        <StaggerChildren className="grid grid-cols-2 gap-8 border-b border-white/15 py-8 lg:grid-cols-4">
          {[
            ['Role', project.role],
            ['Technology', project.technologies.join(' / ')],
            ['Category', project.category],
            ['Status', statusLabels[project.status]],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <p className="eyebrow text-muted">{label}</p>
                <p className="mt-3 text-sm">{value}</p>
              </div>
            ))}
        </StaggerChildren>
        <ImageReveal className="my-10">
          <ProjectMedia project={project} className="case-hero-visual" eager />
        </ImageReveal>
        <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionTitle number={number()} label="OVERVIEW" title={project.title} />
          <div>
            <p className="text-xl leading-9 tracking-tight">{project.summary}</p>
            {concept && (
              <p className="mt-5 text-sm leading-7 text-muted">
                A self-initiated concept study. The sections below describe design intent and a
                proposed technical direction rather than a delivered client engagement.
              </p>
            )}
          </div>
        </section>
        <section className="grid gap-12 border-y border-white/15 py-14 md:grid-cols-2">
          <div>
            <p className="eyebrow text-accent-soft">{number()} / THE PROBLEM</p>
            <h2 className="mt-5 text-3xl tracking-tight">Finding the friction.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.problem}</p>
          </div>
          <div>
            <p className="eyebrow text-accent-soft">{number()} / THE OBJECTIVE</p>
            <h2 className="mt-5 text-3xl tracking-tight">Define a useful direction.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.objective}</p>
          </div>
        </section>
        {project.contributions.length > 0 && (
          <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <SectionTitle number={number()} label="MY ROLE" title="What I contributed." />
            <ul>
              {project.contributions.map((item) => (
                <li
                  key={item}
                  className="flex gap-5 border-t border-white/15 py-5 text-lg tracking-tight"
                >
                  <span className="text-accent-soft" aria-hidden="true">
                    ↗
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="section-space grid items-start gap-12 border-t border-white/15 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32">
            <SectionTitle
              number={number()}
              label="APPROACH & DESIGN"
              title="Purpose in every layer."
            />
            <p className="mt-7 text-base leading-8 text-muted">{project.approach}</p>
            <h3 className="mt-8 text-xl tracking-tight">The design language</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{project.design}</p>
            <TagList items={project.technologies} className="mt-7" />
          </div>
          <ImageReveal>
            <div className="design-detail-visual">
              <ProjectMedia project={project} image={project.images[0] || project.thumbnail} />
            </div>
          </ImageReveal>
        </section>
        {project.decisions.length > 0 && (
          <section className="border-t border-white/15 py-14">
            <SectionTitle
              number={number()}
              label="KEY DECISIONS"
              title="Choices that shaped the build."
            />
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {project.decisions.map((decision, index) => (
                <li key={decision} className="border-t border-accent/60 pt-6">
                  <span className="font-mono text-sm text-accent-soft">0{index + 1}</span>
                  <p className="mt-4 text-base leading-7">{decision}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
        <section className="border-y border-white/15 py-14">
          <SectionTitle
            number={number()}
            label={concept ? 'PROPOSED ARCHITECTURE' : 'ARCHITECTURE'}
            title="Behind the interface."
          />
          <div className="mt-10">
            <ArchitectureDiagram nodes={project.architecture} />
          </div>
        </section>
        <section className="section-space grid gap-12 md:grid-cols-2">
          <div>
            <SectionTitle number={number()} label="FEATURES" title="The useful details." />
            <ul className="mt-7">
              {project.features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex gap-5 border-t border-white/15 py-5 text-lg tracking-tight"
                >
                  <span className="font-mono text-xs text-accent-soft">0{index + 1}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-accent-soft">{number()} / THE CHALLENGE</p>
            <h2 className="mt-5 text-3xl tracking-tight">A deliberate tradeoff.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.challenge}</p>
            {project.results.length > 0 ? (
              <div className="mt-10 border-l-2 border-accent pl-6">
                <h3 className="eyebrow text-muted">RESULTS</h3>
                <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <dt className="text-sm text-muted">{result.label}</dt>
                      <dd className="mt-1 font-display text-3xl tracking-tight">{result.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <div className="mt-10 border-l-2 border-accent pl-6">
                <h3 className="eyebrow text-muted">WHERE IT STANDS</h3>
                <p className="mt-4 text-base leading-8">{project.outcome}</p>
              </div>
            )}
          </div>
        </section>
        <section className="pb-20">
          <SectionTitle
            number={number()}
            label="GALLERY"
            title="A closer look."
            description="Select any view to open the full gallery."
          />
          <ProjectGallery project={project} />
        </section>
        <AdjacentNavigation items={projects} current={slug} base="/projects" label="project" />
      </Container>
      {projects.length > 1 && (
        <RelatedProjects
          slugs={projects
            .filter((item) => item.slug !== slug)
            .slice(0, 2)
            .map((item) => item.slug)}
        />
      )}
      <CTA />
    </>
  )
}
