import type { CityContent } from '@/data/content/types'
import { services } from '@/data/services'
import { siteConfig } from '@/lib/site-config'
import { Card } from '@/components/ui/Card'

interface CityRoofingProfileProps {
  content: CityContent
}

const clusterProfiles = {
  Urban:
    'dense streets, older multi-family buildings, flat roofs, tight staging, and more complex access logistics',
  Suburban:
    'single-family neighborhoods, mature trees, mixed roof ages, and storm exposure from open residential blocks',
  Highlands:
    'tree cover, elevation changes, heavier snow loads, lake-area moisture, and wind exposure across wooded lots',
} as const

export function CityRoofingProfile({ content }: CityRoofingProfileProps) {
  const municipality = siteConfig.municipalities.find(
    (item) => item.slug === content.slug
  )

  const priorityServices = content.relevantServiceSlugs
    .slice(0, 5)
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))

  const neighborhoodNames = content.neighborhoods
    .slice(0, 4)
    .map((neighborhood) => neighborhood.name)

  return (
    <section className="bg-gray-light py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-amber-dark">
            Local roofing profile
          </p>
          <h2 className="mt-2 font-heading text-[28px] font-bold text-navy md:text-3xl">
            What Makes Roofing in {content.name} Different
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {content.name} is a {content.cluster.toLowerCase()} {municipality?.type.toLowerCase() ?? 'municipality'} in {content.county} County, so roofing work here is shaped by {clusterProfiles[content.cluster]}. That local context changes how we inspect roofs, stage materials, choose repair methods, and prioritize drainage, flashing, ventilation, and storm protection.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Local conditions
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-gray-700">
              Population around {municipality?.population.toLocaleString() ?? 'local'} residents, {content.cluster.toLowerCase()} building patterns, and North Jersey freeze-thaw cycles all influence roof wear in {content.name}.
            </p>
          </Card>

          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Priority services
            </h3>
            <ul className="mt-3 space-y-2 text-lg text-gray-700">
              {priorityServices.map((service) => (
                <li key={service.slug}>• {service.name}</li>
              ))}
            </ul>
          </Card>

          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Neighborhood focus
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-gray-700">
              We tailor inspections around areas such as {neighborhoodNames.join(', ')}, and nearby blocks where roof age, tree cover, drainage, and access can vary street by street.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
