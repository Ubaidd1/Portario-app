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
export const capabilities = [
  {
    title: 'Digital Products',
    description:
      'From a first interaction to a coherent product experience. Make the important workflows feel natural.',
    to: '/services/app-development',
    visual: 'device',
  },
  {
    title: 'Web Applications',
    description: 'Responsive, accessible interfaces with a considered structure behind them.',
    to: '/services/web-development',
    visual: 'browser',
  },
  {
    title: 'AI Systems',
    description:
      'Bounded AI workflows, useful context, and evaluation that goes beyond a compelling demo.',
    to: '/services/ai-ml',
    visual: 'neural',
  },
  {
    title: 'Automation',
    description:
      'Connect repeatable steps and reduce manual effort with understandable, maintainable workflows.',
    to: '/services/python-data-science',
    visual: 'content',
  },
  {
    title: 'Data Platforms',
    description:
      'Turn scattered inputs into a clearer picture with reproducible analysis and useful visualization.',
    to: '/services/python-data-science',
    visual: 'data',
  },
  {
    title: 'CMS Experiences',
    description:
      'Flexible content structures and editing experiences that teams can confidently use.',
    to: '/services/cms',
    visual: 'content',
  },
]
export const experiments = [
  {
    title: 'Context / conversation',
    category: 'AI experiments',
    status: 'EXPERIMENT',
    detail: 'Explore the boundary between an open prompt and a useful next action.',
    visual: 'neural',
  },
  {
    title: 'Objects in orbit',
    category: '3D experiments',
    status: 'PROTOTYPE',
    detail: 'A lightweight CSS geometry study. Move your pointer to change the perspective.',
    visual: 'core',
  },
  {
    title: 'Reading the signal',
    category: 'Data visualizations',
    status: 'EXPERIMENT',
    detail: 'A visual rhythm study using illustrative data, with no real-world metrics.',
    visual: 'data',
  },
  {
    title: 'Less manual work',
    category: 'Automation',
    status: 'IN PROGRESS',
    detail: 'A workflow concept connecting an input, a transformation, and a review step.',
    visual: 'content',
  },
  {
    title: 'Interface fragments',
    category: 'UI concepts',
    status: 'PROTOTYPE',
    detail: 'An exploration of spacing, layering, and readable component hierarchy.',
    visual: 'interface',
  },
]
