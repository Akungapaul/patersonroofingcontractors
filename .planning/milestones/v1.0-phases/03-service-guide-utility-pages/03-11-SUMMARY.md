---
phase: 03-service-guide-utility-pages
plan: 11
subsystem: ui
tags: [nextjs, react, tailwindcss, seo, metadata, breadcrumbs, legal-pages, utility-pages]

# Dependency graph
requires:
  - phase: 03-01
    provides: Reusable section components (Hero, WhyChooseUs, ContactForm, MidPageCTA)
  - phase: 03-03
    provides: ContactHub, MunicipalityGrid, CityLinks, LegalPage components
provides:
  - About page with company story, credentials, WhyChooseUs, service area links
  - Contact page with ContactHub and CityLinks
  - Service Area page with MunicipalityGrid and map placeholder
  - Privacy Policy page with noindex and legal template content
  - Terms of Service page with noindex and legal template content
  - Legal content data files in data/legal/
affects: [03-12, sitemap, footer-links]

# Tech tracking
tech-stack:
  added: []
  patterns: [legal-content-data-files, utility-page-metadata-pattern]

key-files:
  created:
    - app/about/page.tsx
    - app/contact/page.tsx
    - app/service-area/page.tsx
    - app/privacy-policy/page.tsx
    - app/terms-of-service/page.tsx
    - data/legal/privacy-policy.ts
    - data/legal/terms-of-service.ts
  modified: []

key-decisions:
  - "Legal content stored as template literal data files in data/legal/ with siteConfig interpolation"
  - "Breadcrumb URLs use full siteConfig.url prefix for consistency with location pages"
  - "WhyChooseUs bg alternation adjusted -- CityLinks section wraps in gray-light bg on About page for proper alternation"

patterns-established:
  - "Legal data pattern: data/legal/{slug}.ts exports template literal with siteConfig interpolation"
  - "Utility page pattern: static metadata export, Breadcrumbs + Hero + section composition"

requirements-completed: [UTIL-01, UTIL-02, UTIL-03, UTIL-04, UTIL-05]

# Metrics
duration: 3min
completed: 2026-04-13
---

# Phase 03 Plan 11: Utility Pages Summary

**5 utility pages (About, Contact, Service Area, Privacy Policy, Terms of Service) with full SEO metadata, breadcrumbs, legal content data files, and noindex on legal pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-13T03:35:30Z
- **Completed:** 2026-04-13T03:39:27Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- About page with 7-paragraph company story, 6-item credentials grid, WhyChooseUs reuse, and CityLinks service area overview
- Contact page composing ContactHub and CityLinks with proper hero sizing (min-h-[40vh])
- Service Area page with MunicipalityGrid, map placeholder, MidPageCTA, and ContactForm
- Privacy Policy and Terms of Service pages with noindex robots directive, LegalPage component, and comprehensive legal template content
- All 5 pages have generateMetadata with title, description, canonical, openGraph (where applicable) and BreadcrumbList schema via Breadcrumbs component

## Task Commits

Each task was committed atomically:

1. **Task 1: Create About, Contact, and Service Area pages** - `be7bbdc` (feat)
2. **Task 2: Create Privacy Policy and Terms of Service pages with legal content** - `6a71984` (feat)

## Files Created/Modified
- `app/about/page.tsx` - About page with story, credentials, WhyChooseUs, service area links, ContactForm
- `app/contact/page.tsx` - Contact page with ContactHub and Areas We Serve CityLinks
- `app/service-area/page.tsx` - Service Area page with MunicipalityGrid, map placeholder, MidPageCTA, ContactForm
- `app/privacy-policy/page.tsx` - Privacy Policy page with noindex and LegalPage component
- `app/terms-of-service/page.tsx` - Terms of Service page with noindex and LegalPage component
- `data/legal/privacy-policy.ts` - Privacy policy content template with siteConfig interpolation
- `data/legal/terms-of-service.ts` - Terms of service content template with NJ governing law, siteConfig interpolation

## Decisions Made
- Legal content stored as TypeScript template literal data files in `data/legal/` using siteConfig interpolation for business name, email, phone, and URL -- keeps legal content separate from page components
- Breadcrumb URLs use full `siteConfig.url` prefix (e.g., `https://patersonroofingcontractors.com/about`) for consistency with location page breadcrumbs established in Phase 2
- About page CityLinks section wrapped in gray-light bg section for proper background alternation per UI-SPEC

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
- `app/service-area/page.tsx` line ~58: Map placeholder div (`Map placeholder - Passaic County service area`) - intentional per plan, actual map image to be sourced later without code changes

## Next Phase Readiness
- All 5 utility pages complete, ready for Plan 03-12 (sitemap/verification integration)
- Legal pages properly noindexed to preserve crawl budget
- About, Contact, and Service Area pages provide E-E-A-T signals and link hub for location pages

## Self-Check: PASSED

All 7 created files verified present. Both task commits (be7bbdc, 6a71984) confirmed in git log.

---
*Phase: 03-service-guide-utility-pages*
*Completed: 2026-04-13*
