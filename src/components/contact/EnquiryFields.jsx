import { contactServices, enquiryGoals } from '../../data/contact'
function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block text-xs font-medium">
        {label}{' '}
        <span aria-hidden="true" className="text-red-700">
          *
        </span>
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
export default function EnquiryFields({ step, values, errors, update, goTo }) {
  const props = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: update,
    required: true,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: 'form-input',
  })
  if (step === 0)
    return (
      <fieldset>
        <legend className="sr-only">What are you looking for?</legend>
        <div className="grid gap-3">
          {enquiryGoals.map((goal, index) => (
            <label key={goal} className={`choice-option ${values.goal === goal ? 'selected' : ''}`}>
              <span className="font-mono text-[10px] text-black/50">0{index + 1}</span>
              <span className="flex-1 text-base tracking-tight">{goal}</span>
              <input
                type="radio"
                name="goal"
                value={goal}
                checked={values.goal === goal}
                onChange={update}
                aria-describedby={errors.goal ? 'goal-error' : undefined}
                className="h-4 w-4 accent-red-700"
              />
            </label>
          ))}
        </div>
        {errors.goal && (
          <p id="goal-error" className="mt-3 text-xs text-red-700">
            {errors.goal}
          </p>
        )}
      </fieldset>
    )
  if (step === 1)
    return (
      <Field name="service" label="What service do you need?" error={errors.service}>
        <select {...props('service')}>
          <option value="" disabled>
            Choose your starting point
          </option>
          {[...contactServices, 'Python & Data Science'].map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
        <p className="mt-5 text-sm leading-7 text-black/55">
          You don’t need to have everything figured out. Choose Discovery Call if you’d like to
          explore the options together.
        </p>
      </Field>
    )
  if (step === 2)
    return (
      <Field name="description" label="Tell me about your project" error={errors.description}>
        <textarea
          {...props('description')}
          rows={7}
          maxLength={5000}
          minLength={20}
          placeholder="What would you like to build or improve? Share your goals, context, and any timing considerations."
        />
        <div className="mt-3 flex justify-between gap-3 text-[11px] text-black/55">
          <span>A little context goes a long way. Minimum 20 characters.</span>
          <span>{values.description.length}/5000</span>
        </div>
      </Field>
    )
  if (step === 3)
    return (
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="First Name" name="firstName" error={errors.firstName}>
            <input
              {...props('firstName')}
              autoComplete="given-name"
              maxLength={80}
              placeholder="Alex"
            />
          </Field>
          <Field label="Last Name" name="lastName" error={errors.lastName}>
            <input
              {...props('lastName')}
              autoComplete="family-name"
              maxLength={80}
              placeholder="Morgan"
            />
          </Field>
        </div>
        <Field label="Email Address" name="email" error={errors.email}>
          <input
            {...props('email')}
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
          />
        </Field>
        <p className="text-xs leading-6 text-black/55">
          These details are only for this project enquiry.
        </p>
      </div>
    )
  return (
    <div>
      <dl className="space-y-5">
        {[
          ['Your goal', values.goal, 0],
          ['Service', values.service, 1],
          ['Project', values.description, 2],
          ['Contact', `${values.firstName} ${values.lastName} · ${values.email}`, 3],
        ].map(([label, value, target]) => (
          <div key={label} className="border-b border-black/15 pb-5">
            <dt className="flex items-center justify-between text-xs text-black/55">
              {label}
              <button
                type="button"
                className="min-h-8 underline underline-offset-4 text-black"
                onClick={() => goTo(target)}
                aria-label={`Edit ${label.toLowerCase()}`}
              >
                Edit
              </button>
            </dt>
            <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-7">{value}</dd>
          </div>
        ))}
      </dl>
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-6">
        <input
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={update}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-red-700"
        />
        I agree to share these details for this project enquiry.
      </label>
      {errors.consent && (
        <p id="consent-error" className="mt-2 text-xs text-red-700">
          {errors.consent}
        </p>
      )}
    </div>
  )
}
