---
phase: 01-foundation-infrastructure-homepage
plan: 02
subsystem: infra
tags: [tailwindcss, nextjs, typescript, seo, json-ld, schema-dts, lucide-react, design-system, ui-components]

# Dependency graph
requires:
  - phase: 01-foundation-infrastructure-homepage/01
    provides: "Next.js 16 project scaffold with all dependencies, approved Variation 9 (Amber Emphasis) theme"
provides:
  - "Tailwind v4 design tokens (navy, amber, gray-light, spacing, radius) in globals.css @theme"
  - "Root layout with Cormorant/Cormorant Garamond fonts, metadata template, Vercel analytics"
  - "site-config.ts with all renter-swappable business data (phone, hours, 16 municipalities, stats)"
  - "Navigation structure with Services dropdown (8 services), Locations, Guides, About, Contact"
  - "3 data files: services (8 items), municipalities (16 with cluster colors), testimonials (3 reviews)"
  - "SEO infrastructure: sitemap.ts, robots.ts, JSON-LD schema builders, JsonLd component, Breadcrumbs component"
  - "5 UI primitives: Button (4 variants), Card (interactive), Badge (trust/cluster), StarRating, PhoneButton (compact/full)"
  - "cn() utility function (clsx + tailwind-merge)"
affects: [01-foundation-infrastructure-homepage]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Tailwind v4 CSS-first @theme design tokens (no tailwind.config.js)"
    - "@theme inline for next/font CSS variable integration"
    - "cn() utility combining clsx + tailwind-merge for class composition"
    - "site-config.ts as single source for all renter-swappable content"
    - "schema-dts typed JSON-LD with XSS-safe dangerouslySetInnerHTML rendering"
    - "Server Component UI primitives with variant/size pattern"
    - "44px minimum touch targets on all interactive elements"
    - "motion-reduce: prefix on translate animations"

key-files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/sitemap.ts
    - app/robots.ts
    - lib/cn.ts
    - lib/site-config.ts
    - lib/schemas.ts
    - lib/navigation.ts
    - data/services.ts
    - data/municipalities.ts
    - data/testimonials.ts
    - components/seo/JsonLd.tsx
    - components/seo/Breadcrumbs.tsx
    - components/ui/Button.tsx
    - components/ui/Card.tsx
    - components/ui/Badge.tsx
    - components/ui/StarRating.tsx
    - components/ui/PhoneButton.tsx
  modified: []

key-decisions:
  - "Used @theme inline for font variables to integrate next/font runtime CSS variables with Tailwind v4"
  - "Typed siteConfig as const for strict literal types enabling schema-dts type satisfaction"
  - "Navigation children array left empty for Locations -- populated from siteConfig.municipalities at render time"
  - "PhoneButton uses sr-only span for compact mode accessibility rather than aria-label"

patterns-established:
  - "Design tokens: all custom colors/spacing/radius defined in globals.css @theme block"
  - "Font integration: next/font CSS variables → @theme inline → font-heading/font-body utilities"
  - "Component pattern: Server Components with variant/size props, cn() for class merging"
  - "Data layer: typed readonly arrays with as const for compile-time safety"
  - "SEO pattern: JsonLd component wraps schema-dts typed data with XSS escaping"
  - "Schema builders: pure functions returning WithContext<T> from schema-dts"
  - "Accessibility: 44px touch targets, focus-visible outlines, aria-labels, motion-reduce"

requirements-completed: [FNDN-03, FNDN-04, FNDN-07, LEAD-05, SEO-01, SEO-03, SEO-04, SEO-05, SEO-07, SEO-09, SCHEMA-04, SILO-01]

# Metrics
duration: 8min
completed: 2026-04-08
---

# Phase 01 Plan 02: Design System, Data Layer, SEO Infrastructure, and UI Primitives Summary

**Tailwind v4 design tokens with Variation 9 amber emphasis, Cormorant font integration, site-config with 16 municipalities, JSON-LD schema builders, and 5 accessible UI primitive components**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-09T00:01:53Z
- **Completed:** 2026-04-09T00:09:52Z
- **Tasks:** 2
- **Files created:** 18

