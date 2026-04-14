# Phase 2: Anchor City & Location Pages - Research

**Researched:** 2026-04-10
**Domain:** Next.js dynamic routes, static site generation, structured data (FAQ JSON-LD), location page content architecture
**Confidence:** HIGH

## Summary

Phase 2 delivers 16 location pages (1 Paterson anchor + 15 municipalities) using a single Next.js dynamic route with `generateStaticParams`. Each page renders 3000+ words of unique, locally-relevant roofing content stored in per-city TypeScript data files. The architecture is straightforward: one dynamic route template, one content type definition, 16 data files, and 3-4 new section components (CityIntro, NeighborhoodGrid, CityFAQ).

The most important technical finding is that **Next.js does NOT support partial dynamic segments in folder names** -- a folder like `roofing-contractor-[city]-nj` will not work. The correct approach is `app/[locationSlug]/page.tsx` where `generateStaticParams` returns the full slug (e.g., `roofing-contractor-paterson-nj`) and the page component extracts the city from it. The `dynamicParams = false` config ensures only the 16 valid slugs are served, returning 404 for everything else.

**Primary recommendation:** Use `app/[locationSlug]/page.tsx` with full-slug `generateStaticParams`, per-city TypeScript content files in `data/content/`, and build Paterson first as reference implementation before generating the remaining 15 cities.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Lead-focused section flow: Hero > About Roofing in [City] > Services We Offer > Neighborhoods We Serve > Why Choose Us > FAQ > Testimonials > Emergency CTA > Contact Form
- **D-02:** Image hero with dark navy overlay reusing homepage Hero pattern. Different hero images per geographic cluster: Urban (dense housing/city skyline), Highlands (wooded/rural homes), Suburban (suburban neighborhood). 3-4 cluster images total.
- **D-03:** Neighborhoods displayed as 2-3 column grid of cards (reusing Card component), each showing neighborhood name + 1-2 sentence roofing context. 6-10 neighborhoods per city (10-12 for Paterson anchor).
- **D-04:** Mid-page CTAs placed after every 2 sections: one after "About Roofing in [City]" section, one after "Neighborhoods We Serve" section. Two touchpoints before FAQ/testimonials. Reuse MidPageCTA component with city-specific messaging.
- **D-05:** AI-generated content at build time. Content briefs prepared per city with local data (neighborhoods, landmarks, housing stock, weather, common roofing issues). Claude writes unique 3000+ word content per city during GSD execution phase. Stored as static TypeScript data files. Human review pass for quality/accuracy.
- **D-06:** Content generated during GSD execution -- Claude writes each city's content file directly as a build task. No separate tooling, API calls, or content generation scripts needed.
- **D-07:** 5-8 completely unique FAQ questions per city, tailored to municipality-specific roofing concerns, building types, and local context. No shared/common questions across cities. Each FAQ item rendered with FAQ JSON-LD schema (SCHEMA-03).
- **D-08:** One TypeScript file per city in `data/content/` directory. Each file exports a typed `CityContent` object with all content sections: heroHeadline, heroSubheadline, introHtml (800-1500 words), localContext, neighborhoods array, relevant service slugs, faqItems array, seoTitle, seoDescription. Shared `CityContent` type defined in `data/content/types.ts`. Index file re-exports all cities.
- **D-09:** Single dynamic route at `app/roofing-contractor-[city]-nj/page.tsx` with `generateStaticParams()` returning all 16 slugs. One template component imports the right city content file based on slug param. `generateMetadata()` reads city content for SEO.
- **D-10:** Same template for all 16 pages -- differentiation is in content depth, not code. Paterson anchor gets deeper content: intro 1200-1500 words (vs 800-1000), 10-12 neighborhoods (vs 6-8), 8 FAQ items (vs 5-6), total 3500-4000 words (vs 3000-3200). Extra Paterson context: historic district roofing, Great Falls area challenges, multi-family building focus, Passaic River flooding impact.
- **D-11:** Build order: Paterson anchor built and verified first as reference implementation (template, content quality, schema, rendering). Then remaining 15 cities generated in batches using the validated pattern.

