import ProjectVisual from './ProjectVisual'
/** A project's screenshot when one is supplied, otherwise its illustrative concept visual. */
export default function ProjectMedia({
  project,
  image = project.thumbnail,
  className = '',
  eager = false,
}) {
  if (!image?.src) return <ProjectVisual kind={project.kind} className={className} />
  return (
    <div className={`project-image ${className}`}>
      <img
        src={image.src}
        alt={image.alt || `${project.title} screenshot`}
        width={image.width || 1600}
        height={image.height || 1000}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