## Accomplishments
- Established complete Tailwind v4 CSS-first design system with navy/amber/gray-light tokens matching approved Variation 9 theme
- Created root layout with Cormorant and Cormorant Garamond fonts, full SEO metadata with canonical URL, and Vercel analytics
- Built site-config.ts as single source of truth for all renter-swappable business data including 16 Passaic County municipalities
- Implemented SEO infrastructure: XML sitemap, robots.txt, 3 typed JSON-LD schema builders (RoofingContractor, Organization, BreadcrumbList)
- Created 5 accessible UI primitives (Button, Card, Badge, StarRating, PhoneButton) with proper variants, 44px touch targets, focus-visible outlines, and reduced-motion support

## Task Commits

Each task was committed atomically:

1. **Task 1: Design system, root layout, data layer, and utility functions** - `13d9065` (feat)
2. **Task 2: SEO infrastructure and UI primitive components** - `3d9f0c5` (feat)

## Files Created/Modified
- `app/globals.css` - Tailwind v4 @theme design tokens (navy, amber, gray-light, spacing, radius) with @theme inline font integration and base layer styles
- `app/layout.tsx` - Root layout with Cormorant/Cormorant Garamond fonts, metadata template, canonical URL, openGraph, Vercel Analytics + SpeedInsights
- `app/sitemap.ts` - XML sitemap generation via MetadataRoute.Sitemap
- `app/robots.ts` - robots.txt generation via MetadataRoute.Robots with /api/ disallowed
- `lib/cn.ts` - Utility function combining clsx + tailwind-merge for class composition
- `lib/site-config.ts` - All renter-swappable content: business name, phone, email, hours, stats, 16 municipalities with slugs/types/clusters/populations
- `lib/schemas.ts` - JSON-LD schema builders: buildLocalBusinessSchema (RoofingContractor), buildOrganizationSchema, buildBreadcrumbSchema
- `lib/navigation.ts` - Navigation structure with Services dropdown (8 services), Locations, Guides, About, Contact
- `data/services.ts` - 8 roofing services with names, slugs, descriptions, and Lucide icon names
- `data/municipalities.ts` - Re-exported municipalities from site-config with geographic cluster color mappings (Urban, Suburban, Highlands)
- `data/testimonials.ts` - 3 placeholder reviews with names, Passaic County cities, 5-star ratings, and realistic review text
- `components/seo/JsonLd.tsx` - Reusable JSON-LD script renderer with XSS prevention via closing tag escaping
- `components/seo/Breadcrumbs.tsx` - Visual breadcrumb trail with BreadcrumbList JSON-LD schema, using next/link for navigation
- `components/ui/Button.tsx` - Button with primary/secondary/outline/ghost variants, sm/md/lg sizes, 44px min touch target
- `components/ui/Card.tsx` - Card with optional interactive mode (hover lift, amber border, shadow-md) and motion-reduce support
- `components/ui/Badge.tsx` - Badge with trust (icon + text) and cluster (rounded pill) variants
- `components/ui/StarRating.tsx` - 5-star rating display with amber-light filled stars, aria-label for accessibility
- `components/ui/PhoneButton.tsx` - Click-to-call amber button with compact mode (Call on mobile, full number on desktop) and sr-only text

## Decisions Made
- Used `@theme inline` for font variables because next/font injects CSS variables at runtime on the HTML element -- static `@theme` cannot reference runtime variables
- Typed `siteConfig` with `as const` for strict literal types, enabling schema-dts OpeningHoursSpecification day-of-week validation
- Left navigation Locations `children` as empty array to be populated dynamically from `siteConfig.municipalities` at render time, avoiding data duplication
- Used `sr-only` span pattern for PhoneButton compact mode accessibility rather than `aria-label` on the anchor, ensuring screen readers announce the full phone number

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required at this stage.

## Next Phase Readiness
- Design system tokens fully available as Tailwind utilities (bg-navy, text-amber, etc.)
- Root layout serves both Cormorant fonts with zero layout shift via next/font
- All data files (services, municipalities, testimonials) ready for consumption by homepage sections
- SEO infrastructure (sitemap, robots, schema builders, JsonLd, Breadcrumbs) ready for all pages
- UI primitives (Button, Card, Badge, StarRating, PhoneButton) ready for layout shell and homepage assembly
- Ready for Plan 03: Layout Shell (Header, Footer, Navigation, MobileNav)

## Self-Check: PASSED

All 18 created files verified present. Both task commits (13d9065, 3d9f0c5) verified in git log. All 36 acceptance criteria checks passed. TypeScript compiles with zero errors (exit code 0).

---
*Phase: 01-foundation-infrastructure-homepage*
*Completed: 2026-04-08*
