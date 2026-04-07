# Paterson Roofing Contractors

## What This Is

A rank-and-rent roofing contractor website targeting Passaic County, NJ. The site generates roofing leads through organic search across all 16 municipalities in Passaic County, with Paterson as the anchor city. Once ranked, the site is rented to a local roofing contractor who receives leads via tracked phone number and contact forms. Domain: patersonroofingcontractors.com.

## Core Value

Every page ranks for its target roofing + location keyword and converts visitors into phone calls or form submissions — if a page doesn't generate leads, it doesn't matter.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Topical map and silo architecture with semantic relevance (Source Context, Central Entity, Central Search Intent)
- [ ] Anchor city page (Paterson) with 3000+ words of unique, locally-relevant roofing content
- [ ] 15 location pages (one per remaining Passaic County municipality) each 3000+ words, structured as mini-websites
- [ ] 67 service pages covering all roofing services (sourced from newarkqualityroofing.com service structure)
- [ ] 10 roofing guide pages (sourced from newarkqualityroofing.com guide structure)
- [ ] Homepage optimized for "roofing contractor Passaic County" and brand queries
- [ ] 5 utility pages (About, Contact, Service Area, Privacy Policy, Terms)
- [ ] 90%+ content uniqueness across all pages — no thin/duplicate content
- [ ] Mobile-responsive design with professional trust aesthetic (dark blues/grays, trust badges, reviews)
- [ ] Lead capture via prominent tracked phone number + contact forms on every page
- [ ] Crawl budget optimization (clean URL structure, proper canonicals, XML sitemap, robots.txt)
- [ ] Internal linking silo structure matching topical map
- [ ] 4 geographic content angles woven into location pages (Dense Urban, NJ Highlands, Route 46/23 Suburban, Commercial Corridor)
- [ ] Schema markup (LocalBusiness, Service, FAQ, BreadcrumbList) on all relevant pages
- [ ] CRO-optimized CTAs, trust signals, and conversion elements on every page
- [ ] SEO metadata (title, description, Open Graph) on every page with proper heading hierarchy

### Out of Scope

- Blog/news section — focus on evergreen service and location content only
- Online booking/scheduling — leads flow through phone and forms to the renter
- Payment processing — this is a lead gen site, not a transactional site
- Multi-language support — English only for v1
- User accounts/login — no visitor accounts needed
- Live chat widget — phone + form sufficient for v1

## Context

**Business Model:** Rank and rent. Build the site, rank it organically for roofing keywords across Passaic County, then lease the ranked site (or its leads) to a local roofing contractor. Revenue comes from monthly rent, not from the roofing work itself.

**Geographic Target:** Passaic County, NJ — 16 municipalities, 524,118 population (2020), 186 sq miles, density 2,817/sq mi. County seat is Paterson (159,732 pop, 30%+ of county). Very diverse — 42.7% Hispanic/Latino.

**Municipality Breakdown:**
| Municipality | Pop 2020 | Type | Content Angle |
|---|---|---|---|
| Paterson | 159,732 | City/Urban | Dense Urban Housing (ANCHOR) |
| Clifton | 90,296 | City/Urban | Dense Urban + Commercial |
| Passaic | 72,290 | City/Urban | Dense Urban |
| Wayne | 53,665 | Township/Suburban | Suburban Corridor + Commercial |
| West Milford | 25,637 | Township/Rural | NJ Highlands |
| Hawthorne | 19,457 | Borough/Suburban | Suburban Corridor |
| Woodland Park | 13,021 | Borough/Suburban | Suburban Corridor + Commercial |
| Little Falls | 14,886 | Township/Suburban | Suburban Corridor |
| Ringwood | 12,229 | Borough/Rural | NJ Highlands |
| Wanaque | 12,033 | Borough/Suburban | NJ Highlands |
| Pompton Lakes | 11,276 | Borough/Suburban | NJ Highlands border |
| Totowa | 11,189 | Borough/Suburban | Suburban Corridor |
| Haledon | 8,541 | Borough/Urban | Dense Urban |
| North Haledon | 8,828 | Borough/Suburban | Suburban Corridor |
| Bloomingdale | 8,255 | Borough/Suburban | NJ Highlands |
| Prospect Park | 6,372 | Borough/Urban | Dense Urban |

**Reference Site:** newarkqualityroofing.com — source for service page structure and roofing guide topics. Content will be original but follows their service/guide taxonomy.

**Content Strategy — Topical Map:**
- **Source Context:** Roofing contractor business serving residential and commercial properties — revenue from roof repairs, replacements, inspections, and emergency services
- **Central Entity:** Roofing contractor (Paterson Roofing Contractors)
- **Central Search Intent:** Find/hire a qualified roofing contractor in [Passaic County location]
- **Core Section:** Main attributes — services, locations, credentials
- **Outer Section:** Secondary attributes — guides, educational content, seasonal roofing topics

**URL Structure:**
- `/` — Homepage
- `/roofing-contractor-paterson-nj` — Anchor city
- `/roofing-contractor-{city}-nj` — Location pages
- `/services/{service-slug}` — Service pages
- `/roofing-guides/{guide-slug}` — Guide pages

**Content Angles (4 geographic clusters):**
1. Dense Urban Housing (Paterson, Clifton, Passaic, Haledon, Prospect Park) — oldest/densest housing, flat roofs, multi-family
2. NJ Highlands/Lakes (West Milford, Ringwood, Wanaque, Bloomingdale) — tree canopy, ice dams, rural access
3. Route 46/23 Suburban Corridor (Wayne, Hawthorne, Little Falls, Totowa, Woodland Park) — postwar colonials, aging roofs
4. Commercial/Corporate Corridor (Wayne, Clifton, Woodland Park) — commercial flat roofs, TPO/EPDM, corporate properties

## Constraints

- **Tech Stack**: Next.js (App Router) on Vercel — SSG for SEO performance, ISR for updates
- **Content**: 3000+ words per location/anchor page, 90%+ uniqueness score across site
- **Design**: Professional trust aesthetic — dark blues/grays, trust badges, review elements. Cormorant Garamond body (18px min), Cormorant headings
- **SEO**: One H1 per page, strict heading hierarchy, canonical URLs, `next/link` for internal links
- **Domain**: patersonroofingcontractors.com
- **Business Name**: Paterson Roofing Contractors
- **Phone**: Placeholder tracking number (swap when rented)
- **Pages**: ~100 total (1 homepage + 1 anchor + 15 locations + 67 services + 10 guides + 5 utility)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Paterson as anchor city | Largest municipality (30%+ county pop), county seat, highest search volume | — Pending |
| 4 geographic content angles | Ensures unique, locally-relevant content per cluster; supports 90%+ uniqueness | — Pending |
| Phone + Form lead capture | Industry standard for roofing leads; easy to transfer when rented | — Pending |
| Professional trust design | Roofing is high-trust purchase; dark blues/grays signal reliability | — Pending |
| Services/guides from reference site | Proven taxonomy from newarkqualityroofing.com; saves research time | — Pending |
| Next.js SSG on Vercel | Optimal for SEO (fast TTFB, pre-rendered HTML), easy deployment | — Pending |

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
*Last updated: 2026-04-07 after initialization*
