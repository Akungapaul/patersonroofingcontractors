# Requirements: Paterson Roofing Contractors

**Defined:** 2026-04-07
**Core Value:** Every page ranks for its target roofing + location keyword and converts visitors into phone calls or form submissions

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FNDN-01**: Site uses Next.js App Router with SSG (static site generation) for all pages
- [ ] **FNDN-02**: Site deploys to Vercel with automatic HTTPS and CDN edge caching
- [ ] **FNDN-03**: Tailwind CSS v4 design system with professional trust theme (dark blues/grays)
- [ ] **FNDN-04**: Cormorant Garamond (medium weight) body text at 18px minimum, Cormorant for headings
- [ ] **FNDN-05**: Mobile-responsive layout that works on all screen sizes (mobile-first)
- [ ] **FNDN-06**: Reusable page layout with sticky header, footer, and consistent navigation
- [ ] **FNDN-07**: next/font loading for Cormorant and Cormorant Garamond (no layout shift)

### Lead Capture

- [ ] **LEAD-01**: Prominent tracked phone number (click-to-call) visible on every page
- [ ] **LEAD-02**: Contact form on every page capturing name, phone, email, service type, message
- [ ] **LEAD-03**: Contact form submits via API Route Handler with email forwarding
- [ ] **LEAD-04**: Emergency roofing CTA (storm damage banner) on homepage and location pages
- [ ] **LEAD-05**: Placeholder phone number (swap when rented via single config change)

### Trust & Conversion

- [ ] **TRUST-01**: Trust badges section (licenses, insurance, warranties, BBB-style) on all pages
- [ ] **TRUST-02**: Review/testimonial placeholder sections ready for renter's real reviews
- [ ] **TRUST-03**: CRO-optimized CTAs above the fold, mid-page, and at page bottom
- [ ] **TRUST-04**: Social proof elements (years in business, projects completed, 5-star rated)
- [ ] **TRUST-05**: Service area map showing Passaic County coverage

### SEO Infrastructure

- [ ] **SEO-01**: Every page exports generateMetadata() with title, description, and openGraph
- [ ] **SEO-02**: One H1 per page with strict heading hierarchy (h1 > h2 > h3, no skipping)
- [ ] **SEO-03**: Canonical URL set via alternates.canonical in metadata on every page
- [ ] **SEO-04**: XML sitemap via app/sitemap.ts covering all ~100 pages
- [ ] **SEO-05**: robots.txt via app/robots.ts with crawl budget optimization
- [ ] **SEO-06**: Internal links use next/link, not raw anchor tags with full URLs
- [ ] **SEO-07**: html element has lang="en" attribute
- [ ] **SEO-08**: All images have descriptive alt text (not filenames, not empty unless decorative)
- [ ] **SEO-09**: Clean URL structure matching defined slug patterns
- [ ] **SEO-10**: Page load under 2 seconds (LCP) on mobile via SSG + image optimization

### Schema Markup

- [ ] **SCHEMA-01**: LocalBusiness JSON-LD schema on homepage and all location pages
- [ ] **SCHEMA-02**: Service JSON-LD schema on all service pages
- [ ] **SCHEMA-03**: FAQ JSON-LD schema on location pages and service pages
- [ ] **SCHEMA-04**: BreadcrumbList JSON-LD schema on all pages reflecting silo hierarchy
- [ ] **SCHEMA-05**: Organization JSON-LD schema on homepage

### Content - Anchor City

- [ ] **ANCHOR-01**: Paterson anchor city page at /roofing-contractor-paterson-nj with 3000+ words
- [ ] **ANCHOR-02**: Dense Urban Housing content angle woven into Paterson page
- [ ] **ANCHOR-03**: Paterson-specific local landmarks, neighborhoods, building types, and weather patterns
- [ ] **ANCHOR-04**: Service-specific sections linking to individual service pages (silo linking)
- [ ] **ANCHOR-05**: FAQ section with Paterson-specific roofing questions

