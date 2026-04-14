# Phase 3: Service, Guide & Utility Pages - Research

**Researched:** 2026-04-12
**Domain:** Static page generation (67 service + 10 guide + 5 utility + 2 index), content data architecture, schema markup, mega-menu navigation, silo linking
**Confidence:** HIGH

## Summary

Phase 3 delivers the bulk of the site's content inventory: 67 service pages, 10 guide pages, 5 utility pages, and 2 index pages (services + guides). The implementation follows patterns firmly established in Phase 2 (one TypeScript data file per entity, dynamic routes with `generateStaticParams()`, section-based page composition), extending them to three new page types. The primary technical challenges are: (1) scaling the data layer from 16 city files to 67 service + 10 guide content files, (2) building a mega-menu navigation for 67 services grouped by category, (3) implementing a sticky Table of Contents with `IntersectionObserver` scroll tracking for guide pages, and (4) adding `buildServiceSchema()` to the schema builder library.

The reference site (newarkqualityroofing.com) provides 65 service pages and 300+ article pages. Our target of 67 services requires adding 2 services beyond the reference site's taxonomy (or the context decision of 67 may include the index page and a catch-all -- the planner should confirm against the scraped list). The 10 guides are curated from the reference site's extensive article library, focusing on the highest-value educational topics for Passaic County homeowners.

**Primary recommendation:** Follow the exact Phase 2 content data pattern (one `.ts` file per entity in a dedicated directory, typed exports, index file with lookup functions). Build service pages first as the largest batch, then guides (most architecturally distinct with TOC sidebar), then utility pages (simplest). The mega-menu navigation update and `buildServiceSchema()` are foundational tasks that should come before page creation.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Service page section flow mirrors location pages: Hero > ServiceOverview > MidPageCTA > ProcessSteps > BenefitsGrid > MidPageCTA > RelatedLocations > RelatedServices > ServiceFAQ > Testimonials > EmergencyCTA > ContactForm
- **D-02:** MidPageCTA placed after ServiceOverview and after BenefitsGrid
- **D-03:** 2000-2500 words per service page
- **D-04:** RelatedLocations shows all 16 municipalities as Card grid
- **D-05:** RelatedServices shows 3-4 related service cards per page
- **D-06:** Category-based hero images (5-7 per category, shared within category)
- **D-07:** Full 67-service taxonomy sourced from newarkqualityroofing.com
- **D-08:** Flat URL structure /services/{service-slug}
- **D-09:** /services index page with services grouped by category
- **D-10:** One TypeScript file per service: data/services/content/{service-slug}.ts
- **D-11:** Keep existing data/services.ts as lightweight index, extend to 67 entries
- **D-12:** ServiceContent type with slug, name, category, heroHeadline, heroSubheadline, overviewHtml, processSteps[], benefits[], faqItems[], relatedServiceSlugs[], seoTitle, seoDescription
- **D-13:** Mega menu navigation grouped by category with multi-column layout
- **D-14:** Guide pages: long-form 2500-3500 words with TOC, Expert Tips, FAQ
- **D-15:** 10 guide topics sourced from newarkqualityroofing.com
- **D-16:** One TypeScript file per guide: data/guides/content/{guide-slug}.ts
- **D-17:** Sticky sidebar TOC on desktop, collapsible on mobile
- **D-18:** Expert Tips callout with amber left border and lightbulb icon
- **D-19:** Guides link to services and all 16 locations
- **D-20:** Estimated read time displayed in hero and index cards
- **D-21:** /roofing-guides index page with cards
- **D-22:** About page with company story, credentials, WhyChooseUs, service area
- **D-23:** Service Area page with municipality grid and static map image
- **D-24:** Contact page with form + business info side-by-side
- **D-25:** Privacy/Terms pages with noindex, legal template text