### Claude's Discretion
- Specific hero image sourcing strategy (stock, AI-generated, or placeholder per cluster)
- Exact neighborhood data research per city (names, housing types, roofing context)
- Content brief structure and level of local detail per city
- FAQ question topics beyond the general guidance (city-specific concerns)
- Component composition for new sections (CityIntro, NeighborhoodGrid, CityFAQ)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANCHOR-01 | Paterson anchor city page at /roofing-contractor-paterson-nj with 3000+ words | Dynamic route with generateStaticParams; Paterson content data file with 3500-4000 words |
| ANCHOR-02 | Dense Urban Housing content angle woven into Paterson page | Content data file includes localContext field with cluster-specific angle |
| ANCHOR-03 | Paterson-specific local landmarks, neighborhoods, building types, weather | CityContent type has neighborhoods array, introHtml with local context, localContext field |
| ANCHOR-04 | Service-specific sections linking to individual service pages (silo linking) | ServicesGrid component reuse with service slugs from data/services.ts |
| ANCHOR-05 | FAQ section with Paterson-specific roofing questions | CityFAQ component + buildFaqSchema() in lib/schemas.ts + 8 unique FAQ items |
| LOC-01 | 15 location pages at /roofing-contractor-{city}-nj | generateStaticParams returns all 16 slugs; dynamicParams = false for 404 on others |
| LOC-02 | Each location page has 3000+ words of unique, locally-relevant content | Per-city TypeScript data files with typed CityContent objects |
| LOC-03 | Geographic content angles applied per cluster | localContext field in CityContent keyed to municipality cluster from siteConfig |
| LOC-04 | Municipality-specific landmarks, neighborhoods, housing stock | neighborhoods array with name + roofingContext per entry; introHtml with local detail |
| LOC-05 | 90%+ content uniqueness across all location pages | Unique introHtml, neighborhoods, FAQ items, localContext per city data file |
| LOC-06 | Each location page links to relevant service pages | relevantServiceSlugs field in CityContent; rendered via ServicesGrid or inline links |
| LOC-07 | Each location page has FAQ section with location-specific roofing questions | CityFAQ component + FAQ JSON-LD schema + 5-6 unique items per city |
| SCHEMA-03 | FAQ JSON-LD schema on location pages | buildFaqSchema() builder function in lib/schemas.ts using schema-dts FAQPage type |
</phase_requirements>

## Standard Stack

### Core (already installed -- Phase 1)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | Framework with SSG/generateStaticParams | Already installed. Dynamic route + generateStaticParams generates all 16 pages at build time. [VERIFIED: package.json] |
| React | 19.2.4 | UI library with Server Components | Already installed. All location page components are Server Components (no client state). [VERIFIED: package.json] |
| schema-dts | ^2.0.0 | Schema.org TypeScript types | Already installed. Has FAQPage, Question, Answer types needed for SCHEMA-03. [VERIFIED: node_modules grep] |
| lucide-react | ^1.7.0 | Icons for section components | Already installed. Used in existing Hero, Services, CTA components. [VERIFIED: package.json] |
| Tailwind CSS | 4.x | Styling | Already installed with CSS-first config in globals.css. [VERIFIED: package.json] |

### No New Dependencies Required
This phase requires zero new npm packages. Everything needed is already installed from Phase 1.

## Architecture Patterns

### Critical: Dynamic Route Folder Naming

**Next.js does NOT support partial dynamic segments in folder names.** A folder named `roofing-contractor-[city]-nj` will NOT work as a dynamic route -- the bracket notation must wrap the entire folder name. [VERIFIED: Next.js docs + community discussions]

**Decision D-09 says:** `app/roofing-contractor-[city]-nj/page.tsx`
**What actually works:** `app/[locationSlug]/page.tsx`

The correct implementation uses a generic `[locationSlug]` dynamic segment where `generateStaticParams` returns the full URL slug (e.g., `{ locationSlug: 'roofing-contractor-paterson-nj' }`). The page component extracts the city from the slug by stripping the `roofing-contractor-` prefix and `-nj` suffix.

