/**
 * Contact-form endpoint (Vercel Node.js function, served at /api/contact).
 *
 * Validates the enquiry with the same rules as the browser, drops honeypot spam,
 * applies a best-effort per-IP rate limit, and delivers the message by email
 * through Resend's HTTP API. All secrets stay server-side.
 *
 * Environment (set in the Vercel project, never as VITE_ variables):
 *   RESEND_API_KEY          Resend API key
 *   CONTACT_TO_EMAIL        inbox that receives enquiries
 *   CONTACT_FROM_EMAIL      verified sender, e.g. "Folioblox <hello@your-domain.com>"
 *   CONTACT_ALLOWED_ORIGIN  optional, e.g. https://www.your-domain.com
 */
import { normaliseContact, validateContact } from '../src/utils/contactValidation.js'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Per-instance memory: resets on cold start. Use a shared store (e.g. Upstash) for strict limits.
const recent = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const hits = (recent.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > MAX_PER_WINDOW
}

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).json(body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { error: 'Method not allowed.' })
  }
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_ALLOWED_ORIGIN } =
    process.env
  if (CONTACT_ALLOWED_ORIGIN && req.headers.origin !== CONTACT_ALLOWED_ORIGIN)
    return send(res, 403, { error: 'Origin not allowed.' })
  if (!req.headers['content-type']?.includes('application/json'))
    return send(res, 415, { error: 'Expected JSON.' })

  const ip =
    String(req.headers['x-forwarded-for'] || '')
      .split(',')[0]
      .trim() || 'unknown'
  if (rateLimited(ip)) return send(res, 429, { error: 'Too many requests.' })

  const details = normaliseContact(typeof req.body === 'object' && req.body ? req.body : {})
  // Honeypot filled in: accept quietly so bots learn nothing, but deliver nothing.
  if (details.website) return send(res, 200, { ok: true })
  const errors = validateContact(details)
  if (Object.keys(errors).length) return send(res, 422, { error: 'Invalid enquiry.', errors })

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error(
      'Contact endpoint is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.',
    )
    return send(res, 503, { error: 'Enquiries are temporarily unavailable.' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: details.email,
        subject: `Portfolio enquiry: ${details.subject}`,
        text: `From: ${details.name} <${details.email}>\nSubject: ${details.subject}\n\n${details.message}\n`,
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) {
      console.error('Resend rejected the enquiry', response.status, await response.text())
      return send(res, 502, { error: 'The message could not be delivered.' })
    }
  } catch (error) {
    console.error('Contact delivery failed', error)
    return send(res, 502, { error: 'The message could not be delivered.' })
  }
  return send(res, 200, { ok: true })
}
