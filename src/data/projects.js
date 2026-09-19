import { caseStudies } from './caseStudies'

const baseProjects = [
  {
    id: '01',
    title: 'Forma Workspace',
    category: 'Web Development',
    description: 'A focused workspace for teams.',
    year: '2026',
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
    technologies: ['Python', 'AI', 'LLM'],
    kind: 'nova',
    summary:
      'An interface concept for a practical AI assistant that helps people move from a question to an actionable next step.',
    approach:
      'The design explores suggested prompts, readable responses, and clear source context. It is a concept study, not a deployed AI service.',
  },
  {
    id: '04',
    title: 'Orange Studio',
    category: 'UI / UX',
    description: 'An expressive digital home.',
    year: '2026',
    technologies: ['React', 'UI/UX', 'Design'],
    kind: 'orange',
    summary:
      'A bold editorial direction for an independent creative studio. Expressive typography and purposeful movement give the work room to speak.',
    approach:
      'A responsive grid balances oversized type with focused project storytelling, while the monochrome and red palette keeps the visual identity coherent.',
  },
]

export const projects = baseProjects.map((project) => ({
  ...project,
  slug: project.kind,
  ...caseStudies[project.kind],
}))