### Recommended Project Structure
```
app/
  [locationSlug]/
    page.tsx                    # Dynamic route for all 16 location pages
data/
  content/
    types.ts                    # CityContent type definition
    paterson.ts                 # Paterson anchor content (3500-4000 words)
    clifton.ts                  # Clifton content
    passaic.ts                  # Passaic content
    wayne.ts                    # Wayne content
    west-milford.ts             # West Milford content
    hawthorne.ts                # Hawthorne content
    little-falls.ts             # Little Falls content
    woodland-park.ts            # Woodland Park content
    ringwood.ts                 # Ringwood content
    wanaque.ts                  # Wanaque content
    pompton-lakes.ts            # Pompton Lakes content
    totowa.ts                   # Totowa content
    north-haledon.ts            # North Haledon content
    haledon.ts                  # Haledon content
    bloomingdale.ts             # Bloomingdale content
    prospect-park.ts            # Prospect Park content
    index.ts                    # Re-exports all city content as slug-keyed map
components/
  sections/
    CityIntro.tsx               # About Roofing in [City] section
    NeighborhoodGrid.tsx        # Neighborhood cards grid
    CityFAQ.tsx                 # FAQ accordion/section
    LocationHero.tsx            # Extended Hero for location pages (or reuse Hero with props)
lib/
  schemas.ts                    # Add buildFaqSchema() alongside existing builders
```

### Pattern 1: Dynamic Route with Full-Slug generateStaticParams

**What:** Single dynamic route that serves all 16 location pages via `generateStaticParams`, with `dynamicParams = false` to 404 on unknown slugs.

**When to use:** Whenever you have a fixed set of pages with a consistent URL pattern that doesn't map to a simple `[param]` structure.

**Example:**
```typescript
// Source: Next.js docs (generateStaticParams + async params in Next.js 15+/16)
// app/[locationSlug]/page.tsx

import { siteConfig } from '@/lib/site-config'
import { getCityContent } from '@/data/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Only serve the 16 valid location slugs -- all others 404
export const dynamicParams = false

export function generateStaticParams() {
  return siteConfig.municipalities.map((m) => ({
    locationSlug: `roofing-contractor-${m.slug}-nj`,
  }))
}

// CRITICAL: In Next.js 16, params is a Promise and must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>
}): Promise<Metadata> {
  const { locationSlug } = await params
  const citySlug = locationSlug
    .replace('roofing-contractor-', '')
    .replace('-nj', '')
  const content = getCityContent(citySlug)
  if (!content) return {}

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: `/${locationSlug}`,
    },
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `/${locationSlug}`,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>
}) {
  const { locationSlug } = await params
  const citySlug = locationSlug
    .replace('roofing-contractor-', '')
    .replace('-nj', '')
  const content = getCityContent(citySlug)
  if (!content) notFound()

  // Render location page sections per D-01 flow
  return (
    <>
      {/* JSON-LD schemas */}
      {/* Hero */}
      {/* CityIntro (About Roofing in [City]) */}
      {/* MidPageCTA */}
      {/* ServicesGrid (silo links) */}
      {/* NeighborhoodGrid */}
      {/* MidPageCTA */}
      {/* WhyChooseUs */}
      {/* CityFAQ */}
      {/* Testimonials */}
      {/* EmergencyCTA */}
      {/* ContactForm */}
    </>
  )
}
```

### Pattern 2: CityContent Type and Data Architecture

**What:** Typed content data structure with one file per city, exported via a slug-keyed lookup map.

**When to use:** Static content sites where all page content is known at build time.

**Example:**
```typescript
// data/content/types.ts
export interface Neighborhood {
  readonly name: string
  readonly roofingContext: string  // 1-2 sentences about roofing relevance
}

export interface FaqItem {
  readonly question: string
  readonly answer: string  // Can contain HTML for rich formatting
}

export interface CityContent {
  readonly slug: string
  readonly name: string
  readonly county: string
  readonly state: string
  readonly cluster: 'Urban' | 'Suburban' | 'Highlands'

  // Hero
  readonly heroHeadline: string
  readonly heroSubheadline: string

  // Content sections
  readonly introHtml: string         // 800-1500 words (HTML string)
  readonly localContext: string      // Geographic angle paragraph
  readonly neighborhoods: readonly Neighborhood[]
  readonly relevantServiceSlugs: readonly string[]
  readonly faqItems: readonly FaqItem[]

  // SEO
  readonly seoTitle: string
  readonly seoDescription: string
}
```

```typescript
// data/content/index.ts
import { paterson } from './paterson'
import { clifton } from './clifton'
// ... all 16 cities

import type { CityContent } from './types'

const cityContentMap: Record<string, CityContent> = {
  'paterson': paterson,
  'clifton': clifton,
  // ... all 16 cities
}

export function getCityContent(slug: string): CityContent | undefined {
  return cityContentMap[slug]
}

export function getAllCityContent(): CityContent[] {
  return Object.values(cityContentMap)
}
```

### Pattern 3: FAQ JSON-LD Schema Builder

