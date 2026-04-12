import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function MunicipalityGrid() {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Communities We Serve
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {siteConfig.municipalities.map((municipality) => (
            <Link
              key={municipality.slug}
              href={`/roofing-contractor-${municipality.slug}-nj`}
            >
              <Card interactive className="p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {municipality.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pop. {municipality.population.toLocaleString()}
                </p>
                <div className="mt-2">
                  <Badge variant="cluster">{municipality.cluster}</Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-amber">
                  View Roofing Services
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
