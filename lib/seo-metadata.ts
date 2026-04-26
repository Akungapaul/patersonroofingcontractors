import type { Metadata } from 'next'
import type { CityContent } from '@/data/content/types'
import type { ServiceContent } from '@/data/services/types'
import type { GuideContent } from '@/data/guides/types'

const BRAND = 'Paterson Roofing Contractors'
const COUNTY = 'Passaic County, NJ'

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function limit(value: string, max: number): string {
  const text = cleanText(value)
  if (text.length <= max) return text
  const trimmed = text.slice(0, max - 1)
  const boundary = Math.max(trimmed.lastIndexOf(' '), trimmed.lastIndexOf('|'))
  return `${trimmed.slice(0, boundary > 40 ? boundary : max - 1).trim()}…`
}

function metadata({
  title,
  description,
  canonical,
}: {
  title: string
  description: string
  canonical: string
}): Metadata {
  const shortTitle = limit(title, 60)
  const shortDescription = limit(description, 160)

  return {
    title: { absolute: shortTitle },
    description: shortDescription,
    alternates: { canonical },
    openGraph: {
      title: shortTitle,
      description: shortDescription,
      url: canonical,
    },
  }
}

export function cityMetadata(content: CityContent): Metadata {
  return metadata({
    title: `Roofing Contractor in ${content.name}, NJ`,
    description: `Roof repair, replacement, and emergency roofing in ${content.name}, NJ. Local ${COUNTY} roofers offering free estimates.`,
    canonical: `/roofing-contractor-${content.slug}-nj`,
  })
}

export function serviceMetadata(content: ServiceContent): Metadata {
  return metadata({
    title: `${content.name} in ${COUNTY}`,
    description: `${content.name} for ${COUNTY} homes and businesses. Local roofers for inspections, repairs, replacements, and free estimates.`,
    canonical: `/services/${content.slug}`,
  })
}

export function guideMetadata(content: GuideContent): Metadata {
  return metadata({
    title: `${content.title.replace(/:.*$/, '')}`,
    description: content.description,
    canonical: `/roofing-guides/${content.slug}`,
  })
}

export function staticPageMetadata({
  title,
  description,
  canonical,
}: {
  title: string
  description: string
  canonical: string
}): Metadata {
  return metadata({ title, description, canonical })
}

export const homeMetadata = staticPageMetadata({
  title: 'Paterson Roofing Contractors | Roof Repair NJ',
  description:
    'Roof repair, replacement, and emergency roofing in Paterson and Passaic County, NJ. Local roofers offering free estimates.',
  canonical: '/',
})

export { BRAND }