**What:** Type-safe FAQ schema builder function added to `lib/schemas.ts`, using `schema-dts` FAQPage type.

**When to use:** Any page with FAQ content that needs structured data.

**Example:**
```typescript
// Source: Google developers.google.com/search/docs/appearance/structured-data/faqpage
// Addition to lib/schemas.ts

import type { FAQPage, WithContext } from 'schema-dts'

export interface FaqSchemaItem {
  question: string
  answer: string
}

export function buildFaqSchema(
  items: FaqSchemaItem[]
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  }
}
```

### Pattern 4: City-Specific MidPageCTA

**What:** Extend MidPageCTA to accept optional city name for personalized messaging.

**When to use:** Location pages where CTAs should include city name for local relevance.

**Example:**
```typescript
// Updated MidPageCTA with optional city prop
interface MidPageCTAProps {
  cityName?: string
}

export function MidPageCTA({ cityName }: MidPageCTAProps = {}) {
  const message = cityName
    ? `Need a roof estimate in ${cityName}?`
    : 'Need a roofing estimate?'
  // ... rest of component
}
```

### Anti-Patterns to Avoid
- **Inline content in page component:** Do NOT write 3000+ words of content directly in the page.tsx file. All content goes in `data/content/{city}.ts` files, keeping the template clean and the content maintainable.
- **Shared/template FAQ questions:** Do NOT use the same FAQ questions across cities with city name swapped. Each city must have completely unique FAQ items tailored to local concerns (D-07).
- **Client components for content sections:** Do NOT use `'use client'` for CityIntro, NeighborhoodGrid, or CityFAQ. These are pure content renderers and should be Server Components for optimal SEO and performance. Only ContactForm needs client-side interactivity.
- **Hard-coded city data in components:** Do NOT embed city-specific data in component files. All city data comes from the `CityContent` type, passed as props from the page component.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ structured data | Custom JSON construction | `buildFaqSchema()` with schema-dts types | Google has specific FAQPage format requirements; type-safe builder prevents invalid schema |
| Slug-to-city resolution | Manual string parsing in every function | `getCityContent()` lookup in data/content/index.ts | Centralized lookup prevents slug parsing bugs, single source of truth |
| Breadcrumb schema | Manual JSON-LD construction | Existing `buildBreadcrumbSchema()` from lib/schemas.ts | Already built in Phase 1, type-safe, renders via JsonLd component |
| LocalBusiness schema | Rebuilding per location | Existing `buildLocalBusinessSchema()` (may need city-specific override) | Already built in Phase 1; may need addressLocality param for per-city schema |
| Content word counting | Manual content validation | Build-time word count check in content files or validation script | Ensures 3000+ word requirement is met before deployment |

**Key insight:** Phase 1 built a solid schema and component foundation. Phase 2 adds one new schema builder (FAQ) and 3 new section components, while reusing 8+ existing components directly.

## Common Pitfalls

### Pitfall 1: Next.js Partial Dynamic Segment Folder Names
**What goes wrong:** Creating `app/roofing-contractor-[city]-nj/page.tsx` expecting it to work as a dynamic route where `[city]` is extracted from the middle of the folder name.
**Why it happens:** The URL pattern `/roofing-contractor-paterson-nj` suggests the dynamic part is in the middle. CONTEXT.md D-09 specifies this exact pattern.
**How to avoid:** Use `app/[locationSlug]/page.tsx` where `locationSlug` is the entire URL segment (e.g., `roofing-contractor-paterson-nj`). Extract the city slug by stripping the prefix and suffix in the page component. [VERIFIED: Next.js docs, GitHub discussions confirm partial dynamic segments are not supported]
**Warning signs:** Build errors, routes not matching, 404 on all location pages.

### Pitfall 2: Async Params in Next.js 16
**What goes wrong:** Accessing `params.locationSlug` directly without `await` in page components and `generateMetadata`.
**Why it happens:** In Next.js 14 and earlier, params was synchronous. In Next.js 15+ it's a Promise with a deprecation warning. In Next.js 16, params is fully async and MUST be awaited. [VERIFIED: Next.js 16 upgrade docs, community articles]
**How to avoid:** Always type params as `Promise<{ locationSlug: string }>` and use `const { locationSlug } = await params` in both the page component and `generateMetadata`.
**Warning signs:** TypeScript type errors, runtime "cannot read property of Promise" errors.

