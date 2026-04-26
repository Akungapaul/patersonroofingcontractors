import type { Benefit, ProcessStep, ServiceCategory } from '@/data/services/types'
import { services } from '@/data/services'
import { siteConfig } from '@/lib/site-config'
import { Card } from '@/components/ui/Card'

interface ServiceFitProfileProps {
  serviceName: string
  category: ServiceCategory
  benefits: readonly Benefit[]
  processSteps: readonly ProcessStep[]
  relatedServiceSlugs: readonly string[]
}

const categoryAngles: Record<ServiceCategory, string> = {
  'Repair & Maintenance':
    'fast diagnosis, leak isolation, storm-response readiness, and preventing small roof issues from becoming interior damage',
  'Residential Roofing':
    'home protection, material selection, attic ventilation, curb appeal, and long-term weather resistance',
  'Commercial Roofing':
    'low-slope drainage, rooftop equipment, tenant disruption, membrane performance, and maintenance access',
  'Gutters & Drainage':
    'water movement, fascia protection, foundation protection, ice-dam prevention, and roof-edge durability',
  'Components & Specialty':
    'the roof details that usually fail first: flashing, vents, skylights, decking, soffits, fascia, and penetrations',
  'Energy & Solar':
    'energy performance, roof lifespan, ventilation, reflective materials, solar readiness, and moisture control',
  'Roof Replacement':
    'roof age, decking condition, tear-off strategy, warranty options, ventilation upgrades, and lifetime cost',
  'Design & Specialty':
    'custom roof planning, uncommon materials, architectural details, and project-specific installation requirements',
}

const priorityTowns = siteConfig.municipalities.slice(0, 6)

export function ServiceFitProfile({
  serviceName,
  category,
  benefits,
  processSteps,
  relatedServiceSlugs,
}: ServiceFitProfileProps) {
  const relatedServices = relatedServiceSlugs
    .slice(0, 4)
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))

  const primaryBenefit = benefits[0]
  const firstStep = processSteps[0]

  return (
    <section className="bg-gray-light py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-amber-dark">
            Service-specific fit
          </p>
          <h2 className="mt-2 font-heading text-[28px] font-bold text-navy md:text-3xl">
            When {serviceName} Matters in Passaic County
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {serviceName} projects in Passaic County are usually about {categoryAngles[category]}. We evaluate the roof system, building type, access, drainage, age, and weather exposure before recommending repair, replacement, or preventive work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Best-fit situations
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-gray-700">
              {primaryBenefit
                ? `${primaryBenefit.title}: ${primaryBenefit.description}`
                : `${serviceName} is best handled after a roof inspection confirms the roof age, material condition, and source of failure.`}
            </p>
          </Card>

          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Local process
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-gray-700">
              {firstStep
                ? `${firstStep.title}: ${firstStep.description}`
                : `We start with a site-specific roof inspection, document the issue, and recommend a practical scope for your property.`}
            </p>
          </Card>

          <Card className="border-t-[3px] border-t-amber p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              Related needs
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-gray-700">
              Commonly paired with {relatedServices.map((service) => service.name).join(', ') || 'roof inspections, leak repair, ventilation checks, and maintenance planning'} in towns like {priorityTowns.map((town) => town.name).join(', ')}.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
