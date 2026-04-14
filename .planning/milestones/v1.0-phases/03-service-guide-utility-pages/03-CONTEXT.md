# Phase 3: Service, Guide & Utility Pages - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the full content inventory — 67 service pages at /services/{slug}, 10 educational guide pages at /roofing-guides/{slug}, and 5 utility pages (About, Contact, Service Area, Privacy Policy, Terms of Service) — completing the topical silo structure and establishing E-E-A-T authority across all roofing services. Also includes a /services index page, a /roofing-guides index page, and updated mega-menu navigation for services.

</domain>

<decisions>
## Implementation Decisions

### Service Page Layout & Sections
- **D-01:** Mirror location page section flow: Hero > Service Overview > Process/How It Works > Benefits Grid > Related Locations > FAQ > Testimonials > Emergency CTA > Contact Form. Reuses existing components (Hero, MidPageCTA, CityFAQ pattern, Testimonials, EmergencyCTA, ContactForm).
- **D-02:** MidPageCTA placed after Service Overview and after Benefits Grid sections (two touchpoints before FAQ).
- **D-03:** 2000-2500 words per service page. Service overview (~800-1000 words), 4-6 process steps (~400 words), 4-6 benefits (~300 words), 3-5 FAQ items (~400 words), plus local context and related content.
- **D-04:** Related Locations section shows all 16 Passaic County municipalities as Card grid linking to location pages. Completes bidirectional silo linking (SVC-04).
- **D-05:** Related Services section shows 3-4 related service cards. Each ServiceContent includes relatedServiceSlugs[] for internal linking depth.
- **D-06:** Category-based hero images — 5-7 hero images grouped by service category (residential repair, commercial, gutters, emergency, materials, inspection). Same image reused within a category for visual variety without 67 unique images.

### Service Taxonomy & Data Architecture
- **D-07:** Full 67-service taxonomy sourced from newarkqualityroofing.com during research phase. Research agent scrapes reference site to extract service names, categories, and descriptions, then maps to our slug/category structure.
- **D-08:** Flat URL structure: /services/{service-slug}. Category is metadata only, not in URL. All 67 services at same URL depth for cleaner SEO.
- **D-09:** /services index page listing all 67 services grouped by category in Card grids. Works as hub page for the services silo.
- **D-10:** One TypeScript file per service: data/services/content/{service-slug}.ts. Each exports typed ServiceContent object. Index file re-exports all. Follows Phase 2 city content pattern.
- **D-11:** Keep existing data/services.ts as lightweight index for navigation, ServicesGrid, and sitemap. data/services/content/ has full content files. Both share the same slugs.
- **D-12:** ServiceContent type includes: slug, name, category (ServiceCategory enum), heroHeadline, heroSubheadline, overviewHtml (800-1000 words), processSteps[], benefits[], faqItems[] (reuse FaqItem from city types), relatedServiceSlugs[], seoTitle, seoDescription.
- **D-13:** Mega menu navigation for Services dropdown: multi-column layout grouped by category (Residential, Commercial, Gutters, etc.), each column shows category name + top services, "View All Services" link at bottom to /services index. Update Navigation and MobileNav components in this phase.

### Guide Page Format
- **D-14:** Long-form educational article format, 2500-3500 words. Hero > Table of Contents > Intro > Multiple H2/H3 sections > Expert Tips callout > FAQ > Related Services > Related Guides > Get Help in Your City (16 municipality links) > Contact Form.
- **D-15:** 10 guide topics sourced from newarkqualityroofing.com during research phase. Research agent scrapes reference site guide section to extract topics, then adapts to Passaic County context.
- **D-16:** One TypeScript file per guide: data/guides/content/{guide-slug}.ts. Each exports typed GuideContent object with: slug, title, description, sections (GuideSection[]), expertTips (string[]), faqItems (FaqItem[]), relatedServiceSlugs[], relatedGuideSlugs[], seoTitle, seoDescription.
- **D-17:** Sticky sidebar Table of Contents on desktop (highlights current section on scroll). Collapsible TOC at top on mobile. New TableOfContents client component.
- **D-18:** Expert Tips styled callout box — amber left border, light background, lightbulb icon, 3-5 pro tips. Reusable ExpertTips component.
- **D-19:** Guide pages link to both services and locations: Related Services section (3-5 service cards) + "Get Help in Your City" section with all 16 municipality links. Fulfills GUIDE-04 bidirectional silo linking.
- **D-20:** Estimated read time calculated from word count (~250 words/min). Displayed in hero subtitle and guide index cards.
- **D-21:** /roofing-guides index page listing all 10 guides as cards with title, description, and estimated read time.

### Utility Pages
- **D-22:** About page — full company story: Hero > Our Story (founding, mission) > Credentials & Licenses (NJ HIC, insurance, certifications) > Why Choose Us (reuse component) > Service Area overview (16 municipalities) > Contact Form. ~1000-1500 words. Establishes E-E-A-T.
- **D-23:** Service Area page — static grid of 16 municipality cards (reuse Card component) with population, cluster tag, and link to location page. Static map image of Passaic County showing coverage area. No interactive map (avoids JS bloat).
- **D-24:** Contact page — comprehensive contact hub: contact form (left) + business info, hours, phone, email (right). Areas We Serve municipality links below. More substantial than the inline ContactForm on other pages.
- **D-25:** Privacy Policy and Terms of Service — standard legal templates customized with business name, domain, contact info from site-config.ts. noindex meta tag on both (no SEO value). Placeholder text for renter's lawyer to review.

