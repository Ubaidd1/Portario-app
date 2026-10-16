import { useParams } from 'react-router-dom'
import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import Container from '@/shared/components/Container'
import AdjacentNavigation from '@/shared/components/AdjacentNavigation'
import ImageReveal from '@/shared/animations/ImageReveal'
import StaggerChildren from '@/shared/animations/StaggerChildren'
import CTA from '@/shared/components/CTA'
import NotFoundPage from '@/shared/pages/NotFoundPage'
import { projects, statusLabels } from '../data/projects'
import ProjectMedia from '../components/ProjectMedia'
import ProjectLinks from '../components/ProjectLinks'
import RelatedProjects from '../components/RelatedProjects'
import { sectionsFor } from '../components/case-study/sections'
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage kind="Project" to="/projects" />
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
        {sectionsFor(project).map(({ key, Component, numbers }) => (
          <Component key={key} project={project} numbers={numbers} />
        ))}
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