### Claude's Discretion
- Exact ServiceCategory enum values (determined from reference site scrape)
- ProcessStep and Benefit type definitions
- GuideSection type definition (may include subsections)
- Service page new section components (ServiceOverview, ProcessSteps, BenefitsGrid)
- Guide page new section components (GuideArticle, TableOfContents, ExpertTips)
- Static map image sourcing for Service Area page
- Legal template content for Privacy/Terms pages
- Mobile mega menu implementation details

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SVC-01 | 67 service pages at /services/{service-slug} | Reference site taxonomy provides 65 services; extend to 67 with curated additions. Dynamic route pattern from Phase 2 applies directly. |
| SVC-02 | Service taxonomy sourced from newarkqualityroofing.com | Full 65-service sitemap extracted and categorized (see Service Taxonomy section below). |
| SVC-03 | Each service page describes service, process, benefits, local context | ServiceContent type with overviewHtml, processSteps[], benefits[], localContext fields. UI-SPEC defines section components. |
| SVC-04 | Service pages link to relevant location pages (bidirectional silo) | RelatedLocations component renders all 16 municipalities from siteConfig. Location pages already link to services via relevantServiceSlugs. |
| SVC-05 | FAQ section on each service page | ServiceFAQ client component (clones CityFAQ pattern). 3-5 FaqItem[] per service. FAQ JSON-LD via existing buildFaqSchema(). |
| GUIDE-01 | 10 guide pages at /roofing-guides/{guide-slug} | Curated from reference site's 300+ articles. Dynamic route with generateStaticParams(). |
| GUIDE-02 | Guide topics sourced from newarkqualityroofing.com | Reference site has comparison guides, material guides, decision guides, and long-form homeowner guides. 10 best topics selected below. |
| GUIDE-03 | Guides provide educational E-E-A-T content | Long-form 2500-3500 words, ExpertTips callout, professional advice tone, credentials mentioned. |
| GUIDE-04 | Guides link to relevant service and location pages | RelatedServices (3-5 cards) + CityLinks (all 16 municipalities) sections on every guide page. |
| UTIL-01 | About page with company story and E-E-A-T | About page structure defined in UI-SPEC: Our Story, Credentials, WhyChooseUs (reused), Service Area links. |
| UTIL-02 | Contact page with form, phone, service area | ContactHub component: 2-col layout with ContactForm + business info panel. CityLinks below. |
| UTIL-03 | Service Area page with 16 municipalities and map | MunicipalityGrid component + static map image. Cards link to location pages. |
| UTIL-04 | Privacy Policy page | LegalPage component with noindex. Placeholder legal template. |
| UTIL-05 | Terms of Service page | LegalPage component with noindex. Placeholder legal template. |
| SCHEMA-02 | Service JSON-LD schema on service pages | New buildServiceSchema() in lib/schemas.ts using schema-dts Service type. |
| SILO-02 | Core Section: services and locations organized hierarchically | 67 service pages with category grouping + mega menu + bidirectional location links. |
| SILO-03 | Outer Section: guides and educational content | 10 guide pages linking to services and locations, establishing topical authority. |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies)

| Library | Installed Version | Purpose | Verified |
|---------|-------------------|---------|----------|
| Next.js | 16.2.2 | Framework, App Router, SSG, generateStaticParams | [VERIFIED: package.json] |
| React | 19.2.4 | UI library, Server Components | [VERIFIED: package.json] |
| TypeScript | ^5 | Type safety for 67+ data files | [VERIFIED: package.json] |
| Tailwind CSS | ^4 | Styling (CSS-first config) | [VERIFIED: package.json] |
| schema-dts | ^2.0.0 | Service type for JSON-LD | [VERIFIED: package.json, schema.d.ts exports ServiceLeaf with @type: "Service"] |
| lucide-react | ^1.7.0 | Icons for new components | [VERIFIED: package.json] |
| clsx + tailwind-merge | ^2.1.1 / ^3.5.0 | cn() utility | [VERIFIED: package.json] |

**No new npm packages required for Phase 3.** All dependencies are already installed from Phase 1.

### Supporting (no additional libraries needed)

Phase 3 uses exclusively built-in Next.js APIs and existing project dependencies:
- `generateStaticParams()` for service and guide dynamic routes [VERIFIED: already used in app/[locationSlug]/page.tsx]
- `generateMetadata()` for per-page SEO [VERIFIED: already used in location pages]
- `next/link` for all internal navigation [VERIFIED: established pattern]
- `next/image` for hero images and static map [VERIFIED: already used in Hero.tsx]
- `IntersectionObserver` (Web API) for TOC scroll tracking [ASSUMED -- standard browser API, no polyfill needed for modern browsers]

## Architecture Patterns

### Recommended Project Structure (Phase 3 additions)

