import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../../config/site'
/** Find or create a head tag, then set one attribute on it. */
function setHeadTag(selector, create, attribute, value) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement(create.tag)
    Object.entries(create.attributes).forEach(([key, val]) => element.setAttribute(key, val))
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}
const meta = (key, value, attribute = 'name') =>
  setHeadTag(
    `meta[${attribute}="${key}"]`,
    { tag: 'meta', attributes: { [attribute]: key } },
    'content',
    value,
  )
/**
 * Per-route title, description, social and canonical metadata. Updates the tags
 * already in index.html instead of adding duplicates.
 */
export default function SEO({ title, description = site.defaultDescription, noindex = false }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = `${title} — Folioblox`
    document.title = fullTitle
    meta('description', description)
    meta('og:title', fullTitle, 'property')
    meta('og:description', description, 'property')
    meta('twitter:title', fullTitle)
    meta('twitter:description', description)
    if (noindex) meta('robots', 'noindex')
    else document.head.querySelector('meta[name="robots"]')?.remove()
    if (site.url) {
      const url = `${site.url}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`
      meta('og:url', url, 'property')
      setHeadTag(
        'link[rel="canonical"]',
        { tag: 'link', attributes: { rel: 'canonical' } },
        'href',
        url,
      )
    }
  }, [title, description, noindex, pathname])
  return null
}
