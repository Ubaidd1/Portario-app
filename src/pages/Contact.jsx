import SEO from '../components/common/SEO'
import PageHero from '../components/common/PageHero'
import ContactForm from '../components/sections/Contact'
import FAQ from '../components/sections/FAQ'
export default function Contact() {
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
      <ContactForm />
      <FAQ />
    </>
  )
}
