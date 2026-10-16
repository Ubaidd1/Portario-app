import { Fragment } from 'react'
import SEO from '../components/common/SEO'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Capabilities from '../components/sections/Capabilities'
import Services from '../components/sections/Services'
import Process from '../components/sections/Process'
import ExperienceSection from '../components/sections/ExperienceSection'
import About from '../components/sections/About'
import Testimonials from '../components/sections/Testimonials'
import Awards from '../components/sections/Awards'
import TechMarquee from '../components/sections/TechMarquee'
import TechnologyStack from '../components/sections/TechnologyStack'
import CTA from '../components/sections/CTA'
import { site } from '../config/site'
import { experience } from '../data/experience'
import { testimonials } from '../data/testimonials'
import { awards } from '../data/awards'
// Sections without verified content are skipped, and the rest are numbered in order.
const sections = [
  { key: 'projects', Component: Projects },
  { key: 'capabilities', Component: Capabilities },
  { key: 'services', Component: Services },
  { key: 'process', Component: Process },
  {
    key: 'experience',
    Component: ExperienceSection,
    show: experience.length > 0,
    props: { limit: 3 },
  },
  { key: 'about', Component: About },
  { key: 'testimonials', Component: Testimonials, show: testimonials.length > 0 },
  { key: 'awards', Component: Awards, show: awards.length > 0 },
  { key: 'technology', Component: TechnologyStack },
]
  .filter((section) => section.show !== false)
  .map((section, index) => ({ ...section, number: String(index + 1).padStart(2, '0') }))
export default function Home() {
  return (
    <>
      <SEO title="Full-Stack Developer" description={site.defaultDescription} />
      <Hero />
      {sections.map(({ key, Component, number, props }) => (
        <Fragment key={key}>
          {key === 'technology' && <TechMarquee />}
          <Component number={number} {...props} />
        </Fragment>
      ))}
      <CTA />
    </>
  )
}
