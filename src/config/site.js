/**
 * Site-wide identity and links. Values come from `.env.local` (see `.env.example`)
 * so personal details are never hard-coded. Anything left empty is hidden in the
 * interface rather than replaced with a placeholder.
 */
const env = import.meta.env
const clean = (value) => (typeof value === 'string' ? value.trim() : '')
const trimSlash = (value) => clean(value).replace(/\/+$/, '')

export const site = {
  brand: 'FOLIOBLOX',
  ownerName: clean(env.VITE_OWNER_NAME),
  url: trimSlash(env.VITE_SITE_URL),
  email: clean(env.VITE_CONTACT_EMAIL),
  contactEndpoint: clean(env.VITE_CONTACT_ENDPOINT),
  location: clean(env.VITE_LOCATION) || 'Remote · Working worldwide',
  defaultDescription:
    'Folioblox is an independent full-stack developer building websites, web apps, AI integrations, and data tools with thoughtful code and clear interfaces.',
}

export const socialLinks = [
  { label: 'GitHub', href: clean(env.VITE_GITHUB_URL) },
  { label: 'LinkedIn', href: clean(env.VITE_LINKEDIN_URL) },
  { label: 'X', href: clean(env.VITE_X_URL) },
].filter((link) => /^https:\/\//.test(link.href))

export const resumeUrl = clean(env.VITE_RESUME_URL)
