import type { Benefit } from '@/data/services/types'
import {
  Wrench,
  Search,
  ClipboardCheck,
  Hammer,
  Sparkles,
  Shield,
  Clock,
  HardHat,
  Eye,
  Ruler,
  Home,
  Building2,
  Droplets,
  Layers,
  Zap,
  Lightbulb,
  Sun,
  Thermometer,
  Wind,
  CloudRain,
  AlertTriangle,
  Factory,
  Leaf,
  PaintBucket,
  Gem,
  Waves,
  Flame,
  Umbrella,
  TreePine,
  LayoutGrid,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Search,
  ClipboardCheck,
  Hammer,
  Sparkles,
  Shield,
  Clock,
  HardHat,
  Eye,
  Ruler,
  Home,
  Building2,
  Droplets,
  Layers,
  Zap,
  Lightbulb,
  Sun,
  Thermometer,
  Wind,
  CloudRain,
  AlertTriangle,
  Factory,
  Leaf,
  PaintBucket,
  Gem,
  Waves,
  Flame,
  Umbrella,
  TreePine,
  LayoutGrid,
}

interface BenefitsGridProps {
  benefits: readonly Benefit[]
  serviceName: string
}

export function BenefitsGrid({ benefits, serviceName }: BenefitsGridProps) {
  return (
    <section className="bg-white py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Benefits of {serviceName}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon]
            return (
              <div
                key={index}
                className="rounded-lg border-t-[3px] border-t-amber bg-white p-6 shadow-sm"
              >
                {Icon && (
                  <Icon
                    className="mb-4 h-10 w-10 text-amber"
                    aria-hidden="true"
                  />
                )}
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-gray-700">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
