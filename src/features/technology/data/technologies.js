/** Marquee list shown between sections. */
export const technologies = [
  'React',
  'Python',
  'Next.js',
  'AI / ML',
  'Node.js',
  'FastAPI',
  'WordPress',
  'Shopify',
  'Webflow',
  'Framer',
  'GoHighLevel',
  'SEO',
  'Data Science',
]

/** Constellation nodes: x/y are percentages inside the stack visual. */
export const stack = [
  { name: 'React', group: 'interface', x: 18, y: 24 },
  { name: 'Next.js', group: 'interface', x: 38, y: 13 },
  { name: 'JavaScript', group: 'interface', x: 16, y: 61 },
  { name: 'Python', group: 'intelligence', x: 61, y: 21 },
  { name: 'FastAPI', group: 'intelligence', x: 83, y: 12 },
  { name: 'Node.js', group: 'platform', x: 41, y: 40 },
  { name: 'MongoDB', group: 'platform', x: 64, y: 50 },
  { name: 'PostgreSQL', group: 'platform', x: 83, y: 67 },
  { name: 'AI / ML', group: 'intelligence', x: 85, y: 36 },
  { name: 'LLMs', group: 'intelligence', x: 64, y: 78 },
  { name: 'Docker', group: 'platform', x: 40, y: 69 },
  { name: 'Git', group: 'platform', x: 25, y: 85 },
  { name: 'AWS', group: 'platform', x: 48, y: 91 },
  { name: 'WordPress', group: 'content', x: 9, y: 42 },
  { name: 'Shopify', group: 'content', x: 81, y: 91 },
]
export const stackGroups = {
  interface: 'Interfaces & interaction',
  intelligence: 'AI, data & automation',
  platform: 'Application infrastructure',
  content: 'Content & commerce',
}
