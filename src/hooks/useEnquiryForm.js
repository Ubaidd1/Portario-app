import { useEffect, useRef, useState } from 'react'
import { submitEnquiry, validateEnquiry } from '../utils/contact'
export default function useEnquiryForm(initialService = '') {
  const [values, setValues] = useState({
    goal: '',
    service: initialService,
    description: '',
    firstName: '',
    lastName: '',
    email: '',
    consent: false,
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const controller = useRef(null)
  const busy = useRef(false)
  const formRef = useRef(null)
  useEffect(() => () => controller.current?.abort(), [])
  const update = (event) => {
    const { name, type, value, checked } = event.target
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setMessage('')
  }
  const fields = [
    ['goal'],
    ['service'],
    ['description'],
    ['firstName', 'lastName', 'email'],
    ['consent'],
  ]
  const validate = () => {
    const all = validateEnquiry(values)
    if (!values.goal) all.goal = 'Choose a starting point for the conversation.'
    const next = Object.fromEntries(
      Object.entries(all).filter(([name]) => fields[step].includes(name)),
    )
    setErrors(next)
    if (Object.keys(next).length) {
      const name = Object.keys(next)[0]
      requestAnimationFrame(() => formRef.current?.querySelector(`[name="${name}"]`)?.focus())
      return false
    }
    return true
  }
  const back = () => {
    setStep((previous) => Math.max(0, previous - 1))
    setErrors({})
    setMessage('')
  }
  const goTo = (value) => {
    if (!busy.current && value < step) {
      setStep(value)
      setErrors({})
      setMessage('')
    }
  }
  const submit = async (event) => {
    event.preventDefault()
    if (busy.current || !validate()) return
    if (step < 4) {
      setStep((previous) => previous + 1)
      return
    }
    const allErrors = validateEnquiry(values)
    if (Object.keys(allErrors).length) {
      const target = fields.findIndex((names) => names.some((name) => allErrors[name]))
      setStep(Math.max(0, target))
      setErrors(allErrors)
      return
    }
    busy.current = true
    setStatus('loading')
    setMessage('')
    controller.current = new AbortController()
    const timer = setTimeout(() => controller.current?.abort(), 15000)
    try {
      const result = await submitEnquiry(
        Object.fromEntries(
          Object.entries(values).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.trim() : value,
          ]),
        ),
        controller.current.signal,
      )
      setStatus(result.status)
      setStep(5)
    } catch (error) {
      setStatus('error')
      setMessage(
        error.name === 'AbortError'
          ? 'The request was interrupted or timed out. Your details are still here; please try again.'
          : error.message,
      )
    } finally {
      clearTimeout(timer)
      busy.current = false
    }
  }
  const edit = () => {
    setStep(4)
    setStatus('idle')
  }
  return { values, step, errors, status, message, formRef, update, back, goTo, submit, edit }
}
