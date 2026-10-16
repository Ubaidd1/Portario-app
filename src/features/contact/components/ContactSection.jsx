import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check, LoaderCircle, Mail } from 'lucide-react'
import { services } from '@/features/services/data/services'
import { site } from '@/config/site'
import Container from '@/shared/components/Container'
import DigitalCore from '@/shared/visuals/DigitalCore'
import { contactMode } from '../lib/delivery'
import useEnquiryForm from '../hooks/useEnquiryForm'
import EnquiryFields from './EnquiryFields'
function EmailLink({ className = '' }) {
  if (!site.email) return null
  return (
    <a
      href={`mailto:${site.email}`}
      className={`inline-flex min-h-11 items-center gap-2 font-medium text-accent-deep underline underline-offset-4 ${className}`}
    >
      <Mail size={16} aria-hidden="true" />
      {site.email}
    </a>
  )
}
function Confirmation({ status, reset }) {
  const heading = useRef(null)
  useEffect(() => heading.current?.focus(), [])
  const sent = status === 'sent'
  return (
    <div role="status" className="border border-black/15 bg-white p-7 sm:p-10">
      <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
        <Check aria-hidden="true" />
      </span>
      <h3 ref={heading} tabIndex={-1} className="text-3xl tracking-tight outline-none">
        {sent ? 'Thanks — your message has been sent.' : 'Your email app should now be open.'}
      </h3>
      <p className="mt-5 text-sm leading-7 text-ink-muted">
        {sent
          ? 'I read every enquiry and will reply to the email address you provided.'
          : 'Your message is ready to send from your own email app. If nothing opened, you can email me directly:'}
      </p>
      {!sent && <EmailLink className="mt-3" />}
      <button className="mt-6 block min-h-11 text-sm underline underline-offset-4" onClick={reset}>
        Write another message
      </button>
    </div>
  )
}
export default function ContactSection() {
  const [params] = useSearchParams()
  const service = services.find((item) => item.name === params.get('service'))
  const form = useEnquiryForm(service ? `Project enquiry: ${service.name}` : '')
  const { values, errors, status, message, update, submit, reset, formRef } = form
  const submitting = status === 'submitting'
  return (
    <section id="contact" className="contact-section section-space">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-accent-deep">A CONVERSATION, NOT A COMMITMENT</p>
            <h2 className="section-title mt-6">
              Your idea.
              <br />
              Our first
              <br />
              conversation.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-ink-muted">
              Tell me a little about what you’re planning. I’ll reply with questions, a suggested
              approach, and a practical next step.
            </p>
            {contactMode === 'endpoint' && site.email && (
              <p className="mt-6 text-sm text-ink-muted">
                Prefer email? <EmailLink />
              </p>
            )}
            <div className="mt-8 hidden h-80 overflow-hidden bg-background lg:block">
              <DigitalCore variant="contact" />
            </div>
            <p className="mt-7 text-sm text-ink-muted">{site.location}</p>
          </div>
          <div className="min-w-0">
            {status === 'sent' || status === 'opened-email' ? (
              <Confirmation status={status} reset={reset} />
            ) : contactMode === 'unavailable' ? (
              <div className="border border-black/15 bg-white p-7 sm:p-10">
                <h3 className="text-3xl tracking-tight">Online enquiries are paused.</h3>
                <p className="mt-5 text-sm leading-7 text-ink-muted">
                  The contact form isn’t accepting messages at the moment. Please check back soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={submit} aria-busy={submitting}>
                <h3 className="mb-8 text-3xl tracking-tight">Tell me about your project.</h3>
                <EnquiryFields
                  values={values}
                  errors={errors}
                  update={update}
                  disabled={submitting}
                />
                {message && (
                  <p role="alert" className="mt-6 text-sm font-medium text-danger">
                    {message}
                    {site.email && (
                      <>
                        {' '}
                        You can also email <EmailLink />.
                      </>
                    )}
                  </p>
                )}
                <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-black/15 pt-6">
                  <p className="max-w-xs text-xs leading-6 text-ink-muted">
                    {contactMode === 'endpoint'
                      ? 'Your details are only used to reply to this enquiry.'
                      : 'This opens your email app with the message ready to send.'}
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-primary disabled:opacity-60"
                  >
                    <span className="relative z-10">
                      {submitting
                        ? 'Sending…'
                        : contactMode === 'endpoint'
                          ? 'Send message'
                          : 'Continue in email app'}
                    </span>
                    {submitting ? (
                      <LoaderCircle
                        size={17}
                        className="relative z-10 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight size={17} className="relative z-10" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
