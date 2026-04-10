# Phase 2: Anchor City & Location Pages - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver 16 location pages — 1 Paterson anchor + 15 municipality pages — at `/roofing-contractor-{city}-nj`. Each page has 3000+ unique words of locally-relevant roofing content, FAQ sections with FAQ JSON-LD schema, LocalBusiness + BreadcrumbList schema, silo links to service pages, and lead capture (phone CTA + contact form). Paterson is the anchor with deeper content; all 16 share a single dynamic route template.

</domain>

<decisions>
## Implementation Decisions

### Page Section Layout
- **D-01:** Lead-focused section flow: Hero > About Roofing in [City] > Services We Offer > Neighborhoods We Serve > Why Choose Us > FAQ > Testimonials > Emergency CTA > Contact Form
- **D-02:** Image hero with dark navy overlay reusing homepage Hero pattern. Different hero images per geographic cluster: Urban (dense housing/city skyline), Highlands (wooded/rural homes), Suburban (suburban neighborhood). 3-4 cluster images total.
- **D-03:** Neighborhoods displayed as 2-3 column grid of cards (reusing Card component), each showing neighborhood name + 1-2 sentence roofing context. 6-10 neighborhoods per city (10-12 for Paterson anchor).
- **D-04:** Mid-page CTAs placed after every 2 sections: one after "About Roofing in [City]" section, one after "Neighborhoods We Serve" section. Two touchpoints before FAQ/testimonials. Reuse MidPageCTA component with city-specific messaging.

### Content Generation
- **D-05:** AI-generated content at build time. Content briefs prepared per city with local data (neighborhoods, landmarks, housing stock, weather, common roofing issues). Claude writes unique 3000+ word content per city during GSD execution phase. Stored as static TypeScript data files. Human review pass for quality/accuracy.
- **D-06:** Content generated during GSD execution — Claude writes each city's content file directly as a build task. No separate tooling, API calls, or content generation scripts needed.
- **D-07:** 5-8 completely unique FAQ questions per city, tailored to municipality-specific roofing concerns, building types, and local context. No shared/common questions across cities. Each FAQ item rendered with FAQ JSON-LD schema (SCHEMA-03).

### Content Data Architecture
- **D-08:** One TypeScript file per city in `data/content/` directory. Each file exports a typed `CityContent` object with all content sections: heroHeadline, heroSubheadline, introHtml (800-1500 words), localContext, neighborhoods array, relevant service slugs, faqItems array, seoTitle, seoDescription. Shared `CityContent` type defined in `data/content/types.ts`. Index file re-exports all cities.
- **D-09:** Single dynamic route at `app/roofing-contractor-[city]-nj/page.tsx` with `generateStaticParams()` returning all 16 slugs. One template component imports the right city content file based on slug param. `generateMetadata()` reads city content for SEO.

### Anchor vs Location Differentiation
- **D-10:** Same template for all 16 pages — differentiation is in content depth, not code. Paterson anchor gets deeper content: intro 1200-1500 words (vs 800-1000), 10-12 neighborhoods (vs 6-8), 8 FAQ items (vs 5-6), total 3500-4000 words (vs 3000-3200). Extra Paterson context: historic district roofing, Great Falls area challenges, multi-family building focus, Passaic River flooding impact.
- **D-11:** Build order: Paterson anchor built and verified first as reference implementation (template, content quality, schema, rendering). Then remaining 15 cities generated in batches using the validated pattern.

### Claude's Discretion
- Specific hero image sourcing strategy (stock, AI-generated, or placeholder per cluster)
- Exact neighborhood data research per city (names, housing types, roofing context)
- Content brief structure and level of local detail per city
- FAQ question topics beyond the general guidance (city-specific concerns)
- Component composition for new sections (CityIntro, NeighborhoodGrid, CityFAQ)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Configuration
- `.planning/PROJECT.md` — Municipality data (16 cities with pop, type, cluster), URL structure, 4 geographic content angles, content strategy
- `.planning/REQUIREMENTS.md` — ANCHOR-01..05, LOC-01..07, SCHEMA-03 requirement details
- `.planning/ROADMAP.md` — Phase 2 goal and success criteria

### Phase 1 Context
- `.planning/phases/01-foundation-infrastructure-homepage/01-CONTEXT.md` — Design system decisions (colors, typography, cards, CTAs), layout shell, lead capture approach, schema patterns

