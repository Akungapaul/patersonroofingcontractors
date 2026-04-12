import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedService {
  readonly name: string
  readonly slug: string
  readonly description: string
}

interface RelatedServicesProps {
  services: readonly RelatedService[]
}

export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Related Services
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card interactive className="p-6">
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {service.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-lg text-gray-700">
                  {service.description}
                </p>
                <ArrowRight
                  className="mt-4 h-5 w-5 text-amber"
                  aria-hidden="true"
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
