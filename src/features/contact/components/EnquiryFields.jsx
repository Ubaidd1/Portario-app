import { contactLimits } from '../lib/validation'
function Field({ label, name, error, hint, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-2 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
export default function EnquiryFields({ values, errors, update, disabled }) {
  const props = (name, hint) => ({
    id: name,
    name,
    value: values[name],
    onChange: update,
    required: true,
    disabled,
    maxLength: contactLimits[name].max,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined,
    className: 'form-input',
  })
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input {...props('name')} autoComplete="name" />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input {...props('email')} type="email" autoComplete="email" inputMode="email" />
        </Field>
      </div>
      <Field label="Subject" name="subject" error={errors.subject}>
        <input {...props('subject')} placeholder="e.g. A new website for my studio" />
      </Field>
      <Field
        label="Message"
        name="message"
        error={errors.message}
        hint={`Goals, timing and any links that help. ${values.message.length}/${contactLimits.message.max}`}
      >
        <textarea
          {...props('message', true)}
          rows={7}
          placeholder="What would you like to build or improve?"
        />
      </Field>
      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update}
        />
      </div>
    </div>
  )
}
