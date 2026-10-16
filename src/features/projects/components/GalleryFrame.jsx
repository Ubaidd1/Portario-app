import ProjectVisual from './ProjectVisual'
export default function GalleryFrame({ project, item, index }) {
  return (
    <div className={`gallery-frame ${item.src ? '' : `gallery-view-${index}`}`}>
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt || item.label}
          width={item.width || 1600}
          height={item.height || 1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <ProjectVisual kind={project.kind} className="!h-full !min-h-0" />
      )}
      {!item.src && (
        <span className="absolute bottom-4 left-4 rounded bg-background/85 px-3 py-2 font-mono text-[11px] text-white">
          CONCEPT / {item.label}
        </span>
      )}
    </div>
  )
}
