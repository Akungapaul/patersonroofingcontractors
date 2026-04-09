import { siteConfig } from '@/lib/site-config'
import { Badge } from '@/components/ui/Badge'
import {
  ShieldCheck,
  DollarSign,
  Clock,
  ThumbsUp,
  Heart,
} from 'lucide-react'

const trustBadges = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: DollarSign, label: 'Free Estimates' },
  { icon: Clock, label: '24/7 Emergency' },
  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
  { icon: Heart, label: 'Local Family Owned' },
] as const

const stats = [
  { value: siteConfig.stats.yearsExperience, label: 'Years Experience' },
  { value: siteConfig.stats.projectsCompleted, label: 'Projects Completed' },
  { value: siteConfig.stats.rating, label: 'Rated' },
  { value: siteConfig.stats.citiesServed, label: 'Cities Served' },
] as const

export function WhyChooseUs() {
  return (
    <section className="bg-gray-light py-section-sm lg:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
          Why Choose Us
        </h2>

        {/* Trust Badges Strip */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {trustBadges.map((badge) => (
            <Badge key={badge.label} variant="trust">
              <badge.icon
                className="h-8 w-8 text-navy"
                aria-hidden="true"
              />
              <span>{badge.label}</span>
            </Badge>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-amber">
                {stat.value}
              </p>
              <p className="mt-1 font-semibold text-navy">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
