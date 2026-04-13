/**
 * Audit: CRO (Conversion Rate Optimization)
 *
 * Validates CRO element presence and Core Web Vitals:
 *   Check 1 -- CTA/Trust section presence per page type (D-09, D-12)
 *   Check 2 -- Phone link tracking attributes (D-13)
 *   Check 3 -- Image optimization (D-16)
 *   Check 4 -- Sticky call button presence (D-08)
 *   Check 5 -- Core Web Vitals via Lighthouse (D-14, D-15)
 *
 * Usage: npm run audit:cro
 *
 * Note: Check 5 (Lighthouse) is non-blocking. If localhost:3000 is not
 * running or Chrome/Lighthouse is unavailable, a WARN is emitted (not FAIL).
 * To get full CWV results: npm run build && npm start, then npm run audit:cro
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { printResults, type AuditResult } from './utils/reporter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

/** Read a source file relative to project root */
function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')
}

/** Recursively find files matching a pattern in a directory */
function findFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, pattern))
    } else if (pattern.test(entry.name)) {
      results.push(fullPath)
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Check 1: CTA/Trust section presence per page type (D-09, D-12)
// ---------------------------------------------------------------------------

interface PageCroSpec {
  pageType: string
  filePath: string
  expectedComponents: string[]
}

const PAGE_CRO_SPECS: PageCroSpec[] = [
  {
    pageType: 'Homepage',
    filePath: 'app/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'Location pages',
    filePath: 'app/[locationSlug]/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'Service pages',
    filePath: 'app/services/[serviceSlug]/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'Guide pages',
    filePath: 'app/roofing-guides/[guideSlug]/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'About page',
    filePath: 'app/about/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'Contact page',
    filePath: 'app/contact/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA'],
  },
  {
    pageType: 'Service Area page',
    filePath: 'app/service-area/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm'],
  },
  {
    pageType: 'Services index',
    filePath: 'app/services/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA'],
  },
  {
    pageType: 'Guides index',
    filePath: 'app/roofing-guides/page.tsx',
    expectedComponents: ['WhyChooseUs', 'Testimonials', 'EmergencyCTA'],
  },
]

function checkCroSections(): AuditResult[] {
  const results: AuditResult[] = []

  console.log('  CTA/Trust Section Presence:')
  console.log('  Page Type            | WhyChooseUs | Testimonials | EmergencyCTA | ContactForm')
  console.log('  ---------------------|-------------|--------------|--------------|------------')

  for (const spec of PAGE_CRO_SPECS) {
    let src: string
    try {
      src = readSource(spec.filePath)
    } catch {
      results.push({
        category: `CRO: ${spec.pageType}`,
        status: 'FAIL',
        message: `File not found: ${spec.filePath}`,
      })
      continue
    }

    const missing: string[] = []
    const present: string[] = []

    for (const component of spec.expectedComponents) {
      if (src.includes(component)) {
        present.push(component)
      } else {
        missing.push(component)
      }
    }

    // Print table row
    const padType = spec.pageType.padEnd(21)
    const cols = ['WhyChooseUs', 'Testimonials', 'EmergencyCTA', 'ContactForm']
    const row = cols
      .map((c) => {
        if (!spec.expectedComponents.includes(c)) return '    N/A     '
        return src.includes(c) ? '     Y      ' : '     N      '
      })
      .join('|')
    console.log(`  ${padType}|${row}`)

    if (missing.length === 0) {
      results.push({
        category: `CRO: ${spec.pageType}`,
        status: 'PASS',
        message: `All expected CRO components present (${present.join(', ')})`,
      })
    } else {
      results.push({
        category: `CRO: ${spec.pageType}`,
        status: 'WARN',
        message: `Missing ${missing.length} component(s): ${missing.join(', ')}`,
        details: missing.map(
          (m) => `Add <${m} /> to ${spec.filePath}`
        ),
      })
    }
  }

  console.log('')
  return results
}

// ---------------------------------------------------------------------------
// Check 2: Phone link tracking attributes (D-13)
// ---------------------------------------------------------------------------

