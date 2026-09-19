import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { navigation } from '../../data/navigation'
import Container from '../common/Container'
export default function Footer() {
  return (
    <footer className="pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.9fr_1.3fr]">
          <div>
            <Link to="/" className="logo">
              FOLIOBLOX<span className="text-accent">®</span>
            </Link>
            <p className="mt-5 max-w-48 text-sm leading-6 text-muted">
              Thoughtful code.
              <br />
              Useful digital experiences.
            </p>
            <p className="mt-5 text-xs text-muted">Remote · Working worldwide</p>
          </div>
          <div>
            <h2 className="eyebrow mb-5 text-muted">EXPLORE</h2>
            <div className="flex flex-col items-start gap-3">
              {navigation.map((link) => (
                <Link className="footer-link" to={link.to} key={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="eyebrow mb-5 text-muted">EXPERTISE</h2>
            <div className="flex flex-col items-start gap-3">
              {services.filter(service => ['web-development', 'app-development', 'ai-ml', 'cms'].includes(service.slug)).map(service => <Link className="footer-link" to={`/services/${service.slug}`} key={service.slug}>{service.name}</Link>)}
            </div>
          </div>
          <div>
            <h2 className="eyebrow mb-5 text-muted">START A CONVERSATION</h2>
            <p className="max-w-52 text-lg leading-relaxed tracking-tight">
              An idea, a challenge,
              <br />
              or a new chapter.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-3 border-b border-accent pb-2 text-sm"
            >
              Book a discovery call
              <ArrowUpRight size={16} className="text-accent" />
            </Link>
            <div
              className="mt-6 flex flex-wrap gap-4 text-xs text-muted"
              aria-label="Social profile placeholders"
            >
              <span title="GitHub profile not provided">GitHub (soon)</span>
              <span title="LinkedIn profile not provided">LinkedIn (soon)</span>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="footer-wordmark mt-15 overflow-hidden border-b border-white/15"
        >
          FOLIOBLOX<span className="text-accent">®</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 py-7 text-[11px] text-muted">
          <p>© 2026 Folioblox</p>
          <p className="hidden sm:block">Built with care, from idea to interaction.</p>
          <a href="#main-content" className="flex items-center gap-3">
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
