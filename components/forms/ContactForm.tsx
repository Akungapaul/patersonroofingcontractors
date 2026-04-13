'use client'

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/site-config'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react'

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

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      serviceType: formData.get('serviceType') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const err = await res.json()
        setErrorMessage(err.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please call us directly at (973) 555-0100.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('rounded-lg bg-green-50 p-8 text-center', className)}>
        <h3 className="mb-2 font-heading text-2xl font-bold text-navy">
          Thank You!
        </h3>
        <p className="text-lg text-gray-700">
          We&apos;ll call you within 1 hour.
        </p>
        <PhoneButton compact={false} className="mt-4" />
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-8', className)}>
      {/* Form Fields - Left Side */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-3 space-y-5"
        noValidate
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            placeholder="John Smith"
            className={cn(
              'w-full rounded-md border border-gray-300 px-4 py-3 text-lg font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none',
              status === 'error' && 'border-red-600'
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-phone"
              className="mb-1 block text-sm font-semibold text-navy"
            >
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              required
              aria-required="true"
              autoComplete="tel"
              placeholder="(973) 555-1234"
              className={cn(
                'w-full rounded-md border border-gray-300 px-4 py-3 text-lg font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none',
                status === 'error' && 'border-red-600'
              )}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1 block text-sm font-semibold text-navy"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              aria-required="true"
              autoComplete="email"
              placeholder="john@example.com"
              className={cn(
                'w-full rounded-md border border-gray-300 px-4 py-3 text-lg font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none',
                status === 'error' && 'border-red-600'
              )}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Service Needed
          </label>
          <select
            id="contact-service"
            name="serviceType"
            defaultValue=""
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none"
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

        <div>
          <label
            htmlFor="contact-message"
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Describe your roofing needs, including property address if possible..."
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg font-body focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-base font-semibold" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-amber px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-amber-dark focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2 min-h-[44px]',
            status === 'submitting' && 'opacity-50 cursor-not-allowed'
          )}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Get Free Estimate'
          )}
        </button>
      </form>

      {/* Contact Info - Right Side */}
      <div className="lg:col-span-2">
        <div className="rounded-[var(--radius-card)] bg-navy p-6 text-white">
          <h3 className="mb-6 font-heading text-2xl font-bold">
            Contact Information
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Phone
                className="mt-1 h-5 w-5 shrink-0 text-amber"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-gray-300">Phone</p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  data-action="call"
                  data-location="form-panel"
                  className="text-lg font-bold text-white hover:text-amber transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail
                className="mt-1 h-5 w-5 shrink-0 text-amber"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-gray-300">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-lg text-white hover:text-amber transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-amber"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-gray-300">
                  Service Area
                </p>
                <p className="text-lg">
                  All 16 municipalities in Passaic County, NJ
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock
                className="mt-1 h-5 w-5 shrink-0 text-amber"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-gray-300">
                  Business Hours
                </p>
                <ul className="space-y-1 text-sm">
                  {siteConfig.businessHours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-gray-300">
                        {h.opens === 'Closed'
                          ? 'Closed'
                          : `${h.opens} - ${h.closes}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-md bg-amber/10 p-4 text-center">
            <p className="text-sm font-semibold text-amber-light">
              24/7 Emergency Service Available
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Call anytime for storm damage and emergency roof repairs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
