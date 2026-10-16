import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { services } from '@/features/services/data/services'
import Container from '@/shared/components/Container'
import { resumeUrl, site, socialLinks } from '@/config/site'
import { navigation } from './navigation'
export default function Footer() {
  return (
    <footer className="pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.9fr_1.3fr]">
          <div>
            <Link to="/" className="logo">
              FOLIOBLOX<span className="text-accent-soft">®</span>
            </Link>
            <p className="mt-5 max-w-48 text-sm leading-6 text-muted">
              Thoughtful code.
              <br />
              Useful digital experiences.
            </p>
            <p className="mt-5 text-xs text-muted">{site.location}</p>
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
              {services
                .filter((service) =>
                  ['web-development', 'app-development', 'ai-ml', 'cms'].includes(service.slug),
                )
                .map((service) => (
                  <Link className="footer-link" to={`/services/${service.slug}`} key={service.slug}>
                    {service.name}
                  </Link>
                ))}
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
              <ArrowUpRight size={16} className="text-accent-soft" />
            </Link>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="footer-link mt-4 flex min-h-11 items-center"
              >
                {site.email}
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} className="footer-link flex min-h-11 items-center gap-1">
                Download CV
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
            {socialLinks.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-5" aria-label="Profiles">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link inline-flex min-h-11 items-center gap-1"
                    >
                      {link.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="footer-wordmark mt-15 overflow-hidden border-b border-white/15"
        >
          FOLIOBLOX<span className="text-accent-soft">®</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 py-7 text-[11px] text-muted">
          <p>
            © {new Date().getFullYear()}{' '}
            {site.ownerName ? `${site.ownerName} · Folioblox` : 'Folioblox'}
          </p>
          <p className="hidden sm:block">Built with care, from idea to interaction.</p>
          <a href="#main-content" className="flex min-h-11 items-center gap-3 hover:text-text">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
