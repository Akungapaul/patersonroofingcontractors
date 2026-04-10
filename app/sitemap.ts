import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://patersonroofingcontractors.com'

  const locationPages = siteConfig.municipalities.map((m) => ({
    url: `${baseUrl}/roofing-contractor-${m.slug}-nj`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: m.slug === 'paterson' ? 0.9 : 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...locationPages,
  ]
}
