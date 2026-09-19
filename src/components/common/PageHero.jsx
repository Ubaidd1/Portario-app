import Container from './Container'
import RevealText from '../animations/RevealText'
import FadeIn from '../animations/FadeIn'
export default function PageHero({ label, title, description, children }) {
  return (
    <section className="page-hero relative overflow-hidden border-b border-white/10">
      <div className="page-grid" aria-hidden="true" />
      <Container className="relative">
        <p className="eyebrow mb-8 text-accent">{label}</p>
        <RevealText as="h1" text={title} className="page-title max-w-6xl" />
        <FadeIn
          delay={0.1}
          className="mt-9 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <p className="max-w-xl text-base leading-7 text-muted">{description}</p>
          {children}
        </FadeIn>
      </Container>
    </section>
  )
}