```
data/
  services.ts                    # Lightweight index (extend 15 -> 67 entries) [EXISTS]
  services/
    types.ts                     # ServiceContent, ProcessStep, Benefit, ServiceCategory types [NEW]
    content/
      {service-slug}.ts          # One file per service (67 files) [NEW]
      index.ts                   # Re-exports, lookup functions [NEW]
  guides/
    types.ts                     # GuideContent, GuideSection types [NEW]
    content/
      {guide-slug}.ts            # One file per guide (10 files) [NEW]
      index.ts                   # Re-exports, lookup functions [NEW]
  testimonials.ts                # [EXISTS, no change]
  municipalities.ts              # [EXISTS, no change]

app/
  services/
    page.tsx                     # Services index page [NEW]
    [serviceSlug]/
      page.tsx                   # Dynamic service page template [NEW]
  roofing-guides/
    page.tsx                     # Guides index page [NEW]
    [guideSlug]/
      page.tsx                   # Dynamic guide page template [NEW]
  about/
    page.tsx                     # About page [NEW]
  contact/
    page.tsx                     # Contact page [NEW]
  service-area/
    page.tsx                     # Service Area page [NEW]
  privacy-policy/
    page.tsx                     # Privacy Policy page [NEW]
  terms-of-service/
    page.tsx                     # Terms of Service page [NEW]
  sitemap.ts                     # [EXISTS, extend with service/guide/utility URLs]

components/
  sections/
    ServiceOverview.tsx           # Server component [NEW]
    ProcessSteps.tsx              # Server component [NEW]
    BenefitsGrid.tsx              # Server component [NEW]
    RelatedLocations.tsx          # Server component [NEW]
    RelatedServices.tsx           # Server component [NEW]
    ServiceFAQ.tsx                # Client component (accordion) [NEW]
    GuideArticle.tsx              # Server component [NEW]
    TableOfContents.tsx           # Client component (IntersectionObserver) [NEW]
    ExpertTips.tsx                # Server component [NEW]
    GuideFAQ.tsx                  # Client component (accordion) [NEW]
    RelatedGuides.tsx             # Server component [NEW]
    CityLinks.tsx                 # Server component [NEW]
    ContactHub.tsx                # Server component (wraps ContactForm) [NEW]
    MunicipalityGrid.tsx          # Server component [NEW]
    LegalPage.tsx                 # Server component [NEW]
  layout/
    MegaMenu.tsx                  # Client component [NEW]
    Navigation.tsx                # [EXISTS, modify for mega menu]
    MobileNav.tsx                 # [EXISTS, modify for category accordion]

lib/
  schemas.ts                     # [EXISTS, add buildServiceSchema()]
  navigation.ts                  # [EXISTS, may need mega menu data structure]
```

### Pattern 1: Content Data File (mirrors Phase 2 city content)

**What:** Each service/guide gets its own TypeScript file exporting a typed content object.
**When to use:** All 67 service files and 10 guide files.

```typescript
// data/services/types.ts
import type { FaqItem } from '@/data/content/types'

export type ServiceCategory =
  | 'Repair & Maintenance'
  | 'Residential Roofing'
  | 'Commercial Roofing'
  | 'Gutters & Drainage'
  | 'Components & Specialty'
  | 'Energy & Solar'
  | 'Roof Replacement'

export interface ProcessStep {
  readonly title: string
  readonly description: string
  readonly icon?: string  // Lucide icon name
}

export interface Benefit {
  readonly title: string
  readonly description: string
  readonly icon: string  // Lucide icon name
}

export interface ServiceContent {
  readonly slug: string
  readonly name: string
  readonly category: ServiceCategory
  readonly heroHeadline: string
  readonly heroSubheadline: string
  readonly overviewHtml: string  // 800-1000 words, HTML with silo links
  readonly processSteps: readonly ProcessStep[]
  readonly benefits: readonly Benefit[]
  readonly faqItems: readonly FaqItem[]
  readonly relatedServiceSlugs: readonly string[]
  readonly seoTitle: string
  readonly seoDescription: string
}
```
[VERIFIED: Pattern follows data/content/types.ts CityContent structure]

```typescript
// data/services/content/roof-repair.ts
import type { ServiceContent } from '../types'

export const roofRepair: ServiceContent = {
  slug: 'roof-repair',
  name: 'Roof Repair',
  category: 'Repair & Maintenance',
  heroHeadline: 'Roof Repair in Passaic County, NJ',
  heroSubheadline: 'Professional roof repair for homes and businesses...',
  overviewHtml: `<p>...</p>`,
  processSteps: [
    { title: 'Inspection', description: '...', icon: 'Search' },
    // ...4-6 steps
  ],
  benefits: [
    { title: 'Fast Response', description: '...', icon: 'Clock' },
    // ...4-6 benefits
  ],
  faqItems: [
    { question: '...', answer: '...' },
    // ...3-5 items
  ],
  relatedServiceSlugs: ['roof-replacement', 'storm-damage-repair', 'emergency-roofing'],
  seoTitle: 'Roof Repair | Paterson Roofing Contractors - Passaic County NJ',
  seoDescription: 'Professional roof repair in Passaic County, NJ...',
}
```

