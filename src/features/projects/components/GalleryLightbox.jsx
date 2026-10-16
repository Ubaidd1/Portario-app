import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import useFocusTrap from '@/shared/hooks/useFocusTrap'
import SliderControls from '@/shared/components/SliderControls'
import useCarousel from '@/shared/hooks/useCarousel'
import GalleryFrame from './GalleryFrame'
export default function GalleryLightbox({ project, items, initialIndex, close }) {
  const { index, go, onKeyDown, onDragEnd } = useCarousel(items.length, {
    initial: initialIndex,
  })
  const ref = useRef(null)
  useFocusTrap(ref, true, close)
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
      onKeyDown={onKeyDown}
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
            onDragEnd={onDragEnd}
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
        <SliderControls index={index} total={items.length} onChange={go} label="gallery image" />
      </div>
    </motion.div>
  )
}
