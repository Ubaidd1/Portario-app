import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import useScroll from '@/shared/hooks/useScroll'
import Container from '@/shared/components/Container'
import Button from '@/shared/components/Button'
import MobileMenu from './MobileMenu'
import DesktopNavigation from './DesktopNavigation'
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
            FOLIOBLOX<span className="text-accent-soft">®</span>
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
