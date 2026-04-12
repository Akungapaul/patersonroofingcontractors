---
phase: 03-service-guide-utility-pages
plan: 06
subsystem: ui
tags: [nextjs, react, seo, guides, toc, json-ld, read-time]

# Dependency graph
requires:
  - phase: 03-01
    provides: GuideContent/GuideSection types and FaqItem reuse
  - phase: 03-03
    provides: Guide section components (GuideArticle, TableOfContents, ExpertTips, GuideFAQ, RelatedGuides, CityLinks)
provides:
  - Guide content index module (getGuideContent, getAllGuideContent, getAllGuideSlugs)
  - Read time calculation utility (calculateReadTime, calculateGuideReadTime)
  - Guide dynamic route template with sidebar TOC layout
  - Guides index page with card grid
affects: [03-10, 03-12]

# Tech tracking
tech-stack:
  added: []
  patterns: [guide-content-index, read-time-calculation, sidebar-toc-layout, guide-route-template]

key-files:
  created:
    - data/guides/content/index.ts
    - lib/utils.ts
    - app/roofing-guides/[guideSlug]/page.tsx
    - app/roofing-guides/page.tsx
  modified: []

key-decisions:
  - "GuideArticle renders inside flex layout child alongside ExpertTips for desktop sidebar TOC composition"
  - "Guide content index follows exact same pattern as service content index (empty map, ready for Plan 10)"
  - "Read time utility placed in lib/utils.ts as reusable module for guide and future content types"

patterns-established:
  - "Guide content index: same lookup pattern as service content index (guideContentMap + 3 accessor functions)"
  - "Sidebar TOC layout: flex with hidden lg:block TOC + min-w-0 flex-1 article content"
  - "Read time calculation: strip HTML tags, count words, divide by 250 wpm"

requirements-completed: [GUIDE-01, GUIDE-02, GUIDE-04, SILO-03]

# Metrics
duration: 2min
completed: 2026-04-12
---

# Phase 03 Plan 06: Guide Route Template and Content Index Summary

**Guide dynamic route with sidebar TOC layout, read time calculation, FAQ/breadcrumb JSON-LD, and guides index page with card grid**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-12T16:52:06Z
- **Completed:** 2026-04-12T16:54:54Z
- **Tasks:** 2
- **Files created:** 4

## Accomplishments
- Created guide content index module with 3 lookup functions matching service content index pattern
- Built guide route template rendering 9 sections with desktop sidebar TOC + mobile collapsible TOC
- Added read time utility calculating minutes from HTML content (250 wpm)
- Implemented guides index page with responsive card grid showing title, description, and read time

## Task Commits

Each task was committed atomically:

1. **Task 1: Create guide content index module and helper utility** - `b7e57bd` (feat)
2. **Task 2: Create guide dynamic route template and guides index page** - `9f78fb1` (feat)

## Files Created
- `data/guides/content/index.ts` - Guide content lookup functions (getGuideContent, getAllGuideContent, getAllGuideSlugs)
- `lib/utils.ts` - Read time calculation utilities (calculateReadTime, calculateGuideReadTime)
- `app/roofing-guides/[guideSlug]/page.tsx` - Dynamic guide page route with sidebar TOC, FAQ JSON-LD, breadcrumbs
- `app/roofing-guides/page.tsx` - Guides index page with card grid, MidPageCTA, ContactForm

## Decisions Made
- GuideArticle renders inside flex layout child alongside ExpertTips for desktop sidebar TOC composition
- Guide content index follows exact same pattern as service content index (empty map, ready for Plan 10)
- Read time utility placed in lib/utils.ts as reusable module for guide and future content types

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

| Stub | File | Line | Reason |
|------|------|------|--------|
| Empty guideContentMap | data/guides/content/index.ts | 4 | Intentional - content files created in Plan 10 |
| Empty guides grid fallback | app/roofing-guides/page.tsx | 75 | Shows "coming soon" message until Plan 10 populates content |

Both stubs are intentional and will be resolved by Plan 10 (guide content creation).

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Guide route template ready to render any guide content added to guideContentMap
- Plans 07-09 handle service content; Plan 10 will populate guide content
- All guide section components from Plan 03 are wired and functional

## Self-Check: PASSED

All 4 created files verified on disk. Both commit hashes (b7e57bd, 9f78fb1) found in git log.

---
*Phase: 03-service-guide-utility-pages*
*Completed: 2026-04-12*