function checkPhoneTracking(): AuditResult[] {
  const results: AuditResult[] = []

  const phoneFiles = [
    'components/ui/PhoneButton.tsx',
    'components/sections/EmergencyCTA.tsx',
    'components/layout/Footer.tsx',
  ]

  const issues: string[] = []

  for (const file of phoneFiles) {
    let src: string
    try {
      src = readSource(file)
    } catch {
      continue
    }

    // Check if file contains tel: links
    if (!src.includes('tel:')) continue

    // Check for tracking attribute
    if (!src.includes('data-action')) {
      issues.push(`${file}: phone link missing data-action="call" tracking attribute`)
    }
  }

  if (issues.length === 0) {
    results.push({
      category: 'Phone Tracking',
      status: 'PASS',
      message: 'All phone links have tracking attributes',
    })
  } else {
    results.push({
      category: 'Phone Tracking',
      status: 'WARN',
      message: `${issues.length} phone link(s) missing tracking attributes`,
      details: issues,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 3: Image optimization (D-16)
// ---------------------------------------------------------------------------

function checkImageOptimization(): AuditResult[] {
  const results: AuditResult[] = []

  // Find all TSX files in app/ and components/
  const appFiles = findFiles(path.join(ROOT, 'app'), /\.tsx$/)
  const componentFiles = findFiles(path.join(ROOT, 'components'), /\.tsx$/)
  const allFiles = [...appFiles, ...componentFiles]

  const rawImgUsage: string[] = []
  let nextImageImports = 0

  for (const file of allFiles) {
    const src = fs.readFileSync(file, 'utf-8')
    const relativePath = path.relative(ROOT, file)

    // Check for raw <img tags (not in comments or dangerouslySetInnerHTML content)
    const lines = src.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      // Skip comments
      if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) continue
      // Skip lines that are inside dangerouslySetInnerHTML or template literals
      if (line.includes('dangerouslySetInnerHTML') || line.includes('`<img')) continue

      if (/<img\s/i.test(line) && !line.includes('next/image')) {
        rawImgUsage.push(`${relativePath}:${i + 1}`)
      }
    }

    // Count next/image imports
    if (src.includes("from 'next/image'") || src.includes('from "next/image"')) {
      nextImageImports++
    }
  }

  if (rawImgUsage.length === 0) {
    results.push({
      category: 'Image Optimization',
      status: 'PASS',
      message: `No raw <img> tags found. next/image used in ${nextImageImports} file(s)`,
    })
  } else {
    results.push({
      category: 'Image Optimization',
      status: 'WARN',
      message: `${rawImgUsage.length} raw <img> tag(s) found -- use next/image instead`,
      details: rawImgUsage,
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 4: Sticky call button presence (D-08)
// ---------------------------------------------------------------------------

function checkStickyCallButton(): AuditResult[] {
  const results: AuditResult[] = []

  let layoutSrc: string
  try {
    layoutSrc = readSource('app/layout.tsx')
  } catch {
    results.push({
      category: 'Sticky Call Button',
      status: 'FAIL',
      message: 'app/layout.tsx not found',
    })
    return results
  }

  if (layoutSrc.includes('StickyCallButton')) {
    results.push({
      category: 'Sticky Call Button',
      status: 'PASS',
      message: 'StickyCallButton component present in root layout',
    })
  } else {
    results.push({
      category: 'Sticky Call Button',
      status: 'WARN',
      message: 'StickyCallButton not found in root layout (will be added in Plan 02)',
    })
  }

  return results
}

// ---------------------------------------------------------------------------
// Check 5: Core Web Vitals via Lighthouse (D-14, D-15)
// ---------------------------------------------------------------------------

const CWV_THRESHOLDS = {
  LCP: 2500, // ms -- "Good" is < 2.5s
  CLS: 0.1, // unitless -- "Good" is < 0.1
  TBT: 200, // ms -- proxy for INP, "Good" is < 200ms
}

const samplePages = [
  { name: 'Homepage', path: '/' },
  { name: 'Location (Paterson)', path: '/roofing-contractor-paterson-nj' },
  { name: 'Service (Roof Repair)', path: '/services/roof-repair' },
  {
    name: 'Guide (Complete NJ Guide)',
    path: '/roofing-guides/complete-nj-roofing-guide-homeowners',
  },
]

function checkCoreWebVitals(): AuditResult[] {
  const results: AuditResult[] = []

  // First check if localhost:3000 is responding
  let serverRunning = false
  try {
    execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', {
      encoding: 'utf-8',
      timeout: 5000,
    })
    serverRunning = true
  } catch {
    serverRunning = false
  }

  if (!serverRunning) {
    results.push({
      category: 'CWV',
      status: 'WARN',
      message:
        'Lighthouse check skipped -- ensure localhost:3000 is running (npm run build && npm start) and Chrome is installed. Run manually: npx lighthouse http://localhost:3000 --view',
    })
    return results
  }

  let anyFailed = false

  for (const page of samplePages) {
    try {
      const result = execSync(
        `npx lighthouse http://localhost:3000${page.path} --output=json --quiet --chrome-flags="--headless --no-sandbox" --only-categories=performance`,
        { encoding: 'utf-8', timeout: 120000 }
      )
      const report = JSON.parse(result)

      const lcp: number | null =
        report.audits?.['largest-contentful-paint']?.numericValue ?? null
      const cls: number | null =
        report.audits?.['cumulative-layout-shift']?.numericValue ?? null
      // INP is not directly measured by Lighthouse lab tests; use TBT as proxy
      const tbt: number | null =
        report.audits?.['total-blocking-time']?.numericValue ?? null

      const metrics: string[] = []
      let pageStatus: AuditResult['status'] = 'PASS'

      // LCP evaluation
      if (lcp !== null) {
        const lcpSec = (lcp / 1000).toFixed(1)
        if (lcp > 4000) {
          metrics.push(`LCP: ${lcpSec}s (> 4.0s CRITICAL)`)
          pageStatus = 'FAIL'
          anyFailed = true
        } else if (lcp > CWV_THRESHOLDS.LCP) {
          metrics.push(`LCP: ${lcpSec}s (> 2.5s)`)
          if (pageStatus !== 'FAIL') pageStatus = 'WARN'
        } else {
          metrics.push(`LCP: ${lcpSec}s (< 2.5s)`)
        }
      }

      // CLS evaluation
      if (cls !== null) {
        const clsFmt = cls.toFixed(3)
        if (cls > 0.25) {
          metrics.push(`CLS: ${clsFmt} (> 0.25 CRITICAL)`)
          pageStatus = 'FAIL'
          anyFailed = true
        } else if (cls > CWV_THRESHOLDS.CLS) {
          metrics.push(`CLS: ${clsFmt} (> 0.1)`)
          if (pageStatus !== 'FAIL') pageStatus = 'WARN'
        } else {
          metrics.push(`CLS: ${clsFmt} (< 0.1)`)
        }
      }

      // TBT evaluation (INP proxy)
      if (tbt !== null) {
        const tbtMs = Math.round(tbt)
        if (tbt > 600) {
          metrics.push(`TBT: ${tbtMs}ms (> 600ms CRITICAL)`)
          pageStatus = 'FAIL'
          anyFailed = true
        } else if (tbt > CWV_THRESHOLDS.TBT) {
          metrics.push(`TBT: ${tbtMs}ms (> 200ms)`)
          if (pageStatus !== 'FAIL') pageStatus = 'WARN'
        } else {
          metrics.push(`TBT: ${tbtMs}ms (< 200ms)`)
        }
      }

      results.push({
        category: `CWV: ${page.name}`,
        status: pageStatus,
        message: metrics.join(', '),
      })
    } catch (err) {
      results.push({
        category: `CWV: ${page.name}`,
        status: 'WARN',
        message: `Lighthouse failed for ${page.path} -- ${err instanceof Error ? err.message.split('\n')[0] : 'unknown error'}`,
      })
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Audit: CRO & Core Web Vitals')
  console.log('============================')
  console.log('')

  const allResults: AuditResult[] = []

  // Check 1: CTA/Trust section presence
  allResults.push(...checkCroSections())

  // Check 2: Phone link tracking attributes
  allResults.push(...checkPhoneTracking())

  // Check 3: Image optimization
  allResults.push(...checkImageOptimization())

  // Check 4: Sticky call button presence
  allResults.push(...checkStickyCallButton())

  // Check 5: Core Web Vitals via Lighthouse
  allResults.push(...checkCoreWebVitals())

  printResults(allResults)
}

main()
