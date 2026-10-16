import SectionTitle from '@/shared/components/SectionTitle'
import ProjectGallery from '../ProjectGallery'
export default function CaseStudyGallery({ project, numbers }) {
  return (
    <section className="pb-20">
      <SectionTitle
        number={numbers[0]}
        label="GALLERY"
        title="A closer look."
        description="Select any view to open the full gallery."
      />
      <ProjectGallery project={project} />
    </section>
  )
}
