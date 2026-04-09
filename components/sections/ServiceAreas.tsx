import { siteConfig } from '@/lib/site-config'
import { clusterColors, type ClusterKey } from '@/data/municipalities'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export function ServiceAreas() {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Serving All of Passaic County
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Professional roofing services across all 16 municipalities
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {siteConfig.municipalities.map((m) => {
            const cluster = clusterColors[m.cluster as ClusterKey]
            return (
              <Link
                key={m.slug}
                href={`/roofing-contractor-${m.slug}-nj`}
                className="group"
              >
                <Card
                  interactive
                  className="border-t-[3px] border-t-amber p-4 text-center"
                >
                  <h3 className="mb-2 text-lg font-bold text-navy">
                    {m.name}
                  </h3>
                  <Badge
                    variant="cluster"
                    className={`${cluster.bg} ${cluster.text}`}
                  >
                    {cluster.label}
                  </Badge>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
