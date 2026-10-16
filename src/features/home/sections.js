import { AboutSection } from '@/features/about'
import { ExperienceSection } from '@/features/experience'
import { ProcessSection } from '@/features/process'
import { ProjectsSection } from '@/features/projects'
import { Capabilities, ServicesSection } from '@/features/services'
import { Awards, Testimonials } from '@/features/social-proof'
import { TechnologyStack } from '@/features/technology'
import { experience } from '@/features/experience/data/experience'
import { awards } from '@/features/social-proof/data/awards'
import { testimonials } from '@/features/social-proof/data/testimonials'

/**
 * Homepage sections, in order. Reorder or remove entries here; sections whose
 * `show` is false (no verified content yet) are skipped and the rest are
 * numbered 01, 02, … automatically.
 */
const homeSections = [
  { key: 'projects', Component: ProjectsSection },
  { key: 'capabilities', Component: Capabilities },
  { key: 'services', Component: ServicesSection },
  { key: 'process', Component: ProcessSection },
  {
    key: 'experience',
    Component: ExperienceSection,
    show: experience.length > 0,
    props: { limit: 3 },
  },
  { key: 'about', Component: AboutSection },
  { key: 'testimonials', Component: Testimonials, show: testimonials.length > 0 },
  { key: 'awards', Component: Awards, show: awards.length > 0 },
  { key: 'technology', Component: TechnologyStack, withMarquee: true },
]

export const visibleSections = homeSections
  .filter((section) => section.show !== false)
  .map((section, index) => ({ ...section, number: String(index + 1).padStart(2, '0') }))
