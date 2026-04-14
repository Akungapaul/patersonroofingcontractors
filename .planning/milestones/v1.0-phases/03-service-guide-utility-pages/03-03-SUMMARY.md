---
phase: 03-service-guide-utility-pages
plan: 03
subsystem: ui
tags: [react, server-components, client-components, intersection-observer, accordion, lucide-react]

# Dependency graph
requires:
  - phase: 03-service-guide-utility-pages/01
    provides: GuideSection type, GuideContent type, FaqItem type
  - phase: 01-foundation-infrastructure-homepage
    provides: Card, Badge, ContactForm, siteConfig, cn utility
provides:
  - GuideArticle section component for guide page body rendering
  - TableOfContents client component with IntersectionObserver scroll tracking
  - ExpertTips amber callout component for guide pages
  - GuideFAQ accordion component for guide page FAQs
  - RelatedGuides card grid component for guide cross-linking
  - CityLinks municipality links grid for guide and utility pages
  - ContactHub 2-column contact section with form and business info
  - MunicipalityGrid municipality cards with population and cluster badges
  - LegalPage wrapper component for privacy/terms pages
affects: [03-service-guide-utility-pages, guide-page-templates, utility-page-templates]

# Tech tracking
tech-stack:
  added: []
  patterns: [IntersectionObserver scroll tracking for TOC, accordion pattern reuse with unique id prefixes]

key-files:
  created:
    - components/sections/GuideArticle.tsx
    - components/sections/TableOfContents.tsx
    - components/sections/ExpertTips.tsx
    - components/sections/GuideFAQ.tsx
    - components/sections/RelatedGuides.tsx
    - components/sections/CityLinks.tsx
    - components/sections/ContactHub.tsx
    - components/sections/MunicipalityGrid.tsx
    - components/sections/LegalPage.tsx
  modified: []

key-decisions:
  - "ContactHub wraps ContactForm as standalone component alongside dedicated navy info panel rather than modifying ContactForm internals"
  - "GuideFAQ uses guide-faq-* id prefix to avoid DOM collisions with CityFAQ and ServiceFAQ"
  - "TableOfContents uses rootMargin '-80px 0px -70% 0px' for scroll tracking to clear sticky header"

patterns-established:
  - "IntersectionObserver scroll tracking: rootMargin '-80px 0px -70% 0px' clears sticky header, observer.disconnect() in useEffect cleanup"
  - "Accordion reuse: clone CityFAQ pattern with unique id prefix per component instance (faq-*, service-faq-*, guide-faq-*)"
  - "Section wrapper pattern: server component wraps client component (ContactHub wraps ContactForm)"

requirements-completed: [GUIDE-03, GUIDE-04, UTIL-02, UTIL-03, UTIL-04, UTIL-05]

# Metrics
duration: 11min
completed: 2026-04-12
---

# Phase 03 Plan 03: Guide & Utility Section Components Summary

**9 section components for guide pages (article body, sticky TOC, expert tips, FAQ, related guides) and utility pages (city links, contact hub, municipality grid, legal page wrapper)**

## Performance

- **Duration:** 11 min
- **Started:** 2026-04-12T16:28:53Z
- **Completed:** 2026-04-12T16:40:21Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Created 5 guide page section components: GuideArticle (sectioned HTML with id anchors), TableOfContents (IntersectionObserver scroll tracking, sticky desktop + collapsible mobile), ExpertTips (amber callout with lightbulb icon), GuideFAQ (accessible accordion), RelatedGuides (card grid with read time)
- Created 4 utility page section components: CityLinks (16 municipality links), ContactHub (2-column form + navy info panel), MunicipalityGrid (municipality cards with population and cluster badges), LegalPage (legal text wrapper with dangerouslySetInnerHTML)
- All 9 components compile cleanly with zero TypeScript errors; 2 client components (TableOfContents, GuideFAQ) and 7 server components

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GuideArticle, TableOfContents, ExpertTips, GuideFAQ, RelatedGuides** - `5e82dd0` (feat)
2. **Task 2: Create CityLinks, ContactHub, MunicipalityGrid, LegalPage** - `bb33f25` (feat)

## Files Created/Modified
- `components/sections/GuideArticle.tsx` - Server component rendering guide article body with id-anchored H2/H3 sections
- `components/sections/TableOfContents.tsx` - Client component with IntersectionObserver scroll tracking, sticky desktop sidebar, collapsible mobile panel
- `components/sections/ExpertTips.tsx` - Server component rendering amber-bordered callout with lightbulb icon and bulleted tips
- `components/sections/GuideFAQ.tsx` - Client component with accessible accordion, clones CityFAQ pattern with guide-faq-* id prefix
- `components/sections/RelatedGuides.tsx` - Server component rendering guide cards with read time in responsive grid
- `components/sections/CityLinks.tsx` - Server component rendering 16 municipality links from siteConfig
- `components/sections/ContactHub.tsx` - Server component wrapping ContactForm with navy business info panel
- `components/sections/MunicipalityGrid.tsx` - Server component rendering municipality cards with population and cluster badges
- `components/sections/LegalPage.tsx` - Server component rendering legal body text with heading hierarchy via dangerouslySetInnerHTML

## Decisions Made
- ContactHub wraps ContactForm alongside a dedicated navy info panel -- rather than modifying ContactForm internals, ContactHub provides its own 2-column layout at the section level
- GuideFAQ uses `guide-faq-*` id prefix to avoid DOM collisions with CityFAQ (`faq-*`) and ServiceFAQ (`service-faq-*`)
- siteConfig lacks explicit `address` object, so ContactHub renders "Serving all 16 municipalities in Passaic County, NJ" as address text

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 9 section components ready for guide page templates and utility page templates
- Guide pages need: dynamic route template composing GuideArticle + TableOfContents + ExpertTips + GuideFAQ + RelatedGuides + CityLinks
- Utility pages need: About, Contact, Service Area, Privacy Policy, Terms page templates composing relevant section components
- Guide content data files (10 guide content .ts files) not yet created

## Self-Check: PASSED

All 9 component files verified present. Both task commits (5e82dd0, bb33f25) verified in git log. SUMMARY.md created.

---
*Phase: 03-service-guide-utility-pages*
*Completed: 2026-04-12*