### Pattern 2: Dynamic Route with SSG (mirrors Phase 2 location route)

**What:** Single page template with `generateStaticParams()` serving all slugs.
**When to use:** Service pages (`app/services/[serviceSlug]/page.tsx`) and guide pages (`app/roofing-guides/[guideSlug]/page.tsx`).

```typescript
// app/services/[serviceSlug]/page.tsx
import { getServiceContent, getAllServiceSlugs } from '@/data/services/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ serviceSlug: slug }))
}

// CRITICAL: Next.js 16 -- params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>
}): Promise<Metadata> {
  const { serviceSlug } = await params
  const content = getServiceContent(serviceSlug)
  if (!content) return {}

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: `/services/${serviceSlug}` },
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `/services/${serviceSlug}`,
    },
  }
}
```
[VERIFIED: Pattern matches app/[locationSlug]/page.tsx with async params]

### Pattern 3: buildServiceSchema() (extends lib/schemas.ts)

**What:** JSON-LD schema builder for Service type.
**When to use:** Every service page.

```typescript
// Addition to lib/schemas.ts
import type { Service } from 'schema-dts'

export function buildServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'RoofingContractor',
      name: siteConfig.businessName,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: siteConfig.municipalities.map((m) => ({
      '@type': 'City' as const,
      name: `${m.name}, NJ`,
    })),
    serviceType: serviceName,
  }
}
```
[VERIFIED: schema-dts exports `Service` type (ServiceLeaf with @type: "Service"). Confirmed in node_modules/schema-dts/dist/schema.d.ts line 10381-10385]

### Pattern 4: IntersectionObserver for TOC Scroll Tracking

**What:** Client-side scroll tracking that highlights the currently visible section in the Table of Contents.
**When to use:** Guide pages with sticky sidebar TOC.

```typescript
// components/sections/TableOfContents.tsx
'use client'

import { useState, useEffect } from 'react'

export function TableOfContents({ sections }: { sections: { id: string; title: string }[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  // ... render with active highlighting
}
```
[ASSUMED: IntersectionObserver API is standard in all modern browsers. rootMargin values from UI-SPEC interaction contract.]

### Anti-Patterns to Avoid

- **Dynamic imports for content files:** Do NOT use `import()` with dynamic slugs for service/guide content. Use a lookup map (Record<string, ServiceContent>) populated at import time, matching the Phase 2 `cityContentMap` pattern. Dynamic imports in SSG context add unnecessary complexity. [VERIFIED: Phase 2 uses static Record map in data/content/index.ts]
- **Shared FAQ component with conditional props:** Do NOT make one FAQ component serve city/service/guide. Clone CityFAQ into ServiceFAQ and GuideFAQ. The heading text and context differ enough to justify separate components. Mixing concerns in one component creates fragile conditional logic. [VERIFIED: UI-SPEC specifies separate ServiceFAQ and GuideFAQ components]
- **Putting category in URL:** Decision D-08 explicitly locks flat URLs: `/services/{slug}`. Do NOT add category to URL path. Category is metadata only.
- **Rendering overviewHtml as markdown:** Content uses HTML strings with `dangerouslySetInnerHTML`, not markdown. This matches the established `introHtml` pattern in CityContent. Do NOT introduce a markdown parser. [VERIFIED: CityIntro.tsx renders introHtml via dangerouslySetInnerHTML]

## Service Taxonomy (from Reference Site)

### Scraped from newarkqualityroofing.com sitemap

The reference site has **65 service pages**. The CONTEXT.md specifies 67 services. The planner should reconcile by either: (a) adding 2 curated services relevant to Passaic County (e.g., "Roof Ventilation" and "Attic Insulation"), or (b) confirming the exact count with the user if the 67 was approximate.

**Recommended ServiceCategory enum values based on reference site groupings:** [VERIFIED: scraped from newarkqualityroofing.com]

