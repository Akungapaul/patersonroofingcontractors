/**
 * Audit: JSON-LD Schema
 *
 * Validates JSON-LD schema presence per page type by reading source files
 * and checking for expected schema builder function calls.
 *
 * Expected schemas per page type:
 *   Homepage:       LocalBusiness + Organization + BreadcrumbList
 *   Location pages: LocalBusiness + FAQPage + BreadcrumbList
 *   Service pages:  Service + FAQPage + BreadcrumbList
 *   Guide pages:    FAQPage + BreadcrumbList
 *   Utility pages:  BreadcrumbList
 *   Legal pages:    BreadcrumbList
 *
 * Usage: npm run audit:schema
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { printResults, type AuditResult } from './utils/reporter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

/** Read a source file relative to project root */
function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')
}

interface SchemaExpectation {
  pageType: string
  filePath: string
  expected: {
    buildLocalBusinessSchema?: boolean
    buildOrganizationSchema?: boolean
    buildServiceSchema?: boolean
    buildFaqSchema?: boolean
    breadcrumbs?: boolean // Breadcrumbs component or buildBreadcrumbSchema
  }
}

const PAGE_SCHEMAS: SchemaExpectation[] = [
  {
    pageType: 'Homepage',
    filePath: 'app/page.tsx',
    expected: {
      buildLocalBusinessSchema: true,
      buildOrganizationSchema: true,
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Location pages',
    filePath: 'app/[locationSlug]/page.tsx',
    expected: {
      buildLocalBusinessSchema: true,
      buildFaqSchema: true,
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Service pages',
    filePath: 'app/services/[serviceSlug]/page.tsx',
    expected: {
      buildServiceSchema: true,
      buildFaqSchema: true,
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Guide pages',
    filePath: 'app/roofing-guides/[guideSlug]/page.tsx',
    expected: {
      buildFaqSchema: true,
      breadcrumbs: true,
    },
  },
  {
    pageType: 'About page',
    filePath: 'app/about/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Contact page',
    filePath: 'app/contact/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Service Area page',
    filePath: 'app/service-area/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Services index',
    filePath: 'app/services/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Guides index',
    filePath: 'app/roofing-guides/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Privacy Policy',
    filePath: 'app/privacy-policy/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
  {
    pageType: 'Terms of Service',
    filePath: 'app/terms-of-service/page.tsx',
    expected: {
      breadcrumbs: true,
    },
  },
]

function checkSchemas(): AuditResult[] {
  const results: AuditResult[] = []

  for (const spec of PAGE_SCHEMAS) {
    let src: string
    try {
      src = readSource(spec.filePath)
    } catch {
      results.push({
        category: `Schema: ${spec.pageType}`,
        status: 'FAIL',
        message: `File not found: ${spec.filePath}`,
      })
      continue
    }

    const missing: string[] = []

    if (spec.expected.buildLocalBusinessSchema) {
      if (!src.includes('buildLocalBusinessSchema')) {
        missing.push('LocalBusiness (buildLocalBusinessSchema)')
      }
    }

    if (spec.expected.buildOrganizationSchema) {
      if (!src.includes('buildOrganizationSchema')) {
        missing.push('Organization (buildOrganizationSchema)')
      }
    }

    if (spec.expected.buildServiceSchema) {
      if (!src.includes('buildServiceSchema')) {
        missing.push('Service (buildServiceSchema)')
      }
    }

    if (spec.expected.buildFaqSchema) {
      if (!src.includes('buildFaqSchema')) {
        missing.push('FAQPage (buildFaqSchema)')
      }
    }

    if (spec.expected.breadcrumbs) {
      const hasBreadcrumbs =
        src.includes('Breadcrumbs') || src.includes('buildBreadcrumbSchema')
      if (!hasBreadcrumbs) {
        missing.push('BreadcrumbList (Breadcrumbs component or buildBreadcrumbSchema)')
      }
    }

    if (missing.length === 0) {
      results.push({
        category: `Schema: ${spec.pageType}`,
        status: 'PASS',
        message: `All expected schemas present in ${spec.filePath}`,
      })
    } else {
      results.push({
        category: `Schema: ${spec.pageType}`,
        status: 'FAIL',
        message: `Missing ${missing.length} schema(s) in ${spec.filePath}`,
        details: missing,
      })
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Audit: JSON-LD Schema')
  console.log('=====================')

  const results = checkSchemas()
  printResults(results)
}

main()
