---
phase: 01-foundation-infrastructure-homepage
plan: "04"
subsystem: ui
tags: [next.js, react, tailwind, json-ld, contact-form, gohighlevel, seo, homepage]

# Dependency graph
requires:
  - phase: 01-foundation-infrastructure-homepage
    plan: "01-03"
    provides: Layout shell (header, footer, navigation) wrapping all pages
  - phase: 01-foundation-infrastructure-homepage
    plan: "01-02"
    provides: Design system tokens, data layer (site-data.ts), UI primitives (Button, PhoneButton)
provides:
  - Fully assembled homepage with 8 content sections + 3 JSON-LD schemas
  - ContactForm client component with 4 states (idle, submitting, success, error)
  - API route /api/contact forwarding form submissions to GoHighLevel webhook
  - Environment variable scaffolding (.env.example, .env.local)
  - Hero with primary keyword H1 targeting "Paterson" + domain alignment
affects:
  - 02-anchor-location-pages (section component patterns reusable for location pages)
  - 03-service-pages (contact form and CTA components are shared)
  - 04-guides-utility-pages (SeoContent prose pattern reusable)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server-side form API route with GHL_WEBHOOK_URL env var (no NEXT_PUBLIC_ prefix for security)"
    - "Client component ContactForm with explicit 4-state UX (idle/submitting/success/error)"
    - "Homepage section components each own their data — no prop drilling from page.tsx"
    - "JSON-LD schemas inlined as <script type='application/ld+json'> in Server Component (Next.js recommended pattern)"
    - "Single H1 per page enforced: Hero owns H1, all other sections use H2"
    - "Municipality cards and service cards built from typed data arrays in site-data.ts"

key-files:
  created:
    - app/api/contact/route.ts
    - components/forms/ContactForm.tsx
    - components/sections/Hero.tsx
    - components/sections/ServicesGrid.tsx
    - components/sections/WhyChooseUs.tsx
    - components/sections/ServiceAreas.tsx
    - components/sections/Testimonials.tsx
    - components/sections/EmergencyCTA.tsx
    - components/sections/SeoContent.tsx
    - components/sections/MidPageCTA.tsx
    - .env.example
    - .env.local
  modified:
    - app/page.tsx
    - app/layout.tsx
    - .gitignore

key-decisions:
  - "Homepage primary keyword is 'paterson roofing contractors' (aligns with domain patersonroofingcontractors.com) — Passaic County retained as secondary geographic signal"
  - "GHL webhook URL stored as server-only env var (GHL_WEBHOOK_URL, no NEXT_PUBLIC_ prefix) to keep webhook endpoint private"
  - "Contact form built as 'use client' component with fetch() to /api/contact — no third-party form library needed"
  - ".env.example committed to repo; .env.local gitignored"

patterns-established:
  - "Section component pattern: each section is a self-contained Server Component importing its data from site-data.ts"
  - "CTA bars (MidPageCTA) inserted between sections to maintain conversion pressure throughout scroll"
  - "Form state machine: idle -> submitting -> success | error, with explicit UI for each state"
  - "JSON-LD schemas (LocalBusiness, Organization, BreadcrumbList) rendered in page.tsx Server Component"

requirements-completed:
  - LEAD-02
  - LEAD-03
  - LEAD-04
  - TRUST-01
  - TRUST-02
  - TRUST-03
  - TRUST-04
  - TRUST-05
  - SEO-02
  - SEO-08
  - SEO-10
  - SCHEMA-01
  - SCHEMA-05

# Metrics
duration: approx 90min
completed: 2026-04-09
---

# Phase 01 Plan 04: Homepage Sections, Contact Form, and Page Assembly Summary

**8-section homepage with GoHighLevel contact form API route and 3 JSON-LD schemas, keyword-optimized H1 targeting "Paterson" to align with domain**

## Performance

- **Duration:** approx 90 min
- **Started:** 2026-04-08T20:23Z
- **Completed:** 2026-04-09T00:54Z
- **Tasks:** 3 of 3
- **Files modified:** 13

## Accomplishments

- Full homepage assembled: Hero, MidPageCTA, ServicesGrid, WhyChooseUs, ServiceAreas, Testimonials, EmergencyCTA, SeoContent — all 8 content sections in correct order with MidPageCTA bars between for conversion pressure
- ContactForm client component with idle/submitting/success/error states, sending to /api/contact which validates server-side and forwards to GoHighLevel webhook via GHL_WEBHOOK_URL env var
- Three JSON-LD schemas inlined in page.tsx: LocalBusiness (with geo coordinates, address, service areas), Organization, and BreadcrumbList — all per schema-dts types
- Post-verification SEO keyword optimization: H1, title tag, and meta description changed to lead with "Paterson" rather than "Passaic County" — matches domain intent, improves keyword-domain alignment

