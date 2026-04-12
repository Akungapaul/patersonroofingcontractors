# Roadmap: Paterson Roofing Contractors

## Overview

This roadmap delivers a rank-and-rent roofing lead generation site targeting all 16 Passaic County municipalities. The site is built in 4 phases: first the foundation, infrastructure, and homepage; then the primary ranking pages (anchor city + 15 locations); then all remaining content (services, guides, utilities); and finally a cross-cutting polish pass for silo linking, crawl health, and conversion optimization. Every phase produces a deployable site with incrementally more ranking and conversion capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation, Infrastructure & Homepage** - Design system, layout shell, lead capture, SEO infrastructure, schema system, and homepage
- [ ] **Phase 2: Anchor City & Location Pages** - Paterson anchor page and 15 municipality location pages with 3000+ word unique content
- [ ] **Phase 3: Service, Guide & Utility Pages** - 67 service pages, 10 guide pages, and 5 utility pages completing the content inventory
- [ ] **Phase 4: Silo Linking, Crawl Health & CRO Polish** - Internal linking audit, crawl budget optimization, conversion rate optimization, and performance tuning

## Phase Details

### Phase 1: Foundation, Infrastructure & Homepage
**Goal**: Visitors see a professional, trustworthy roofing contractor homepage that loads fast, captures leads, and establishes the design system and infrastructure every subsequent page depends on
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03, FNDN-04, FNDN-05, FNDN-06, FNDN-07, LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-05, TRUST-01, TRUST-02, TRUST-03, TRUST-04, TRUST-05, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SCHEMA-01, SCHEMA-04, SCHEMA-05, SILO-01, SILO-05
**Success Criteria** (what must be TRUE):
  1. Homepage loads at patersonroofingcontractors.com with professional trust design (dark blues/grays, Cormorant fonts), renders correctly on mobile and desktop, and achieves sub-2-second LCP
  2. Visitor can click the tracked phone number from any viewport and tap-to-call on mobile, and can submit a contact form that delivers the lead via email
  3. Homepage displays LocalBusiness + Organization + BreadcrumbList JSON-LD schema, exports generateMetadata with title/description/openGraph, and has proper canonical URL
  4. XML sitemap at /sitemap.xml and robots.txt at /robots.txt are accessible, and all internal links use next/link
  5. Trust badges, social proof counters, review placeholders, emergency roofing CTA, and service area map are visible on the homepage
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md -- Project initialization + 10 color theme variations + approval checkpoint
- [x] 01-02-PLAN.md -- Design system, data layer, utilities, SEO infrastructure, UI primitives
- [x] 01-03-PLAN.md -- Layout shell (Header, Footer, Navigation, MobileNav)
- [x] 01-04-PLAN.md -- Homepage sections, contact form, API route, page assembly + verification
**UI hint**: yes

### Phase 2: Anchor City & Location Pages
**Goal**: Every Passaic County municipality has a dedicated, 3000+ word ranking page with unique locally-relevant content that targets "[roofing] + [city]" search intent and converts visitors into leads
**Depends on**: Phase 1
**Requirements**: ANCHOR-01, ANCHOR-02, ANCHOR-03, ANCHOR-04, ANCHOR-05, LOC-01, LOC-02, LOC-03, LOC-04, LOC-05, LOC-06, LOC-07, SCHEMA-03
**Success Criteria** (what must be TRUE):
  1. Paterson anchor page at /roofing-contractor-paterson-nj contains 3000+ words of unique content with Dense Urban Housing angle, Paterson-specific landmarks, neighborhoods, and building types
  2. All 15 remaining municipality pages exist at /roofing-contractor-{city}-nj, each with 3000+ words and the correct geographic content angle for its cluster (Dense Urban, NJ Highlands, Suburban Corridor, or Commercial Corridor)
  3. Content uniqueness across all 16 location pages exceeds 90% (no cookie-cutter templates; each page has municipality-specific local context)
  4. Every location page has a FAQ section with location-specific roofing questions, LocalBusiness + FAQ + BreadcrumbList schema, and links to relevant service pages
  5. Every location page has working lead capture (phone number + contact form) and CRO-optimized CTAs
**Plans**: 10 plans

Plans:
- [x] 02-01-PLAN.md -- CityContent type definitions, FAQ schema builder, component prop extensions (MidPageCTA, Hero, ServicesGrid)
- [x] 02-02-PLAN.md -- New section components (CityIntro, NeighborhoodGrid, CityFAQ)
- [x] 02-03-PLAN.md -- Dynamic route template, Paterson anchor content, content index, sitemap update
- [x] 02-04-PLAN.md -- 8 city content files (Clifton, Passaic, Wayne, Hawthorne, Little Falls, Woodland Park, Haledon, Prospect Park)
- [x] 02-05-PLAN.md -- 7 city content files (West Milford, Ringwood, Wanaque, Pompton Lakes, Bloomingdale, Totowa, North Haledon) + verification checkpoint
- [x] 02-06-PLAN.md -- [GAP CLOSURE] Expand Paterson anchor content to 3500-4000 words
- [x] 02-07-PLAN.md -- [GAP CLOSURE] Expand Haledon, Prospect Park, Clifton, Little Falls to 3000+ words
- [x] 02-08-PLAN.md -- [GAP CLOSURE] Expand Woodland Park, Passaic, Hawthorne, Bloomingdale to 3000+ words
- [x] 02-09-PLAN.md -- [GAP CLOSURE] Expand Wayne, Ringwood, Wanaque, Totowa to 3000+ words
- [x] 02-10-PLAN.md -- [GAP CLOSURE] Expand Pompton Lakes, North Haledon, West Milford to 3000+ words
**UI hint**: yes

