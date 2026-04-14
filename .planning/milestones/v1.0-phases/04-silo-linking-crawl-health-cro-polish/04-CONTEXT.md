# Phase 4: Silo Linking, Crawl Health & CRO Polish - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit and polish the complete ~100-page site for airtight internal linking, zero crawl issues, validated schema on every page, and conversion-optimized elements throughout. Build reusable audit tooling. Fix all issues found. The site should be ready to rank and generate leads after this phase.

</domain>

<decisions>
## Implementation Decisions

### Silo Link Depth
- **D-01:** Verify-only approach for structural links — audit existing component-based links (RelatedLocations, RelatedServices, CityLinks, MegaMenu, Footer, MobileNav) for correctness. Do NOT add new contextual/inline content links.
- **D-02:** Full audit scope covering both navigation components (MegaMenu, Footer, MobileNav) AND in-page structural links (RelatedLocations, RelatedServices, CityLinks).
- **D-03:** Also verify inline silo links within content HTML (introHtml, overviewHtml) from Phase 2/3 are valid — check hrefs point to real pages, no broken slugs.
- **D-04:** Keep current link asymmetry: location pages link to top 6-8 services via ServicesGrid; service pages link to all 16 locations via RelatedLocations. Do not expand.

### Audit Methodology
- **D-05:** Build automated Node.js/TypeScript audit scripts that programmatically check all ~100 pages. Store in `scripts/` directory with npm run commands for reuse.
- **D-06:** Four audit script categories:
  1. `npm run audit:links` — Internal link validation (broken links, orphan pages, 3-click depth)
  2. `npm run audit:schema` — Schema validation (correct JSON-LD types per page type, no malformed/missing)
  3. `npm run audit:sitemap` — Sitemap completeness (all routes present, no noindex pages, correct priorities)
  4. `npm run audit:cro` — CTA/conversion audit (CTA positions, phone button, contact form, emergency CTA presence)
- **D-07:** Scripts kept as permanent reusable tooling for ongoing maintenance, content updates, and renter handoff QA.

### CRO Polish Scope
- **D-08:** Mobile CRO: Add sticky floating phone call button (amber, bottom-right) on mobile for tap-to-call. Always visible while scrolling.
- **D-09:** Trust signal consistency: WhyChooseUs + Testimonials sections on ALL content pages (locations, services, AND guides). Every page is a potential search landing page.
- **D-10:** Form UX: Minimal changes — keep current fields (name, phone, email, service type, message). Polish labels, placeholder text, validation messages, loading states, and mobile field sizing. Do not remove fields.
- **D-11:** Visual hierarchy: Ensure CTA buttons have sufficient contrast, headings guide scanning, phone/form actions are visually dominant. Spacing, sizing, color adjustments as needed.
- **D-12:** Emergency CTA: Expand EmergencyCTA to appear on ALL page types (service, guide, utility) — not just homepage and location pages.
- **D-13:** Add click-to-call tracking data attributes (data-action="call", data-location="{city}") on phone links for future v2 analytics integration. Zero runtime cost.

### Performance Targets
- **D-14:** Target Google "Good" Core Web Vitals thresholds: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **D-15:** Measure via Lighthouse programmatically in audit scripts on sample pages (homepage, 1 location, 1 service, 1 guide). Outputs scores and specific issues.
- **D-16:** Audit and fix image optimization: check all image usages for proper next/image usage, width/height, lazy loading, placeholder props. Fix any raw `<img>` or missing optimization.

### Claude's Discretion
- Specific audit script implementation details and output format
- Order of fix implementation (links first, then CRO, then performance, or interleaved)
- Exact Lighthouse configuration and sample page selection
- Sticky call button positioning and animation details
- Which pages need WhyChooseUs/Testimonials added (audit determines current state)
- Image optimization specific fixes (varies by current codebase state)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Configuration
- `.planning/PROJECT.md` — Municipality data, URL structure, content strategy, site-config reference
- `.planning/REQUIREMENTS.md` — SILO-04, CRAWL-01..05 requirement details (Phase 4 requirements)
- `.planning/ROADMAP.md` — Phase 4 goal and success criteria

### Prior Phase Context
- `.planning/phases/01-foundation-infrastructure-homepage/01-CONTEXT.md` — Design system decisions (colors, typography, CTAs, contact form, trust elements, schema)
- `.planning/phases/02-anchor-city-location-pages/02-CONTEXT.md` — Location page layout, content architecture, silo linking approach
- `.planning/phases/03-service-guide-utility-pages/03-CONTEXT.md` — Service/guide/utility page layout, taxonomy, navigation (MegaMenu), linking patterns

### Existing Code (Key Files)
- `lib/schemas.ts` — All schema builders (LocalBusiness, Organization, Breadcrumb, FAQ, Service)
- `lib/site-config.ts` — All 16 municipalities, business info, phone, stats
- `app/sitemap.ts` — Current sitemap covering all page types
- `app/robots.ts` — Robots.txt configuration
- `components/sections/EmergencyCTA.tsx` — Emergency banner component (to be added to more pages)
- `components/sections/WhyChooseUs.tsx` — Trust section (to be verified on all content pages)
- `components/sections/Testimonials.tsx` — Reviews section (to be verified on all content pages)
- `components/forms/ContactForm.tsx` — Contact form (to be polished for UX)
- `components/ui/PhoneButton.tsx` — Phone CTA (to add tracking attributes)
- `components/layout/MegaMenu.tsx` — Service navigation (to be verified in link audit)
- `components/layout/Navigation.tsx` — Main nav (to be verified in link audit)
- `components/layout/MobileNav.tsx` — Mobile nav (to be verified in link audit)
- `components/layout/Footer.tsx` — Footer links (to be verified in link audit)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/schemas.ts` — All 5 schema builders ready for validation checks
- `lib/site-config.ts` — Municipality data useful for generating expected route lists
- `data/services.ts` — Service index with all 67 slugs for link validation
- `data/guides/content/` — Guide slugs for link validation
- `components/sections/WhyChooseUs.tsx` — Trust section to add to guide pages
- `components/sections/Testimonials.tsx` — Review section to add to guide pages
- `components/sections/EmergencyCTA.tsx` — Emergency banner to add to service/guide/utility pages

### Established Patterns
- All pages use `generateMetadata()` with title/description/openGraph — pattern to verify
- JSON-LD schema rendered via `components/seo/JsonLd.tsx` wrapper — pattern to check
- Breadcrumbs via `components/seo/Breadcrumbs.tsx` — verify on all page types
- Dynamic routes use `generateStaticParams()` — all routes discoverable from data files
- Content HTML uses `dangerouslySetInnerHTML` for introHtml/overviewHtml — inline links live here

### Integration Points
- `app/[locationSlug]/page.tsx` — Location page template (add WhyChooseUs/Testimonials if missing)
- `app/services/[serviceSlug]/page.tsx` — Service page template (verify sections present)
- `app/roofing-guides/[guideSlug]/page.tsx` — Guide page template (add WhyChooseUs/Testimonials/EmergencyCTA)
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/service-area/page.tsx` — Utility pages (add EmergencyCTA)
- `package.json` — Add audit script commands

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for audit tooling and CRO polish. Key constraint: audit scripts must be kept as permanent tooling in `scripts/` directory.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-silo-linking-crawl-health-cro-polish*
*Context gathered: 2026-04-13*
