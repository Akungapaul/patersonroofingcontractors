# Paterson Roofing Contractors

## What This Is

A rank-and-rent roofing contractor website targeting Passaic County, NJ. The site generates roofing leads through organic search across all 16 municipalities in Passaic County, with Paterson as the anchor city. Once ranked, the site is rented to a local roofing contractor who receives leads via tracked phone number and contact forms. Domain: patersonroofingcontractors.com.

**Current state:** 101-route production site with 16 location pages (3000+ words each), 67 service pages, 10 guides, 5 utility pages, and full SEO infrastructure. Shipped v1.0 on 2026-04-14.

## Core Value

Every page ranks for its target roofing + location keyword and converts visitors into phone calls or form submissions — if a page doesn't generate leads, it doesn't matter.

## Requirements

### Validated

- ✓ Topical map and silo architecture with semantic relevance — v1.0
- ✓ Anchor city page (Paterson) with 3000+ words of unique, locally-relevant roofing content — v1.0
- ✓ 15 location pages (one per remaining Passaic County municipality) each 3000+ words — v1.0
- ✓ 67 service pages covering all roofing services — v1.0
- ✓ 10 roofing guide pages — v1.0
- ✓ Homepage optimized for "roofing contractor Passaic County" and brand queries — v1.0
- ✓ 5 utility pages (About, Contact, Service Area, Privacy Policy, Terms) — v1.0
- ✓ 90%+ content uniqueness across all pages — v1.0
- ✓ Mobile-responsive design with professional trust aesthetic (Amber Emphasis theme) — v1.0
- ✓ Lead capture via prominent tracked phone number + contact forms on every page — v1.0
- ✓ Crawl budget optimization (clean URL structure, canonicals, XML sitemap, robots.txt) — v1.0
- ✓ Internal linking silo structure matching topical map — v1.0
- ✓ 4 geographic content angles woven into location pages — v1.0
- ✓ Schema markup (LocalBusiness, Service, FAQ, BreadcrumbList) on all relevant pages — v1.0
- ✓ CRO-optimized CTAs, trust signals, and conversion elements on every page — v1.0
- ✓ SEO metadata (title, description, Open Graph) on every page with proper heading hierarchy — v1.0

### Active

(None — planning next milestone)

### Out of Scope

- Blog/news section — focus on evergreen service and location content only
- Online booking/scheduling — leads flow through phone and forms to the renter
- Payment processing — this is a lead gen site, not a transactional site
- Multi-language support — English only for v1; Spanish deferred to v2
- User accounts/login — no visitor accounts needed
- Live chat widget — phone + form sufficient for v1
- Animated hero videos — hurts page speed; customers want info
- Third-party review widgets — external JS bloat, API limits
- CMS/admin panel — over-engineering for static content

## Context

Shipped v1.0 MVP with 18,923 LOC TypeScript across 291 files.

**Tech stack:** Next.js 16 (App Router, SSG), Tailwind CSS v4, Vercel, TypeScript 5.x

**Architecture:**
- Design system: Amber Emphasis theme (Variation 9), Cormorant Garamond body / Cormorant headings
- Lead capture: GoHighLevel webhook API route + click-to-call phone links with tracking attributes
- Content: Data-driven — CityContent, ServiceContent, GuideContent types with content index modules
- SEO: generateMetadata on every page, 4 JSON-LD schema builders, XML sitemap covering 99 indexable routes
- Navigation: 8-category mega menu (desktop columns + mobile accordion)
- QA: 4 permanent audit scripts (links, schema, sitemap, CRO/CWV)

**Known tech debt from v1.0:**
- GHL_WEBHOOK_URL placeholder — form submissions return HTTP 500 until configured
- Footer renders all 67 service links without limit
- Breadcrumb links use absolute URLs causing full page reloads
- `/locations` dead config value in navigation.ts
- FAQ accordion, MegaMenu, guide TOC sidebar not browser-tested
- LCP not measured via Lighthouse; Vercel deployment not runtime-verified

**Municipality coverage:** All 16 Passaic County municipalities with 4 geographic content angles (Dense Urban, NJ Highlands, Suburban Corridor, Commercial Corridor).

## Constraints

- **Tech Stack**: Next.js (App Router) on Vercel — SSG for SEO performance, ISR for updates
- **Content**: 3000+ words per location/anchor page, 90%+ uniqueness score across site
- **Design**: Professional trust aesthetic — Amber Emphasis theme (dark blues/grays with amber accents). Cormorant Garamond body (18px min), Cormorant headings
- **SEO**: One H1 per page, strict heading hierarchy, canonical URLs, `next/link` for internal links
- **Domain**: patersonroofingcontractors.com
- **Business Name**: Paterson Roofing Contractors
- **Phone**: Placeholder tracking number (swap when rented via single config change)
- **Pages**: 101 total (1 homepage + 16 locations + 67 services + 10 guides + 2 index + 3 utility + 2 legal)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Paterson as anchor city | Largest municipality (30%+ county pop), county seat, highest search volume | ✓ Good — anchor page at 3515 words |
| 4 geographic content angles | Ensures unique, locally-relevant content per cluster; supports 90%+ uniqueness | ✓ Good — verified unique across all 16 pages |
| Phone + Form lead capture | Industry standard for roofing leads; easy to transfer when rented | ✓ Good — on every page with tracking attributes |
| Professional trust design (Amber Emphasis) | Roofing is high-trust purchase; amber accents add warmth to navy/gray | ✓ Good — Variation 9 approved |
| Services/guides from reference site | Proven taxonomy from newarkqualityroofing.com; saves research time | ✓ Good — 67 services + 10 guides populated |
| Next.js SSG on Vercel | Optimal for SEO (fast TTFB, pre-rendered HTML), easy deployment | ✓ Good — 107 static pages generated |
| GoHighLevel for form backend | Webhook-based, no database needed, easy to transfer to renter | ⚠️ Revisit — placeholder URL, needs real webhook |
| Card grid for service area (not map) | Simpler implementation, faster load, SEO-friendly | ⚠️ Revisit — stakeholder sign-off pending |
| Coarse 4-phase roadmap | Compressed research's 7-phase suggestion for faster execution | ✓ Good — shipped in 7 days |
| 8-category mega menu | Groups 67 services meaningfully; shows top 5 per category | ✓ Good — desktop + mobile accordion |
| Data-driven content architecture | CityContent/ServiceContent/GuideContent types with content indexes | ✓ Good — consistent pattern across 101 pages |
| 4 permanent audit scripts | Reusable QA for links, schema, sitemap, CRO/CWV | ✓ Good — caught 67 broken links in Phase 4 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14 after v1.0 milestone*
