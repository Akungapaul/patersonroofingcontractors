import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-section-sm sm:px-6 lg:px-8 lg:py-section">
        <div className="grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Business Description + Phone */}
          <div>
            <Link
              href="/"
              className="font-heading text-2xl font-bold text-white focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
            >
              {siteConfig.businessName}
            </Link>
            <p className="mt-4 text-lg text-gray-300">
              Professional roofing services for Passaic County, NJ. Licensed,
              insured, and committed to quality craftsmanship for over 15 years.
            </p>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-amber-light transition-colors hover:text-amber"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>

          {/* Column 2: Services Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-bold text-white">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 transition-colors hover:text-amber-light"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Area Municipality Links */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-bold text-white">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {siteConfig.municipalities.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/roofing-contractor-${m.slug}-nj`}
                    className="text-gray-300 transition-colors hover:text-amber-light"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info + Business Hours */}
          <div>
            <h3 className="mb-4 font-heading text-xl font-bold text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-light"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-gray-300 transition-colors hover:text-amber-light"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-light"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gray-300 transition-colors hover:text-amber-light"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-light"
                  aria-hidden="true"
                />
                <span className="text-gray-300">Passaic County, NJ</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-light"
                  aria-hidden="true"
                />
                <div className="text-gray-300">
                  <p>Mon-Fri: 7:00 AM - 6:00 PM</p>
                  <p>Sat: 8:00 AM - 2:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-gray-400 sm:flex-row">
            <p>
              &copy;{' '}
              <span suppressHydrationWarning>
                {new Date().getFullYear()}
              </span>{' '}
              {siteConfig.businessName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-amber-light"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="transition-colors hover:text-amber-light"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
