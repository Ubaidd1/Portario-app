import SEO from '../components/common/SEO'
import Hero from '../components/sections/Hero'
import TechMarquee from '../components/sections/TechMarquee'
import Capabilities from '../components/sections/Capabilities'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Process from '../components/sections/Process'
import TechnologyStack from '../components/sections/TechnologyStack'
import Stats from '../components/sections/Stats'
import Awards from '../components/sections/Awards'
import Projects from '../components/sections/Projects'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import CTA from '../components/sections/CTA'
export default function Home() {
  return (
    <>
      <SEO
        title="Full-Stack Developer"
        description="Folioblox — thoughtful code, useful digital experiences. Explore web, AI, data, automation, and creative technology."
      />
      <Hero />
      <TechMarquee />
      <Capabilities />
      <About />
      <Projects />
      <Services />
      <Process />
      <TechnologyStack />
      <Stats />
      <Testimonials />
      <Awards />
      <FAQ />
      <CTA />
    </>
  )
}