### Pitfall 3: Content Duplication Across Cities
**What goes wrong:** Using a template with city name swapped leads to near-identical content across pages, violating the 90%+ uniqueness requirement (LOC-05).
**Why it happens:** It's faster to write one template and swap names. But Google flags this as thin/duplicate content, hurting all pages' rankings.
**How to avoid:** Each city data file must contain genuinely unique content: different introHtml prose, different neighborhoods with unique roofing context, different FAQ questions. Use the 4 geographic content angles (Dense Urban, NJ Highlands, Suburban Corridor, Commercial Corridor) to drive fundamentally different content per cluster. Within the same cluster, differentiate by population size, specific landmarks, housing stock details, and neighborhood-level specifics.
**Warning signs:** Running a diff between two city files shows >10% overlap in prose content.

### Pitfall 4: Missing dynamicParams = false
**What goes wrong:** Without `export const dynamicParams = false`, any URL matching `app/[locationSlug]/` will attempt server-side rendering, including `/about`, `/services/roof-repair`, etc. This creates route conflicts with other pages.
**Why it happens:** The `[locationSlug]` dynamic segment is at the root level and catches ALL single-segment paths.
**How to avoid:** Set `export const dynamicParams = false` so only the 16 slugs returned by `generateStaticParams` are served. All other single-segment URLs will fall through to their own routes (e.g., `app/about/page.tsx`) or 404. [VERIFIED: Next.js docs on dynamicParams]
**Warning signs:** Other pages (about, contact) render the location page template, or location pages show 500 errors.

### Pitfall 5: Route Conflict with Root-Level Dynamic Segment
**What goes wrong:** `app/[locationSlug]/page.tsx` is a root-level catch-all that conflicts with other top-level routes like `app/about/page.tsx` or `app/contact/page.tsx`.
**Why it happens:** Next.js resolves routes by specificity -- static routes take priority over dynamic ones. `app/about/page.tsx` will always win over `app/[locationSlug]/page.tsx` for the `/about` path. BUT only if the static route file exists.
**How to avoid:** (1) Set `dynamicParams = false` to restrict the dynamic route to only `generateStaticParams` slugs. (2) Ensure all static top-level routes (`/about`, `/contact`, `/services`, etc.) exist as `app/{route}/page.tsx` files. (3) The location slugs all start with `roofing-contractor-` which won't conflict with other routes. [VERIFIED: Next.js routing precedence rules]
**Warning signs:** Navigation to non-location pages breaks or renders wrong content.

### Pitfall 6: FAQ Rich Results Expectations
**What goes wrong:** Expecting FAQ schema to generate rich results (expandable FAQs) in Google Search.
**Why it happens:** Google restricted FAQ rich results in August 2023 to only "well-known, authoritative government and health websites." Most commercial sites no longer see FAQ rich results. [VERIFIED: Google developers FAQ structured data docs]
**How to avoid:** Implement FAQ schema anyway -- it helps AI search engines (ChatGPT, Perplexity, Google AI Overviews) cite your content, and validates content structure. Just don't promise the client FAQ rich results in Google SERPs.
**Warning signs:** Client asks "why aren't our FAQs showing in Google search results?"

### Pitfall 7: Sitemap Not Updated
**What goes wrong:** The 16 new location pages are built but the sitemap only lists the homepage.
**Why it happens:** The current `app/sitemap.ts` only returns the homepage URL. It needs to be updated to include all location pages.
**How to avoid:** Update `app/sitemap.ts` to iterate over `siteConfig.municipalities` and generate entries for all 16 location URLs.
**Warning signs:** Google Search Console shows only 1 indexed page; location pages not discovered by crawlers.

## Code Examples

### Complete FAQ Schema Integration
```typescript
// Source: Google FAQ structured data docs + schema-dts types
// lib/schemas.ts addition

import type { FAQPage, WithContext } from 'schema-dts'

export function buildFaqSchema(
  items: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  }
}
```
[VERIFIED: FAQPage, Question, Answer types confirmed in schema-dts v2.0.0 node_modules]

### Updated Sitemap with Location Pages
```typescript
// app/sitemap.ts -- updated to include location pages
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
```
[VERIFIED: Existing sitemap.ts pattern in codebase]

