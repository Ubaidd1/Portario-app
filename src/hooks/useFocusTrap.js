import { useEffect } from 'react'
export default function useFocusTrap(ref, open, close) {
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const elements = () => [
      ...ref.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]',
      ),
    ]
    elements()[0]?.focus()
    const key = (event) => {
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab') return
      const list = elements(),
        first = list[0],
        last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', key)
      previous?.focus()
    }
  }, [ref, open, close])
}
