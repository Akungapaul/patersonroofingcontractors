# Phase 4: Silo Linking, Crawl Health & CRO Polish - Research

**Researched:** 2026-04-13
**Domain:** Internal linking audit, crawl health validation, schema markup, CRO polish, audit tooling
**Confidence:** HIGH

## Summary

Phase 4 is a comprehensive audit-and-fix phase for a ~100-page Next.js SSG roofing contractor site. The site's content and page templates are complete from Phases 1-3. This phase builds permanent Node.js/TypeScript audit scripts, fixes issues discovered, adds missing CRO elements (sticky call button, trust sections on guide pages, EmergencyCTA on utility pages), and adds tracking data attributes to phone links.

**Critical finding during research:** There are **7 broken inline service link slugs** across content HTML (introHtml, overviewHtml), affecting **55+ link instances** across 16 city content files and 10 guide content files. These use shortened/incorrect slugs (e.g., `roof-replacement` instead of `re-roofing`, `storm-damage-repair` instead of `storm-damage-roof-repair`). The audit script will systematically find these, but the planner should anticipate a significant link-fixing task.

**Primary recommendation:** Build the four audit scripts first (links, schema, sitemap, CRO), run them to generate findings, then batch-fix all issues identified. This ensures no issues are missed and creates permanent reusable tooling.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Verify-only approach for structural links -- audit existing component-based links (RelatedLocations, RelatedServices, CityLinks, MegaMenu, Footer, MobileNav) for correctness. Do NOT add new contextual/inline content links.
- **D-02:** Full audit scope covering both navigation components (MegaMenu, Footer, MobileNav) AND in-page structural links (RelatedLocations, RelatedServices, CityLinks).
- **D-03:** Also verify inline silo links within content HTML (introHtml, overviewHtml) from Phase 2/3 are valid -- check hrefs point to real pages, no broken slugs.
- **D-04:** Keep current link asymmetry: location pages link to top 6-8 services via ServicesGrid; service pages link to all 16 locations via RelatedLocations. Do not expand.
- **D-05:** Build automated Node.js/TypeScript audit scripts that programmatically check all ~100 pages. Store in `scripts/` directory with npm run commands for reuse.
- **D-06:** Four audit script categories: `npm run audit:links`, `npm run audit:schema`, `npm run audit:sitemap`, `npm run audit:cro`
- **D-07:** Scripts kept as permanent reusable tooling for ongoing maintenance, content updates, and renter handoff QA.
- **D-08:** Mobile CRO: Add sticky floating phone call button (amber, bottom-right) on mobile for tap-to-call. Always visible while scrolling.
- **D-09:** Trust signal consistency: WhyChooseUs + Testimonials sections on ALL content pages (locations, services, AND guides). Every page is a potential search landing page.
- **D-10:** Form UX: Minimal changes -- keep current fields. Polish labels, placeholder text, validation messages, loading states, and mobile field sizing. Do not remove fields.
- **D-11:** Visual hierarchy: Ensure CTA buttons have sufficient contrast, headings guide scanning, phone/form actions are visually dominant.
- **D-12:** Emergency CTA: Expand EmergencyCTA to appear on ALL page types (service, guide, utility) -- not just homepage and location pages.
- **D-13:** Add click-to-call tracking data attributes (data-action="call", data-location="{city}") on phone links for future v2 analytics integration. Zero runtime cost.
- **D-14:** Target Google "Good" Core Web Vitals thresholds: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **D-15:** Measure via Lighthouse programmatically in audit scripts on sample pages.
- **D-16:** Audit and fix image optimization: check all image usages for proper next/image usage, width/height, lazy loading, placeholder props. Fix any raw `<img>` or missing optimization.

