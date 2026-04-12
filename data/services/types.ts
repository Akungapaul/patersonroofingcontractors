import type { FaqItem } from '@/data/content/types'

export type ServiceCategory =
  | 'Repair & Maintenance'
  | 'Residential Roofing'
  | 'Commercial Roofing'
  | 'Gutters & Drainage'
  | 'Components & Specialty'
  | 'Energy & Solar'
  | 'Roof Replacement'
  | 'Design & Specialty'

export interface ProcessStep {
  readonly title: string
  readonly description: string
  readonly icon?: string
}

export interface Benefit {
  readonly title: string
  readonly description: string
  readonly icon: string
}

export interface ServiceContent {
  readonly slug: string
  readonly name: string
  readonly category: ServiceCategory
  readonly heroHeadline: string
  readonly heroSubheadline: string
  readonly overviewHtml: string
  readonly processSteps: readonly ProcessStep[]
  readonly benefits: readonly Benefit[]
  readonly faqItems: readonly FaqItem[]
  readonly relatedServiceSlugs: readonly string[]
  readonly seoTitle: string
  readonly seoDescription: string
}
