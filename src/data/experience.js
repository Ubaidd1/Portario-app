/**
 * Professional history, newest first. The Experience section and the experience
 * timeline only appear once at least one verified entry exists. Example:
 * {
 *   role: 'Full-Stack Developer',
 *   organisation: 'Company name',
 *   url: 'https://…',                 // optional
 *   period: '2024 — Present',
 *   type: 'Freelance',                // Full-time | Contract | Freelance | Open source…
 *   summary: 'One or two sentences about the scope of the work.',
 *   highlights: ['Specific, verifiable contribution', '…'],
 *   technologies: ['React', 'Node.js'],
 * }
 */
export const experience = []

/** Ways a client can work together. Shown on the Experience page. */
export const engagements = [
  {
    title: 'Project builds',
    description:
      'A defined website, web app, or integration, scoped together and delivered in stages with regular demos and a documented handover.',
  },
  {
    title: 'Technical partnership',
    description:
      'Ongoing development support for a founder or small team: planning, building, reviewing, and keeping the product moving.',
  },
  {
    title: 'Improve what exists',
    description:
      'Performance, accessibility, SEO, and code-quality work on an existing product, prioritised by impact.',
  },
]

export const principles = [
  {
    title: 'Start with the problem.',
    description:
      'A technology choice should follow an understanding of the task, the constraints, and the people who will use the result.',
  },
  {
    title: 'Make complexity useful.',
    description:
      'Good architecture creates clear boundaries. Good design makes those boundaries feel natural to the person using the product.',
  },
  {
    title: 'Design the details.',
    description:
      'Empty states, keyboard paths, loading feedback, and readable content are part of the experience from the beginning.',
  },
  {
    title: 'Build in conversation.',
    description:
      'Small demonstrations and clear written decisions make collaboration practical, especially across time zones.',
  },
]
export const journey = [
  {
    title: 'Learning',
    description:
      'Ask better questions. Build an understanding of how interfaces, systems, and people fit together.',
  },
  {
    title: 'Building',
    description:
      'Turn ideas into working pieces. Prefer a small useful experience over an oversized first release.',
  },
  {
    title: 'Experimenting',
    description:
      'Explore AI, data, motion, and new interaction patterns with clear boundaries and honest expectations.',
  },
  {
    title: 'Shipping',
    description:
      'Check the details, document the decisions, and make the transition into use understandable.',
  },
  {
    title: 'Growing',
    description:
      'Use feedback to improve the work. Keep the parts that help, and simplify the parts that do not.',
  },
]
