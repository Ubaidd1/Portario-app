import SEO from '../components/common/SEO'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import SplitText from '../components/animations/SplitText'
export default function NotFound({ kind = 'Page', to = '/' }) {
  return (
    <>
      <SEO
        title={`${kind} not found`}
        description="This address does not point to a published page. Explore the current Folioblox portfolio."
      />
      <section className="min-h-[80vh] overflow-hidden pt-40 pb-20">
        <Container>
          <p className="eyebrow text-accent">OFF THE GRID</p>
          <div
            aria-hidden="true"
            className="text-[clamp(8rem,27vw,24rem)] font-semibold leading-none tracking-[-.09em]"
          >
            <SplitText text="404" />
            <span className="text-accent">.</span>
          </div>
          <h1 className="mt-5 text-3xl tracking-tight">{kind} not found.</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            This path hasn’t been built. Let’s get you back to something worth exploring.
          </p>
          <Button to={to} className="mt-8">
            {to === '/' ? 'Back to Home' : `Back to ${kind}s`}
          </Button>
        </Container>
      </section>
    </>
  )
}