| Category | Services (count) | Examples |
|----------|-----------------|---------|
| Repair & Maintenance | ~10 | roof-repair, roof-leak-repair, storm-damage-roof-repair, hail-damage-roof-repair, wind-damage-roof-repair, emergency-roof-repair, roof-inspection, roof-maintenance-programs, roof-cleaning-moss-removal |
| Residential Roofing | ~9 | residential-roof-installation, asphalt-shingle-roofing, slate-roof-installation-repair, wood-shake-roofing, metal-roof-installation-repair, flat-roof-installation-repair, tile-roof-installation-repair, cedar-shake-roofing, rubber-roofing-epdm |
| Commercial Roofing | ~13 | commercial-roof-installation, commercial-roof-repair, commercial-roof-replacement, tpo-roofing-installation, epdm-commercial-roofing, modified-bitumen-roofing, built-up-roofing, commercial-metal-roofing, pvc-roofing, green-roof-installation, spray-foam-roofing |
| Components & Specialty | ~10 | roof-flashing-installation-repair, chimney-flashing-repair, skylight-installation-repair, fascia-installation-repair, soffit-installation-repair, roof-vent-installation-repair, roof-waterproofing, roof-deck-repair-replacement |
| Gutters & Drainage | ~2 | gutter-installation-repair, gutter-guard-installation |
| Energy & Solar | ~5 | solar-panel-roofing-installation, solar-shingle-installation, energy-efficient-roofing-solutions, silicone-roof-coating, silicone-elastomeric-roof-coating |
| Roof Replacement | ~15 | full-roof-tear-off, roof-overlay-installation, re-roofing, insurance-roof-replacement, storm-damage-roof-replacement, aging-roof-replacement, plus material-specific replacements |
| Design & Specialty | ~3 | custom-roof-design-consultation, historic-roof-restoration, roof-ice-dam-prevention, roof-thermal-imaging-inspections, infrared-roof-leak-detection |

### Recommended 10 Guide Topics

Curated from the reference site's 300+ articles, selecting highest-value topics for Passaic County homeowners: [VERIFIED: all topics exist on newarkqualityroofing.com]

| # | Guide Topic | Source Slug | Passaic County Angle |
|---|-------------|-------------|---------------------|
| 1 | Complete NJ Roofing Guide for Homeowners | complete-nj-roofing-guide-homeowners | Adapt to Passaic County specifics |
| 2 | Roof Repair vs Replacement: When to Choose | roof-repair-vs-replacement | Dense urban housing considerations |
| 3 | Best Roofing Materials for NJ Weather | best-roofing-material-nj-weather | Passaic County micro-climates |
| 4 | How Much Does Roof Replacement Cost in NJ | roof-replacement-cost | Passaic County pricing context |
| 5 | Signs You Need Roof Repair | signs-you-need-roof-repair-nj | NJ-specific damage patterns |
| 6 | Asphalt Shingles vs Metal Roofing | asphalt-shingles-vs-metal-roofing | Material comparison for local homes |
| 7 | NJ Roofing Licensing and Insurance Guide | nj-roofing-licensing-insurance-guide | Hiring guidance for NJ homeowners |
| 8 | Best Roofing for Flat Roofs | best-roofing-for-flat-roofs | Multi-family/commercial focus (dense urban) |
| 9 | Roof Overlay vs Tear Off | roof-overlay-vs-tear-off | Cost/benefit for aging housing stock |
| 10 | DIY vs Professional Roof Repair | diy-vs-professional-roof-repair | Safety and code compliance emphasis |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service JSON-LD | Manual JSON object | `buildServiceSchema()` with schema-dts types | Type-safe schema prevents invalid markup that hurts SEO [VERIFIED: existing pattern in lib/schemas.ts] |
| FAQ accordion | Custom disclosure logic | Clone CityFAQ pattern (useState + aria attributes) | Accessibility-tested pattern already exists [VERIFIED: CityFAQ.tsx has full a11y implementation] |
| Scroll-linked TOC | Manual scroll event listeners | IntersectionObserver API | More performant, no scroll jank, handles edge cases [ASSUMED: standard web API recommendation] |
| Class name merging | Manual string concatenation | cn() utility (clsx + tailwind-merge) | Already established, handles Tailwind conflicts [VERIFIED: lib/cn.ts exists] |
| Breadcrumb schema | Manual JSON-LD | Existing Breadcrumbs component | Already handles both visual breadcrumbs AND BreadcrumbList JSON-LD [VERIFIED: components/seo/Breadcrumbs.tsx] |
| Legal page content | Write from scratch | Standard legal templates | Privacy/Terms pages are boilerplate with business name/domain/contact substitution [ASSUMED] |
| Read time calculation | Complex word counting | `Math.ceil(wordCount / 250)` | Simple formula, standard approach (~250 wpm) [ASSUMED] |

**Key insight:** Phase 3 is primarily a *content scaling* phase, not a *new architecture* phase. The foundational patterns (data files, dynamic routes, section components, schema builders) are all established. The main risk is *volume management* -- 67 service content files require systematic generation, not one-off creation.

## Common Pitfalls

