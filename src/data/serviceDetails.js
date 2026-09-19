export const serviceDetails = {
  'Web Development': {
    slug: 'web-development',
    visual: 'browser',
    problem:
      'A website can look finished and still be difficult to use, slow to load, or expensive to maintain.',
    approach:
      'Start with the key user journeys. Build an accessible component system, connect the necessary services, and test the experience under realistic conditions.',
    capabilities: [
      'Responsive interfaces',
      'Application architecture',
      'API integration',
      'Accessibility & performance',
    ],
    deliverables: [
      'Responsive frontend and source code',
      'Documented integrations',
      'Cross-device verification',
      'Deployment and handover guide',
    ],
    stages: ['Map the user journeys', 'Build and integrate', 'Verify and release'],
    related: ['forma', 'orange'],
  },
  'App Development': {
    slug: 'app-development',
    visual: 'device',
    problem:
      'A promising product needs more than a set of screens. It needs consistent behavior across states, devices, and real-world interruptions.',
    approach:
      'Define the smallest useful product, prototype its core interactions, and build reliable flows with clear loading, error, and empty states.',
    capabilities: [
      'Product prototyping',
      'Responsive app experiences',
      'State management',
      'Service integrations',
    ],
    deliverables: [
      'Interactive product prototype',
      'Reusable application components',
      'Core workflow implementation',
      'Release and maintenance notes',
    ],
    stages: [
      'Define the product boundary',
      'Prototype the core workflow',
      'Build, test, and iterate',
    ],
    related: ['forma', 'nova'],
  },
  SEO: {
    slug: 'seo',
    visual: 'search',
    problem:
      'Useful content can remain difficult to discover when technical structure and search intent are not aligned.',
    approach:
      'Audit the foundations, identify useful content opportunities, and prioritize changes that can be measured without promising a particular ranking.',
    capabilities: [
      'Technical audits',
      'Content structure',
      'Metadata & structured data',
      'Measurement planning',
    ],
    deliverables: [
      'Prioritized audit report',
      'On-page recommendations',
      'Technical implementation plan',
      'Measurement checklist',
    ],
    stages: ['Understand search intent', 'Audit and prioritize', 'Implement and observe'],
    related: ['orange'],
  },
  'Social Media Marketing': {
    slug: 'social-media',
    visual: 'social',
    problem:
      'Publishing frequently is not the same as communicating clearly. Content needs a purpose and a sustainable process.',
    approach:
      'Clarify the audience, develop a repeatable editorial direction, and review performance against the goals agreed at the start.',
    capabilities: [
      'Audience positioning',
      'Editorial planning',
      'Content systems',
      'Campaign analysis',
    ],
    deliverables: [
      'Audience and messaging framework',
      'Content calendar',
      'Reusable creative directions',
      'Campaign review template',
    ],
    stages: ['Define the audience', 'Shape the content system', 'Publish, learn, refine'],
    related: ['orange'],
  },
  'AI / ML': {
    slug: 'ai-ml',
    visual: 'neural',
    problem:
      'An impressive AI demo is not necessarily a useful product. Reliability, context, and evaluation need to be designed into the workflow.',
    approach:
      'Choose a bounded use case, establish evaluation criteria, and prototype the interaction before expanding its responsibilities.',
    capabilities: [
      'LLM application design',
      'Retrieval workflows',
      'AI integrations',
      'Evaluation planning',
    ],
    deliverables: [
      'Scoped AI prototype',
      'Integration and prompt structure',
      'Evaluation examples',
      'Limitations and handover notes',
    ],
    stages: ['Define useful behavior', 'Prototype and evaluate', 'Integrate with safeguards'],
    related: ['nova'],
  },
  'Python & Data Science': {
    slug: 'python-data-science',
    visual: 'data',
    problem:
      'Scattered data and repetitive tasks make it difficult to find the signal or spend time on higher-value work.',
    approach:
      'Inspect the inputs, make assumptions explicit, and create repeatable processing workflows with outputs people can understand.',
    capabilities: [
      'Python automation',
      'Data cleaning',
      'Exploratory analysis',
      'Reporting workflows',
    ],
    deliverables: [
      'Documented processing scripts',
      'Reproducible analysis',
      'Readable charts or dashboards',
      'Runbook and data assumptions',
    ],
    stages: ['Inspect inputs', 'Model the workflow', 'Validate outputs'],
    related: ['frequency', 'nova'],
  },
  'UI / UX & Designing': {
    slug: 'ui-ux',
    visual: 'interface',
    problem:
      'When an interface asks people to think too hard, even a useful product becomes frustrating.',
    approach:
      'Translate the main tasks into a clear hierarchy, explore interactions in prototypes, and build a consistent visual language around them.',
    capabilities: [
      'Information architecture',
      'Interaction design',
      'Interface systems',
      'Accessible prototyping',
    ],
    deliverables: [
      'User flows and wireframes',
      'High-fidelity interface direction',
      'Reusable component specifications',
      'Developer handover',
    ],
    stages: ['Understand the task', 'Explore and prototype', 'Refine and document'],
    related: ['orange', 'forma'],
  },
  'CMS Development': {
    slug: 'cms',
    visual: 'content',
    problem:
      'A website should not require a developer for every content update. Teams need clear structures and safe editing tools.',
    approach:
      'Model real content needs first, then create reusable templates and a practical editorial workflow around the chosen platform.',
    capabilities: [
      'Content modeling',
      'CMS templates',
      'Editorial workflows',
      'Platform integrations',
    ],
    deliverables: [
      'Configured content structure',
      'Responsive page templates',
      'Editor guidance',
      'Publishing and maintenance notes',
    ],
    stages: ['Map the content', 'Build the editing experience', 'Train and hand over'],
    related: ['orange', 'forma'],
  },
}
