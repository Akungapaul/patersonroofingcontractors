import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'
import { servicePath } from '@/lib/routes'

// Single-city site (2026-11-06 restructure): Paterson only. The homepage is
// the Paterson hub; every other town's pages were retired and 308 to their
// Paterson counterpart or the homepage (see next.config.ts redirects).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://patersonroofingcontractors.com'

  const servicePages = services.map((s) => ({
    url: `${baseUrl}${servicePath(s.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const guidePages = getAllGuideSlugs().map((slug) => ({
    url: `${baseUrl}/roofing-guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const legalPages = [
    'privacy-policy',
    'terms-of-service',
    'cookie-policy',
    'disclaimer',
    'accessibility',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  const utilityPages = [
    { url: `${baseUrl}/roofing-guides`, priority: 0.7 },
    { url: `${baseUrl}/about`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...servicePages,
    ...guidePages,
    ...utilityPages,
    ...legalPages,
  ]
}
