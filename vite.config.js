import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { services } from './src/features/services/data/services.js'
import { projects } from './src/features/projects/data/projects.js'

/** Public routes for the sitemap, derived from the same data the router renders. */
function publicRoutes() {
  return [
    '/',
    '/about',
    '/services',
    ...services.map((service) => `/services/${service.slug}`),
    '/projects',
    ...projects.map((project) => `/projects/${project.slug}`),
    '/process',
    '/experience',
    '/contact',
  ]
}

/**
 * Adds absolute URL metadata to index.html and emits robots.txt / sitemap.xml.
 * Without VITE_SITE_URL there is no trustworthy origin, so canonical tags and the
 * sitemap are omitted rather than guessed.
 */
function seo(siteUrl) {
  const image = `${siteUrl}/social-preview.png`
  return {
    name: 'folioblox-seo',
    transformIndexHtml(html) {
      const tags = siteUrl
        ? [
            `<link rel="canonical" href="${siteUrl}/" />`,
            `<meta property="og:url" content="${siteUrl}/" />`,
            `<meta property="og:image" content="${image}" />`,
            `<meta name="twitter:image" content="${image}" />`,
          ]
        : [
            '<meta property="og:image" content="/social-preview.png" />',
            '<meta name="twitter:image" content="/social-preview.png" />',
          ]
      return html.replace('<!-- seo:absolute -->', tags.join('\n    '))
    },
    generateBundle() {
      if (!siteUrl) this.warn('VITE_SITE_URL is not set: skipping sitemap.xml and canonical URLs.')
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
      if (!siteUrl) return
      const urls = publicRoutes()
        .map((route) => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '')
  return {
    plugins: [react(), tailwindcss(), seo(siteUrl)],
    // `@/…` always points at src/, so cross-feature imports never need ../../
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  }
})
