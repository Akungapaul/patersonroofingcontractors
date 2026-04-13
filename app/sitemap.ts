import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://patersonroofingcontractors.com'

  const locationPages = siteConfig.municipalities.map((m) => ({
    url: `${baseUrl}/roofing-contractor-${m.slug}-nj`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: m.slug === 'paterson' ? 0.9 : 0.8,
  }))

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
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

  const utilityPages = [
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/roofing-guides`, priority: 0.7 },
    { url: `${baseUrl}/about`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
    { url: `${baseUrl}/service-area`, priority: 0.6 },
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
    ...locationPages,
    ...servicePages,
    ...guidePages,
    ...utilityPages,
  ]
}
