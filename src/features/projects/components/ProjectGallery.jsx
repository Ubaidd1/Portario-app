import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import GalleryLightbox from './GalleryLightbox'
import GalleryFrame from './GalleryFrame'
/** Real screenshots when the project has them, otherwise crops of the concept visual. */
const galleryItems = (project) =>
  project.images.length
    ? project.images.map((image) => ({ ...image, label: image.caption || image.alt }))
    : (project.gallery || []).map((label) => ({ label }))
export default function ProjectGallery({ project }) {
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])
  const items = galleryItems(project)
  if (!items.length) return null
  return (
    <>
      <div className="gallery-strip mt-10">
        {items.map((item, index) => (
          <button
            key={item.label}
            className="gallery-item group text-left"
            onClick={() => setSelected(index)}
            aria-label={`${item.label}, open in gallery`}
            data-cursor="image"
          >
            <GalleryFrame project={project} item={item} index={index} />
            <span className="mt-4 flex items-center justify-between text-sm">
              {item.label}
              <Maximize2 size={17} className="text-accent-soft" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      {createPortal(
        <AnimatePresence>
          {selected !== null && (
            <GalleryLightbox
              project={project}
              items={items}
              initialIndex={selected}
              close={close}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
