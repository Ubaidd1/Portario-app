import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Layout from '@/layout/Layout'
import PageTransition from '@/shared/animations/PageTransition'
import { routes } from './routes'
function RouteFallback() {
  return (
    // Fills the viewport so the footer doesn't jump when the page chunk arrives.
    <div className="flex min-h-svh items-center justify-center" role="status">
      <p className="eyebrow text-muted">
        PREPARING THE NEXT CHAPTER<span className="ml-3 text-accent-soft">…</span>
      </p>
    </div>
  )
}
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
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
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
