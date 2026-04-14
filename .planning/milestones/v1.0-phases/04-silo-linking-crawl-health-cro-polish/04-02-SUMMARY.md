---
phase: 04-silo-linking-crawl-health-cro-polish
plan: 02
subsystem: ui
tags: [cro, sticky-button, call-tracking, trust-sections, contact-form, lucide-react]

# Dependency graph
requires:
  - phase: 02-anchor-location-pages
    provides: Location page template with section ordering pattern (WhyChooseUs -> FAQ -> Testimonials -> EmergencyCTA -> ContactForm)
  - phase: 03-service-guide-utility-pages
    provides: Service, guide, about, contact, service-area page templates
provides:
  - StickyCallButton component for mobile tap-to-call
  - data-action="call" tracking attributes on all phone links site-wide
  - WhyChooseUs + Testimonials + EmergencyCTA on all content pages
  - ContactForm UX improvements (autoComplete, placeholders, spinner)
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "data-action/data-location attributes on all tel: links for analytics readiness"
    - "Consistent section ordering across all page types: WhyChooseUs -> Testimonials -> EmergencyCTA -> ContactForm"
    - "Mobile-only sticky CTA pattern with md:hidden and z-40 stacking"

key-files:
  created:
    - components/ui/StickyCallButton.tsx
  modified:
    - app/layout.tsx
    - components/ui/PhoneButton.tsx
    - components/sections/EmergencyCTA.tsx
    - components/forms/ContactForm.tsx
    - components/layout/Footer.tsx
    - app/services/[serviceSlug]/page.tsx
    - app/roofing-guides/[guideSlug]/page.tsx
    - app/about/page.tsx
    - app/contact/page.tsx
    - app/service-area/page.tsx
    - app/services/page.tsx
    - app/roofing-guides/page.tsx

key-decisions:
  - "StickyCallButton uses z-40 to stack below header/nav (z-50) but above page content"
  - "Guide pages place WhyChooseUs after CityLinks (keeping content-critical GuideFAQ early in page flow)"
  - "Contact page places trust sections between ContactHub and CityLinks for conversion before navigation"

patterns-established:
  - "data-action/data-location: All tel: links annotated with call tracking attributes for future analytics integration"
  - "Trust section ordering: WhyChooseUs -> [FAQ if applicable] -> Testimonials -> EmergencyCTA -> ContactForm on every content page"

requirements-completed: [SILO-04, CRAWL-01]

# Metrics
duration: 4min
completed: 2026-04-13
---

# Phase 4 Plan 2: CRO Polish Summary

**Sticky mobile call button, call tracking attributes on all phone links, and trust sections (WhyChooseUs + Testimonials + EmergencyCTA) on every content page**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-13T16:34:02Z
- **Completed:** 2026-04-13T16:38:15Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Created StickyCallButton component: mobile-only fixed amber phone button at bottom-right (z-40, md:hidden) with tap-to-call
- Added data-action="call" tracking attributes to all 6 phone link locations across the site (PhoneButton, EmergencyCTA, ContactForm info panel, Footer column 1, Footer column 4, StickyCallButton)
- Added WhyChooseUs, Testimonials, and EmergencyCTA trust sections to all 7 content page templates that were missing them
- Polished ContactForm UX: autoComplete attributes, improved placeholders, Loader2 spinner during submission, better error message readability

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StickyCallButton, add tracking attributes, polish ContactForm UX** - `aaa5f04` (feat)
2. **Task 2: Add WhyChooseUs, Testimonials, EmergencyCTA to all content pages** - `c20cd27` (feat)

## Files Created/Modified
- `components/ui/StickyCallButton.tsx` - Mobile-only fixed amber floating call button (new)
- `app/layout.tsx` - Added StickyCallButton after Footer
- `components/ui/PhoneButton.tsx` - Added data-action="call" tracking attribute
- `components/sections/EmergencyCTA.tsx` - Added data-action="call" tracking attribute
- `components/forms/ContactForm.tsx` - Added tracking attribute, autoComplete, improved placeholders, Loader2 spinner, better error styling
- `components/layout/Footer.tsx` - Added data-action="call" to both phone links (column 1 and column 4)
- `app/services/[serviceSlug]/page.tsx` - Added WhyChooseUs before ServiceFAQ
- `app/roofing-guides/[guideSlug]/page.tsx` - Added WhyChooseUs + Testimonials + EmergencyCTA after CityLinks
- `app/about/page.tsx` - Added Testimonials + EmergencyCTA after Service Area Overview
- `app/contact/page.tsx` - Added WhyChooseUs + Testimonials + EmergencyCTA between ContactHub and CityLinks
- `app/service-area/page.tsx` - Added WhyChooseUs + Testimonials + EmergencyCTA after MidPageCTA
- `app/services/page.tsx` - Added WhyChooseUs + Testimonials + EmergencyCTA after MidPageCTA
- `app/roofing-guides/page.tsx` - Added WhyChooseUs + Testimonials + EmergencyCTA after MidPageCTA

## Decisions Made
- StickyCallButton uses z-40 to remain below the header/nav (z-50) but above all page content
- Guide pages place trust sections after CityLinks to keep content-critical GuideFAQ early in the page flow
- Contact page places trust sections between ContactHub and CityLinks for conversion reinforcement before navigation links
- Legal pages (privacy-policy, terms-of-service) intentionally excluded from trust section additions per plan requirements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All content pages now have consistent trust signals for conversion optimization
- All phone links are annotated for future analytics integration via data attributes
- Mobile users have instant tap-to-call access via sticky button
- Ready for Plan 03 (final crawl health and sitemap polish)

## Self-Check: PASSED

All 13 files verified as present. Both task commits (aaa5f04, c20cd27) confirmed in git log. Next.js build completed successfully with all pages compiling.

---
*Phase: 04-silo-linking-crawl-health-cro-polish*
*Completed: 2026-04-13*
