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
}

export function ServicesGrid() {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Our Roofing Services
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
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
