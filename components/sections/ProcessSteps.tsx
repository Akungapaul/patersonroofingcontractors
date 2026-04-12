import type { ProcessStep } from '@/data/services/types'
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

interface ProcessStepsProps {
  steps: readonly ProcessStep[]
  serviceName: string
}

export function ProcessSteps({ steps, serviceName }: ProcessStepsProps) {
  return (
    <section className="bg-[#F8FAFC] py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Our {serviceName} Process
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon ? iconMap[step.icon] : null
            return (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <span
                  className="font-heading text-5xl font-bold text-amber/20"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="mt-2 flex items-center gap-2">
                  {Icon && (
                    <Icon className="h-6 w-6 text-amber" aria-hidden="true" />
                  )}
                  <h3 className="font-heading text-2xl font-bold text-navy">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-lg leading-relaxed text-gray-700">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
