import { siteConfig } from '@/lib/site-config'
import { ContactForm } from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function ContactHub() {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column: Contact Form */}
          <ContactForm />

          {/* Right column: Business info panel */}
          <div className="rounded-lg bg-navy p-8 text-white">
            <h3 className="mb-6 font-heading text-xl font-bold text-white">
              Get In Touch
            </h3>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-1 h-5 w-5 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-2xl font-bold text-amber-light underline hover:text-amber"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  className="mt-1 h-5 w-5 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-lg text-gray-300 underline hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-300">
                  Serving all 16 municipalities in Passaic County, NJ
                </p>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="mt-6 mb-3 font-heading text-xl font-bold text-white">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {siteConfig.businessHours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-start gap-3 text-lg text-gray-300"
                    >
                      {h === siteConfig.businessHours[0] && (
                        <Clock
                          className="mt-1 h-5 w-5 shrink-0 text-amber"
                          aria-hidden="true"
                        />
                      )}
                      {h !== siteConfig.businessHours[0] && (
                        <span className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                      )}
                      <span className="flex w-full justify-between">
                        <span>{h.day}</span>
                        <span>
                          {h.opens === 'Closed'
                            ? 'Closed'
                            : `${h.opens} - ${h.closes}`}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
