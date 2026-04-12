import { services } from '@/data/services'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import {
  Wrench,
  Home,
  Search,
  CloudRain,
  Building2,
  Droplets,
  AlertTriangle,
  Factory,
  LayoutGrid,
  Shield,
  Gem,
  Waves,
  Sun,
  Flame,
  Umbrella,
  Wind,
  ClipboardCheck,
  Sparkles,
  Hammer,
  TreePine,
  Layers,
  Zap,
  Leaf,
  PaintBucket,
  Ruler,
  Thermometer,
  Eye,
  HardHat,
  Clock,
  Lightbulb,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Home,
  Search,
  CloudRain,
  Building2,
  Droplets,
  AlertTriangle,
  Factory,
  LayoutGrid,
  Shield,
  Gem,
  Waves,
  Sun,
  Flame,
  Umbrella,
  Wind,
  ClipboardCheck,
  Sparkles,
  Hammer,
  TreePine,
  Layers,
  Zap,
  Leaf,
  PaintBucket,
  Ruler,
  Thermometer,
  Eye,
  HardHat,
  Clock,
  Lightbulb,
}

interface ServicesGridProps {
  serviceSlugs?: readonly string[]
  title?: string
  groupByCategory?: boolean
}

export function ServicesGrid({ serviceSlugs, title, groupByCategory }: ServicesGridProps = {}) {
  const displayedServices = serviceSlugs
    ? services.filter((s) => serviceSlugs.includes(s.slug))
    : services

  if (groupByCategory) {
    const grouped = new Map<string, typeof displayedServices[number][]>()
    for (const service of displayedServices) {
      const cat = service.category ?? 'Other'
      const existing = grouped.get(cat)
      if (existing) {
        existing.push(service)
      } else {
        grouped.set(cat, [service])
      }
    }

    let categoryIndex = 0
    return (
      <section className="py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {title && (
            <h2 className="mb-12 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
              {title}
            </h2>
          )}
          {Array.from(grouped.entries()).map(([category, categoryServices]) => {
            const isEven = categoryIndex % 2 === 1
            categoryIndex++
            return (
              <div
                key={category}
                className={`rounded-lg px-4 py-8 sm:px-6 ${isEven ? 'bg-gray-light' : 'bg-white'}`}
              >
                <h2 className="mb-6 font-heading text-[28px] font-bold text-navy md:text-3xl">
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const Icon = iconMap[service.icon]
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group"
                      >
                        <Card interactive className="border-t-[3px] border-t-amber p-4">
                          {Icon && (
                            <Icon
                              className="mb-3 h-10 w-10 text-amber"
                              aria-hidden="true"
                            />
                          )}
                          <h3 className="mb-2 text-xl font-bold text-navy">
                            {service.name}
                          </h3>
                          <p className="text-gray-600">{service.description}</p>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          {title ?? 'Our Roofing Services'}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card interactive className="border-t-[3px] border-t-amber p-4">
                  {Icon && (
                    <Icon
                      className="mb-3 h-10 w-10 text-amber"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="mb-2 text-xl font-bold text-navy">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
