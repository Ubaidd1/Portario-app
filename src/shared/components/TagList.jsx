/** A wrapping row of small bordered tags, e.g. a project's technologies. */
export default function TagList({ items, label = 'Technologies', className = '' }) {
  if (!items?.length) return null
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li className="tag" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