### CityContent Data File Example (Paterson)
```typescript
// data/content/paterson.ts -- structure example (content abbreviated)
import type { CityContent } from './types'

export const paterson: CityContent = {
  slug: 'paterson',
  name: 'Paterson',
  county: 'Passaic',
  state: 'NJ',
  cluster: 'Urban',

  heroHeadline: 'Expert Roofing Contractors in Paterson, NJ',
  heroSubheadline:
    'Trusted roof repair, replacement & installation for Paterson homes and businesses. Serving the Silk City for 15+ years.',

  introHtml: `<p>Paterson presents unique roofing challenges...</p>
    <!-- 1200-1500 words of unique, locally-relevant content -->`,

  localContext:
    'As the largest city in Passaic County with over 159,000 residents, Paterson\'s dense urban landscape...',

  neighborhoods: [
    {
      name: 'Great Falls / Mill District',
      roofingContext:
        'Historic industrial buildings with flat and low-slope roofing systems requiring specialized membrane repair and restoration.',
    },
    // 10-12 total neighborhoods for Paterson anchor
  ],

  relevantServiceSlugs: [
    'roof-repair',
    'roof-replacement',
    'flat-roof-services',
    'storm-damage-repair',
    'emergency-roofing',
    'chimney-flashing-repair',
  ],

  faqItems: [
    {
      question:
        'How much does a roof replacement cost in Paterson, NJ?',
      answer:
        'A typical roof replacement in Paterson ranges from $8,000 to $15,000 for a standard residential home...',
    },
    // 8 total FAQ items for Paterson anchor
  ],

  seoTitle:
    'Roofing Contractor Paterson NJ | Roof Repair & Replacement',
  seoDescription:
    'Top-rated roofing contractor in Paterson, NJ. Expert roof repair, replacement, and installation for residential and commercial properties. Free estimates. Call (973) 555-0100.',
}
```

### Breadcrumb Pattern for Location Pages
```typescript
// Breadcrumb items for a location page
const breadcrumbItems = [
  { name: 'Home', url: siteConfig.url },
  {
    name: `${content.name} Roofing`,
    url: `${siteConfig.url}/roofing-contractor-${content.slug}-nj`,
  },
]
```
[VERIFIED: Existing Breadcrumbs component pattern in components/seo/Breadcrumbs.tsx]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sync params in page components | Async params (Promise) requiring await | Next.js 15 (deprecation), Next.js 16 (enforced) | All page components and generateMetadata must await params |
| FAQ rich results for all sites | FAQ rich results restricted to govt/health sites | August 2023 (Google update) | FAQ schema still valuable for AI search, but no rich results for commercial sites |
| `getStaticPaths` + `getStaticProps` | `generateStaticParams` + Server Components | Next.js 13 (App Router) | Simpler API, integrated with Server Components |

**Deprecated/outdated:**
- `getStaticPaths` / `getStaticProps` -- Pages Router API, replaced by `generateStaticParams` in App Router
- `next-sitemap` package -- abandoned 3+ years ago, replaced by built-in Next.js sitemap API
- Synchronous params access -- deprecated in Next.js 15, fully removed in Next.js 16

## Assumptions Log

> List all claims tagged [ASSUMED] in this research.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Static routes (app/about/page.tsx) take priority over dynamic routes (app/[locationSlug]/page.tsx) in Next.js routing resolution | Pitfall 5 | Route conflicts between location pages and other top-level pages; mitigated by dynamicParams=false and unique slug prefixes |
| A2 | schema-dts v2.0.0 FAQPage type accepts mainEntity array of Question objects | FAQ Schema Pattern | Build-time TypeScript error if type shape differs; verified via grep but not tested in actual compilation |
| A3 | The memory note about "homepage IS the Paterson page" is superseded by CONTEXT.md D-09 which specifies a separate /roofing-contractor-paterson-nj route | Architecture | If user intended homepage to BE the Paterson anchor, Phase 2 plan would create a redundant page |

**Note on A3:** There is a tension between the project memory file (`project_seo_keyword_strategy.md`) which states "The homepage IS the Paterson page -- no separate /roofing-contractor-paterson-nj anchor page needed" and the CONTEXT.md decisions which explicitly require ANCHOR-01 at `/roofing-contractor-paterson-nj`. The CONTEXT.md is the more recent and authoritative source (gathered 2026-04-10 during discuss phase), so this research follows the CONTEXT.md decisions. However, the planner should flag this for user confirmation.

## Open Questions