### Content - Location Pages

- [ ] **LOC-01**: 15 location pages (one per remaining Passaic County municipality) at /roofing-contractor-{city}-nj
- [ ] **LOC-02**: Each location page has 3000+ words of unique, locally-relevant content
- [ ] **LOC-03**: Geographic content angles applied per cluster (Dense Urban, NJ Highlands, Suburban Corridor, Commercial)
- [ ] **LOC-04**: Municipality-specific landmarks, neighborhoods, housing stock, and local context in each page
- [ ] **LOC-05**: 90%+ content uniqueness across all location pages (no cookie-cutter templates)
- [ ] **LOC-06**: Each location page links to relevant service pages (silo structure)
- [ ] **LOC-07**: Each location page has FAQ section with location-specific roofing questions

### Content - Service Pages

- [ ] **SVC-01**: 67 service pages at /services/{service-slug} covering all roofing services
- [ ] **SVC-02**: Service taxonomy sourced from newarkqualityroofing.com structure
- [ ] **SVC-03**: Each service page describes the service, process, benefits, and local context
- [ ] **SVC-04**: Service pages link back to relevant location pages (bidirectional silo linking)
- [ ] **SVC-05**: FAQ section on each service page with service-specific questions

### Content - Guides

- [ ] **GUIDE-01**: 10 roofing guide pages at /roofing-guides/{guide-slug}
- [ ] **GUIDE-02**: Guide topics sourced from newarkqualityroofing.com guide structure
- [ ] **GUIDE-03**: Guides provide educational content establishing E-E-A-T authority
- [ ] **GUIDE-04**: Guides link to relevant service and location pages

### Content - Utility Pages

- [ ] **UTIL-01**: About page establishing company story, expertise, and E-E-A-T signals
- [ ] **UTIL-02**: Contact page with form, phone, and service area information
- [ ] **UTIL-03**: Service Area page listing all 16 Passaic County municipalities with map
- [ ] **UTIL-04**: Privacy Policy page with standard legal text
- [ ] **UTIL-05**: Terms of Service page with standard legal text

### Topical Map & Silo

- [ ] **SILO-01**: Topical map with Source Context, Central Entity, and Central Search Intent defined
- [ ] **SILO-02**: Core Section (main attributes): services and locations organized hierarchically
- [ ] **SILO-03**: Outer Section (secondary attributes): guides and educational content
- [ ] **SILO-04**: Internal linking follows silo structure (location <-> services, guides -> services/locations)
- [ ] **SILO-05**: Navigation reflects topical hierarchy (not flat list)

### Crawl Budget

- [ ] **CRAWL-01**: No orphan pages (every page reachable within 3 clicks from homepage)
- [ ] **CRAWL-02**: No redirect chains or broken internal links
- [ ] **CRAWL-03**: Pagination avoided (all content on single pages)
- [ ] **CRAWL-04**: No duplicate content (canonicals, unique content, no parameter URLs)
- [ ] **CRAWL-05**: Efficient sitemap (no noindex pages in sitemap)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Localization

- **L10N-01**: Spanish language version of key pages (42.7% Hispanic population in Passaic County)
- **L10N-02**: hreflang tags for English/Spanish content

### Analytics & Tracking

- **ANALYTICS-01**: CallRail DNI (Dynamic Number Insertion) for call tracking
- **ANALYTICS-02**: Google Tag Manager integration via @next/third-parties
- **ANALYTICS-03**: Vercel Analytics + Speed Insights for CWV monitoring
- **ANALYTICS-04**: Conversion tracking (form submissions, phone clicks)

### Advanced CRO