### Claude's Discretion
- Specific audit script implementation details and output format
- Order of fix implementation (links first, then CRO, then performance, or interleaved)
- Exact Lighthouse configuration and sample page selection
- Sticky call button positioning and animation details
- Which pages need WhyChooseUs/Testimonials added (audit determines current state)
- Image optimization specific fixes (varies by current codebase state)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SILO-04 | Internal linking follows silo structure (location <-> services, guides -> services/locations) | Audit script `audit:links` validates component-based links and inline HTML links; 7 broken slug patterns identified requiring fix |
| CRAWL-01 | No orphan pages (every page reachable within 3 clicks from homepage) | Audit script `audit:links` calculates click depth from homepage using nav components + in-page links; current architecture supports 2-click depth for most pages via MegaMenu/Footer |
| CRAWL-02 | No redirect chains or broken internal links | Audit script `audit:links` validates all href targets against known routes from generateStaticParams + static pages; 55+ broken inline links found requiring fix |
| CRAWL-03 | Pagination avoided (all content on single pages) | Already satisfied -- no pagination exists in the codebase. Audit script verifies. |
| CRAWL-04 | No duplicate content (canonicals, unique content, no parameter URLs) | Audit script `audit:sitemap` verifies canonical URLs match actual page URLs; all pages already set `alternates.canonical` |
| CRAWL-05 | Efficient sitemap (no noindex pages in sitemap) | Current sitemap does NOT include privacy-policy or terms-of-service (which are noindex). Already correct. Audit script validates. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | Framework | All pages are SSG via App Router with generateStaticParams [VERIFIED: package.json] |
| TypeScript | ^5 | Type safety | Audit scripts written in TypeScript for consistency [VERIFIED: package.json] |
| schema-dts | ^2.0.0 | Schema.org types | Type-safe JSON-LD validation in audit scripts [VERIFIED: package.json] |

### Audit Script Dependencies (New)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tsx | latest | TypeScript execution | Run .ts audit scripts directly without compilation. `npx tsx scripts/audit-links.ts` [ASSUMED] |
| cheerio | latest | HTML parsing | Parse dangerouslySetInnerHTML content (introHtml, overviewHtml) to extract and validate inline href links [ASSUMED] |

### Why tsx + cheerio
- **tsx:** Node.js 25 does not natively run TypeScript files with path aliases (`@/lib/*`). `tsx` provides seamless TypeScript execution with ESM support. Alternative: compile with `tsc` first, but that adds build complexity for scripts. [ASSUMED]
- **cheerio:** The content HTML strings contain `<a href="...">` links that need parsing to extract hrefs. A regex approach would be fragile. Cheerio provides proper HTML DOM parsing at minimal cost (~200KB). Alternative: use a regex like `href="([^"]*)"` which would work for this specific case since content is well-structured. [ASSUMED]

**Note on tsx:** The audit scripts can alternatively use `npx tsx` (no global install needed) or be written as plain `.mjs` files importing data directly. The planner should decide based on import alias requirements.

## Architecture Patterns

### Recommended Audit Script Structure
```
scripts/
  audit-links.ts       # Internal link validation
  audit-schema.ts      # JSON-LD schema validation
  audit-sitemap.ts     # Sitemap completeness check
  audit-cro.ts         # CTA/conversion element audit
  utils/
    routes.ts          # Generate complete route list from data
    reporter.ts        # Shared console output formatting
```

### Pattern 1: Route Registry from Data Sources
**What:** Build a complete set of all valid routes by reading the same data sources the app uses (siteConfig.municipalities, services, guides, static pages)
**When to use:** Every audit script needs this to validate links
**Example:**
```typescript
// Source: Codebase analysis of generateStaticParams patterns
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'

function getAllValidRoutes(): Set<string> {
  const routes = new Set<string>()

  // Homepage
  routes.add('/')

  // Location pages (16)
  siteConfig.municipalities.forEach(m => {
    routes.add(`/roofing-contractor-${m.slug}-nj`)
  })

  // Service pages (67)
  services.forEach(s => {
    routes.add(`/services/${s.slug}`)
  })

  // Guide pages (10)
  getAllGuideSlugs().forEach(slug => {
    routes.add(`/roofing-guides/${slug}`)
  })

  // Index pages
  routes.add('/services')
  routes.add('/roofing-guides')

  // Utility pages
  routes.add('/about')
  routes.add('/contact')
  routes.add('/service-area')
  routes.add('/privacy-policy')
  routes.add('/terms-of-service')

  return routes
}
```
[VERIFIED: codebase analysis -- all dynamic routes use generateStaticParams with these exact data sources]

