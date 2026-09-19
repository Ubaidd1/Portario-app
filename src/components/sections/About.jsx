import TextLink from '../common/TextLink'
import { ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import FadeIn from '../animations/FadeIn'
import Sculpture from '../visuals/Sculpture'
export default function About() {
  return (
    <section id="about" className="section-space">
      <Container>
        <FadeIn className="grid gap-8 md:grid-cols-[1fr_3fr]">
          <div>
            <p className="eyebrow">
              <span className="text-accent">02</span> / ABOUT
            </p>
            <span className="mt-9 hidden text-[130px] leading-none tracking-[-.1em] text-white/[.07] md:block">
              02
            </span>
          </div>
          <div>
            <h2 className="section-title max-w-3xl">
              Developer.
              <br />
              Problem solver.
              <br />
              <span className="text-muted">Technical partner.</span>
            </h2>
            <div className="mt-9 grid gap-7 md:grid-cols-2">
              <p className="text-xl leading-relaxed tracking-tight">
                Bringing code and creativity together to build useful products
                <span className="text-accent">.</span>
              </p>
              <p className="text-sm leading-7 text-muted">
                I turn complex ideas into clear digital experiences. From the first prototype to a
                reliable release, I care about how your product looks, how it works, and how it
                grows.
              </p>
            </div>
          </div>
          <div className="md:col-start-2">
            <TextLink to="/about">A little more about me</TextLink>
          </div>
        </FadeIn>
        <FadeIn className="about-visual mt-14">
          <div className="absolute left-6 top-6 z-10 flex items-center gap-2 font-mono text-[10px] text-muted">
            <span className="h-1 w-1 bg-accent" />
            THE INTERSECTION OF LOGIC & IMAGINATION
          </div>
          <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
            <p className="text-4xl font-medium tracking-[-.06em] sm:text-6xl">
              Built with logic.
              <br />
              <span className="text-muted">Driven by curiosity.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['CODE', 'DESIGN', 'AI', 'DATA', 'AUTOMATION'].map((label) => (
                <span className="tag" key={label}>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="about-sculpture">
            <Sculpture compact />
          </div>
          <ArrowUpRight className="absolute right-6 top-6 text-accent" size={24} />
        </FadeIn>
      </Container>
    </section>
  )
}