### Claude's Discretion
- Exact ServiceCategory enum values (determined from reference site scrape)
- ProcessStep and Benefit type definitions
- GuideSection type definition (may include subsections)
- Service page new section components (ServiceOverview, ProcessSteps, BenefitsGrid)
- Guide page new section components (GuideArticle, TableOfContents, ExpertTips)
- Static map image sourcing for Service Area page
- Legal template content for Privacy/Terms pages
- Mobile mega menu implementation details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Configuration
- `.planning/PROJECT.md` — Municipality data, URL structure, content strategy, reference site (newarkqualityroofing.com), service/guide taxonomy source
- `.planning/REQUIREMENTS.md` — SVC-01..05, GUIDE-01..04, UTIL-01..05, SCHEMA-02, SILO-02, SILO-03 requirement details
- `.planning/ROADMAP.md` — Phase 3 goal and success criteria

### Prior Phase Context
- `.planning/phases/01-foundation-infrastructure-homepage/01-CONTEXT.md` — Design system decisions (colors, typography, cards, CTAs), layout shell, lead capture, schema patterns
- `.planning/phases/02-anchor-city-location-pages/02-CONTEXT.md` — Content data architecture pattern (one TS file per entity), dynamic route template, section flow, content generation approach

### Existing Code (Phase 1 + 2 output)
- `lib/site-config.ts` — 16 municipalities, business info, stats, hours. Source of truth for renter-swappable data
- `lib/schemas.ts` — buildLocalBusinessSchema(), buildOrganizationSchema(), buildBreadcrumbSchema(), buildFaqSchema(). Needs new buildServiceSchema()
- `lib/navigation.ts` — Navigation items (Services, Locations, Guides, About, Contact). Needs mega menu update
- `data/services.ts` — 15 services (lightweight index: name, slug, description, icon). Keep as-is, extend to 67 entries
- `data/content/types.ts` — CityContent, Neighborhood, FaqItem types. FaqItem reusable for service/guide FAQ
- `data/content/index.ts` — City content index pattern to follow
- `components/sections/Hero.tsx` — Reuse/extend for service and guide pages
- `components/sections/ServicesGrid.tsx` — Reuse on service index page
- `components/sections/MidPageCTA.tsx` — Reuse with service/guide-specific copy
- `components/sections/CityFAQ.tsx` — FAQ accordion pattern to adapt for ServiceFAQ/GuideFAQ
- `components/sections/WhyChooseUs.tsx` — Reuse on About page
- `components/sections/Testimonials.tsx` — Reuse on service pages
- `components/sections/EmergencyCTA.tsx` — Reuse on service pages
- `components/forms/ContactForm.tsx` — Reuse on all new pages
- `components/seo/JsonLd.tsx` — JSON-LD renderer
- `components/seo/Breadcrumbs.tsx` — Breadcrumb component
- `components/ui/Card.tsx` — Card component for grids
- `app/[locationSlug]/page.tsx` — Dynamic route pattern to follow for services and guides

### Technology Stack
- `CLAUDE.md` §Technology Stack — schema-dts for Service type definitions, next/font for Cormorant fonts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Hero** — Extend with service/guide-specific props (category image, read time subtitle)
- **Card** — Used for municipality grids, service grids, guide index cards
- **MidPageCTA** — Reuse with page-specific messaging
- **CityFAQ** — Accordion pattern adaptable to ServiceFAQ and GuideFAQ
- **ContactForm** — Drop-in on every new page
- **WhyChooseUs, Testimonials, EmergencyCTA** — Direct reuse on service pages and About page
- **JsonLd, Breadcrumbs** — Schema and breadcrumb rendering
- **FaqItem type** — Reuse across service and guide FAQ sections

### Established Patterns
- **One TS data file per entity** — data/content/{city}.ts pattern for services and guides
- **Dynamic routes with generateStaticParams()** — app/[locationSlug]/page.tsx pattern
- **Type-safe schema builders** — lib/schemas.ts with schema-dts types
- **Section-based page composition** — Pages assemble from section components
- **Site config as single source of truth** — lib/site-config.ts for all business data

### Integration Points
- **Navigation** — lib/navigation.ts needs mega menu structure for 67 services by category
- **Sitemap** — app/sitemap.ts needs service, guide, and utility page entries
- **data/services.ts** — Extend from 15 to 67 services (lightweight index)
- **lib/schemas.ts** — Add buildServiceSchema() function
- **Location pages** — Existing silo links reference service slugs that must exist

</code_context>

<specifics>
## Specific Ideas

- Reference site newarkqualityroofing.com is the taxonomy source for both services (67) and guides (10)
- Service pages mirror the location page section flow for site-wide consistency
- Mega menu navigation groups services by category — a significant UI upgrade from the current placeholder dropdown
- Guide pages are the most distinct page type: long-form article with sticky sidebar TOC, expert tips callout, and read time — differentiating them from service and location pages
- Privacy/Terms pages get noindex to keep crawl budget focused on ranking pages

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-service-guide-utility-pages*
*Context gathered: 2026-04-11*