- **CRO-01**: A/B testing for CTA variations
- **CRO-02**: Heat mapping integration (Hotjar/Clarity)
- **CRO-03**: Exit-intent popup for lead capture

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog/news section | Content maintenance burden; evergreen pages are higher ROI for rank-and-rent |
| Online booking/scheduling | Renter manages their own scheduling; adds unnecessary complexity |
| Live chat widget | Requires respondent; adds third-party JS bloat; hurts page speed |
| User accounts/login | No use case for visitor accounts on a lead gen site |
| Payment processing | Lead gen site, not e-commerce; renter handles payments |
| CMS/admin panel | Over-engineering for static content; edit code directly |
| Multi-language (v1) | English-only for v1; Spanish deferred to v2 |
| Animated hero videos | Hurts page speed; roofing customers want info, not entertainment |
| Third-party review widgets | External JS bloat, API limits, requires actual business listing |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FNDN-01 | Pending | Pending |
| FNDN-02 | Pending | Pending |
| FNDN-03 | Pending | Pending |
| FNDN-04 | Pending | Pending |
| FNDN-05 | Pending | Pending |
| FNDN-06 | Pending | Pending |
| FNDN-07 | Pending | Pending |
| LEAD-01 | Pending | Pending |
| LEAD-02 | Pending | Pending |
| LEAD-03 | Pending | Pending |
| LEAD-04 | Pending | Pending |
| LEAD-05 | Pending | Pending |
| TRUST-01 | Pending | Pending |
| TRUST-02 | Pending | Pending |
| TRUST-03 | Pending | Pending |
| TRUST-04 | Pending | Pending |
| TRUST-05 | Pending | Pending |
| SEO-01 | Pending | Pending |
| SEO-02 | Pending | Pending |
| SEO-03 | Pending | Pending |
| SEO-04 | Pending | Pending |
| SEO-05 | Pending | Pending |
| SEO-06 | Pending | Pending |
| SEO-07 | Pending | Pending |
| SEO-08 | Pending | Pending |
| SEO-09 | Pending | Pending |
| SEO-10 | Pending | Pending |
| SCHEMA-01 | Pending | Pending |
| SCHEMA-02 | Pending | Pending |
| SCHEMA-03 | Pending | Pending |
| SCHEMA-04 | Pending | Pending |
| SCHEMA-05 | Pending | Pending |
| ANCHOR-01 | Pending | Pending |
| ANCHOR-02 | Pending | Pending |
| ANCHOR-03 | Pending | Pending |
| ANCHOR-04 | Pending | Pending |
| ANCHOR-05 | Pending | Pending |
| LOC-01 | Pending | Pending |
| LOC-02 | Pending | Pending |
| LOC-03 | Pending | Pending |
| LOC-04 | Pending | Pending |
| LOC-05 | Pending | Pending |
| LOC-06 | Pending | Pending |
| LOC-07 | Pending | Pending |
| SVC-01 | Pending | Pending |
| SVC-02 | Pending | Pending |
| SVC-03 | Pending | Pending |
| SVC-04 | Pending | Pending |
| SVC-05 | Pending | Pending |
| GUIDE-01 | Pending | Pending |
| GUIDE-02 | Pending | Pending |
| GUIDE-03 | Pending | Pending |
| GUIDE-04 | Pending | Pending |
| UTIL-01 | Pending | Pending |
| UTIL-02 | Pending | Pending |
| UTIL-03 | Pending | Pending |
| UTIL-04 | Pending | Pending |
| UTIL-05 | Pending | Pending |
| SILO-01 | Pending | Pending |
| SILO-02 | Pending | Pending |
| SILO-03 | Pending | Pending |
| SILO-04 | Pending | Pending |
| SILO-05 | Pending | Pending |
| CRAWL-01 | Pending | Pending |
| CRAWL-02 | Pending | Pending |
| CRAWL-03 | Pending | Pending |
| CRAWL-04 | Pending | Pending |
| CRAWL-05 | Pending | Pending |

**Coverage:**
- v1 requirements: 62 total
- Mapped to phases: 0
- Unmapped: 62 (pending roadmap creation)

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after initial definition*