### Pattern 2: HTML Content Link Extraction
**What:** Parse inline HTML content strings to extract all href values and validate against route registry
**When to use:** Audit script for D-03 (inline silo link validation)
**Example:**
```typescript
// Parse href attributes from HTML content strings
function extractHrefs(html: string): string[] {
  const hrefs: string[] = []
  const regex = /href="([^"]*)"/g
  let match
  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1])
  }
  return hrefs
}
```
[VERIFIED: Content files use simple `<a href="/services/...">` and `<a href="/roofing-contractor-...-nj">` patterns]

### Pattern 3: Schema Validation via Type Checking
**What:** Verify each page type renders the correct JSON-LD schema types
**When to use:** audit:schema script
**Expected schema per page type:**
```
Homepage:         LocalBusiness + Organization + BreadcrumbList
Location pages:   LocalBusiness + FAQPage + BreadcrumbList
Service pages:    Service + FAQPage + BreadcrumbList
Guide pages:      FAQPage + BreadcrumbList
Utility pages:    BreadcrumbList only
Legal pages:      BreadcrumbList only (noindex)
```
[VERIFIED: codebase analysis of all page.tsx files and their JsonLd component usage]

### Anti-Patterns to Avoid
- **Crawling localhost to audit links:** The site is SSG -- all routes and links are deterministic from data files. Do NOT spin up a dev server and crawl; instead, compute routes and links statically from the same data sources Next.js uses. This is faster, more reliable, and works in CI.
- **Regex for complex HTML parsing:** For the inline content links, a simple regex is sufficient since the HTML structure is consistent. But avoid regex for parsing full rendered pages.
- **Hardcoding route lists:** Always derive routes from `siteConfig.municipalities`, `services`, and guide content index. Never maintain a separate route list that could drift.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML link extraction | Custom parser | Regex or cheerio | Content HTML is simple anchor tags with predictable structure |
| Route validation | Manual list of URLs | Computed from data sources | Same data sources that generateStaticParams uses -- guaranteed to be in sync |
| Schema validation | Manual JSON checking | Type assertions + structure checks | schema-dts types already define valid structures |
| Lighthouse automation | Custom performance tool | Lighthouse CLI via `npx lighthouse` | Industry standard, produces actionable results |

## Codebase Audit: Current State Analysis

### Pages Missing WhyChooseUs and/or Testimonials (D-09)
[VERIFIED: grep of all page.tsx files]

| Page Type | WhyChooseUs | Testimonials | EmergencyCTA | Action |
|-----------|-------------|--------------|--------------|--------|
| Homepage (`app/page.tsx`) | Present | Present | Present | None |
| Location pages (`app/[locationSlug]/page.tsx`) | Present | Present | Present | None |
| Service pages (`app/services/[serviceSlug]/page.tsx`) | **MISSING** | Present | Present | Add WhyChooseUs |
| Guide pages (`app/roofing-guides/[guideSlug]/page.tsx`) | **MISSING** | **MISSING** | **MISSING** | Add all three |
| About page (`app/about/page.tsx`) | Present | **MISSING** | **MISSING** | Add Testimonials + EmergencyCTA |
| Contact page (`app/contact/page.tsx`) | **MISSING** | **MISSING** | **MISSING** | Add all three |
| Service Area page (`app/service-area/page.tsx`) | **MISSING** | **MISSING** | **MISSING** | Add all three |
| Services index (`app/services/page.tsx`) | **MISSING** | **MISSING** | **MISSING** | Add all three |
| Guides index (`app/roofing-guides/page.tsx`) | **MISSING** | **MISSING** | **MISSING** | Add all three |
| Privacy Policy | N/A | N/A | N/A | Legal -- no CRO sections |
| Terms of Service | N/A | N/A | N/A | Legal -- no CRO sections |

