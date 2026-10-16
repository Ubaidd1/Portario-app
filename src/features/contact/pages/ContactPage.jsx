import SEO from '@/shared/components/SEO'
import PageHero from '@/shared/components/PageHero'
import ContactSection from '../components/ContactSection'
import FAQ from '../components/FAQ'
export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Start a project conversation with Folioblox. Share your goals through a focused, guided enquiry."
      />
      <PageHero
        label="LET’S TALK / 06"
        title="LET’S BUILD SOMETHING MEANINGFUL."
        description="An idea, a challenge, or a new chapter. You bring the ambition. We’ll find a practical way forward."
      />
      <ContactSection />
      <FAQ />
    </>
  )
}
