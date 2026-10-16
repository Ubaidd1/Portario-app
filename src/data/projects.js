import { caseStudies } from './caseStudies.js'

/**
 * Projects shown across the site. Card-level fields live here; the long-form case
 * study for each project lives in `caseStudies.js` under the same `kind` key.
 *
 * To add a real project, copy this template, give it a new `kind`, add a matching
 * entry in `caseStudies.js`, and put screenshots in `public/images/projects/`.
 * Optional fields can be left out: empty links, images and results are hidden.
 *
 * {
 *   id: '05',
 *   kind: 'my-project',               // also the URL slug: /projects/my-project
 *   title: 'Project name',
 *   category: 'Web Development',
 *   description: 'One-line summary for cards.',
 *   year: '2026',
 *   status: 'live',                   // 'live' | 'in-progress' | 'concept'
 *   technologies: ['React', 'Node.js'],
 *   summary: 'Two or three sentences about what it is and who it is for.',
 *   approach: 'How you approached it.',
 *   liveUrl: 'https://…',             // optional
 *   repoUrl: 'https://github.com/…',  // optional
 *   thumbnail: { src: '/images/projects/my-project/cover.webp', alt: 'Describe the screen', width: 1600, height: 1000 },
 *   images: [{ src: '…', alt: '…', caption: '…', width: 1600, height: 1000 }],
 *   draft: true,                      // keeps it off the public site while you write it up
 * }
 */
const baseProjects = [
  {
    id: '01',
    title: 'Forma Workspace',
    category: 'Web Development',
    description: 'A focused workspace for teams.',
    year: '2026',
    status: 'concept',
    technologies: ['React', 'Next.js', 'API'],
    kind: 'forma',
    summary:
      'A product study in making collaborative work feel calm. A unified overview brings tasks, team activity, and project progress into one considered workspace.',
    approach:
      'The interface prioritizes a readable information hierarchy, clear status feedback, and a flexible component system that can grow with the product.',
  },
  {
    id: '02',
    title: 'Frequency Analytics',
    category: 'Data Science',
    description: 'Clear data. Better decisions.',
    year: '2026',
    status: 'concept',
    technologies: ['Python', 'Data Science', 'Analytics'],
    kind: 'frequency',
    summary:
      'An exploration of how a busy collection of data can become a useful decision-making tool. Key trends are surfaced in a focused analytics workspace.',
    approach:
      'Progressive disclosure, comparable metrics, and consistent chart styling make the most important signals easier to find and discuss.',
  },
  {
    id: '03',
    title: 'Nova Assistant',
    category: 'AI / ML',
    description: 'Useful intelligence, in your workflow.',
    year: '2026',
    status: 'concept',
    technologies: ['Python', 'AI', 'LLM'],
    kind: 'nova',
    summary:
      'An interface concept for a practical AI assistant that helps people move from a question to an actionable next step.',
    approach:
      'The design explores suggested prompts, readable responses, and clear source context, with the boundaries of the assistant visible to the person using it.',
  },
  {
    id: '04',
    title: 'Indigo Studio',
    category: 'UI / UX',
    description: 'An expressive digital home.',
    year: '2026',
    status: 'concept',
    technologies: ['React', 'UI/UX', 'Design'],
    kind: 'indigo',
    summary:
      'A bold editorial direction for an independent creative studio. Expressive typography and purposeful movement give the work room to speak.',
    approach:
      'A responsive grid balances oversized type with focused project storytelling, while the monochrome and blue palette keeps the visual identity coherent.',
  },
]

export const statusLabels = {
  live: 'Live project',
  'in-progress': 'In progress',
  concept: 'Concept study',
}

const safeUrl = (value) => (typeof value === 'string' && /^https?:\/\//.test(value) ? value : '')

export const projects = baseProjects
  .filter((project) => !project.draft)
  .map((project) => {
    const study = caseStudies[project.kind] || {}
    return {
      ...project,
      ...study,
      slug: project.kind,
      liveUrl: safeUrl(project.liveUrl),
      repoUrl: safeUrl(project.repoUrl),
      images: project.images || [],
      results: study.results || [],
      contributions: study.contributions || [],
      decisions: study.decisions || [],
    }
  })
