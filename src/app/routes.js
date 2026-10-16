import { lazy } from 'react'
import HomePage from '@/features/home/pages/HomePage'

/**
 * The route table. Home ships in the main bundle for a fast first paint; every
 * other page is its own lazily loaded chunk. Keep `vite.config.js` (sitemap) in
 * step when adding a public route.
 */
export const routes = [
  { path: '/', Component: HomePage },
  { path: '/about', Component: lazy(() => import('@/features/about/pages/AboutPage')) },
  { path: '/services', Component: lazy(() => import('@/features/services/pages/ServicesPage')) },
  {
    path: '/services/:slug',
    Component: lazy(() => import('@/features/services/pages/ServiceDetailPage')),
  },
  { path: '/projects', Component: lazy(() => import('@/features/projects/pages/ProjectsPage')) },
  {
    path: '/projects/:slug',
    Component: lazy(() => import('@/features/projects/pages/ProjectDetailPage')),
  },
  { path: '/process', Component: lazy(() => import('@/features/process/pages/ProcessPage')) },
  {
    path: '/experience',
    Component: lazy(() => import('@/features/experience/pages/ExperiencePage')),
  },
  { path: '/contact', Component: lazy(() => import('@/features/contact/pages/ContactPage')) },
  { path: '*', Component: lazy(() => import('@/shared/pages/NotFoundPage')) },
]
