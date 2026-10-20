import type { Metadata } from 'next'
import type { CityContent } from '@/data/content/types'
import type { ServiceContent } from '@/data/services/types'
import type { GuideContent } from '@/data/guides/types'
import { comboPath, servicePath } from './routes'
import { services } from '@/data/services'

const BRAND = 'Paterson Roofing Contractors'

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
  keywords,
}: {
  title: string
  description: string
  canonical: string
  keywords?: string
}): Metadata {
  const shortTitle = limit(title, 60)
  const shortDescription = limit(description, 160)

  return {
    title: { absolute: shortTitle },
    description: shortDescription,
    ...(keywords ? { keywords } : {}),
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
    title: content.seoTitle,
    description: content.seoDescription,
    canonical: `/roofing-contractor-${content.slug}-nj`,
  })
}

export function serviceMetadata(
  content: ServiceContent,
  supplement?: { metaDescription?: string; metaKeywords?: string }
): Metadata {
  return metadata({
    title: content.seoTitle,
    description: supplement?.metaDescription ?? content.seoDescription,
    canonical: servicePath(content.slug),
    keywords: supplement?.metaKeywords,
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

export function comboMetadata(
  service: ServiceContent,
  city: CityContent,
  supplement?: { metaDescription?: string; metaKeywords?: string }
): Metadata {
  const phrase = `${service.name} ${city.name}, NJ`
  const indexEntry = services.find((s) => s.slug === service.slug)
  return metadata({
    title: phrase,
    description:
      supplement?.metaDescription ??
      (indexEntry ? `${phrase} — ${indexEntry.description}` : service.seoDescription),
    canonical: comboPath(service.slug, city.slug),
    keywords: supplement?.metaKeywords,
  })
}
