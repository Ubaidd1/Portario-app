import { AnimatePresence, motion } from 'framer-motion'
/**
 * One row of a disclosure list: a heading button that toggles an animated panel.
 * The parent owns which row is open, so lists can keep "one open at a time".
 * IDs follow `${idPrefix}-button-${index}` / `${idPrefix}-panel-${index}`.
 */
export default function AccordionItem({
  idPrefix,
  index,
  open,
  onToggle,
  onHover,
  header,
  children,
  className = '',
  buttonClassName = '',
  transition,
}) {
  const buttonId = `${idPrefix}-button-${index}`
  const panelId = `${idPrefix}-panel-${index}`
  return (
    <article className={className}>
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onPointerEnter={
            onHover
              ? (event) => {
                  // Hover-to-open is for mouse users only; touch taps would fight the click.
                  if (event.pointerType === 'mouse') onHover()
                }
              : undefined
          }
          className={buttonClassName}
        >
          {header}
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