1. **Homepage vs. Paterson Anchor Page Overlap**
   - What we know: The homepage (app/page.tsx) already targets "paterson roofing contractors" keyword. CONTEXT.md requires a separate Paterson anchor page at /roofing-contractor-paterson-nj. Memory file suggests they should be the same page.
   - What's unclear: Will having both a homepage AND a /roofing-contractor-paterson-nj page create keyword cannibalization? Should the Paterson anchor page target a slightly different keyword (e.g., "roofing contractor Paterson NJ" vs. "Paterson roofing contractors")?
   - Recommendation: Build the separate Paterson anchor page as specified in CONTEXT.md (ANCHOR-01 requires it). Differentiate SEO titles: homepage = "Paterson Roofing Contractors | Top-Rated Roofer in Paterson NJ" (brand focus), anchor = "Roofing Contractor Paterson NJ | Roof Repair & Replacement" (service + location focus). Cross-link between them.

2. **Hero Image Sourcing**
   - What we know: D-02 specifies different hero images per geographic cluster (Urban, Highlands, Suburban). 3-4 images needed.
   - What's unclear: Whether to use stock photos, AI-generated images, or generic placeholder images.
   - Recommendation: Use high-quality royalty-free stock photos from Unsplash/Pexels for initial implementation. 3 cluster images: (1) Urban -- dense housing/city skyline, (2) Highlands -- wooded homes with trees, (3) Suburban -- suburban neighborhood street. Placeholder via solid color overlay if images not sourced in time. This is within Claude's discretion per CONTEXT.md.

3. **LocalBusiness Schema Per-City Customization**
   - What we know: The existing `buildLocalBusinessSchema()` returns a single business schema with addressLocality "Paterson". Each location page should ideally reference its own city.
   - What's unclear: Whether to create 16 different LocalBusiness schemas (one per city) or reuse the single business schema on all pages.
   - Recommendation: Extend `buildLocalBusinessSchema()` to accept an optional `cityName` parameter. When provided, set addressLocality to the target city. The business entity is the same (Paterson Roofing Contractors serves all cities), but the address context should match the page.

## Security Domain

> This phase involves only static content pages and build-time data. No user input, authentication, or data storage.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A -- static pages, no auth |
| V3 Session Management | No | N/A -- no sessions |
| V4 Access Control | No | N/A -- all pages public |
| V5 Input Validation | No | N/A -- no user input on location pages (ContactForm already validated in Phase 1) |
| V6 Cryptography | No | N/A -- no encryption needed |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via JSON-LD injection | Tampering | Existing JsonLd component escapes `<` as `\u003c` -- already mitigated in Phase 1 |
| SEO spam via dynamic route abuse | Elevation of Privilege | `dynamicParams = false` prevents serving unauthorized slugs |

## Sources

### Primary (HIGH confidence)
- Next.js generateStaticParams docs (https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- dynamic route generation, dynamicParams config
- Next.js dynamic routes docs (https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) -- folder naming, partial segments NOT supported
- Google FAQ structured data docs (https://developers.google.com/search/docs/appearance/structured-data/faqpage) -- FAQPage JSON-LD format, restriction to govt/health sites
- schema-dts node_modules (v2.0.0) -- FAQPage, Question, Answer type definitions verified via grep
- Existing codebase (Phase 1 output) -- all component patterns, schemas.ts, site-config.ts, navigation.ts verified via direct file reads

### Secondary (MEDIUM confidence)
- Next.js GitHub discussions (#15690, #56420) -- confirmation that partial dynamic segments in folder names are not supported
- DEV Community article on async params in Next.js 16 (https://dev.to/peterlidee/async-params-and-searchparams-in-next-16-5ge9) -- async params enforcement in Next.js 16
- Next.js generateMetadata docs (https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- async params typing pattern

### Tertiary (LOW confidence)
- FAQ rich results restriction scope (exactly which site categories still get them) -- Google's official page mentions "well-known authoritative" but exact criteria are opaque
- Route priority behavior with dynamicParams=false + static routes at same level -- based on documented Next.js behavior but not tested in this exact configuration

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all dependencies already installed and verified in package.json; no new packages needed
- Architecture: HIGH -- dynamic route pattern is well-documented; partial segment limitation confirmed via multiple sources; content data architecture is standard TypeScript
- Pitfalls: HIGH -- critical routing issue (partial segments) verified; async params change well-documented; FAQ rich results restriction confirmed by Google

**Research date:** 2026-04-10
**Valid until:** 2026-05-10 (stable -- Next.js 16 and schema-dts are established; no anticipated breaking changes)
