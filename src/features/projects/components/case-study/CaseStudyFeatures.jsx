import SectionTitle from '@/shared/components/SectionTitle'
export default function CaseStudyFeatures({ project, numbers }) {
  return (
    <section className="section-space grid gap-12 md:grid-cols-2">
      <div>
        <SectionTitle number={numbers[0]} label="FEATURES" title="The useful details." />
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
        <p className="eyebrow text-accent-soft">{numbers[1]} / THE CHALLENGE</p>
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
  )
}
