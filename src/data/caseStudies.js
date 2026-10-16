/**
 * Long-form case-study content, keyed by each project's `kind` (see projects.js).
 * Only add `results` that are verified and that you have permission to publish,
 * e.g. results: [{ value: '38%', label: 'faster page loads (Lighthouse, before/after)' }].
 */
export const caseStudies = {
  forma: {
    filter: 'Web',
    role: 'Interface & application concept',
    contributions: [
      'Information architecture for the workspace overview',
      'Interface design and reusable dashboard components',
      'Proposed separation between interface, API and storage layers',
    ],
    decisions: [
      'Group work by status first, so priorities are visible without opening a project.',
      'Keep data access behind an API boundary so presentation components stay simple to test.',
      'Build the dashboard from a small set of reusable cards instead of one-off panels.',
    ],
    problem:
      'Project information is often spread across multiple views, making it harder to see priorities at a glance.',
    objective:
      'Explore a workspace that makes project status, ownership, and next actions easy to scan.',
    design:
      'A quiet neutral canvas, compact navigation, and a clear task hierarchy keep the work at the center.',
    features: [
      'Workspace overview',
      'Project status columns',
      'Team activity hierarchy',
      'Reusable dashboard components',
    ],
    challenge: 'Balance information density with breathing room without hiding important actions.',
    outcome:
      'An illustrative interface direction and component structure for a team workspace. It has not been validated as a live client product.',
    architecture: [
      { name: 'Interface', detail: 'React components present projects, tasks, and activity.' },
      {
        name: 'API boundary',
        detail: 'A proposed service layer keeps data access separate from presentation.',
      },
      {
        name: 'Project logic',
        detail: 'Task status, permissions, and workspace rules would live here.',
      },
      { name: 'Storage', detail: 'A persistent store would hold project and team records.' },
    ],
    gallery: ['Workspace overview', 'Task hierarchy', 'Component detail'],
  },
  frequency: {
    filter: 'Data',
    role: 'Data visualization concept',
    contributions: [
      'Dashboard information hierarchy and chart treatment',
      'Proposed Python pipeline for validating and transforming inputs',
      'Interface for comparing time periods and groups',
    ],
    decisions: [
      'Lead with a few summary indicators and reveal detail on demand.',
      'Use one consistent chart style so differences in data, not decoration, stand out.',
      'Keep calculations documented in the pipeline so every number on screen can be traced.',
    ],
    problem: 'A large collection of metrics does not automatically tell a useful story.',
    objective:
      'Explore a dashboard that connects high-level signals with readable supporting detail.',
    design:
      'Strong contrast and consistent chart treatment direct attention toward patterns rather than decoration.',
    features: [
      'Summary indicators',
      'Trend visualization',
      'Time-period context',
      'Comparable data groups',
    ],
    challenge:
      'Present a clear visual hierarchy without suggesting certainty that the underlying data does not support.',
    outcome:
      'A visual analytics study using illustrative data. No real revenue, audience, or performance results are represented.',
    architecture: [
      {
        name: 'Data inputs',
        detail: 'Proposed structured inputs from exports or application sources.',
      },
      {
        name: 'Python pipeline',
        detail: 'Validation and transformation would make inputs comparable.',
      },
      {
        name: 'Analysis',
        detail: 'Documented calculations would produce interpretable summaries.',
      },
      {
        name: 'Dashboard',
        detail: 'A visual presentation layer helps people explore the signals.',
      },
    ],
    gallery: ['Analytics overview', 'Signal exploration', 'Chart detail'],
  },
  nova: {
    filter: 'AI / ML',
    role: 'AI product & interaction concept',
    contributions: [
      'Conversation layout and suggested-prompt patterns',
      'Interface states that communicate what the assistant can and cannot do',
      'Proposed request, retrieval and evaluation architecture',
    ],
    decisions: [
      'Offer starting prompts so people are never facing an empty box.',
      'Show the assistant’s limits in the interface rather than hiding them in documentation.',
      'Ground responses in approved sources and evaluate against known examples before release.',
    ],
    problem:
      'Open-ended AI tools can leave people unsure what to ask, what to trust, or what to do next.',
    objective:
      'Explore a guided assistant experience with understandable suggestions and clear boundaries.',
    design:
      'A focused conversation surface and useful starting points reduce the effort of beginning a task.',
    features: [
      'Suggested prompts',
      'Focused conversation layout',
      'Response hierarchy',
      'Visible capability boundaries',
    ],
    challenge:
      'Communicate useful possibilities without implying guaranteed accuracy or autonomous decision-making.',
    outcome:
      'An interface and workflow exploration. The study is not connected to a model or deployed as an AI service.',
    architecture: [
      {
        name: 'Conversation UI',
        detail: 'The interface collects a request and presents its response.',
      },
      {
        name: 'Request service',
        detail: 'A proposed backend would validate inputs and manage access.',
      },
      {
        name: 'Context retrieval',
        detail: 'Relevant approved sources could support grounded responses.',
      },
      {
        name: 'Model & evaluation',
        detail: 'Model calls would be evaluated against a bounded task and known examples.',
      },
    ],
    gallery: ['Conversation canvas', 'Prompt exploration', 'Interaction detail'],
  },
  indigo: {
    filter: 'UI/UX',
    role: 'Art direction & interface concept',
    contributions: [
      'Art direction and typographic system',
      'Responsive editorial layouts',
      'Component structure for project storytelling',
    ],
    decisions: [
      'Let oversized type carry the identity, and keep navigation conventional.',
      'Define the type scale with fluid sizing so compositions hold on small screens.',
      'Ship as a static build for fast delivery and simple hosting.',
    ],
    problem:
      'A creative studio needs a distinctive voice without making its work difficult to explore.',
    objective:
      'Explore a digital identity that combines editorial expression with usable navigation.',
    design:
      'Oversized type, a disciplined grid, and controlled blue accents create a confident visual rhythm.',
    features: [
      'Editorial project storytelling',
      'Responsive typographic scale',
      'Studio identity system',
      'Clear enquiry paths',
    ],
    challenge:
      'Keep expressive composition readable on small screens and accessible with a keyboard.',
    outcome:
      'An original visual direction for an illustrative studio. No client commission or commercial outcomes are claimed.',
    architecture: [
      {
        name: 'Content',
        detail: 'Structured project and studio information forms the foundation.',
      },
      {
        name: 'Design system',
        detail: 'Type, spacing, and component rules establish a consistent identity.',
      },
      { name: 'Responsive UI', detail: 'Layouts recompose for different viewports.' },
      {
        name: 'Static delivery',
        detail: 'A lightweight deployment could serve the final experience.',
      },
    ],
    gallery: ['Studio landing', 'Editorial direction', 'Identity detail'],
  },
}
export const projectFilters = ['All', 'Web', 'App', 'AI / ML', 'Data', 'UI/UX', 'Automation']
