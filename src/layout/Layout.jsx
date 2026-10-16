import { motion, useScroll } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
export default function Layout({ children }) {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="global-atmosphere" aria-hidden="true" />
      <motion.div
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      {children}
      <Footer />
      <CustomCursor />
    </>
  )
}
