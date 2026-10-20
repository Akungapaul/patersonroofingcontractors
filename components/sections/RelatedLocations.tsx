import { siteConfig } from '@/lib/site-config'
import { cityPath, comboExists, comboPath } from '@/lib/routes'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

interface RelatedLocationsProps {
  serviceName: string
  serviceSlug?: string
}

export function RelatedLocations({ serviceName, serviceSlug }: RelatedLocationsProps) {
  const hrefFor = (citySlug: string) =>
    serviceSlug && citySlug !== 'paterson' && comboExists(serviceSlug, citySlug)
      ? comboPath(serviceSlug, citySlug)
      : cityPath(citySlug)
  return (
    <section className="bg-[#F8FAFC] py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          {serviceName} Across Passaic County
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {siteConfig.municipalities.map((municipality) => (
            <Link
              key={municipality.slug}
              href={hrefFor(municipality.slug)}
            >
              <Card interactive className="p-4 text-center">
                <span className="text-lg font-bold text-navy">
                  {municipality.name}
                </span>
                <span className="mt-1 block text-sm text-amber hover:text-amber-dark">
                  View {municipality.name} services
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
