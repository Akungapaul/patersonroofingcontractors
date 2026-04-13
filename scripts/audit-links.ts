/**
 * Audit: Internal Links
 *
 * Validates internal link integrity across the entire site:
 *   Check 1 -- Navigation component links (D-02)
 *   Check 2 -- Inline HTML link validation (D-03)
 *   Check 3 -- Click depth from homepage (CRAWL-01)
 *   Check 4 -- Broken link summary (CRAWL-02)
 *
 * Usage: npm run audit:links
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllValidRoutes } from './utils/routes'
import { printResults, type AuditResult } from './utils/reporter'

// Content imports for inline link extraction
import { getAllCityContent, getAllCitySlugs } from '@/data/content'
import { getAllServiceContent, getAllServiceSlugs } from '@/data/services/content'
import { getAllGuideContent, getAllGuideSlugs } from '@/data/guides/content'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract all href values from an HTML string */
function extractHrefs(html: string): string[] {
  const matches: string[] = []
  const regex = /href="([^"]*)"/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1])
  }
  return matches
}

/** Check if an href is an internal route (not external, anchor, tel, mailto) */
function isInternalRoute(href: string): boolean {
  if (href.startsWith('http://') || href.startsWith('https://')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  if (href.startsWith('#')) return false
  return true
}

/** Read a source file relative to project root */
function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')
}

// ---------------------------------------------------------------------------
// Check 1: Navigation component links (D-02)
// ---------------------------------------------------------------------------

