import { serviceDetails } from './serviceDetails'

const baseServices = [
  {
    name: 'Web Development',
    title: 'Fast websites. Real outcomes.',
    description:
      'Responsive web applications built for performance, accessibility, and maintainability.',
    tags: ['React', 'Next.js', 'APIs', 'Integrations', 'Performance optimization'],
    symbol: '</>',
  },
  {
    name: 'App Development',
    title: 'Your product, everywhere.',
    description:
      'Modern application experiences designed around usability, reliability, and scale.',
    tags: ['Product engineering', 'React', 'Integrations'],
    symbol: '{ }',
  },
  {
    name: 'SEO',
    title: 'Built to be found.',
    description:
      'Technical and content-focused SEO strategies designed to improve discoverability and organic growth.',
    tags: ['Technical SEO', 'Content strategy', 'Analytics'],
    symbol: '↗',
  },
  {
    name: 'Social Media Marketing',
    title: 'Connect with your audience.',
    description:
      'Strategic social content and digital campaigns designed to create meaningful audience engagement.',
    tags: ['Strategy', 'Content', 'Campaigns'],
    symbol: '@',
  },
  {
    name: 'AI / ML',
    title: 'Make intelligence useful.',
    description:
      'Practical AI workflows and machine-learning prototypes with clear evaluation criteria.',
    tags: ['AI integrations', 'Retrieval workflows', 'Model evaluation', 'LLM applications'],
    symbol: '✳',
  },
  {
    name: 'Python & Data Science',
    title: 'Less repetition. More progress.',
    description: 'Python automation, data processing, analytics, and workflow optimization.',
    tags: ['Python', 'Pandas', 'Automation', 'Analytics'],
    symbol: '[ ]',
  },
  {
    name: 'UI / UX & Designing',
    title: 'Clarity in every interaction.',
    description:
      'Thoughtful interfaces focused on hierarchy, usability, accessibility, and visual consistency.',
    tags: ['Figma', 'Design systems', 'Prototyping'],
    symbol: '⌘',
  },
  {
    name: 'CMS Development',
    title: 'A website you can manage.',
    description:
      'Flexible content-managed websites that allow teams to update and maintain their digital presence.',
    tags: ['WordPress', 'Shopify', 'Webflow', 'Framer'],
    symbol: 'Aa',
  },
]

export const services = baseServices.map((service) => ({
  ...service,
  ...serviceDetails[service.name],
}))
