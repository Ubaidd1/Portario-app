import { useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import AdjacentNavigation from '../components/common/AdjacentNavigation'
import ImageReveal from '../components/animations/ImageReveal'
import StaggerChildren from '../components/animations/StaggerChildren'
import ProjectVisual from '../components/visuals/ProjectVisual'
import ArchitectureDiagram from '../components/project/ArchitectureDiagram'
import ProjectGallery from '../components/project/ProjectGallery'
import RelatedProjects from '../components/project/RelatedProjects'
import CTA from '../components/sections/CTA'
import NotFound from './NotFound'
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFound kind="Project" to="/projects" />
  return (
    <>
      <SEO title={project.title} description={project.summary} />
      <PageHero
        label={`${project.category.toUpperCase()} / CONCEPT STUDY / ${project.year}`}
        title={project.kind.toUpperCase()}
        description={project.description}
      >
        <span className="eyebrow text-muted">SELECTED WORK / {project.id}</span>
      </PageHero>
      <Container>
        <StaggerChildren className="grid grid-cols-2 gap-8 border-b border-white/15 py-8 lg:grid-cols-4">
          {[
            ['Role', project.role],
            ['Technology', project.technologies.join(' / ')],
            ['Category', project.category],
            ['Year', project.year],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="eyebrow text-muted">{label}</p>
              <p className="mt-3 text-sm">{value}</p>
            </div>
          ))}
        </StaggerChildren>
        <ImageReveal className="my-10">
          <ProjectVisual kind={project.kind} className="case-hero-visual" />
        </ImageReveal>
        <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionTitle number="01" label="OVERVIEW" title={project.title} />
          <div>
            <p className="text-xl leading-9 tracking-tight">{project.summary}</p>
            <p className="mt-5 text-sm leading-7 text-muted">
              An illustrative study. The following sections describe design intent and a proposed
              technical direction, not a delivered client engagement.
            </p>
          </div>
        </section>
        <section className="grid gap-12 border-y border-white/15 py-14 md:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">02 / THE PROBLEM</p>
            <h2 className="mt-5 text-3xl tracking-tight">Finding the friction.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.problem}</p>
          </div>
          <div>
            <p className="eyebrow text-accent">03 / THE OBJECTIVE</p>
            <h2 className="mt-5 text-3xl tracking-tight">Define a useful direction.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.objective}</p>
          </div>
        </section>
        <section className="section-space grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32">
            <SectionTitle number="04" label="APPROACH & DESIGN" title="Purpose in every layer." />
            <p className="mt-7 text-base leading-8 text-muted">{project.approach}</p>
            <h3 className="mt-8 text-xl tracking-tight">The design language</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{project.design}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <ImageReveal>
            <div className="design-detail-visual">
              <ProjectVisual kind={project.kind} />
            </div>
          </ImageReveal>
        </section>
        <section className="border-y border-white/15 py-14">
          <SectionTitle number="05" label="PROPOSED ARCHITECTURE" title="Behind the interface." />
          <div className="mt-10">
            <ArchitectureDiagram nodes={project.architecture} />
          </div>
        </section>
        <section className="section-space grid gap-12 md:grid-cols-2">
          <div>
            <SectionTitle number="06" label="FEATURES" title="The useful details." />
            <ul className="mt-7">
              {project.features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex gap-5 border-t border-white/15 py-5 text-lg tracking-tight"
                >
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-accent">07 / THE CHALLENGE</p>
            <h2 className="mt-5 text-3xl tracking-tight">A deliberate tradeoff.</h2>
            <p className="mt-5 text-base leading-8 text-muted">{project.challenge}</p>
            <div className="mt-10 border-l-2 border-accent pl-6">
              <p className="eyebrow text-muted">08 / OUTCOME</p>
              <p className="mt-4 text-base leading-8">{project.outcome}</p>
            </div>
          </div>
        </section>
        <section className="pb-20">
          <SectionTitle
            number="09"
            label="GALLERY"
            title="A closer look."
            description="Explore the overview and detail crops. Select any view to open the full gallery."
          />
          <ProjectGallery project={project} />
        </section>
        <AdjacentNavigation items={projects} current={slug} base="/projects" label="project" />
      </Container>
      <RelatedProjects
        slugs={projects
          .filter((item) => item.slug !== slug)
          .slice(0, 2)
          .map((item) => item.slug)}
      />
      <CTA />
    </>
  )
}
