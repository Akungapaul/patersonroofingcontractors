---
phase: 03-service-guide-utility-pages
plan: 05
subsystem: ui
tags: [nextjs, dynamic-routes, ssg, json-ld, service-pages, seo]

# Dependency graph
requires:
  - phase: 03-01
    provides: ServiceContent type, service taxonomy (67 services), buildServiceSchema()
  - phase: 03-02
    provides: Section components (ServiceOverview, ProcessSteps, BenefitsGrid, RelatedLocations, RelatedServices, ServiceFAQ)
provides:
  - Service content lookup functions (getServiceContent, getAllServiceContent, getAllServiceSlugs, getServicesByCategory)
  - Dynamic service route template rendering all 13 D-01 sections
  - Services index page at /services with category grouping
affects: [03-07, 03-08, 03-09, 03-06, sitemap]

# Tech tracking
tech-stack:
  added: []
  patterns: [service-content-index-pattern, service-dynamic-route-pattern]

key-files:
  created:
    - data/services/content/index.ts
    - app/services/[serviceSlug]/page.tsx
    - app/services/page.tsx
  modified: []

key-decisions:
  - "Content index starts empty -- Plans 07-09 will import and add service content files to serviceContentMap"
  - "Service route follows Phase 2 locationSlug pattern exactly for consistency (async params, dynamicParams=false)"
  - "Breadcrumb URLs use siteConfig.url prefix matching Phase 2 convention"

patterns-established:
  - "Service content index: Record<string, ServiceContent> map with 4 lookup functions"
  - "Service route template: 13 sections in D-01 order with 3 JSON-LD schemas (Service, FAQ, BreadcrumbList)"

requirements-completed: [SVC-01, SVC-04, SVC-05, SCHEMA-02]

# Metrics
duration: 2min
completed: 2026-04-12
---

# Phase 03 Plan 05: Service Route Template & Content Index Summary

**Service dynamic route template with 13 D-01 sections, 3 JSON-LD schemas, content lookup index, and /services hub page grouped by category**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-12T16:47:38Z
- **Completed:** 2026-04-12T16:50:15Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments
- Content index module with 4 lookup functions ready to accept content imports from Plans 07-09
- Dynamic route template rendering all 13 sections in D-01 order with Service, FAQ, and BreadcrumbList JSON-LD schemas
- Services index page at /services displaying all 67 services grouped by 8 categories
- Both pages follow Next.js 16 async params pattern with proper SEO metadata

## Task Commits

Each task was committed atomically:

1. **Task 1: Create service content index module** - `2d853ff` (feat)
2. **Task 2: Create service dynamic route template and services index page** - `909e4a9` (feat)

## Files Created
- `data/services/content/index.ts` - Service content lookup functions (getServiceContent, getAllServiceContent, getAllServiceSlugs, getServicesByCategory)
- `app/services/[serviceSlug]/page.tsx` - Dynamic service page route template with 13 sections and 3 JSON-LD schemas
- `app/services/page.tsx` - Services index page with category grouping and SEO metadata

## Decisions Made
- Content index starts with empty serviceContentMap -- Plans 07-09 will populate it with service content file imports. generateStaticParams returns empty array until content is added, which is the expected behavior.
- Service route template follows the exact Phase 2 locationSlug dynamic route pattern for consistency: async params, dynamicParams=false, siteConfig.url breadcrumb prefixes.
- RelatedServices resolves slugs from lightweight `data/services.ts` index rather than content index, since not all content may be populated yet.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Service route template ready to render pages once content files are created in Plans 07-09
- Services index page fully functional with all 67 service cards from lightweight index
- Content index ready to accept imports as `serviceContentMap` entries

## Self-Check: PASSED

---
*Phase: 03-service-guide-utility-pages*
*Completed: 2026-04-12*
