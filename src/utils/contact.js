/** Connect VITE_CONTACT_ENDPOINT to your own HTTPS enquiry API. */
export async function submitEnquiry(details, signal) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) return { status: 'draft', details }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
    signal,
  })
  if (!response.ok) throw new Error('Your enquiry could not be sent. Please try again in a moment.')
  return { status: 'sent' }
}
export function validateEnquiry(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Please enter your last name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (!values.service) errors.service = 'Choose a service to get started.'
  if (values.description.trim().length < 20)
    errors.description = 'Please share at least 20 characters about your project.'
  if (!values.consent) errors.consent = 'Please agree to share your details for this enquiry.'
  return errors
}
export function downloadEnquiry(details) {
  const content = `PROJECT ENQUIRY — NOT SENT\n\nGoal: ${details.goal || 'Project enquiry'}\nName: ${details.firstName} ${details.lastName}\nEmail: ${details.email}\nService: ${details.service}\n\n${details.description}\n\nConsent to share these details: Yes\n`
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'folioblox-project-enquiry.txt'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
