---
phase: 03-service-guide-utility-pages
plan: 01
subsystem: data
tags: [typescript, types, schema-dts, json-ld, lucide-react]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: lib/schemas.ts schema builder pattern, data/content/types.ts FaqItem type, lib/site-config.ts municipalities
  - phase: 02-location-pages
    provides: Hero and ServicesGrid components, data/services.ts lightweight index
provides:
  - ServiceContent type definition (data/services/types.ts)
  - GuideContent type definition (data/guides/types.ts)
  - buildServiceSchema() JSON-LD builder (lib/schemas.ts)
  - 67-service lightweight index with categories (data/services.ts)
  - Hero readTime and minHeight props
  - ServicesGrid groupByCategory prop
affects: [03-02, 03-03, 03-04, 03-05, 03-06, 03-07, 03-08, 03-09, 03-10, 03-11, 03-12]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ServiceContent/GuideContent types follow CityContent pattern from Phase 2"
    - "buildServiceSchema follows buildLocalBusinessSchema pattern with provider and areaServed"
    - "Service index uses optional category field for backward compatibility"

key-files:
  created:
    - data/services/types.ts
    - data/guides/types.ts
  modified:
    - lib/schemas.ts
    - data/services.ts
    - components/sections/Hero.tsx
    - components/sections/ServicesGrid.tsx

key-decisions:
  - "67-service taxonomy uses slugs from newarkqualityroofing.com reference site, replacing some original 15 slugs"
  - "ServiceCategory uses 8 categories: Repair & Maintenance, Residential Roofing, Commercial Roofing, Gutters & Drainage, Components & Specialty, Energy & Solar, Roof Replacement, Design & Specialty"
  - "Hero minHeight defaults to existing ternary when not provided for full backward compatibility"
  - "ServicesGrid groupByCategory renders category subsections with alternating backgrounds"

patterns-established:
  - "Service type definitions import FaqItem from data/content/types for cross-entity reuse"
  - "Schema builders accept primitive args (not full content objects) for flexibility"
  - "Optional category field on lightweight Service type preserves backward compatibility"

requirements-completed: [SVC-02, SVC-03, SCHEMA-02, GUIDE-01]

# Metrics
duration: 5min
completed: 2026-04-12
---

# Phase 3 Plan 1: Service/Guide Foundation Summary

**ServiceContent and GuideContent type system with 67-service index, buildServiceSchema() JSON-LD builder, and Hero/ServicesGrid prop extensions for service and guide pages**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-12T16:17:41Z
- **Completed:** 2026-04-12T16:22:59Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created ServiceContent type with all D-12 fields (slug, name, category, heroHeadline, heroSubheadline, overviewHtml, processSteps, benefits, faqItems, relatedServiceSlugs, seoTitle, seoDescription) and supporting ProcessStep, Benefit, ServiceCategory types
- Created GuideContent type with all D-16 fields (slug, title, description, sections, expertTips, faqItems, relatedServiceSlugs, relatedGuideSlugs, seoTitle, seoDescription) and supporting GuideSection type
- Extended data/services.ts from 15 to 67 entries with category field matching the 8-category taxonomy from the reference site
- Added buildServiceSchema() to lib/schemas.ts producing valid Service JSON-LD with RoofingContractor provider and 16-municipality areaServed
- Extended Hero with readTime (displays "{N} min read" badge) and minHeight props, backward compatible
- Extended ServicesGrid with groupByCategory prop for category-grouped index page display, backward compatible

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ServiceContent and GuideContent type definitions + buildServiceSchema()** - `4abecbb` (feat)
2. **Task 2: Extend data/services.ts to 67 entries + Hero and ServicesGrid prop extensions** - `abe84a3` (feat)

## Files Created/Modified
- `data/services/types.ts` - ServiceContent, ProcessStep, Benefit, ServiceCategory type definitions
- `data/guides/types.ts` - GuideContent, GuideSection type definitions
- `lib/schemas.ts` - Added buildServiceSchema() with Service import from schema-dts
- `data/services.ts` - Extended from 15 to 67 service entries with category field
- `components/sections/Hero.tsx` - Added readTime and minHeight optional props
- `components/sections/ServicesGrid.tsx` - Added groupByCategory prop, 16 new Lucide icon imports

## Decisions Made
- Used the 67-service taxonomy from the newarkqualityroofing.com reference site as specified in the plan. Some original 15 slugs evolved to match the taxonomy (e.g., storm-damage-repair became storm-damage-roof-repair, flat-roof-services became flat-roof-installation-repair). City content files still reference old slugs in relevantServiceSlugs -- this will need reconciliation when service content files are created in later plans.
- ServiceCategory includes 8 values matching the reference site groupings, including 'Design & Specialty' as the 8th category (plan specified this addition).
- Hero readTime uses `!= null` check (not falsy) to allow `readTime={0}` edge case.
- ServicesGrid groupByCategory uses Map to preserve insertion order of categories matching the data file order.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**Pre-existing slug mismatch noted:** City content files (data/content/*.ts) reference old service slugs from the original 15-entry index (e.g., `storm-damage-repair`, `flat-roof-services`, `emergency-roofing`). The 67-service taxonomy uses different slugs for these services. This is pre-existing and out of scope for this plan -- will be reconciled when service content files and bidirectional linking are implemented in later Phase 3 plans.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- ServiceContent and GuideContent types ready for all downstream Phase 3 plans
- buildServiceSchema() ready for service page template (Plan 03-02/03-03)
- 67-service index ready for navigation, mega menu, sitemap, and service index page
- Hero and ServicesGrid props ready for service and guide page templates
- City content relevantServiceSlugs need slug reconciliation in a later plan

## Self-Check: PASSED

All 6 files verified present. Both task commits (4abecbb, abe84a3) verified in git log.

---
*Phase: 03-service-guide-utility-pages*
*Completed: 2026-04-12*
