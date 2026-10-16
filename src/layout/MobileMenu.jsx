import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import useFocusTrap from '@/shared/hooks/useFocusTrap'
import { site } from '@/config/site'
import { navigation } from './navigation'
export default function MobileMenu({ close }) {
  const ref = useRef(null)
  useFocusTrap(ref, true, close)
  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background px-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <span className="logo">
          FOLIOBLOX<span className="text-accent-soft">®</span>
        </span>
        <button onClick={close} className="icon-button" aria-label="Close menu">
          <X />
        </button>
      </div>
      <nav className="my-auto py-6" aria-label="Mobile navigation">
        {[...navigation, { label: 'Contact', to: '/contact' }].map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.035 }}
          >
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={close}
              aria-label={item.label}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-white/15 py-3 text-3xl font-medium sm:text-4xl ${isActive ? 'text-accent-soft' : ''}`
              }
            >
              <span>
                <sup aria-hidden="true" className="mr-4 font-mono text-[10px] text-muted">
                  0{index + 1}
                </sup>
                {item.label}
              </span>
              <ArrowUpRight size={23} />
            </NavLink>
          </motion.div>
        ))}
      </nav>
      <p className="eyebrow text-muted">{site.location.toUpperCase()}</p>
    </motion.div>
  )
}
