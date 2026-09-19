import FadeIn from '../animations/FadeIn'
export default function SectionTitle({ number, label, title, description, className = '' }) {
  return (
    <FadeIn className={className}>
      <p className="eyebrow mb-6">
        <span className="text-accent">{number}</span>
        <span className="mx-3 text-muted">/</span>
        {label}
      </p>
      <h2 className="section-title max-w-3xl">{title}</h2>
      {description && <p className="mt-5 max-w-xl leading-relaxed text-muted">{description}</p>}
    </FadeIn>
  )
}
