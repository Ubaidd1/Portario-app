import SectionTitle from '@/shared/components/SectionTitle'
export default function CaseStudyContributions({ project, numbers }) {
  return (
    <section className="section-space grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
      <SectionTitle number={numbers[0]} label="MY ROLE" title="What I contributed." />
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
  )
}