### Broken Inline Service Links (D-03)
[VERIFIED: grep + diff analysis of content files vs services.ts slugs]

| Broken Slug | Correct Slug | Occurrences | Files Affected |
|-------------|-------------|-------------|----------------|
| `roof-replacement` | `re-roofing` or context-specific replacement slug | 16 files | All 16 city content files |
| `storm-damage-repair` | `storm-damage-roof-repair` | 14 files | 14 city content files |
| `gutter-installation` | `gutter-installation-repair` | 12 files | 12 city content files |
| `metal-roof-installation` | `metal-roof-installation-repair` | 6 files | 6 city content files |
| `flat-roof-services` | `flat-roof-installation-repair` | 5 files | 5 city content files |
| `commercial-roofing` | `commercial-roof-installation` or `commercial-roof-repair` | 1 file | 1 city content file |
| `emergency-roofing` | `emergency-roof-repair` | 1 file | paterson.ts |

**Total: 55+ broken links requiring find-and-replace across data files.**

### Sitemap Correctness (CRAWL-05)
[VERIFIED: analysis of app/sitemap.ts]

The current sitemap correctly:
- Includes homepage (priority 1.0)
- Includes all 16 location pages (Paterson 0.9, others 0.8)
- Includes all 67 service pages (0.7)
- Includes all 10 guide pages (0.6)
- Includes utility pages: /services, /roofing-guides, /about, /contact, /service-area
- Does NOT include /privacy-policy or /terms-of-service (which have `robots: { index: false }`)
- Does NOT include /api/contact (disallowed in robots.txt)

**Total pages in sitemap: 1 + 16 + 67 + 10 + 5 = 99 pages** (legal pages excluded correctly)

### Click Depth Analysis (CRAWL-01)
[VERIFIED: analysis of navigation components and page templates]

From homepage:
- **1 click:** All pages linked from MegaMenu (top 5 per category = ~40 services), Footer (all 67 services + all 16 locations), About, Contact, Guides, Services index, Service Area
- **2 clicks:** Service pages NOT in MegaMenu top 5 (reachable via Services index page, or via Footer). Guide detail pages (via Guides index). Location-specific services (via location page ServicesGrid).
- **3 clicks:** None expected -- all pages should be reachable in 2 clicks maximum via Footer

**Key finding:** The Footer links ALL 67 services and ALL 16 locations directly, so the maximum click depth is 2 for any page. The audit script should verify this.

### Canonical URL Analysis (CRAWL-04)
[VERIFIED: all page.tsx files]

All pages set `alternates.canonical` correctly:
- Homepage: `/`
- Location pages: `/${locationSlug}` (relative)
- Service pages: `/services/${serviceSlug}` (relative)
- Guide pages: `/roofing-guides/${guideSlug}` (relative)
- Utility pages: `/about`, `/contact`, `/service-area` (relative)

Root layout sets `metadataBase: new URL('https://patersonroofingcontractors.com')` which resolves relative canonicals to absolute URLs.

### Phone Link Audit for Tracking Attributes (D-13)
[VERIFIED: grep of phone-related components]

Phone links exist in:
- `components/ui/PhoneButton.tsx` -- used in Header (desktop + mobile), MobileNav bottom, ContactForm success state
- `components/sections/EmergencyCTA.tsx` -- inline anchor tag
- `components/forms/ContactForm.tsx` -- info panel phone link
- `components/layout/Footer.tsx` -- two phone links (column 1 + column 4)

All need `data-action="call"` attribute added. Location-specific `data-location` attribute applies where context is available.

## Common Pitfalls

### Pitfall 1: Path Alias Resolution in Scripts
**What goes wrong:** TypeScript audit scripts using `@/lib/site-config` import paths fail because Node.js doesn't resolve path aliases natively.
**Why it happens:** `@/` aliases are configured in tsconfig.json for Next.js but Node.js (even with tsx) may not resolve them without additional config.
**How to avoid:** Either (a) use relative imports in scripts (`../../lib/site-config`), (b) configure `tsconfig.json` paths + `tsx` which handles them, or (c) create a separate `tsconfig.scripts.json` with appropriate settings.
**Warning signs:** `Cannot find module '@/lib/site-config'` errors when running scripts.

