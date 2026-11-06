import { Card } from '@/components/ui/Card'
import Link from 'next/link'

interface RelatedLocationsProps {
  serviceName: string
  serviceSlug?: string
}

// Single-city site (2026-11-06 restructure): the across-the-county list
// collapsed to the one primary city, Paterson, pointing at the homepage
// (the city hub).
export function RelatedLocations({ serviceName }: RelatedLocationsProps) {
  return (
    <section className="bg-[#F8FAFC] py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          {serviceName} in Paterson, NJ
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <Link href="/">
            <Card interactive className="p-4 text-center">
              <span className="text-lg font-bold text-navy">Paterson</span>
              <span className="mt-1 block text-sm text-amber hover:text-amber-dark">
                View Paterson services
              </span>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
