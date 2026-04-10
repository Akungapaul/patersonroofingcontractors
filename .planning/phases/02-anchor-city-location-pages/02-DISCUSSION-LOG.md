# Phase 2: Anchor City & Location Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-10
**Phase:** 02-anchor-city-location-pages
**Areas discussed:** Page section layout, Content generation approach, Content data architecture, Anchor vs location differentiation

---

## Page Section Layout

### Section Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Lead-focused flow | Hero > About Roofing > Services > Neighborhoods > Why Choose Us > FAQ > Testimonials > Emergency CTA > Contact Form | ✓ |
| SEO-heavy flow | Hero > Deep City Context (1500+) > Services > FAQ > Neighborhoods > Why Choose Us > Testimonials > Emergency CTA > Contact Form | |
| Conversion-first flow | Hero + inline form > Services > Why Choose Us > About > Neighborhoods > FAQ > Testimonials > Emergency CTA > Contact Form | |

**User's choice:** Lead-focused flow
**Notes:** Front-loads local relevance + services for SEO, FAQ near bottom for long-tail keywords.

### Hero Style

| Option | Description | Selected |
|--------|-------------|----------|
| Image hero | Full-width background image with dark navy overlay, city name H1, cluster-based images (Urban/Highlands/Suburban) | ✓ |
| Text hero with accent bar | Navy background with amber accent stripe, no images. Uniform across all pages. | |
| You decide | Claude picks best approach | |

**User's choice:** Image hero with cluster-based images
**Notes:** Different hero images per geographic cluster. Reuses homepage Hero pattern.

### Neighborhoods Display

| Option | Description | Selected |
|--------|-------------|----------|
| Grid of neighborhood cards | 2-3 column grid, each showing name + 1-2 sentence roofing context. Reuses Card component. | ✓ |
| Simple bulleted list | Heading + bulleted list of names with brief context | |
| You decide | Claude picks based on neighborhood count | |

**User's choice:** Grid of neighborhood cards
**Notes:** 6-10 neighborhoods per city. Great for local SEO keyword density.

### Mid-Page CTA Placement

| Option | Description | Selected |
|--------|-------------|----------|
| After every 2 sections | CTA after About Roofing section and after Neighborhoods section. Two touchpoints. | ✓ |
| After every section | CTA between every major section. More aggressive. | |
| You decide | Claude places based on content length | |

**User's choice:** After every 2 sections
**Notes:** Not too aggressive, breaks up long content naturally.

---

## Content Generation Approach

### Generation Method

| Option | Description | Selected |
|--------|-------------|----------|
| AI-generated at build time | Content briefs per city, AI writes 3000+ words, stored as TS data files | ✓ |
| Template + data slots | Shared template with variable content injected from structured data | |
| Pre-written content files | Hand-written/commissioned MDX/markdown files | |
| Hybrid: AI draft + structured data | AI generates prose sections, structured data drives mechanical sections | |

**User's choice:** AI-generated at build time
**Notes:** Fast, scalable, 90%+ uniqueness. Needs human review pass for quality.

### Generation Timing

| Option | Description | Selected |
|--------|-------------|----------|
| During GSD execution | Claude writes content directly as build tasks during execute phase | ✓ |
| Separate generation step | Content generated in dedicated pre-phase using external tools | |
| You decide | Claude determines most efficient approach | |

**User's choice:** During GSD execution
**Notes:** No separate tooling or API calls needed. Claude writes content directly.

### FAQ Count and Uniqueness

| Option | Description | Selected |
|--------|-------------|----------|
| 5-8 unique per city | Completely unique FAQ questions tailored to each municipality | ✓ |
| 3 common + 3-5 unique | Share 3 universal questions plus city-specific ones | |
| You decide | Claude determines right mix per city | |

**User's choice:** 5-8 unique per city
**Notes:** No shared common questions. Maximizes uniqueness score and targets long-tail keywords.

---

## Content Data Architecture

### Storage Structure

| Option | Description | Selected |
|--------|-------------|----------|
| One TS file per city | data/content/{city}.ts with typed CityContent object per city. Index re-exports all. | ✓ |
| Single large data file | One cities-content.ts with Record mapping all 16 cities (~48k words in one file) | |
| MDX content files | Each city as MDX with frontmatter. Requires MDX setup. | |

**User's choice:** One TS file per city
**Notes:** Clean separation, easy to edit individual cities. Shared CityContent type in types.ts.

### Route Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Single dynamic route | app/roofing-contractor-[city]-nj/page.tsx with generateStaticParams for all 16 | ✓ |
| Separate anchor + dynamic | Standalone Paterson page + dynamic route for other 15 | |
| You decide | Claude determines based on anchor differentiation needs | |

**User's choice:** Single dynamic route
**Notes:** One template, different content data. Standard Next.js pattern.

---

## Anchor vs Location Differentiation

### Differentiation Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Same template, deeper content | Same sections, Paterson gets longer intro, more neighborhoods, more FAQ items | ✓ |
| Anchor gets extra sections | Paterson has additional unique sections not on other pages | |
| You decide | Claude determines based on SEO best practices | |

**User's choice:** Same template, deeper content
**Notes:** Paterson: 1200-1500 word intro, 10-12 neighborhoods, 8 FAQ, 3500-4000 total words. Others: 800-1000 word intro, 6-8 neighborhoods, 5-6 FAQ, 3000-3200 total words.

### Build Order

| Option | Description | Selected |
|--------|-------------|----------|
| Anchor first, then batch | Build Paterson first as reference, verify, then generate remaining 15 | ✓ |
| All 16 in parallel | Build template and all 16 content files at once | |
| You decide | Claude determines optimal execution strategy | |

**User's choice:** Anchor first, then batch
**Notes:** Reduces rework if template needs adjustment. Paterson validates the pattern.

---

## Claude's Discretion

- Hero image sourcing strategy per cluster
- Specific neighborhood research per city
- Content brief structure and local detail level
- FAQ question topics beyond general guidance
- New component composition (CityIntro, NeighborhoodGrid, CityFAQ)

## Deferred Ideas

None — discussion stayed within phase scope.