### Pitfall 2: Sticky Button Covering Content on Mobile
**What goes wrong:** A sticky floating phone button overlaps the bottom of page content, covers the existing bottom contact form, or interferes with the footer.
**Why it happens:** Fixed/sticky positioning without accounting for other fixed elements (header is sticky at top) or page bottom padding.
**How to avoid:** Use `fixed bottom-4 right-4 z-40` (below header z-50), add `pb-20` or similar bottom padding to the main content area on mobile, and hide the button when the contact form section is in the viewport.
**Warning signs:** Content hidden behind the button, inability to scroll to page bottom, double phone buttons visible.

### Pitfall 3: Broken Link Fix Creates New Breaks
**What goes wrong:** Batch find-and-replace of broken service slugs introduces new errors if the replacement slug doesn't exactly match a valid service.
**Why it happens:** Some broken slugs map to multiple possible correct slugs (e.g., `roof-replacement` could map to `re-roofing`, `asphalt-shingle-replacement`, `full-roof-tear-off`, etc. depending on context).
**How to avoid:** For each broken slug, determine the most appropriate replacement by reading the surrounding content context. `roof-replacement` in general context should map to `re-roofing`. `storm-damage-repair` maps to `storm-damage-roof-repair`. After fixing, re-run the audit script to verify zero broken links.
**Warning signs:** Audit script still reports broken links after fix pass.

### Pitfall 4: WhyChooseUs/Testimonials Section Order Inconsistency
**What goes wrong:** Adding trust sections to new page types in a different order than existing pages creates an inconsistent user experience.
**Why it happens:** Each page template was built separately in Phases 1-3.
**How to avoid:** Follow the established location page pattern: content sections, then WhyChooseUs, then FAQ (if applicable), then Testimonials, then EmergencyCTA, then ContactForm. This is the proven order from the location page template.
**Warning signs:** User scrolling through different page types encounters trust sections in unexpected positions.

### Pitfall 5: Legal Pages Getting CRO Sections
**What goes wrong:** Adding WhyChooseUs/Testimonials/EmergencyCTA to privacy-policy and terms-of-service pages.
**Why it happens:** Over-applying the "every page" rule from D-09/D-12.
**How to avoid:** Legal pages are noindex and should NOT get CRO sections. The audit CRO script should exclude them. Content pages only: locations, services, guides, about, contact, service-area, and the index pages.
**Warning signs:** CRO audit flagging legal pages as missing sections.

## Code Examples

### Sticky Mobile Call Button Component
```typescript
// components/ui/StickyCallButton.tsx
// Source: Pattern derived from D-08 requirements + existing PhoneButton pattern
'use client'

import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function StickyCallButton() {
  return (
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden"
      aria-label={`Call ${siteConfig.phone}`}
      data-action="call"
      data-location="sticky"
    >
      <Phone className="h-6 w-6" />
    </a>
  )
}
```
[ASSUMED: implementation pattern based on D-08 requirements]

### Phone Link with Tracking Attributes
```typescript
// Pattern for D-13: add data attributes to all phone links
<a
  href={`tel:${siteConfig.phoneRaw}`}
  data-action="call"
  data-location={cityName ?? 'general'}
  className="..."
>
```
[VERIFIED: D-13 specifies data-action="call" and data-location="{city}" attributes]