### Phase 3: Service, Guide & Utility Pages
**Goal**: The full content inventory is live -- 67 service pages, 10 educational guides, and 5 utility pages -- completing the topical silo and establishing E-E-A-T authority across all roofing services
**Depends on**: Phase 2
**Requirements**: SVC-01, SVC-02, SVC-03, SVC-04, SVC-05, GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, UTIL-01, UTIL-02, UTIL-03, UTIL-04, UTIL-05, SCHEMA-02, SILO-02, SILO-03
**Success Criteria** (what must be TRUE):
  1. All 67 service pages exist at /services/{service-slug} with service descriptions, process, benefits, local context, FAQ sections, and Service JSON-LD schema
  2. Service pages link back to relevant location pages and location pages link to relevant service pages (bidirectional silo linking begun)
  3. All 10 guide pages exist at /roofing-guides/{guide-slug} with educational content that links to relevant service and location pages
  4. About, Contact, Service Area (with map listing all 16 municipalities), Privacy Policy, and Terms of Service pages are live and accessible from site navigation
  5. Every new page has generateMetadata with title/description/openGraph, proper heading hierarchy, canonical URL, and BreadcrumbList schema
**Plans**: 12 plans

Plans:
- [x] 03-01-PLAN.md -- Foundation types (ServiceContent, GuideContent), buildServiceSchema(), data/services.ts to 67 entries, Hero/ServicesGrid prop extensions
- [ ] 03-02-PLAN.md -- Service page section components (ServiceOverview, ProcessSteps, BenefitsGrid, RelatedLocations, RelatedServices, ServiceFAQ)
- [ ] 03-03-PLAN.md -- Guide + utility section components (GuideArticle, TableOfContents, ExpertTips, GuideFAQ, RelatedGuides, CityLinks, ContactHub, MunicipalityGrid, LegalPage)
- [ ] 03-04-PLAN.md -- MegaMenu component + Navigation/MobileNav update for category-grouped services
- [ ] 03-05-PLAN.md -- Service dynamic route template, content index, services index page
- [ ] 03-06-PLAN.md -- Guide dynamic route template, content index, read time utility, guides index page
- [ ] 03-07-PLAN.md -- Service content batch 1: Repair & Maintenance (10) + Residential Roofing (9)
- [ ] 03-08-PLAN.md -- Service content batch 2: Commercial Roofing (11) + Gutters (2) + Energy & Solar (5)
- [ ] 03-09-PLAN.md -- Service content batch 3: Components & Specialty (10) + Roof Replacement (15) + Design & Specialty (5)
- [ ] 03-10-PLAN.md -- Guide content files (all 10 guides)
- [ ] 03-11-PLAN.md -- Utility pages (About, Contact, Service Area, Privacy Policy, Terms of Service)
- [ ] 03-12-PLAN.md -- Sitemap update + full site verification checkpoint
**UI hint**: yes

### Phase 4: Silo Linking, Crawl Health & CRO Polish
**Goal**: The complete ~100-page site has airtight internal linking, zero crawl issues, validated schema on every page, and conversion-optimized elements throughout -- ready to rank and generate leads
**Depends on**: Phase 3
**Requirements**: SILO-04, CRAWL-01, CRAWL-02, CRAWL-03, CRAWL-04, CRAWL-05
**Success Criteria** (what must be TRUE):
  1. Every page is reachable within 3 clicks from the homepage and no orphan pages exist
  2. Internal linking follows the topical silo structure: location pages link to services, services link back to locations, guides link to both, and navigation reflects the hierarchy
  3. Zero broken internal links, zero redirect chains, no duplicate content issues (canonicals correct), and no noindex pages appear in the sitemap
  4. Schema markup (LocalBusiness, Service, FAQ, BreadcrumbList, Organization) validates without errors on Google Rich Results Test for a sample from each page type
  5. All ~100 pages appear in the XML sitemap, Core Web Vitals pass on mobile, and CTAs are positioned above fold, mid-page, and bottom on every content page
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation, Infrastructure & Homepage | 4/4 | Complete | 2026-04-09 |
| 2. Anchor City & Location Pages | 10/10 | Complete | 2026-04-12 |
| 3. Service, Guide & Utility Pages | 0/12 | Planning complete | - |
| 4. Silo Linking, Crawl Health & CRO Polish | 0/2 | Not started | - |
