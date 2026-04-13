/**
 * Route Registry
 *
 * Builds the complete route set from the same data sources Next.js uses.
 * Used by all audit scripts to validate links, sitemap, and page coverage.
 */

import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'

/**
 * Returns every valid route on the site (103 total).
 *
 * Breakdown:
 *   1  homepage
 *  16  location pages  /roofing-contractor-{slug}-nj
 *  67  service pages   /services/{slug}
 *  10  guide pages     /roofing-guides/{slug}
 *   2  index pages     /services, /roofing-guides
 *   3  utility pages   /about, /contact, /service-area
 *   2  legal pages     /privacy-policy, /terms-of-service
 */
export function getAllValidRoutes(): Set<string> {
  const routes = new Set<string>()

  // Homepage
  routes.add('/')

  // Location pages (16)
  for (const m of siteConfig.municipalities) {
    routes.add(`/roofing-contractor-${m.slug}-nj`)
  }

  // Service pages (67)
  for (const s of services) {
    routes.add(`/services/${s.slug}`)
  }

  // Guide pages (10)
  for (const slug of getAllGuideSlugs()) {
    routes.add(`/roofing-guides/${slug}`)
  }

  // Index pages
  routes.add('/services')
  routes.add('/roofing-guides')

  // Utility pages
  routes.add('/about')
  routes.add('/contact')
  routes.add('/service-area')

  // Legal pages
  routes.add('/privacy-policy')
  routes.add('/terms-of-service')

  return routes
}

/**
 * Returns all indexable routes (excludes noindex pages).
 * Used for sitemap validation -- noindex pages should NOT appear in sitemap.
 *
 * Excludes: /privacy-policy, /terms-of-service
 */
export function getIndexableRoutes(): Set<string> {
  const routes = getAllValidRoutes()
  routes.delete('/privacy-policy')
  routes.delete('/terms-of-service')
  return routes
}
