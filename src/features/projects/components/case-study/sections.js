import CaseStudyOverview from './CaseStudyOverview'
import CaseStudyBrief from './CaseStudyBrief'
import CaseStudyContributions from './CaseStudyContributions'
import CaseStudyApproach from './CaseStudyApproach'
import CaseStudyDecisions from './CaseStudyDecisions'
import CaseStudyArchitecture from './CaseStudyArchitecture'
import CaseStudyFeatures from './CaseStudyFeatures'
import CaseStudyGallery from './CaseStudyGallery'

/**
 * Case-study sections, in page order. `numbers` is how many section numbers a
 * component uses; `show` hides a section when the project has nothing for it.
 * Numbering is assigned in order across the sections that are shown.
 */
const caseStudySections = [
  { key: 'overview', Component: CaseStudyOverview, numbers: 1 },
  { key: 'brief', Component: CaseStudyBrief, numbers: 2 },
  {
    key: 'contributions',
    Component: CaseStudyContributions,
    numbers: 1,
    show: (project) => project.contributions.length > 0,
  },
  { key: 'approach', Component: CaseStudyApproach, numbers: 1 },
  {
    key: 'decisions',
    Component: CaseStudyDecisions,
    numbers: 1,
    show: (project) => project.decisions.length > 0,
  },
  { key: 'architecture', Component: CaseStudyArchitecture, numbers: 1 },
  { key: 'features', Component: CaseStudyFeatures, numbers: 2 },
  { key: 'gallery', Component: CaseStudyGallery, numbers: 1 },
]

/** The sections to render for a project, each with its section numbers assigned. */
export function sectionsFor(project) {
  let count = 0
  return caseStudySections
    .filter(({ show }) => !show || show(project))
    .map((section) => ({
      ...section,
      numbers: Array.from({ length: section.numbers }, () => String(++count).padStart(2, '0')),
    }))
}
