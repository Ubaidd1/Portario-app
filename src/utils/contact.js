import { site } from '../config/site'

export class ContactError extends Error {
  constructor(message, fieldErrors = {}) {
    super(message)
    this.fieldErrors = fieldErrors
  }
}

/** How enquiries are delivered: a configured endpoint, the visitor's email app, or neither. */
export const contactMode = site.contactEndpoint ? 'endpoint' : site.email ? 'email' : 'unavailable'

/** POST the enquiry to VITE_CONTACT_ENDPOINT. Resolves only when the server accepted it. */
export async function sendEnquiry(details, signal) {
  let response
  try {
    response = await fetch(site.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(details),
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ContactError('We couldn’t reach the server. Check your connection and try again.')
  }
  if (response.ok) return
  const body = await response.json().catch(() => ({}))
  if (response.status === 422 && body.errors)
    throw new ContactError('Please check the highlighted fields.', body.errors)
  if (response.status === 429)
    throw new ContactError('Too many messages in a short time. Please try again in a few minutes.')
  throw new ContactError('Your message couldn’t be sent right now. Please try again shortly.')
}

/** A mailto: link carrying the enquiry, for when no endpoint is configured. */
export function enquiryMailto({ name, email, subject, message }) {
  const body = `${message}\n\n— ${name}\n${email}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
