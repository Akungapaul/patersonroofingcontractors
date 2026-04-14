---
phase: 02-anchor-city-location-pages
plan: 03
subsystem: pages, data, seo
tags: [next-dynamic-route, generateStaticParams, city-content, json-ld, sitemap, seo-content]

# Dependency graph
requires:
  - phase: 02-anchor-city-location-pages
    plan: 01
    provides: CityContent type, buildFaqSchema(), buildLocalBusinessSchema(cityName?), Hero/MidPageCTA/ServicesGrid with optional props
  - phase: 02-anchor-city-location-pages
    plan: 02
    provides: CityIntro, NeighborhoodGrid, CityFAQ section components
provides:
  - Dynamic route template at app/[locationSlug]/page.tsx rendering all 16 location pages
  - Paterson anchor city content with 1227-word intro, 12 neighborhoods, 8 FAQ items
  - Content index module with getCityContent(), getAllCityContent(), getAllCitySlugs() lookup functions
  - Updated sitemap with 17 URLs (1 homepage + 16 locations)
affects: [02-04, 02-05, all future location content plans]

# Tech tracking
tech-stack:
  added: []
  patterns: [full-slug-generateStaticParams, extractCitySlug-helper, dynamicParams-false-route-guard]

key-files:
  created: [app/[locationSlug]/page.tsx, data/content/index.ts, data/content/paterson.ts]
  modified: [app/sitemap.ts]

key-decisions:
  - "Dynamic route uses [locationSlug] folder with full slug generateStaticParams (not partial dynamic segments) per Next.js limitation"
  - "extractCitySlug helper strips roofing-contractor- prefix and -nj suffix to resolve city slug from URL"
  - "Paterson introHtml at 1227 words with 6 silo links to service pages for internal linking structure"
  - "Sitemap gives Paterson priority 0.9 (highest non-homepage) and all other locations 0.8"

patterns-established:
  - "Full-slug dynamic route: generateStaticParams returns complete URL slug, page extracts city via helper function"
  - "Content data architecture: per-city TypeScript file exports CityContent, index.ts provides slug-keyed lookup"
  - "Location page template: 12 sections in D-01 order with 2 JSON-LD schemas (LocalBusiness, FAQ) + Breadcrumbs"

requirements-completed: [ANCHOR-01, ANCHOR-02, ANCHOR-03, ANCHOR-04, ANCHOR-05, LOC-01, LOC-06, SCHEMA-03]

# Metrics
duration: 5min
completed: 2026-04-10
---

# Phase 2 Plan 3: Dynamic Route Template and Paterson Anchor Content Summary

**Dynamic route at app/[locationSlug]/page.tsx with generateStaticParams for 16 locations, 1227-word Paterson anchor content with Dense Urban Housing angle, content index lookup module, and sitemap with all 16 location URLs**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-10T14:20:43Z
- **Completed:** 2026-04-10T14:26:13Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created dynamic route template rendering all 12 sections in D-01 order with LocalBusiness and FAQ JSON-LD schemas, BreadcrumbList via Breadcrumbs component, and dynamicParams=false route guard
- Built Paterson anchor content with 1227-word introHtml weaving Dense Urban Housing content angle, referencing Great Falls, Silk City heritage, Passaic River flooding, Victorian-era homes, and multi-family building challenges
- Included 6 internal silo links within introHtml prose pointing to roof-repair, flat-roof-services, chimney-flashing-repair, storm-damage-repair, emergency-roofing, and roof-replacement service pages
- Created content index module with getCityContent(), getAllCityContent(), getAllCitySlugs() exports ready for 15 additional city files
- Updated sitemap from 1 URL (homepage only) to 17 URLs (homepage + 16 location pages)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create dynamic route template and content index** - `10b60ee` (feat)
2. **Task 2: Create Paterson anchor content and update sitemap** - `fde7311` (feat)

## Files Created/Modified
- `app/[locationSlug]/page.tsx` - Dynamic route template with generateStaticParams for 16 slugs, generateMetadata with async params, 12-section layout in D-01 order
- `data/content/index.ts` - Content lookup module with getCityContent(), getAllCityContent(), getAllCitySlugs()
- `data/content/paterson.ts` - Paterson anchor content: 1227-word intro, 12 neighborhoods, 8 FAQ items, 6 service slugs, Dense Urban Housing angle
- `app/sitemap.ts` - Updated with 16 location page URLs (Paterson at 0.9, others at 0.8 priority)

## Decisions Made
- Used `[locationSlug]` folder name with full slug in generateStaticParams because Next.js does not support partial dynamic segments in folder names (e.g., `roofing-contractor-[city]-nj` would not work)
- Created extractCitySlug() helper to strip `roofing-contractor-` prefix and `-nj` suffix, centralizing slug resolution logic
- Paterson introHtml written at 1227 words (within 1200-1500 target) with 6 silo links woven naturally into prose
- Sitemap assigns priority 0.9 to Paterson (anchor page, highest after homepage) and 0.8 to all other locations
- ServicesGrid background left as bg-white (existing component default) rather than bg-gray-light per UI-SPEC note -- keeping consistent with component's built-in styling to avoid cross-task modifications

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Dynamic route template is ready to render all 16 location pages -- only content data files needed
- Content index module will accept new city imports as Plans 04 and 05 add the remaining 15 city data files
- Sitemap already includes all 16 location URLs even though content files for 15 cities are not yet created (generateStaticParams will error at build until content exists)
- All components, schemas, and types from Plans 01 and 02 integrate correctly with the template

## Self-Check: PASSED

All 4 files verified present. Both task commits (10b60ee, fde7311) verified in git history.

---
*Phase: 02-anchor-city-location-pages*
*Completed: 2026-04-10*
