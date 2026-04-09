import { siteConfig } from '@/lib/site-config'

/** Re-export municipalities from site-config for convenient access */
export const municipalities = siteConfig.municipalities

/** Geographic cluster display configuration */
export const clusterColors = {
  Urban: { bg: 'bg-navy/10', text: 'text-navy', label: 'Urban' },
  Suburban: { bg: 'bg-green-100', text: 'text-green-800', label: 'Suburban' },
  Highlands: { bg: 'bg-amber-light/20', text: 'text-amber-dark', label: 'Highlands' },
} as const

export type ClusterKey = keyof typeof clusterColors
