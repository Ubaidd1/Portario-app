import SectionTitle from '@/shared/components/SectionTitle'
import ArchitectureDiagram from '../ArchitectureDiagram'
export default function CaseStudyArchitecture({ project, numbers }) {
  const concept = project.status === 'concept'
  return (
    <section className="border-y border-white/15 py-14">
      <SectionTitle
        number={numbers[0]}
        label={concept ? 'PROPOSED ARCHITECTURE' : 'ARCHITECTURE'}
        title="Behind the interface."
      />
      <div className="mt-10">
        <ArchitectureDiagram nodes={project.architecture} />
      </div>
    </section>
  )
}
