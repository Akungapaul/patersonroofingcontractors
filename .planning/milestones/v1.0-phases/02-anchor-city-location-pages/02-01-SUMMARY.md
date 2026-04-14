---
phase: 02-anchor-city-location-pages
plan: 01
subsystem: data-types, seo, ui
tags: [typescript, schema-dts, json-ld, faq-schema, react, next-image]

# Dependency graph
requires:
  - phase: 01-foundation-infrastructure-homepage
    provides: lib/schemas.ts schema builders, Hero/MidPageCTA/ServicesGrid components, siteConfig
provides:
  - CityContent type definition (contract for all 16 city data files)
  - Neighborhood and FaqItem type definitions
  - buildFaqSchema() for FAQPage JSON-LD structured data
  - buildLocalBusinessSchema() with optional cityName parameter
  - Hero component with optional headline/subheadline/backgroundImage props
  - MidPageCTA component with optional cityName prop
  - ServicesGrid component with optional serviceSlugs filter and title override
affects: [02-02, 02-03, 02-04, 02-05, all location page plans]

# Tech tracking
tech-stack:
  added: []
  patterns: [optional-props-for-component-reuse, type-contract-before-data-files]

key-files:
  created: [data/content/types.ts]
  modified: [lib/schemas.ts, components/sections/Hero.tsx, components/sections/MidPageCTA.tsx, components/sections/ServicesGrid.tsx]

key-decisions:
  - "CityContent cluster type uses 'Urban' | 'Suburban' | 'Highlands' matching site-config municipality clusters"
  - "Hero uses min-h-[70vh] for location pages vs min-h-screen for homepage"
  - "buildLocalBusinessSchema defaults to Paterson when no cityName provided for backward compatibility"

patterns-established:
  - "Optional props pattern: all Phase 1 components extended with optional props so homepage calls with no args continue to work identically"
  - "Type-first data modeling: CityContent interface defined before any data files, acting as the contract"

requirements-completed: [SCHEMA-03, ANCHOR-04, LOC-06]

# Metrics
duration: 2min
completed: 2026-04-10
---

# Phase 2 Plan 1: Foundation Types and Component Extensions Summary

**CityContent type contract, FAQ JSON-LD schema builder, and optional prop extensions for Hero, MidPageCTA, and ServicesGrid enabling location page reuse**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-10T14:12:31Z
- **Completed:** 2026-04-10T14:14:55Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created CityContent, Neighborhood, and FaqItem type definitions as the contract for all 16 city data files
- Added buildFaqSchema() to lib/schemas.ts producing valid FAQPage JSON-LD structured data (SCHEMA-03)
- Extended buildLocalBusinessSchema() with optional cityName parameter for per-city schema
- Extended Hero with optional headline/subheadline/backgroundImage props and 70vh height for location pages
- Extended MidPageCTA with optional cityName for city-specific CTA messaging
- Extended ServicesGrid with optional serviceSlugs filter and title override

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CityContent type definitions and FAQ schema builder** - `f675cba` (feat)
2. **Task 2: Extend MidPageCTA, Hero, and ServicesGrid with location page props** - `0f0f032` (feat)

## Files Created/Modified
- `data/content/types.ts` - CityContent, Neighborhood, FaqItem type definitions (new)
- `lib/schemas.ts` - Added FAQPage import, buildFaqSchema(), extended buildLocalBusinessSchema(cityName?)
- `components/sections/Hero.tsx` - Added HeroProps with headline/subheadline/backgroundImage, Image import, 70vh for location pages
- `components/sections/MidPageCTA.tsx` - Added MidPageCTAProps with optional cityName for city-specific messaging
- `components/sections/ServicesGrid.tsx` - Added ServicesGridProps with serviceSlugs filter and title override

## Decisions Made
- CityContent.cluster uses the same 3 cluster values ('Urban' | 'Suburban' | 'Highlands') as siteConfig.municipalities for consistency
- Hero renders min-h-[70vh] for location pages (when headline is provided) vs min-h-screen for homepage
- buildLocalBusinessSchema defaults addressLocality to 'Paterson' when no cityName passed, preserving backward compatibility

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CityContent type is ready for all city data files (Plans 02-02 through 02-05)
- buildFaqSchema() is ready for use in location page templates
- Hero, MidPageCTA, and ServicesGrid are ready to accept location-specific props
- All components maintain backward compatibility with homepage

## Self-Check: PASSED

All 5 files verified present. Both task commits (f675cba, 0f0f032) verified in git history.

---
*Phase: 02-anchor-city-location-pages*
*Completed: 2026-04-10*
