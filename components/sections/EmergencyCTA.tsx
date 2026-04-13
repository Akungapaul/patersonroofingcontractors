import { siteConfig } from '@/lib/site-config'
import { Phone } from 'lucide-react'

export function EmergencyCTA() {
  return (
    <section className="bg-amber py-section-sm lg:py-12">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
          Storm Damage? We&apos;re Here 24/7.
        </h2>
        <p className="mt-3 text-lg text-white/90">
          Don&apos;t wait &mdash; emergency roof repair for all of Passaic
          County.
        </p>
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          data-action="call"
          data-location="emergency"
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-button)] bg-white px-8 py-4 text-lg font-bold text-amber transition-all hover:bg-gray-100 hover:shadow-md"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call for Emergency Service
        </a>
      </div>
    </section>
  )
}
