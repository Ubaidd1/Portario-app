import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, Download, LoaderCircle } from 'lucide-react'
import { contactServices, enquirySteps } from '../../data/contact'
import { downloadEnquiry } from '../../utils/contact'
import useEnquiryForm from '../../hooks/useEnquiryForm'
import EnquiryFields from '../contact/EnquiryFields'
import Container from '../common/Container'
import DigitalCore from '../visuals/DigitalCore'
const titles = [
  'What are you looking for?',
  'The right starting point.',
  'Tell me about your idea.',
  'How can I reach you?',
  'A final look, together.',
]
export default function Contact() {
  const [params] = useSearchParams()
  const selected = params.get('service') || ''
  const form = useEnquiryForm(
    [...contactServices, 'Python & Data Science'].includes(selected) ? selected : '',
  )
  const { step, values, errors, status, message, update, goTo, back, submit, edit, formRef } = form
  const heading = useRef(null)
  const initial = useRef(true)
  useEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    heading.current?.focus({ preventScroll: true })
  }, [step])
  return (
    <section id="contact" className="contact-section section-space">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-red-700">A CONVERSATION, NOT A COMMITMENT</p>
            <h2 className="section-title mt-6">
              Your idea.
              <br />
              Our first
              <br />
              conversation.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-black/60">
              A focused, 30-minute discovery call starts with a little context. We’ll explore your
              goals and outline a practical next step.
            </p>
            <div className="mt-8 hidden h-80 overflow-hidden bg-background lg:block">
              <DigitalCore variant="contact" />
            </div>
            <p className="mt-7 text-xs text-black/60">Remote · Working worldwide</p>
          </div>
          <div className="min-w-0">
            <ol
              className="mb-10 flex justify-between border-b border-black/20 pb-6"
              aria-label="Enquiry progress"
            >
              {enquirySteps.map((label, index) => (
                <li key={label} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    disabled={index >= step || status === 'loading'}
                    aria-current={index === Math.min(step, 4) ? 'step' : undefined}
                    className={`flex min-h-11 flex-col gap-2 text-left disabled:cursor-default ${index <= step ? 'text-red-700' : 'text-black/40'}`}
                  >
                    <span className="font-mono text-sm">
                      {index < step ? '✓' : `0${index + 1}`}
                    </span>
                    <span className="hidden text-[10px] sm:block">{label}</span>
                  </button>
                </li>
              ))}
            </ol>
            {step === 5 ? (
              <div role="status" className="border border-black/20 p-7 sm:p-10">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Check />
                </span>
                <h3 ref={heading} tabIndex={-1} className="text-3xl tracking-tight outline-none">
                  {status === 'sent' ? 'Your enquiry is on its way.' : 'Your enquiry is ready.'}
                </h3>
                <p className="mt-5 text-sm leading-7 text-black/60">
                  {status === 'sent'
                    ? 'Thank you for sharing your idea. Your project details have been submitted successfully.'
                    : 'Your details have been checked, but not sent. Online enquiries are not connected yet. Download a copy to keep your project brief.'}
                </p>
                {status === 'draft' && (
                  <button
                    className="button button-dark mt-7"
                    onClick={() => downloadEnquiry(values)}
                  >
                    Download your enquiry <Download size={17} />
                  </button>
                )}
                <button
                  className="mt-6 block min-h-11 text-sm underline underline-offset-4"
                  onClick={edit}
                >
                  Edit your enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={submit} aria-busy={status === 'loading'}>
                <h3
                  ref={heading}
                  tabIndex={-1}
                  className="mb-8 text-3xl tracking-tight outline-none"
                >
                  {titles[step]}
                </h3>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.16 }}
                    className="min-h-[280px]"
                  >
                    <EnquiryFields
                      step={step}
                      values={values}
                      errors={errors}
                      update={update}
                      goTo={goTo}
                    />
                  </motion.div>
                </AnimatePresence>
                {message && (
                  <p role="alert" className="mt-5 text-sm text-red-700">
                    {message}
                  </p>
                )}
                <div className="mt-9 flex items-center justify-between gap-5 border-t border-black/20 pt-6">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0 || status === 'loading'}
                    className="inline-flex min-h-11 items-center gap-2 text-sm disabled:opacity-30 disabled:cursor-default"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="button button-dark disabled:opacity-60"
                  >
                    {status === 'loading'
                      ? 'Preparing…'
                      : step === 4
                        ? 'Submit enquiry'
                        : 'Continue'}
                    {status === 'loading' ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                </div>
                <p className="mt-6 text-[11px] leading-6 text-black/55">
                  {import.meta.env.VITE_CONTACT_ENDPOINT
                    ? 'Your details are used to respond to this project enquiry.'
                    : 'Enquiries are currently available as downloadable drafts. Nothing is sent or stored online.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
