import { useEffect, useRef, useState } from 'react'
import { normaliseContact, validateContact } from '../lib/validation'
import { contactMode, enquiryMailto, sendEnquiry } from '../lib/delivery'
const TIMEOUT_MS = 15000
/** State for the contact form: idle → submitting → sent | opened-email, or an error. */
export default function useEnquiryForm(initialSubject = '') {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const controller = useRef(null)
  const formRef = useRef(null)
  useEffect(() => () => controller.current?.abort(), [])
  const update = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    if (status === 'error') setStatus('idle')
    setMessage('')
  }
  const showErrors = (next) => {
    setErrors(next)
    const first = Object.keys(next)[0]
    requestAnimationFrame(() => formRef.current?.querySelector(`[name="${first}"]`)?.focus())
  }
  const submit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return
    const details = normaliseContact(values)
    const invalid = validateContact(details)
    if (Object.keys(invalid).length) return showErrors(invalid)
    if (contactMode === 'email') {
      window.location.href = enquiryMailto(details)
      setStatus('opened-email')
      return
    }
    setStatus('submitting')
    setMessage('')
    controller.current = new AbortController()
    const timer = setTimeout(() => controller.current?.abort(), TIMEOUT_MS)
    try {
      await sendEnquiry(details, controller.current.signal)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      if (error.fieldErrors && Object.keys(error.fieldErrors).length) showErrors(error.fieldErrors)
      setMessage(
        error.name === 'AbortError'
          ? 'The request timed out. Your message is still here, so please try again.'
          : error.message,
      )
    } finally {
      clearTimeout(timer)
    }
  }
  const reset = () => {
    setValues({ name: '', email: '', subject: '', message: '', website: '' })
    setStatus('idle')
  }
  return { values, errors, status, message, formRef, update, submit, reset }
}