### Pitfall 1: data/services.ts vs data/services/content/ Confusion
**What goes wrong:** The lightweight `data/services.ts` index (15 entries, used for navigation/grids/sitemap) and the full `data/services/content/` directory (67 detailed content files) get confused. Someone imports the wrong one.
**Why it happens:** D-11 explicitly keeps both layers. The lightweight index has `name`, `slug`, `description`, `icon`. The content directory has full page content.
**How to avoid:** (1) Extend `data/services.ts` to 67 entries first, (2) ensure the slug is the shared key between both, (3) the lightweight index is for navigation/cards, the content directory is for full page rendering.
**Warning signs:** Import paths mixing up `@/data/services` vs `@/data/services/content`.

### Pitfall 2: Mega Menu Service Count Overwhelming Navigation
**What goes wrong:** 67 services in a dropdown overwhelms users and creates a massive DOM node.
**Why it happens:** Flat list of 67 items is unusable.
**How to avoid:** D-13 mandates grouping by category. The mega menu shows 7 categories as columns, with top 5-8 services per category visible, plus "View All" link to /services index. Not all 67 services appear in the mega menu -- only the most important per category.
**Warning signs:** All 67 services rendering in the navigation dropdown.

### Pitfall 3: Next.js 16 Async Params
**What goes wrong:** `params` is accessed synchronously, causing runtime errors.
**Why it happens:** Next.js 16 changed `params` and `searchParams` to Promises.
**How to avoid:** Always `const { serviceSlug } = await params` in both `generateMetadata` and the page component. [VERIFIED: Phase 2 location page already does this correctly]
**Warning signs:** "params is a Promise" runtime errors.

### Pitfall 4: Service Content File Naming Inconsistency
**What goes wrong:** Service slug in `data/services.ts` doesn't match the filename in `data/services/content/`.
**Why it happens:** 67 files created incrementally, typos accumulate.
**How to avoid:** Generate the content index file from the lightweight service index. The slug in `data/services.ts` is the canonical source. Content filenames must match slugs exactly.
**Warning signs:** `getServiceContent(slug)` returns undefined for valid service slugs.

### Pitfall 5: Sitemap Missing New Pages
**What goes wrong:** Service, guide, and utility pages are built but not added to the sitemap.
**Why it happens:** `app/sitemap.ts` currently only includes homepage and location pages.
**How to avoid:** Update sitemap to iterate over all service slugs, guide slugs, and include static utility page URLs. Service pages get priority 0.7, guides 0.6, utility pages 0.5 (below locations at 0.8).
**Warning signs:** Google Search Console reports pages not in sitemap.

### Pitfall 6: Hero Component Breaking Changes
**What goes wrong:** Adding props to Hero (readTime, minHeight) breaks existing homepage and location page usage.
**Why it happens:** Hero is used on 3+ page types with different configurations.
**How to avoid:** All new props must be optional with sensible defaults. Homepage uses no props (defaults). Location pages pass headline/subheadline. Service pages pass headline/subheadline/backgroundImage. Guide pages pass headline/subheadline/readTime/minHeight. [VERIFIED: current Hero props are all optional with defaults]
**Warning signs:** Homepage or location pages rendering differently after Hero changes.

### Pitfall 7: Hydration Mismatch in FAQ Components
**What goes wrong:** Server-rendered FAQ shows all items collapsed, but client hydration produces different HTML.
**Why it happens:** Initial state (`openIndex = null`) must match what the server renders.
**How to avoid:** Ensure default state (all collapsed, `max-h-0` on all answers) is consistent between server render and client hydration. The existing CityFAQ handles this correctly -- clone the pattern exactly.
**Warning signs:** React hydration mismatch warnings in console.

### Pitfall 8: IntersectionObserver Missing Cleanup
**What goes wrong:** TOC scroll tracking continues observing elements after component unmount or route change.
**Why it happens:** Missing cleanup in useEffect return.
**How to avoid:** Always call `observer.disconnect()` in the useEffect cleanup function.
**Warning signs:** Performance degradation after navigating between multiple guide pages.

## Code Examples

### Service Schema Builder
```typescript
// Source: schema-dts type definitions + existing buildLocalBusinessSchema pattern
import type { WithContext, Service } from 'schema-dts'

export function buildServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceSlug: string
): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: `${siteConfig.url}/services/${serviceSlug}`,
    provider: {
      '@type': 'RoofingContractor',
      name: siteConfig.businessName,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: siteConfig.municipalities.map((m) => ({
      '@type': 'City' as const,
      name: `${m.name}, NJ`,
    })),
    serviceType: serviceName,
  }
}
```
[VERIFIED: ServiceLeaf interface confirmed in schema-dts. Provider pattern matches buildLocalBusinessSchema.]