## Task Commits

Each task was committed atomically:

1. **Task 1: Contact form + API route** - `1529461` (feat)
2. **Task 2: Homepage section components + page assembly** - `c05da19` (feat)
3. **Task 3: SEO keyword optimization (post-verification)** - `2e81f54` (seo)

## Files Created/Modified

- `app/page.tsx` - Homepage assembling all 8 sections in order with 3 JSON-LD schemas
- `app/layout.tsx` - Updated title template and meta description for Paterson keyword
- `app/api/contact/route.ts` - POST handler validating form fields and forwarding to GHL webhook
- `components/forms/ContactForm.tsx` - Client component with 4-state UX and fetch to /api/contact
- `components/sections/Hero.tsx` - Full-width hero with H1, subheadline, PhoneButton, amber CTA
- `components/sections/ServicesGrid.tsx` - 8 service cards in responsive 3/2/1 column grid
- `components/sections/WhyChooseUs.tsx` - 5 trust badges + 4 stat counters (years, projects, warranty, rating)
- `components/sections/ServiceAreas.tsx` - 16 Passaic County municipality cards with cluster tags
- `components/sections/Testimonials.tsx` - 3 review cards with 5-star ratings and city attribution
- `components/sections/EmergencyCTA.tsx` - Storm damage emergency banner on amber background
- `components/sections/SeoContent.tsx` - Locally-relevant SEO prose (227 words)
- `components/sections/MidPageCTA.tsx` - Navy CTA bar with phone number and Get Quote button
- `.env.example` - Documents GHL_WEBHOOK_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_PHONE
- `.env.local` - Local dev environment variables (gitignored)
- `.gitignore` - Updated to allow .env.example while keeping .env.local excluded

## Decisions Made

**Paterson as primary keyword:** During visual verification, the H1 read "Passaic County's Trusted Roofing Contractors" — good geographically but misaligned with the domain (patersonroofingcontractors.com). Changed H1 to "Paterson's #1 Roofing Contractors — Serving All of Passaic County" and updated title/meta accordingly. "Passaic County" is retained throughout body copy as a secondary geographic signal to capture county-level searches.

**GHL webhook security:** GoHighLevel webhook URL kept server-side only (no NEXT_PUBLIC_ prefix) so the endpoint cannot be extracted from client JavaScript bundles.

**Self-contained section components:** Each section imports its own data from site-data.ts rather than receiving props from page.tsx. This makes sections independently reusable on location pages without refactoring page.tsx.

## Deviations from Plan

None — plan executed as specified. The SEO keyword change (Task 3) was explicitly part of the checkpoint verification flow (plan type: autonomous=false), not an unplanned deviation.

## Issues Encountered

None. Build passed, all sections rendered correctly on visual inspection.

## User Setup Required

**External service requires configuration before contact form submissions are delivered.**

Environment variable needed in Vercel dashboard (and locally in `.env.local`):

| Variable | Where to get it | Required |
|----------|----------------|----------|
| `GHL_WEBHOOK_URL` | GoHighLevel → Settings → Integrations → Webhooks | Yes — form submissions will 500 without it |
| `NEXT_PUBLIC_SITE_URL` | Set to production domain: `https://patersonroofingcontractors.com` | Yes — for canonical URLs |
| `NEXT_PUBLIC_PHONE` | Tracking phone number from CallRail | Yes — displayed site-wide |

Until `GHL_WEBHOOK_URL` is set, form submissions return HTTP 500. The form's error state handles this gracefully for the user, but leads will not be delivered.

## Next Phase Readiness

- Homepage is complete and deployment-ready (Phase 01 objective achieved)
- Section components (ServicesGrid, ServiceAreas, WhyChooseUs, Testimonials) are reusable templates for Phase 02 location/anchor pages — same data shape, swap content arrays
- ContactForm is a shared component — all location and service pages should embed it without modification
- JSON-LD pattern established in page.tsx is the template for service and location page schemas
- Phase 02 can begin immediately; no blockers from this plan

---
*Phase: 01-foundation-infrastructure-homepage*
*Completed: 2026-04-09*
