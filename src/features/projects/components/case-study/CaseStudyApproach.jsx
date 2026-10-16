import SectionTitle from '@/shared/components/SectionTitle'
import ImageReveal from '@/shared/animations/ImageReveal'
import TagList from '@/shared/components/TagList'
import ProjectMedia from '../ProjectMedia'
export default function CaseStudyApproach({ project, numbers }) {
  return (
    <section className="section-space grid items-start gap-12 border-t border-white/15 lg:grid-cols-2">
      <div className="lg:sticky lg:top-32">
        <SectionTitle
          number={numbers[0]}
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
  )
}
