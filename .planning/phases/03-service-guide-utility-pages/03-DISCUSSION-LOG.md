# Phase 3: Service, Guide & Utility Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 03-service-guide-utility-pages
**Areas discussed:** Service page layout & sections, Service taxonomy & grouping, Guide page format, Utility page scope

---

## Service Page Layout & Sections

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror location pages | Hero > Service Overview > Process > Benefits > Related Locations > FAQ > Testimonials > Emergency CTA > Contact Form. Consistent with Phase 2 pattern. | ✓ |
| Compact service focus | Hero > Service Description > Process Steps > FAQ > Contact Form. Shorter, no testimonials/emergency CTA. | |
| Sales-heavy conversion | Hero > Problem/Pain Point > Solution > Social Proof > Process > Pricing > FAQ > Urgency CTA > Contact Form. | |

**User's choice:** Mirror location pages
**Notes:** Keeps site-wide consistency, reuses existing components

### Content Depth

| Option | Description | Selected |
|--------|-------------|----------|
| 1000-1500 words | Service overview + process + benefits + FAQ | |
| 2000-2500 words | Deeper content with extended overview, detailed process, material comparisons | ✓ |
| 500-800 words | Lean service descriptions | |

**User's choice:** 2000-2500 words

### Related Locations

| Option | Description | Selected |
|--------|-------------|----------|
| All 16 municipalities | Grid of links to all 16 location pages. Completes bidirectional silo. | ✓ |
| Top 5-8 relevant cities | Only show cities where service is most relevant | |
| You decide | Claude determines approach | |

**User's choice:** All 16 municipalities

### Data Structure

| Option | Description | Selected |
|--------|-------------|----------|
| One file per service | data/services/content/{service-slug}.ts — Same pattern as city content | ✓ |
| Grouped by category | Subdirectories per category | |
| Single large data file | All 67 in one file | |

**User's choice:** One file per service

### ServiceContent Type

| Option | Description | Selected |
|--------|-------------|----------|
| Full content type | heroHeadline, heroSubheadline, overviewHtml, processSteps[], benefits[], faqItems[], relatedServiceSlugs[], seoTitle, seoDescription, category | ✓ |
| You decide | Claude determines type structure | |

**User's choice:** Full content type

### Migration Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Keep both | data/services.ts as lightweight index, data/services/content/ for full content | ✓ |
| Merge into content files | Single source of truth in content files | |
| You decide | Claude determines approach | |

**User's choice:** Keep both

### Related Services

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, 3-4 related services | relatedServiceSlugs[] in ServiceContent, renders as Card grid | ✓ |
| No related services | Navigation handles service discovery | |
| You decide | Claude determines approach | |

**User's choice:** Yes, 3-4 related services

### Hero Images

| Option | Description | Selected |
|--------|-------------|----------|
| Category-based images | 5-7 hero images by service category, reused within category | ✓ |
| Single generic hero | One image across all 67 pages | |
| You decide | Claude determines approach | |

**User's choice:** Category-based images

---

## Service Taxonomy & Grouping

### Taxonomy Source

| Option | Description | Selected |
|--------|-------------|----------|
| Source from reference site | Scrape newarkqualityroofing.com during research phase | ✓ |
| Define taxonomy manually | Define categories and services ourselves | |
| You decide | Claude determines approach | |

**User's choice:** Source from reference site

### URL Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Flat: /services/{slug} | Category as metadata only, not in URL | ✓ |
| Nested: /services/{category}/{slug} | Category in URL path | |

**User's choice:** Flat URLs

### Services Index Page

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, categorized grid | /services page with all services grouped by category | ✓ |
| No index page | Services via nav dropdown and internal links only | |
| You decide | Claude determines approach | |

**User's choice:** Yes, categorized grid

### Research Phase Scraping

| Option | Description | Selected |
|--------|-------------|----------|
| Research phase scrapes it | Claude scrapes newarkqualityroofing.com during research | ✓ |
| I have the list | User provides service list manually | |
| You decide | Claude determines approach | |

**User's choice:** Research phase scrapes it

### Navigation Dropdown