### Existing Code (Phase 1 output)
- `lib/site-config.ts` — All 16 municipalities with name, slug, type, cluster, population. Business info, stats, hours.
- `lib/schemas.ts` — `buildLocalBusinessSchema()`, `buildBreadcrumbSchema()`. FAQ schema (SCHEMA-03) needs to be added here.
- `lib/navigation.ts` — Navigation structure with Locations dropdown placeholder
- `data/municipalities.ts` — Municipality re-export, clusterColors config (Urban, Suburban, Highlands)
- `data/services.ts` — Service definitions (name, slug, description, icon) for silo linking
- `components/sections/Hero.tsx` — Hero component to extend/reuse for location pages
- `components/sections/ServicesGrid.tsx` — Services grid to reuse on location pages
- `components/sections/WhyChooseUs.tsx` — Trust section to reuse
- `components/sections/Testimonials.tsx` — Testimonials to reuse
- `components/sections/EmergencyCTA.tsx` — Emergency CTA banner to reuse
- `components/sections/MidPageCTA.tsx` — Mid-page CTA bars to reuse with city-specific copy
- `components/forms/ContactForm.tsx` — Contact form to render on every location page
- `components/seo/JsonLd.tsx` — JSON-LD renderer for schema markup
- `components/seo/Breadcrumbs.tsx` — Breadcrumb component
- `components/ui/Card.tsx` — Card component for neighborhood grid

### Technology Stack
- `CLAUDE.md` §Technology Stack — schema-dts for FAQ type definitions, next/font for Cormorant fonts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Hero.tsx` — Extend for location-specific hero (city name H1, cluster image)
- `ServicesGrid.tsx` — Reuse directly on location pages, linking to service pages
- `WhyChooseUs.tsx` — Reuse directly (same trust messaging)
- `Testimonials.tsx` — Reuse directly (placeholder reviews with Passaic County cities)
- `EmergencyCTA.tsx` — Reuse directly (storm damage banner)
- `MidPageCTA.tsx` — Reuse with city-specific copy ("Need a roof estimate in [City]?")
- `ContactForm.tsx` — Reuse at bottom of every location page
- `Card.tsx` — Reuse for neighborhood grid cards
- `JsonLd.tsx` — Reuse for LocalBusiness + FAQ + BreadcrumbList schema per page
- `Breadcrumbs.tsx` — Reuse with location-specific breadcrumb trail

### Established Patterns
- Navy #1B2A4A + Amber #D97706 color scheme with alternating white/gray section backgrounds
- Card pattern: shadow-sm, rounded-lg, white bg, hover lift+amber border
- CTA pattern: amber primary buttons, navy outline secondary
- Schema pattern: builder functions in lib/schemas.ts, rendered via JsonLd component
- Site config pattern: centralized renter-swappable values in lib/site-config.ts

### New Components Needed
- `CityIntro` — About Roofing in [City] section (renders introHtml with local context)
- `NeighborhoodGrid` — 2-3 column grid of neighborhood cards
- `CityFAQ` — FAQ accordion/section with location-specific Q&A
- `buildFaqSchema()` — FAQ JSON-LD schema builder in lib/schemas.ts

### Integration Points
- Dynamic route: `app/roofing-contractor-[city]-nj/page.tsx`
- Data layer: `data/content/` directory with per-city TypeScript files
- Schema: FAQ schema added to `lib/schemas.ts` alongside existing builders
- Navigation: Locations dropdown in header populates from municipality data
- Sitemap: `app/sitemap.ts` needs to include all 16 location page URLs
- Silo linking: Each location page links to relevant services from `data/services.ts`

</code_context>

<specifics>
## Specific Ideas

- Hero images should vary by geographic cluster (Urban, Highlands, Suburban) — 3-4 images covering all 16 cities
- Paterson page should reference Great Falls, historic districts, Passaic River flooding, multi-family buildings
- Neighborhood cards should include roofing-relevant context ("older multi-family flat roofs") not just names
- FAQ questions should target long-tail "[roofing question] in [city] NJ" keywords
- Content uniqueness achieved through different local context per city, not just name swaps — each city's housing stock, weather exposure, and building types drive unique content angles
- The 4 geographic content angles (Dense Urban, NJ Highlands, Suburban Corridor, Commercial Corridor) should be woven deeply into each city's prose, not just mentioned

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-anchor-city-location-pages*
*Context gathered: 2026-04-10*
