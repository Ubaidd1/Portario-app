import { CodeXml, ExternalLink } from 'lucide-react'
/** Live and source links for a project. Renders nothing when neither URL is set. */
export default function ProjectLinks({ project, className = '' }) {
  if (!project.liveUrl && !project.repoUrl) return null
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          <span className="relative z-10">Live site</span>
          <ExternalLink size={16} className="relative z-10" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline"
        >
          <span className="relative z-10">Source code</span>
          <CodeXml size={16} className="relative z-10" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}
