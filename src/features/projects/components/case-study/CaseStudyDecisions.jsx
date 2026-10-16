import SectionTitle from '@/shared/components/SectionTitle'
export default function CaseStudyDecisions({ project, numbers }) {
  return (
    <section className="border-t border-white/15 py-14">
      <SectionTitle
        number={numbers[0]}
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
  )
}
