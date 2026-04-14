# Phase 4: Silo Linking, Crawl Health & CRO Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 04-silo-linking-crawl-health-cro-polish
**Areas discussed:** Silo link depth, Audit methodology, CRO polish scope, Performance targets

---

## Silo Link Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Verify only | Audit existing structural links for correctness. Fix broken/missing but don't add new inline content links. | ✓ |
| Add contextual links | Inject inline anchor links within content HTML linking between pages. Touches ~100 content files. | |
| Hybrid approach | Verify structural links AND add contextual links only to highest-value pages. | |

**User's choice:** Verify only
**Notes:** Components already provide the silo structure.

| Option | Description | Selected |
|--------|-------------|----------|
| Full audit | Verify navigation (MegaMenu, Footer, MobileNav) AND in-page structural links | ✓ |
| In-page links only | Focus only on content-level silo links | |

**User's choice:** Full audit

| Option | Description | Selected |
|--------|-------------|----------|
| Keep as-is | Location pages link to top 6-8 services; service pages link to all 16 locations | ✓ |
| Add more service links | Location pages should link to more services | |
| You decide | Claude evaluates during audit | |

**User's choice:** Keep as-is

| Option | Description | Selected |
|--------|-------------|----------|
| Verify content links too | Check inline silo links in introHtml/overviewHtml are valid | ✓ |
| Skip content links | Trust Phase 2/3 content links are correct | |
| You decide | Claude checks if time permits | |

**User's choice:** Verify content links too

---

## Audit Methodology

| Option | Description | Selected |
|--------|-------------|----------|
| Automated scripts | Build Node.js/TypeScript scripts that programmatically check all pages and output a report | ✓ |
| Browser crawl | Use Playwright/crawler to visit every page on dev server | |
| Manual review | Page-by-page visual inspection | |
| Hybrid: scripts + spot-check | Automated scripts + manual Playwright spot-checks | |

**User's choice:** Automated scripts

| Option | Description | Selected |
|--------|-------------|----------|
| Keep as tooling | Store in scripts/ directory with npm run commands | ✓ |
| One-off scripts | Run during Phase 4, then discard | |
| You decide | Claude determines based on complexity | |

**User's choice:** Keep as tooling

| Option | Description | Selected |
|--------|-------------|----------|
| Internal link validation | Check every href against known routes | ✓ |
| Schema validation | Verify JSON-LD types per page type | ✓ |
| Sitemap completeness | Compare sitemap output against all known routes | ✓ |
| CTA/conversion audit | Check CTA positions, phone button, contact form presence | ✓ |

**User's choice:** All four audit scopes selected

---

## CRO Polish Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Mobile CRO tweaks | Sticky phone button, tap targets, mobile form optimization | ✓ |
| Trust signal consistency | WhyChooseUs + Testimonials on all page types | ✓ |
| Form UX improvements | Polish labels, validation, loading states, mobile sizing | ✓ |
| Visual hierarchy polish | CTA contrast, heading scanning, spacing adjustments | ✓ |

**User's choice:** All four CRO areas selected

| Option | Description | Selected |
|--------|-------------|----------|
| All content pages | WhyChooseUs + Testimonials on locations, services, AND guides | ✓ |
| Location + service only | Keep trust sections off guides | |
| You decide | Claude audits and recommends | |

**User's choice:** All content pages

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal changes | Keep fields, polish labels/validation/loading/mobile sizing | ✓ |
| Reduce to essentials | Trim to name + phone + message only | |
| You decide | Claude evaluates and suggests | |

**User's choice:** Minimal changes

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky call button | Floating phone icon (amber, bottom-right) on mobile | ✓ |
| Sticky bottom bar | Full-width bar at bottom with phone + CTA | |
| No sticky element | Phone in header is sufficient | |
| You decide | Claude evaluates | |

**User's choice:** Sticky call button

| Option | Description | Selected |
|--------|-------------|----------|
| All page types | EmergencyCTA on service, guide, and utility pages too | ✓ |
| Homepage + locations only | Keep EmergencyCTA only where it currently exists | |
| You decide | Claude audits and adds where it makes sense | |

**User's choice:** All page types

| Option | Description | Selected |
|--------|-------------|----------|
| Add data attributes | data-action="call" and data-location="{city}" on phone links | ✓ |
| Skip for now | v2 will handle analytics | |
| You decide | Claude adds where zero-effort | |

**User's choice:** Add data attributes

---

## Performance Targets

| Option | Description | Selected |
|--------|-------------|----------|
| Google 'Good' thresholds | LCP < 2.5s, CLS < 0.1, INP < 200ms | ✓ |
| Aggressive targets | LCP < 1.5s, CLS < 0.05, INP < 100ms | |
| Pass-only approach | Just ensure no page is in 'poor' range | |
| You decide | Claude targets 'Good' and flags disproportionate effort | |

**User's choice:** Google 'Good' thresholds

| Option | Description | Selected |
|--------|-------------|----------|
| Lighthouse in audit scripts | Run Lighthouse programmatically on sample pages | ✓ |
| Manual Lighthouse only | Run in Chrome DevTools manually | |
| Vercel Speed Insights | Deploy and use real Speed Insights data | |
| You decide | Claude chooses most practical approach | |

**User's choice:** Lighthouse in audit scripts

| Option | Description | Selected |
|--------|-------------|----------|
| Audit and fix | Check all images for next/image usage, sizing, lazy loading, placeholders | ✓ |
| Skip image audit | Trust Phase 1-3 used next/image correctly | |
| You decide | Claude checks during broader audit | |

**User's choice:** Audit and fix

---

## Claude's Discretion

- Audit script implementation details and output format
- Order of fix implementation
- Lighthouse configuration and sample page selection
- Sticky call button positioning and animation
- Which pages need WhyChooseUs/Testimonials added (audit determines)
- Image optimization specific fixes

## Deferred Ideas

None — discussion stayed within phase scope
