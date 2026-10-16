import { useReducedMotion } from 'framer-motion'
import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import Container from '@/shared/components/Container'
import EditorialTimeline from '@/shared/components/EditorialTimeline'
import CTA from '@/shared/components/CTA'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import { workflow } from '../data/process'
import ProcessJourney from '../components/ProcessJourney'
export default function ProcessPage() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  return (
    <>
      <SEO
        title="Process"
        description="A practical journey from discovery and strategy through design, development, testing, launch, and growth."
      />
      <PageHero
        label="HOW I WORK / 03"
        title="FROM IDEA TO SOMETHING REAL."
        description="Good work is not a mystery. It is a sequence of clear decisions, regular conversations, and careful attention to the details."
      />
      {desktop && !reduced ? (
        <ProcessJourney />
      ) : (
        <Container className="py-16">
          <EditorialTimeline
            items={workflow.map((item) => ({
              ...item,
              status: item.word,
              description: `${item.description} ${item.output}`,
            }))}
          />
        </Container>
      )}
      <CTA />
    </>
  )
}
