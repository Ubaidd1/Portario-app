import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Button from '../components/Button'
import SplitText from '../animations/SplitText'
const suggestions = [
  { label: 'Selected projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
export default function NotFoundPage({ kind = 'Page', to = '/' }) {
  return (
    <>
      <SEO
        title={`${kind} not found`}
        description="This address does not point to a published page. Explore the Folioblox portfolio instead."
        noindex
      />
      <section className="min-h-[80vh] overflow-hidden pt-40 pb-20">
        <Container>
          <p className="eyebrow text-accent-soft">ERROR 404 · OFF THE GRID</p>
          <div
            aria-hidden="true"
            className="text-[clamp(7rem,27vw,24rem)] font-semibold leading-none tracking-[-.09em]"
          >
            <SplitText text="404" />
            <span className="text-accent">.</span>
          </div>
          <h1 className="mt-5 text-3xl tracking-tight">{kind} not found.</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted">
            The link may be out of date, or the address may have a typo. Here are a few places to
            pick things up again.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/">Back to Home</Button>
            {to !== '/' && (
              <Button to={to} variant="outline">
                {`All ${kind.toLowerCase()}s`}
              </Button>
            )}
          </div>
          <nav aria-label="Suggested pages" className="mt-12 border-t border-white/15 pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {suggestions.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  )
}
