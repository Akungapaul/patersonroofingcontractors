import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

interface CityLinksProps {
  heading?: string
}

export function CityLinks({
  heading = 'Get Roofing Help in Your City',
}: CityLinksProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          {heading}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {siteConfig.municipalities.map((municipality) => (
            <Link
              key={municipality.slug}
              href={`/roofing-contractor-${municipality.slug}-nj`}
              className="block p-3 text-center text-lg font-semibold text-navy transition-colors hover:text-amber"
            >
              {municipality.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
