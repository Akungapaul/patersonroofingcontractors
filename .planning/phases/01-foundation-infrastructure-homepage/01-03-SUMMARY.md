---
phase: 01-foundation-infrastructure-homepage
plan: 03
subsystem: layout
tags: [header, footer, navigation, mobile-nav, layout-shell, accessibility, variation-9]

# Dependency graph
requires:
  - phase: 01-foundation-infrastructure-homepage/02
    provides: "Tailwind v4 design tokens, root layout with fonts/metadata/analytics, site-config, navigation, UI primitives (PhoneButton, Button), cn utility"
provides:
  - "Sticky navy header with amber border-bottom (Variation 9), desktop nav with CSS-only hover dropdowns, phone CTA"
  - "Mobile hamburger menu with slide-in overlay, accordion nav, escape key close, body scroll lock"
  - "4-column footer with business info, service links, municipality links, contact details, navy-dark bottom bar"
  - "Root layout shell wrapping all pages with Header + main#main-content + Footer"
  - "Skip to main content accessibility link"
affects: [01-foundation-infrastructure-homepage]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client component Header.tsx for mobile menu state, composing server-compatible Navigation.tsx"
    - "CSS-only dropdown menus using Tailwind group/group-hover utilities on desktop"
    - "Accordion pattern for mobile nav using useState for expanded items"
    - "motion-reduce: prefix on all slide/rotate transitions"
    - "44px minimum touch targets on all interactive elements (buttons, links)"
    - "Body scroll lock via document.body.style.overflow when mobile menu open"
    - "Skip to main content as first focusable element with sr-only/focus:not-sr-only pattern"

key-files:
  created:
    - components/layout/Header.tsx
    - components/layout/Navigation.tsx
    - components/layout/MobileNav.tsx
    - components/layout/Footer.tsx
  modified:
    - app/layout.tsx

key-decisions:
  - "Made Header.tsx a client component ('use client') to manage mobile menu open/close state via useState"
  - "Used CSS-only hover dropdowns (group/group-hover) for desktop navigation instead of JavaScript -- zero client JS for desktop nav interaction"
  - "Populated Locations dropdown children dynamically from siteConfig.municipalities at render time, matching Plan 02 pattern of empty children array"
  - "Added body scroll lock in MobileNav to prevent background scrolling when overlay is open"
  - "Applied Variation 9 amber 3px border-bottom on header via border-b-[3px] border-amber"

patterns-established:
  - "Layout shell pattern: Header (sticky) + main#main-content + Footer wrapping all children in root layout"
  - "Mobile menu pattern: backdrop overlay + slide panel with accordion nav + bottom CTA"
  - "Dropdown pattern: CSS group-hover for desktop, accordion useState for mobile"
  - "Accessibility pattern: skip link, aria-label, aria-expanded, aria-modal, role=dialog, escape key handler"

requirements-completed: [FNDN-05, FNDN-06, LEAD-01, SEO-06, SILO-05]

# Metrics
duration: 4min
completed: 2026-04-09
---

# Phase 01 Plan 03: Layout Shell -- Header, Footer, Navigation Summary

**Sticky navy header with Variation 9 amber accent, CSS-only desktop dropdowns for 8 services and 16 municipalities, mobile slide-in hamburger menu, 4-column footer with complete business info, and root layout shell wrapping all pages**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-04-09T00:13:07Z
- **Completed:** 2026-04-09T00:17:18Z
- **Tasks:** 2
- **Files created:** 4
- **Files modified:** 1

## Accomplishments
- Built sticky header with navy background, 3px amber border-bottom (Variation 9), logo, centered desktop navigation, and phone CTA button
- Created desktop navigation with CSS-only hover dropdowns for Services (8 items) and Locations (16 municipalities built from siteConfig)
- Implemented mobile hamburger menu as slide-in overlay with accordion navigation, escape key close, body scroll lock, and reduced-motion support
- Built 4-column footer with business description, service quick links, all 16 municipality links, and contact info with business hours
- Updated root layout to wrap all pages with Header + main#main-content + Footer, preserving existing fonts, metadata, and analytics
- Added skip-to-main-content link as first focusable element for keyboard accessibility

## Task Commits

Each task was committed atomically:

1. **Task 1: Header with desktop navigation, dropdowns, and mobile hamburger trigger** - `a4bd6af` (feat)
2. **Task 2: Footer and layout.tsx shell integration** - `b49256e` (feat)

## Files Created/Modified
- `components/layout/Header.tsx` - Client component: sticky navy header with amber border-bottom, logo (siteConfig.businessName), desktop Navigation, PhoneButton, mobile hamburger toggle with aria-expanded, skip-to-main-content link
- `components/layout/Navigation.tsx` - Server component: desktop nav with group-hover CSS dropdowns for Services (8 items from navigationItems) and Locations (16 municipalities from siteConfig), min-h-[44px] touch targets, role=menu/menuitem
- `components/layout/MobileNav.tsx` - Client component: slide-in overlay from right, backdrop click close, accordion expand/collapse for dropdown sections, escape key handler, body scroll lock, motion-reduce transitions, PhoneButton at bottom
- `components/layout/Footer.tsx` - Server component: 4-column grid (business info, 8 service links, 16 municipality links, contact details with icons), navy-dark bottom bar with copyright and privacy/terms links
- `app/layout.tsx` - Added Header and Footer imports, wrapped children with Header + main#main-content + Footer, preserved all existing font config, metadata, analytics

## Decisions Made
- Made Header.tsx a client component to manage mobile menu state -- the hamburger toggle requires useState which needs 'use client'
- Used CSS-only hover dropdowns (Tailwind group/group-hover) for desktop nav to avoid JavaScript for desktop interactions
- Populated Locations dropdown children from siteConfig.municipalities at render time (matching Plan 02 pattern of empty children array in navigation.ts)
- Added body scroll lock in MobileNav via document.body.style.overflow to prevent background scrolling when overlay is open
- Applied Variation 9 amber 3px border-bottom on header using border-b-[3px] border-amber class

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required at this stage.

## Next Phase Readiness
- Every page now inherits the sticky header with navigation, phone CTA, and footer
- Skip-to-main-content link targets #main-content on the main element
- All navigation links use next/link for internal routing (SEO-06 compliance)
- Phone CTA visible on all viewports (desktop: full number, mobile: compact "Call" label)
- Footer provides complete secondary navigation with all service and municipality links
- Ready for Plan 04: Homepage sections (Hero, Services Grid, Testimonials, Contact Form, etc.)

## Self-Check: PASSED

All 4 created files and 1 modified file verified present. Both task commits (a4bd6af, b49256e) verified in git log. All acceptance criteria checks passed. TypeScript compiles with zero errors (exit code 0).

---
*Phase: 01-foundation-infrastructure-homepage*
*Completed: 2026-04-09*