| Option | Description | Selected |
|--------|-------------|----------|
| Mega menu by category | Multi-column dropdown grouped by category, "View All" link | ✓ |
| Simple scrollable list | Single-column alphabetical list | |
| Top 8 + view all | Only 8 popular services shown | |

**User's choice:** Mega menu by category

### Navigation Timing

| Option | Description | Selected |
|--------|-------------|----------|
| This phase | Update navigation components in Phase 3 | ✓ |
| Phase 4 | Defer to silo polish phase | |

**User's choice:** This phase

---

## Guide Page Format

### Format

| Option | Description | Selected |
|--------|-------------|----------|
| Long-form educational article | 2500-3500 words with TOC, multiple sections, expert tips, FAQ | ✓ |
| Step-by-step how-to | Numbered steps, 1500-2000 words | |
| Mix of both | Some long-form, some step-by-step | |

**User's choice:** Long-form educational article

### Topics Source

| Option | Description | Selected |
|--------|-------------|----------|
| Research phase determines | Scrape newarkqualityroofing.com guide section | ✓ |
| Define topics now | Lock in topics during discussion | |
| You decide | Claude selects topics | |

**User's choice:** Research phase determines

### Data Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| One file per guide | data/guides/content/{guide-slug}.ts with GuideContent type | ✓ |
| You decide | Claude determines structure | |

**User's choice:** One file per guide

### Index Page

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, card grid | /roofing-guides page listing all 10 guides with read time | ✓ |
| No index page | Guides via nav and internal links only | |

**User's choice:** Yes, card grid

### Table of Contents

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky sidebar TOC | Desktop: sticky sidebar with scroll tracking. Mobile: collapsible TOC at top | ✓ |
| Simple inline TOC | Basic jump links at top, no tracking | |
| No TOC | No table of contents | |

**User's choice:** Sticky sidebar TOC

### Expert Tips Callout

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, styled callout box | Amber-bordered box with icon, 3-5 pro tips | ✓ |
| No special callout | Tips woven into body text | |

**User's choice:** Yes, styled callout box

### Guide Links

| Option | Description | Selected |
|--------|-------------|----------|
| Both services and locations | Related Services cards + 16 municipality links | ✓ |
| Services only | Only service page links | |
| You decide | Claude determines approach | |

**User's choice:** Both services and locations

### Read Time

| Option | Description | Selected |
|--------|-------------|----------|
| Yes | Calculate from word count (~250 words/min), show in hero and index | ✓ |
| No read time | Skip calculation | |

**User's choice:** Yes

---

## Utility Page Scope

### About Page

| Option | Description | Selected |
|--------|-------------|----------|
| Full company story | Hero + Our Story + Credentials + Why Choose Us + Service Area + Contact Form, ~1000-1500 words | ✓ |
| Minimal about | Brief description + trust badges + contact form, ~300-500 words | |
| You decide | Claude determines depth | |

**User's choice:** Full company story

### Service Area Page

| Option | Description | Selected |
|--------|-------------|----------|
| Static grid + static map image | 16 municipality cards + static Passaic County map image | ✓ |
| Interactive map | Embedded Google Maps/Mapbox | |
| You decide | Claude determines approach | |

**User's choice:** Static grid + static map image

### Contact Page

| Option | Description | Selected |
|--------|-------------|----------|
| Comprehensive contact hub | Form (left) + business info (right) + municipality links below | ✓ |
| Same inline form | Reuse existing ContactForm component | |
| You decide | Claude determines approach | |

**User's choice:** Comprehensive contact hub

### Legal Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Standard templates | Generic legal templates customized from site-config.ts, noindex | ✓ |
| Custom content | Fully custom legal pages | |
| You decide | Claude determines approach | |

**User's choice:** Standard templates

---

## Claude's Discretion

- Exact ServiceCategory enum values (from reference site scrape)
- ProcessStep and Benefit type definitions
- GuideSection type definition
- New section components (ServiceOverview, ProcessSteps, BenefitsGrid, GuideArticle, TableOfContents, ExpertTips)
- Static map image sourcing for Service Area page
- Legal template content for Privacy/Terms
- Mobile mega menu implementation details

## Deferred Ideas

None — discussion stayed within phase scope
