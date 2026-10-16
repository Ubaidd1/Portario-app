export default function CaseStudyBrief({ project, numbers }) {
  return (
    <section className="grid gap-12 border-y border-white/15 py-14 md:grid-cols-2">
      <div>
        <p className="eyebrow text-accent-soft">{numbers[0]} / THE PROBLEM</p>
        <h2 className="mt-5 text-3xl tracking-tight">Finding the friction.</h2>
        <p className="mt-5 text-base leading-8 text-muted">{project.problem}</p>
      </div>
      <div>
        <p className="eyebrow text-accent-soft">{numbers[1]} / THE OBJECTIVE</p>
        <h2 className="mt-5 text-3xl tracking-tight">Define a useful direction.</h2>
        <p className="mt-5 text-base leading-8 text-muted">{project.objective}</p>
      </div>
    </section>
  )
}