### Content Index Pattern (follow Phase 2)
```typescript
// data/services/content/index.ts -- follows data/content/index.ts pattern
import type { ServiceContent } from '../types'
import { roofRepair } from './roof-repair'
import { roofReplacement } from './roof-replacement'
// ... 65 more imports

const serviceContentMap: Record<string, ServiceContent> = {
  'roof-repair': roofRepair,
  'roof-replacement': roofReplacement,
  // ... all 67
}

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContentMap[slug]
}

export function getAllServiceContent(): ServiceContent[] {
  return Object.values(serviceContentMap)
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceContentMap)
}

export function getServicesByCategory(): Record<string, ServiceContent[]> {
  const grouped: Record<string, ServiceContent[]> = {}
  for (const service of Object.values(serviceContentMap)) {
    if (!grouped[service.category]) grouped[service.category] = []
    grouped[service.category].push(service)
  }
  return grouped
}
```
[VERIFIED: Mirrors data/content/index.ts pattern exactly]

### Read Time Calculation
```typescript
// Utility for guide pages
export function calculateReadTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, '')  // Strip HTML tags
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.ceil(wordCount / 250)
}
```
[ASSUMED: Standard approach, 250 wpm average reading speed]

### Sitemap Extension
```typescript
// app/sitemap.ts -- extend with service, guide, and utility pages
import { services } from '@/data/services'
import { getAllGuideSlugs } from '@/data/guides/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://patersonroofingcontractors.com'

  // ... existing homepage + location pages ...

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
    // Privacy/Terms excluded (noindex)
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }))

  return [homepage, ...locationPages, ...servicePages, ...guidePages, ...utilityPages]
}
```
[VERIFIED: Extends existing app/sitemap.ts pattern. CRAWL-05 requires no noindex pages in sitemap.]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-sitemap` package | Built-in `app/sitemap.ts` | Next.js 13+ | No third-party dependency for sitemap generation [VERIFIED: CLAUDE.md notes next-sitemap abandoned] |
| Synchronous `params` | `params: Promise<...>` with `await` | Next.js 15+ | All dynamic route pages must await params [VERIFIED: existing code already uses this pattern] |
| `tailwind.config.js` | CSS-first `@theme` in globals.css | Tailwind v4 | Theme tokens defined in CSS, not JS config [VERIFIED: app/globals.css uses @theme block] |

**Deprecated/outdated:**
- `next-seo`: Redundant with Next.js Metadata API [VERIFIED: CLAUDE.md Technology Stack section]
- `react-schemaorg`: Unnecessary wrapper. Inline `<script type="application/ld+json">` in Server Components [VERIFIED: JsonLd.tsx uses this approach]

## Integration Points (Existing Code Modifications)

### Files to Modify

| File | Change | Reason |
|------|--------|--------|
| `data/services.ts` | Extend from 15 to 67 service entries | D-11: lightweight index for nav/grid/sitemap |
| `lib/schemas.ts` | Add `buildServiceSchema()` function | SCHEMA-02: Service JSON-LD |
| `lib/navigation.ts` | May need `NavigationItem` type extension for mega menu categories | D-13: mega menu data structure |
| `app/sitemap.ts` | Add service, guide, utility page URLs | SEO-04: sitemap covers all ~100 pages |
| `components/layout/Navigation.tsx` | Replace Services dropdown with MegaMenu | D-13: mega menu for 67 services |
| `components/layout/MobileNav.tsx` | Add category-grouped accordion for Services | D-13: mobile mega menu |
| `components/sections/Hero.tsx` | Add optional `readTime`, `minHeight` props | D-20: guide page read time display |
| `components/sections/ServicesGrid.tsx` | Add `groupByCategory` prop for index page | D-09: grouped service index |

### Files to Create (Summary)

- **Data types:** 2 files (`data/services/types.ts`, `data/guides/types.ts`)
- **Service content:** 67 files + 1 index (`data/services/content/*.ts`)
- **Guide content:** 10 files + 1 index (`data/guides/content/*.ts`)
- **Page routes:** 9 page.tsx files (2 dynamic + 2 index + 5 static utility)
- **Components:** 16 new components (11 sections + 1 layout + reuse patterns)

**Total new files: ~107** (primarily content data files)

## Assumptions Log

> List all claims tagged [ASSUMED] in this research.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | IntersectionObserver needs no polyfill for target browsers | Architecture Patterns | LOW -- supported in all evergreen browsers since 2019. Only IE11 lacks support, which is out of scope. |
| A2 | Standard legal templates suffice for Privacy/Terms placeholder pages | Don't Hand-Roll | LOW -- pages get noindex and are placeholder for renter's lawyer review. |
| A3 | 250 wpm is appropriate reading speed for read time calculation | Code Examples | LOW -- industry standard, used by Medium and dev.to. Variation of +/-50 wpm is acceptable for estimated read time. |
| A4 | The 67 service count may need reconciliation with 65 scraped services | Service Taxonomy | MEDIUM -- user specified 67 in CONTEXT.md, reference site has 65. Planner should note this discrepancy and either add 2 or confirm count. |

## Open Questions

1. **Service count: 67 vs 65**
   - What we know: Reference site has 65 service pages. CONTEXT.md specifies 67.
   - What's unclear: Are there 2 additional services to add, or was 67 approximate?
   - Recommendation: Planner should add 2 Passaic County-relevant services (e.g., "Roof Ventilation Installation" and "Attic Insulation") to reach 67, or note the discrepancy and proceed with 65 if content quality is more important than hitting the exact number.

2. **Static map image for Service Area page**
   - What we know: D-23 specifies static map image, no interactive map.
   - What's unclear: Source for the map image. Options: screenshot from Google Maps (copyright issues), custom SVG, Mapbox static API, or placeholder.
   - Recommendation: Use a Mapbox Static Images API URL or create a simple SVG outline of Passaic County with municipality labels. This is Claude's discretion per CONTEXT.md.

3. **Category hero images sourcing**
   - What we know: D-06 specifies 5-7 hero images by service category.
   - What's unclear: Image source (stock, AI-generated, placeholder).
   - Recommendation: Use placeholder gradient backgrounds (matching Hero's existing navy gradient fallback) during Phase 3 build. Real images can be sourced later without code changes since Hero already handles the fallback pattern.

## Environment Availability

Step 2.6: No external dependencies beyond what Phase 1 already installed. All tools (Node.js, npm, Next.js CLI) are available. No new CLI tools, databases, or services needed for Phase 3.

## Project Constraints (from CLAUDE.md)

- **Tech Stack:** Next.js App Router on Vercel, SSG [COMPLIANT -- all pages use generateStaticParams/static export]
- **Content:** 2000-2500 words per service page, 2500-3500 per guide [COMPLIANT -- per D-03, D-14]
- **Design:** Cormorant Garamond body 18px min, Cormorant headings [COMPLIANT -- inherited from Phase 1 globals.css]
- **SEO:** One H1 per page, strict heading hierarchy, canonical URLs, next/link [COMPLIANT -- all page templates follow this]
- **Metadata:** Every page exports generateMetadata() with title, description, openGraph [COMPLIANT -- pattern established]
- **Images:** All images use next/image with descriptive alt text [COMPLIANT -- Hero uses next/image]
- **Internal links:** Use next/link, not raw anchor tags [COMPLIANT -- all Link imports from next/link]
- **Font requirements:** Cormorant Garamond medium body, Cormorant headings [VERIFIED: layout.tsx configures both fonts]

## Sources

### Primary (HIGH confidence)
- newarkqualityroofing.com/sitemap/services.xml -- 65 service URLs extracted [VERIFIED: WebFetch]
- newarkqualityroofing.com/sitemap/articles.xml -- 306 article URLs [VERIFIED: WebFetch]
- newarkqualityroofing.com/sitemap/comparisons.xml -- 30 comparison URLs [VERIFIED: WebFetch]
- schema.org/Service -- Service type properties [VERIFIED: WebFetch]
- node_modules/schema-dts/dist/schema.d.ts -- Service type export confirmed [VERIFIED: file read]
- package.json -- all dependency versions [VERIFIED: file read]
- Existing codebase files -- patterns, types, components [VERIFIED: file reads of 15+ source files]

### Secondary (MEDIUM confidence)
- Schema.org Service JSON-LD best practices [WebSearch verified with schema.org]

### Tertiary (LOW confidence)
- None -- all claims verified against codebase or official sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all verified in package.json
- Architecture: HIGH -- follows established Phase 2 patterns exactly
- Pitfalls: HIGH -- identified from actual codebase analysis and Next.js 16 documentation
- Service taxonomy: HIGH -- scraped directly from reference site sitemap
- Guide topics: MEDIUM -- curated selection from 300+ options, final 10 is a recommendation

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable -- no fast-moving dependencies)
