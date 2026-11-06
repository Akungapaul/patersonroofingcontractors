'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { trackEvent } from '@/lib/analytics'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const serviceOptions = [
  'Roof Repair',
  'Roof Replacement',
  'Roof Inspection',
  'Storm Damage Repair',
  'Flat Roof Services',
  'Gutter Installation',
  'Emergency Roofing',
  'Commercial Roofing',
  'Other',
]

const inputClass =
  'w-full rounded-md border border-gray-300 px-4 py-3 text-base text-navy font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none'

/**
 * Compact quote form for hero sections. On mobile it starts collapsed to
 * the phone field with an expand button; tapping expands name + service
 * in place (the house tap-collapse pattern). On desktop all fields show.
 * Posts to the same /api/contact route as the full contact form.
 */
export function HeroQuoteForm() {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    phone?: string
  }>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: (formData.get('name') as string) ?? '',
      phone: (formData.get('phone') as string) ?? '',
      email: '',
      serviceType: (formData.get('serviceType') as string) ?? '',
      message: '',
      address: '',
    }

    const errors: { name?: string; phone?: string } = {}
    if (!data.name.trim()) errors.name = 'Please enter your name.'
    if (data.phone.replace(/\D/g, '').length < 7)
      errors.phone = 'Please enter a valid phone number.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        trackEvent('generate_lead', {
          location: 'hero-form',
          service: data.serviceType || 'unspecified',
        })
        setStatus('success')
      } else {
        const err = await res.json()
        setErrorMessage(err.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please call us directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-6 text-center shadow-xl">
        <CheckCircle2
          className="mx-auto h-10 w-10 text-green-600"
          aria-hidden="true"
        />
        <h3 className="mt-3 font-heading text-2xl font-bold text-navy">
          Request Received
        </h3>
        <p className="mt-2 text-gray-700">
          We&apos;ll call you within 1 business hour to schedule your free
          estimate.
        </p>
        <PhoneButton compact={false} className="mt-4" />
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6 text-left shadow-xl">
      <h3 className="font-heading text-2xl font-bold text-navy">
        Get Your Free Estimate
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        We&apos;ll call you within 1 business hour.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <div className={expanded ? 'block' : 'hidden lg:block'}>
          <label
            htmlFor="hero-name"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="hero-name"
            name="name"
            autoComplete="name"
            placeholder="John Smith"
            className={inputClass}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm font-semibold text-red-600">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hero-phone"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="hero-phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(973) 555-1234"
            className={inputClass}
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm font-semibold text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div className={expanded ? 'block' : 'hidden lg:block'}>
          <label
            htmlFor="hero-service"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Service Needed
          </label>
          <select
            id="hero-service"
            name="serviceType"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a Service
            </option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {status === 'error' && (
          <p className="text-base font-semibold text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[var(--radius-button)] bg-amber px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-amber-dark lg:hidden"
          >
            Get My Free Estimate
          </button>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`${
            expanded ? 'inline-flex' : 'hidden'
          } min-h-[44px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-amber px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-amber-dark lg:inline-flex ${
            status === 'submitting' ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Get My Free Estimate'
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          No spam — just your estimate. We never share your information.
        </p>
      </form>
    </div>
  )
}
