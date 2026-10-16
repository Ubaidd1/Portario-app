import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { services } from '@/features/services/data/services'
import { navigation } from './navigation'
export default function DesktopNavigation() {
  const [expanded, setExpanded] = useState(false)
  const wrapper = useRef(null)
  const trigger = useRef(null)
  useEffect(() => {
    const close = (event) => {
      if (!wrapper.current?.contains(event.target)) setExpanded(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])
  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
      {navigation.map((item) =>
        item.label !== 'Services' ? (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ) : (
          <div
            ref={wrapper}
            key={item.to}
            className="flex items-center"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setExpanded(false)
                trigger.current?.focus()
              }
            }}
          >
            <NavLink
              to="/services"
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              Services
            </NavLink>
            <button
              ref={trigger}
              className="ml-1 flex h-11 w-7 items-center justify-center text-muted"
              aria-expanded={expanded}
              aria-controls="services-menu"
              aria-label="Explore services"
              onClick={() => setExpanded(!expanded)}
            >
              <ChevronDown size={13} className={expanded ? 'rotate-180' : ''} />
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  id="services-menu"
                  className="absolute inset-x-9 top-20 mx-auto max-w-5xl border border-white/15 bg-surface p-8 shadow-2xl"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="grid grid-cols-[1fr_2fr] gap-12">
                    <div>
                      <p className="eyebrow text-accent-soft">PURPOSE BEFORE TECHNOLOGY</p>
                      <p className="mt-4 text-3xl leading-tight tracking-tight">
                        The right expertise.
                        <br />
                        <span className="text-muted">At the right moment.</span>
                      </p>
                      <Link
                        to="/services"
                        onClick={() => setExpanded(false)}
                        className="mt-6 inline-flex gap-4 text-sm"
                      >
                        Explore all services <ArrowUpRight size={17} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8">
                      {services.map((service, index) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          onClick={() => setExpanded(false)}
                          className="group flex items-center gap-3 border-b border-white/10 py-4 text-sm hover:text-accent-soft"
                        >
                          <span className="font-mono text-[9px] text-muted">0{index + 1}</span>
                          {service.name}
                          <ArrowUpRight size={13} className="ml-auto" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ),
      )}
    </nav>
  )
}
