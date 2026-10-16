import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Button({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  ...props
}) {
  const destination = to || href
  const internal = destination?.startsWith('/')
  const Tag = internal ? Link : destination ? 'a' : 'button'
  const target = internal
    ? { to: destination }
    : destination
      ? { href: destination }
      : { type: 'button' }
  return (
    <Tag
      {...target}
      className={`button button-${variant} group ${className}`}
      data-cursor="cta"
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight
        size={17}
        className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Tag>
  )
}