### Audit Script Output Pattern
```typescript
// Consistent output format for all audit scripts
interface AuditResult {
  category: string
  status: 'PASS' | 'FAIL' | 'WARN'
  message: string
  details?: string[]
}

function printResults(results: AuditResult[]) {
  const failures = results.filter(r => r.status === 'FAIL')
  const warnings = results.filter(r => r.status === 'WARN')
  const passes = results.filter(r => r.status === 'PASS')

  console.log(`\n=== Audit Results ===`)
  console.log(`PASS: ${passes.length} | WARN: ${warnings.length} | FAIL: ${failures.length}`)

  for (const result of results) {
    const icon = result.status === 'PASS' ? 'OK' : result.status === 'WARN' ? '!!' : 'XX'
    console.log(`[${icon}] ${result.category}: ${result.message}`)
    if (result.details) {
      result.details.forEach(d => console.log(`     ${d}`))
    }
  }

  process.exit(failures.length > 0 ? 1 : 0)
}
```
[ASSUMED: recommended output format for consistency]

## Broken Link Slug Mapping

Based on content analysis, the recommended slug corrections are:

| Broken Slug | Recommended Correct Slug | Rationale |
|-------------|-------------------------|-----------|
| `roof-replacement` | `re-roofing` | General roof replacement concept. The closest general-purpose service. [ASSUMED] |
| `storm-damage-repair` | `storm-damage-roof-repair` | Direct match with missing "roof" in slug [VERIFIED: services.ts] |
| `gutter-installation` | `gutter-installation-repair` | Direct match with missing "-repair" [VERIFIED: services.ts] |
| `metal-roof-installation` | `metal-roof-installation-repair` | Direct match with missing "-repair" [VERIFIED: services.ts] |
| `flat-roof-services` | `flat-roof-installation-repair` | Flat roof general service [VERIFIED: services.ts] |
| `commercial-roofing` | `commercial-roof-installation` | General commercial roofing service -- installation is the broadest [ASSUMED] |
| `emergency-roofing` | `emergency-roof-repair` | Direct match with different suffix [VERIFIED: services.ts] |

**Note on `roof-replacement`:** This appears in all 16 city content files and refers to a general roof replacement concept. The service index has multiple replacement-specific slugs (aging-roof-replacement, asphalt-shingle-replacement, flat-roof-replacement, etc.) but `re-roofing` is the most general-purpose match. The planner should verify this mapping is appropriate for each usage context, or use a context-dependent replacement strategy.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-sitemap` package | Built-in `app/sitemap.ts` | Next.js 13.3+ (2023) | Already using current approach [VERIFIED: codebase] |
| `next-seo` package | Built-in Metadata API | Next.js 13.2+ (2023) | Already using current approach [VERIFIED: codebase] |
| `react-schemaorg` wrapper | Inline `<script type="application/ld+json">` | Next.js recommendation | Already using current approach via JsonLd component [VERIFIED: codebase] |
| Google Lighthouse as Chrome-only | Lighthouse CLI (`npx lighthouse`) | Stable for years | Available via npx, no global install needed [ASSUMED] |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `tsx` needed for running TypeScript audit scripts with path aliases | Standard Stack | LOW -- could use relative imports or compile with tsc instead |
| A2 | `cheerio` needed for HTML parsing | Standard Stack | LOW -- simple regex would work for these content patterns; cheerio is optional |
| A3 | `roof-replacement` broken slug should map to `re-roofing` | Broken Link Slug Mapping | MEDIUM -- could be a different replacement slug depending on context in each file |
| A4 | `commercial-roofing` should map to `commercial-roof-installation` | Broken Link Slug Mapping | LOW -- could also be `commercial-roof-repair` depending on context |
| A5 | Lighthouse CLI available via npx on macOS | Environment Availability | LOW -- standard npm package, should work fine |
| A6 | Sticky call button can use z-40 without conflicting with other fixed elements | Code Examples | LOW -- header is z-50, MegaMenu is z-50, MobileNav is z-50; z-40 keeps button below all nav overlays |

## Open Questions

1. **`roof-replacement` slug mapping**
   - What we know: 16 city content files reference `/services/roof-replacement` which doesn't exist. The service index has `re-roofing`, `aging-roof-replacement`, `full-roof-tear-off`, and material-specific replacement slugs.
   - What's unclear: Whether `re-roofing` is always the right target or if some contexts should link to specific replacement types.
   - Recommendation: Default to `re-roofing` as the general replacement service. The audit script can flag these for human review if needed, but batch replacing with `re-roofing` is the pragmatic approach.

2. **Lighthouse automation scope**
   - What we know: D-15 requests programmatic Lighthouse in audit scripts on sample pages.
   - What's unclear: Whether to run against localhost dev server or production Vercel deployment.
   - Recommendation: The audit:cro script should run Lighthouse against `http://localhost:3000` after `npm run build && npm run start`. Four sample pages: `/`, `/roofing-contractor-paterson-nj`, `/services/roof-repair`, `/roofing-guides/complete-nj-roofing-guide-homeowners`. This keeps it simple and doesn't require a deployment.

