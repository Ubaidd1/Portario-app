import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
import useFocusTrap from '../../hooks/useFocusTrap'
import SliderControls from '../common/SliderControls'
import ProjectVisual from '../visuals/ProjectVisual'
/** Real screenshots when the project has them, otherwise crops of the concept visual. */
const galleryItems = (project) =>
  project.images.length
    ? project.images.map((image) => ({ ...image, label: image.caption || image.alt }))
    : (project.gallery || []).map((label) => ({ label }))
function GalleryFrame({ project, item, index }) {
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
function Lightbox({ project, items, initialIndex, close }) {
  const [index, setIndex] = useState(initialIndex)
  const ref = useRef(null)
  useFocusTrap(ref, true, close)
  const change = (value) => setIndex((value + items.length) % items.length)
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      className="fixed inset-0 z-[70] flex flex-col bg-background/98 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          change(index + 1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          change(index - 1)
        }
      }}
    >
      <div className="flex items-center justify-between gap-5">
        <p className="eyebrow text-muted">{project.title} / GALLERY</p>
        <button className="icon-button" onClick={close} aria-label="Close gallery">
          <X size={20} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="w-full max-w-5xl"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            style={{ touchAction: 'pan-y' }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 45) change(index + (info.offset.x < 0 ? 1 : -1))
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <GalleryFrame project={project} item={items[index]} index={index} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-5">
        <p className="text-sm text-muted" aria-live="polite">
          {items[index].label}
        </p>
        <SliderControls
          index={index}
          total={items.length}
          onChange={change}
          label="gallery image"
        />
      </div>
    </motion.div>
  )
}
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
            <Lightbox project={project} items={items} initialIndex={selected} close={close} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
