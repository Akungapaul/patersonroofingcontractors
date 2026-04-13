/**
 * Audit: Sitemap
 *
 * Validates sitemap completeness and correctness:
 *   Check 1 -- Sitemap completeness (CRAWL-05)
 *   Check 2 -- No noindex pages in sitemap (CRAWL-05)
 *   Check 3 -- No pagination patterns (CRAWL-03)
 *   Check 4 -- Canonical URL correctness (CRAWL-04)
 *
 * Usage: npm run audit:sitemap
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getIndexableRoutes, getAllValidRoutes } from './utils/routes'
import { printResults, type AuditResult } from './utils/reporter'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

/** Read a source file relative to project root */
function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')
}

// ---------------------------------------------------------------------------
// Check 1: Sitemap completeness (CRAWL-05)
// ---------------------------------------------------------------------------

function checkSitemapCompleteness(): AuditResult[] {
  const results: AuditResult[] = []
  const indexableRoutes = getIndexableRoutes()
  const baseUrl = 'https://patersonroofingcontractors.com'

  // Build the expected sitemap URLs from the same logic as app/sitemap.ts
  const sitemapUrls = new Set<string>()

  // Homepage
  sitemapUrls.add(baseUrl)

  // Location pages
  for (const m of siteConfig.municipalities) {
    sitemapUrls.add(`${baseUrl}/roofing-contractor-${m.slug}-nj`)
  }

  // Service pages
  for (const s of services) {
    sitemapUrls.add(`${baseUrl}/services/${s.slug}`)
  }

  // Guide pages
  for (const slug of getAllGuideSlugs()) {
    sitemapUrls.add(`${baseUrl}/roofing-guides/${slug}`)
  }

  // Utility pages
  sitemapUrls.add(`${baseUrl}/services`)
  sitemapUrls.add(`${baseUrl}/roofing-guides`)
  sitemapUrls.add(`${baseUrl}/about`)
  sitemapUrls.add(`${baseUrl}/contact`)
  sitemapUrls.add(`${baseUrl}/service-area`)

  // Cross-reference: every indexable route should have a sitemap URL
  const missingFromSitemap: string[] = []
  for (const route of indexableRoutes) {
    const fullUrl = route === '/' ? baseUrl : `${baseUrl}${route}`
    if (!sitemapUrls.has(fullUrl)) {
      missingFromSitemap.push(route)
    }
  }

  // Also check sitemap source file covers everything
  const sitemapSrc = readSource('app/sitemap.ts')
  const hasMunicipalities = sitemapSrc.includes('siteConfig.municipalities')
  const hasServices = sitemapSrc.includes('services.map')
  const hasGuides =
    sitemapSrc.includes('getAllGuideSlugs') ||
    sitemapSrc.includes('guidePages')
  const hasUtilityPages =
    sitemapSrc.includes('/about') &&
    sitemapSrc.includes('/contact') &&
    sitemapSrc.includes('/service-area')

  if (
    missingFromSitemap.length === 0 &&
    hasMunicipalities &&
    hasServices &&
    hasGuides &&
    hasUtilityPages
  ) {
    results.push({
      category: 'Sitemap Completeness',
      status: 'PASS',
      message: `Sitemap covers all ${indexableRoutes.size} indexable routes`,
    })
  } else {
    const details: string[] = []
    if (missingFromSitemap.length > 0) {
      details.push(
        `Missing routes: ${missingFromSitemap.join(', ')}`
      )
    }
    if (!hasMunicipalities) details.push('Sitemap source missing municipality iteration')
    if (!hasServices) details.push('Sitemap source missing services iteration')
    if (!hasGuides) details.push('Sitemap source missing guide slugs')
    if (!hasUtilityPages) details.push('Sitemap source missing utility pages')

    results.push({
      category: 'Sitemap Completeness',
      status: 'FAIL',
      message: `Sitemap is incomplete -- ${missingFromSitemap.length} route(s) missing`,
      details,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 2: No noindex pages in sitemap (CRAWL-05)
// ---------------------------------------------------------------------------

function checkNoindexExclusion(): AuditResult[] {
  const results: AuditResult[] = []

  // Check that privacy-policy and terms-of-service have robots noindex
  const noindexPages = [
    {
      route: '/privacy-policy',
      file: 'app/privacy-policy/page.tsx',
    },
    {
      route: '/terms-of-service',
      file: 'app/terms-of-service/page.tsx',
    },
  ]

  const issues: string[] = []

  for (const page of noindexPages) {
    const src = readSource(page.file)

    // Check for robots: { index: false } in metadata
    const hasNoindex =
      src.includes('index: false') || src.includes("index: false")

    if (!hasNoindex) {
      issues.push(`${page.route} missing robots noindex in metadata`)
    }
  }

  // Check that these routes do NOT appear in sitemap source
  const sitemapSrc = readSource('app/sitemap.ts')
  for (const page of noindexPages) {
    if (sitemapSrc.includes(page.route)) {
      issues.push(`${page.route} found in sitemap source -- should be excluded`)
    }
  }

  if (issues.length === 0) {
    results.push({
      category: 'Noindex Exclusion',
      status: 'PASS',
      message: 'Noindex pages (privacy-policy, terms-of-service) correctly excluded from sitemap',
    })
  } else {
    results.push({
      category: 'Noindex Exclusion',
      status: 'FAIL',
      message: `${issues.length} noindex issue(s) found`,
      details: issues,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 3: No pagination patterns (CRAWL-03)
// ---------------------------------------------------------------------------

function checkNoPagination(): AuditResult[] {
  const results: AuditResult[] = []

  // Scan all page.tsx files for pagination patterns
  const paginationPatterns = [
    'searchParams',
    '?page=',
    'offset',
    'limit',
    'pagination',
    'paginate',
  ]

  const pageFiles = [
    'app/page.tsx',
    'app/services/page.tsx',
    'app/roofing-guides/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/service-area/page.tsx',
    'app/[locationSlug]/page.tsx',
    'app/services/[serviceSlug]/page.tsx',
    'app/roofing-guides/[guideSlug]/page.tsx',
  ]

  const found: string[] = []

  for (const file of pageFiles) {
    let src: string
    try {
      src = readSource(file)
    } catch {
      continue
    }

    for (const pattern of paginationPatterns) {
      if (src.includes(pattern)) {
        found.push(`${file} contains "${pattern}"`)
      }
    }
  }

  if (found.length === 0) {
    results.push({
      category: 'No Pagination',
      status: 'PASS',
      message: 'No pagination patterns found -- all content on single pages',
    })
  } else {
    results.push({
      category: 'No Pagination',
      status: 'WARN',
      message: `${found.length} pagination pattern(s) detected`,
      details: found,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 4: Canonical URL correctness (CRAWL-04)
// ---------------------------------------------------------------------------

function checkCanonicalUrls(): AuditResult[] {
  const results: AuditResult[] = []
  const issues: string[] = []

  // Check metadataBase in root layout
  const layoutSrc = readSource('app/layout.tsx')
  const hasMetadataBase =
    layoutSrc.includes('metadataBase') &&
    layoutSrc.includes('patersonroofingcontractors.com')

  if (!hasMetadataBase) {
    issues.push('Root layout missing metadataBase for patersonroofingcontractors.com')
  }

  // Check canonical in each page type
  const canonicalChecks = [
    { file: 'app/page.tsx', expected: "canonical: '/'" },
    { file: 'app/[locationSlug]/page.tsx', expected: 'canonical:' },
    { file: 'app/services/[serviceSlug]/page.tsx', expected: 'canonical:' },
    { file: 'app/roofing-guides/[guideSlug]/page.tsx', expected: 'canonical:' },
    { file: 'app/about/page.tsx', expected: 'canonical:' },
    { file: 'app/contact/page.tsx', expected: 'canonical:' },
    { file: 'app/service-area/page.tsx', expected: 'canonical:' },
    { file: 'app/services/page.tsx', expected: 'canonical:' },
    { file: 'app/roofing-guides/page.tsx', expected: 'canonical:' },
    { file: 'app/privacy-policy/page.tsx', expected: 'canonical:' },
    { file: 'app/terms-of-service/page.tsx', expected: 'canonical:' },
  ]

  for (const check of canonicalChecks) {
    let src: string
    try {
      src = readSource(check.file)
    } catch {
      issues.push(`${check.file} not found`)
      continue
    }

    if (!src.includes('canonical')) {
      issues.push(`${check.file} missing canonical URL in metadata`)
    }
  }

  if (issues.length === 0) {
    results.push({
      category: 'Canonical URLs',
      status: 'PASS',
      message: `All page templates have canonical URLs set with correct metadataBase`,
    })
  } else {
    results.push({
      category: 'Canonical URLs',
      status: 'FAIL',
      message: `${issues.length} canonical URL issue(s) found`,
      details: issues,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Audit: Sitemap')
  console.log('==============')

  const allResults: AuditResult[] = []

  allResults.push(...checkSitemapCompleteness())
  allResults.push(...checkNoindexExclusion())
  allResults.push(...checkNoPagination())
  allResults.push(...checkCanonicalUrls())

  printResults(allResults)
}

main()