3. **Image audit depth**
   - What we know: D-16 requests checking all image usages for next/image, width/height, lazy loading, placeholder props.
   - What's unclear: Whether the project currently uses any images at all -- the public/ directory was not deeply examined and the Hero components don't appear to render images.
   - Recommendation: The audit:cro script should grep for `<img` tags (raw HTML images) and verify all `next/image` usages have required props. If the site currently uses no images (placeholder-only), the audit confirms compliance and documents the finding.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Audit scripts | Yes | v25.4.0 | -- |
| npx | Running tsx, lighthouse | Yes | 11.7.0 | -- |
| tsx | TypeScript script execution | No (not global) | -- | `npx tsx` (no install needed) |
| Lighthouse CLI | Performance audit (D-15) | No (not global) | -- | `npx lighthouse` (no install needed) |
| Next.js dev server | Lighthouse testing | Yes | 16.2.2 | `npm run build && npm run start` for production build |

**Missing dependencies with no fallback:** None

**Missing dependencies with fallback:**
- `tsx` and `lighthouse` both available via `npx` without global installation

## Project Constraints (from CLAUDE.md)

Directives that apply to Phase 4 work:

- **Fonts:** Cormorant Garamond (medium weight) for body text, Cormorant for headings. Min body font size 18px. [Already implemented in layout.tsx]
- **SEO:** Every page must export `metadata` or `generateMetadata()` with `title`, `description`, and `openGraph`. [Audit script should verify]
- **SEO:** One `<h1>` per page, strict heading hierarchy (h1 > h2 > h3, no skipping). [Audit script should verify]
- **SEO:** Canonical URL set via `alternates.canonical` in metadata on every page. [Audit script should verify]
- **SEO:** All images have descriptive alt text. [Audit script should check]
- **SEO:** Internal links use `next/link`, not raw `<a>` tags with full URLs. [Component links already use next/link; inline HTML content uses `<a>` by necessity since it's rendered via dangerouslySetInnerHTML]
- **Design:** Variation 9 (Amber Emphasis) approved for site design. [Sticky call button should use amber]

## Sources

### Primary (HIGH confidence)
- Codebase analysis: All 15+ page templates, 26+ components, 93+ content files, sitemap.ts, robots.ts, schemas.ts, site-config.ts, services.ts, navigation.ts, package.json
- Direct grep verification: 7 broken slug patterns, 55+ broken link instances
- Component presence matrix: WhyChooseUs/Testimonials/EmergencyCTA presence verified via grep across all page.tsx files

### Secondary (MEDIUM confidence)
- Next.js Metadata API patterns: verified against existing codebase usage
- Schema.org markup patterns: verified against existing lib/schemas.ts

### Tertiary (LOW confidence)
- tsx path alias resolution behavior [ASSUMED]
- Lighthouse CLI npx behavior on macOS [ASSUMED]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified against package.json and codebase
- Architecture: HIGH - derived directly from existing codebase patterns
- Pitfalls: HIGH - identified from actual codebase analysis (broken links are VERIFIED)
- CRO gaps: HIGH - component presence verified by grep across all page files
- Broken links: HIGH - exact broken slugs and counts verified against services.ts

**Research date:** 2026-04-13
**Valid until:** 2026-05-13 (stable -- codebase and requirements are well-defined)
