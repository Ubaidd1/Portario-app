/**
 * Contact-form rules shared by the browser form and the `api/contact.js` function,
 * so both sides validate identically. Keep this file free of browser or Node APIs.
 */
export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normaliseContact(input = {}) {
  const text = (value) => (typeof value === 'string' ? value.trim() : '')
  return {
    name: text(input.name),
    email: text(input.email).toLowerCase(),
    // Subjects become email headers: collapse any line breaks.
    subject: text(input.subject).replace(/[\r\n]+/g, ' '),
    message: text(input.message),
    website: text(input.website),
  }
}

export function validateContact(values) {
  const { name, email, subject, message } = contactLimits
  const errors = {}
  if (values.name.length < name.min) errors.name = 'Please enter your name.'
  else if (values.name.length > name.max)
    errors.name = `Please keep your name under ${name.max} characters.`
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > email.max)
    errors.email = 'Please enter a valid email address.'
  if (values.subject.length < subject.min) errors.subject = 'Please add a short subject.'
  else if (values.subject.length > subject.max)
    errors.subject = `Please keep the subject under ${subject.max} characters.`
  if (values.message.length < message.min)
    errors.message = `Please share at least ${message.min} characters about your project.`
  else if (values.message.length > message.max)
    errors.message = `Please keep your message under ${message.max} characters.`
  return errors
}
