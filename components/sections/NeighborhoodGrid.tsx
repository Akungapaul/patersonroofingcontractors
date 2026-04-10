import type { Neighborhood } from '@/data/content/types'
import { Card } from '@/components/ui/Card'

interface NeighborhoodGridProps {
  neighborhoods: readonly Neighborhood[]
  cityName: string
}

export function NeighborhoodGrid({
  neighborhoods,
  cityName,
}: NeighborhoodGridProps) {
  if (neighborhoods.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Neighborhoods We Serve in {cityName}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((neighborhood) => (
            <Card
              key={neighborhood.name}
              className="border-t-[3px] border-t-amber p-6"
              tabIndex={-1}
            >
              <h3 className="font-heading text-2xl font-bold text-navy">
                {neighborhood.name}
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                {neighborhood.roofingContext}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
