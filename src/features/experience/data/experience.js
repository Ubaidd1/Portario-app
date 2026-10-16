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
