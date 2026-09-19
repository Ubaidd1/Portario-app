import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Layout from './components/layout/Layout'
import PageTransition from './components/animations/PageTransition'
import Home from './pages/Home'
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Process = lazy(() => import('./pages/Process'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
function ApplicationRoutes() {
  const location = useLocation()
  const navigationType = useNavigationType()
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition
          key={location.pathname}
          path={location.pathname}
          hash={location.hash}
          navigationType={navigationType}
        >
          <Suspense
            fallback={
              <div className="flex min-h-[75vh] items-center justify-center" role="status">
                <p className="eyebrow text-muted">
                  PREPARING THE NEXT CHAPTER<span className="ml-3 text-accent">…</span>
                </p>
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </AnimatePresence>
    </Layout>
  )
}
export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ApplicationRoutes />
      </MotionConfig>
    </BrowserRouter>
  )
}
