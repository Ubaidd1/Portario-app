import SectionTitle from '@/shared/components/SectionTitle'
export default function CaseStudyOverview({ project, numbers }) {
  const concept = project.status === 'concept'
  return (
    <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
      <SectionTitle number={numbers[0]} label="OVERVIEW" title={project.title} />
      <div>
        <p className="text-xl leading-9 tracking-tight">{project.summary}</p>
        {concept && (
          <p className="mt-5 text-sm leading-7 text-muted">
            A self-initiated concept study. The sections below describe design intent and a proposed
            technical direction rather than a delivered client engagement.
          </p>
        )}
      </div>
    </section>
  )
}
