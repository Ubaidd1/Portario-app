import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { services } from '../../data/services'
import useScroll from '../../hooks/useScroll'
import useFocusTrap from '../../hooks/useFocusTrap'
import Container from '../common/Container'
import Button from '../common/Button'
function MobileMenu({ close }) {
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
          FOLIOBLOX<span className="text-accent">®</span>
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
                `flex items-center justify-between border-b border-white/15 py-3 text-3xl font-medium sm:text-4xl ${isActive ? 'text-accent' : ''}`
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
      <p className="eyebrow text-muted">REMOTE · WORKING WORLDWIDE</p>
    </motion.div>
  )
}
function DesktopNavigation() {
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
                  className="absolute inset-x-9 top-20 mx-auto max-w-5xl border border-white/15 bg-[#171717] p-8 shadow-2xl"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="grid grid-cols-[1fr_2fr] gap-12">
                    <div>
                      <p className="eyebrow text-accent">PURPOSE BEFORE TECHNOLOGY</p>
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
                          className="group flex items-center gap-3 border-b border-white/10 py-4 text-sm hover:text-accent"
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
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const scrolled = useScroll()
  const { pathname } = useLocation()
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 1024) close()
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [close])
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-white/10 bg-background/95 backdrop-blur-xl' : 'border-transparent bg-background/40'}`}
      >
        <Container className="relative flex h-22 items-center justify-between gap-5">
          <Link to="/" aria-label="Folioblox home" className="logo">
            FOLIOBLOX<span className="text-accent">®</span>
          </Link>
          <DesktopNavigation key={pathname} />
          <Button to="/contact" className="hidden lg:inline-flex">
            Let’s Talk
          </Button>
          <button
            className="icon-button lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </Container>
      </header>
      <AnimatePresence>{open && <MobileMenu close={close} />}</AnimatePresence>
    </>
  )
}