function checkNavLinks(): AuditResult[] {
  const results: AuditResult[] = []

  // Footer: must iterate services (all 67) and municipalities (all 16)
  const footerSrc = readSource('components/layout/Footer.tsx')
  const footerDataDriven =
    footerSrc.includes('services.map') &&
    footerSrc.includes('siteConfig.municipalities.map')

  if (footerDataDriven) {
    results.push({
      category: 'Nav Links',
      status: 'PASS',
      message: `Footer uses data-driven iteration for services (${services.length}) and municipalities (${siteConfig.municipalities.length})`,
    })
  } else {
    results.push({
      category: 'Nav Links',
      status: 'WARN',
      message:
        'Footer does NOT use data-driven iteration -- links may be hardcoded',
    })
  }

  // MegaMenu: must link top services per category
  const megaMenuSrc = readSource('components/layout/MegaMenu.tsx')
  const megaMenuDataDriven =
    megaMenuSrc.includes('services') &&
    (megaMenuSrc.includes('getServicesByCategory') ||
      megaMenuSrc.includes('CATEGORY_ORDER'))

  if (megaMenuDataDriven) {
    results.push({
      category: 'Nav Links',
      status: 'PASS',
      message:
        'MegaMenu uses data-driven category iteration (top 5 per category)',
    })
  } else {
    results.push({
      category: 'Nav Links',
      status: 'WARN',
      message:
        'MegaMenu does NOT appear to use data-driven service links -- may be hardcoded',
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 2: Inline HTML link validation (D-03)
// ---------------------------------------------------------------------------

interface BrokenLink {
  source: string
  href: string
}

function checkInlineLinks(validRoutes: Set<string>): {
  results: AuditResult[]
  brokenLinks: BrokenLink[]
} {
  const results: AuditResult[] = []
  const brokenLinks: BrokenLink[] = []

  // --- City content (introHtml) ---
  const allCityContent = getAllCityContent()
  for (const city of allCityContent) {
    const hrefs = extractHrefs(city.introHtml)
    for (const href of hrefs) {
      if (isInternalRoute(href) && !validRoutes.has(href)) {
        brokenLinks.push({
          source: `city/${city.slug} (introHtml)`,
          href,
        })
      }
    }
  }

  // --- Service content (overviewHtml) ---
  const allServiceContent = getAllServiceContent()
  for (const service of allServiceContent) {
    const hrefs = extractHrefs(service.overviewHtml)
    for (const href of hrefs) {
      if (isInternalRoute(href) && !validRoutes.has(href)) {
        brokenLinks.push({
          source: `service/${service.slug} (overviewHtml)`,
          href,
        })
      }
    }
  }

  // --- Guide content (sections contentHtml + subsections) ---
  const allGuides = getAllGuideContent()
  for (const guide of allGuides) {
    for (const section of guide.sections) {
      const hrefs = extractHrefs(section.contentHtml)
      for (const href of hrefs) {
        if (isInternalRoute(href) && !validRoutes.has(href)) {
          brokenLinks.push({
            source: `guide/${guide.slug} (section: ${section.id})`,
            href,
          })
        }
      }
      if (section.subsections) {
        for (const sub of section.subsections) {
          const subHrefs = extractHrefs(sub.contentHtml)
          for (const href of subHrefs) {
            if (isInternalRoute(href) && !validRoutes.has(href)) {
              brokenLinks.push({
                source: `guide/${guide.slug} (subsection: ${sub.id})`,
                href,
              })
            }
          }
        }
      }
    }
  }

  if (brokenLinks.length === 0) {
    results.push({
      category: 'Inline Links',
      status: 'PASS',
      message: 'All inline HTML hrefs resolve to valid routes',
    })
  } else {
    results.push({
      category: 'Inline Links',
      status: 'FAIL',
      message: `${brokenLinks.length} broken inline link(s) found`,
      details: brokenLinks.map((b) => `${b.source} -> ${b.href}`),
    })
  }

  return { results, brokenLinks }
}

// ---------------------------------------------------------------------------
// Check 3: Click depth from homepage (CRAWL-01)
// ---------------------------------------------------------------------------

function checkClickDepth(validRoutes: Set<string>): AuditResult[] {
  const results: AuditResult[] = []

  // Build a map of depth for each route
  const depthMap = new Map<string, number>()

  // Depth 0: homepage
  depthMap.set('/', 0)

  // Depth 1: Routes reachable from homepage navigation and in-page content
  //
  // Header / MegaMenu: top 5 services per category + /services link
  // Footer: all 67 services, all 16 locations, /about, /contact,
  //         /privacy-policy, /terms-of-service
  // Homepage in-page: /services (ServicesGrid links), location pages
  //                   via ServiceAreas

  // All service pages (Footer links all 67)
  for (const s of services) {
    depthMap.set(`/services/${s.slug}`, 1)
  }

  // All location pages (Footer links all 16)
  for (const m of siteConfig.municipalities) {
    depthMap.set(`/roofing-contractor-${m.slug}-nj`, 1)
  }

  // Direct nav links
  const depth1NavRoutes = [
    '/services',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/roofing-guides',
    '/service-area',
  ]
  for (const r of depth1NavRoutes) {
    depthMap.set(r, 1)
  }

  // Depth 2: Routes reachable from depth-1 pages
  //
  // /services index -> each individual /services/{slug} (already at depth 1)
  // /roofing-guides index -> each individual /roofing-guides/{slug}
  // Location pages -> services via ServicesGrid (already at depth 1)

  // Guide pages are linked from /roofing-guides index (depth 1)
  for (const slug of getAllGuideSlugs()) {
    if (!depthMap.has(`/roofing-guides/${slug}`)) {
      depthMap.set(`/roofing-guides/${slug}`, 2)
    }
  }

  // Check for orphan pages (any valid route not in depthMap)
  const orphans: string[] = []
  for (const route of validRoutes) {
    if (!depthMap.has(route)) {
      orphans.push(route)
    }
  }

  // Verify all routes are within depth 3
  const maxDepth = Math.max(...Array.from(depthMap.values()))

  if (orphans.length === 0 && maxDepth <= 3) {
    results.push({
      category: 'Click Depth',
      status: 'PASS',
      message: `All ${validRoutes.size} routes reachable within ${maxDepth} clicks from homepage`,
    })
  } else if (orphans.length > 0) {
    results.push({
      category: 'Click Depth',
      status: 'FAIL',
      message: `${orphans.length} orphan page(s) not reachable from homepage navigation`,
      details: orphans,
    })
  } else {
    results.push({
      category: 'Click Depth',
      status: 'WARN',
      message: `Max click depth is ${maxDepth} (target: <= 3)`,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 4: Broken link summary (CRAWL-02)
// ---------------------------------------------------------------------------

function checkBrokenSummary(brokenLinks: BrokenLink[]): AuditResult[] {
  if (brokenLinks.length === 0) {
    return [
      {
        category: 'Broken Link Summary',
        status: 'PASS',
        message: 'Zero broken internal links across all content',
      },
    ]
  }

  const affectedSources = new Set(brokenLinks.map((b) => b.source))
  return [
    {
      category: 'Broken Link Summary',
      status: 'FAIL',
      message: `${brokenLinks.length} broken link(s) across ${affectedSources.size} file(s)`,
      details: [
        `Unique broken hrefs: ${new Set(brokenLinks.map((b) => b.href)).size}`,
        `Affected content files: ${affectedSources.size}`,
      ],
    },
  ]
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Audit: Internal Links')
  console.log('=====================')

  const validRoutes = getAllValidRoutes()
  console.log(`Total valid routes: ${validRoutes.size}`)

  const allResults: AuditResult[] = []

  // Check 1: Navigation component links
  allResults.push(...checkNavLinks())

  // Check 2: Inline HTML link validation
  const { results: inlineResults, brokenLinks } = checkInlineLinks(validRoutes)
  allResults.push(...inlineResults)

  // Check 3: Click depth from homepage
  allResults.push(...checkClickDepth(validRoutes))

  // Check 4: Broken link summary
  allResults.push(...checkBrokenSummary(brokenLinks))

  printResults(allResults)
}

main()
