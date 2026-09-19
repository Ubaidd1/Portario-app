import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import FadeIn from '../animations/FadeIn'
export default function CTA() {
  return (
    <section className="cta-section relative overflow-hidden border-t border-white/15 py-20 md:py-28">
      <div className="cta-orbit" aria-hidden="true" />
      <Container className="relative">
        <FadeIn>
          <p className="eyebrow text-accent">HAVE SOMETHING IN MIND?</p>
          <p className="mt-6 text-lg text-muted">A good idea deserves a great start.</p>
          <h2 className="mt-8 max-w-5xl text-[clamp(2.7rem,7.5vw,7rem)] font-semibold leading-[1.03] tracking-[-.065em]">
            LET’S MAKE YOUR
            <br />
            NEXT MOVE <span className="cta-outline">MATTER.</span>
          </h2>
          <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <p className="max-w-xs text-sm leading-7 text-muted">
              Bring the ambition. We’ll find a practical path to build it.
            </p>
            <Link
              to="/contact"
              data-cursor="cta"
              className="group flex items-center gap-7 text-xl font-medium"
            >
              Let’s Build
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight size={29} />
              </span>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
