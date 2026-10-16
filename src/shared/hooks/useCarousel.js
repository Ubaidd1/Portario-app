import { useCallback, useState } from 'react'
/**
 * Index state for a looping carousel, plus keyboard and drag handlers.
 * `go` accepts an index or an updater function and always wraps into range.
 */
export default function useCarousel(total, { initial = 0, dragThreshold = 45 } = {}) {
  const [index, setIndex] = useState(initial)
  const go = useCallback(
    (value) =>
      setIndex((current) => {
        const next = typeof value === 'function' ? value(current) : value
        return ((next % total) + total) % total
      }),
    [total],
  )
  const next = useCallback(() => go((current) => current + 1), [go])
  const previous = useCallback(() => go((current) => current - 1), [go])
  /** Spread on the focusable carousel region: ← / → move between slides. */
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    }
  }
  /** Pass to a Framer Motion `onDragEnd`: a long enough swipe changes slide. */
  const onDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > dragThreshold) (info.offset.x < 0 ? next : previous)()
  }
  return { index, go, next, previous, onKeyDown, onDragEnd }
}
