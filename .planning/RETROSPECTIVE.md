# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-04-14
**Phases:** 4 | **Plans:** 29 | **Commits:** 133

### What Was Built
- 101-route rank-and-rent roofing site targeting all 16 Passaic County municipalities
- 16 location pages with 3000+ unique words each, 67 service pages, 10 guides, 5 utility pages
- Full SEO infrastructure: generateMetadata, 4 JSON-LD schema types, XML sitemap, robots.txt
- Lead capture: GoHighLevel webhook + click-to-call with tracking attributes
- CRO: sticky mobile call button, trust sections on every content page
- QA: 4 permanent audit scripts catching and fixing 67 broken links

### What Worked
- **Coarse 4-phase granularity** — compressed 7-phase suggestion into 4, shipped in 7 days
- **Data-driven content architecture** — CityContent/ServiceContent/GuideContent types made 100+ pages consistent
- **Gap closure plans (02-06 through 02-10)** — word count expansion after initial content pass was efficient
- **Audit scripts in Phase 4** — caught 67 broken inline links that would have hurt SEO
- **Content angle differentiation** — 4 geographic clusters (Dense Urban, Highlands, Suburban, Commercial) ensured uniqueness

### What Was Inefficient
- **Phase 4 VERIFICATION.md never created** — left 6 requirements formally unverified despite code being complete
- **REQUIREMENTS.md Phase 1 checkboxes never updated** — 32 items stayed `[ ]` through entire milestone
- **ROADMAP progress table not maintained** — Phases 3 and 4 showed 0/N plans despite all being executed
- **Content word counts undershot initially** — 5 gap closure plans needed for Phase 2 location pages (plans 06-10)
- **Footer service link explosion** — 67 services rendered without limit, noticed only at audit

### Patterns Established
- Content types (CityContent, ServiceContent, GuideContent) with content index modules for lookup
- FAQ accordion pattern with unique id prefixes per page type (city-faq-*, service-faq-*, guide-faq-*)
- Audit scripts as permanent QA infrastructure (not throwaway)
- Amber Emphasis (Variation 9) design system with Cormorant fonts
- Dynamic route template pattern: [slug]/page.tsx + generateStaticParams + dynamicParams=false

### Key Lessons
1. **Run formal verification on every phase** — skipping VERIFICATION.md on Phase 4 created 6 procedural gaps at milestone completion
2. **Set content word count targets upfront** — would have avoided 5 expansion plans if 3000+ words was enforced in initial content plans
3. **Keep traceability artifacts current** — stale checkboxes and progress tables reduce audit trust
4. **Audit scripts pay for themselves** — the 67 broken links would have been invisible without automated checking
5. **Coarse granularity works for content-heavy sites** — 4 phases was right; more would have been overhead

### Cost Observations
- Model mix: predominantly opus for planning/execution
- Sessions: ~10 across 7 days
- Notable: Content generation (67 services, 16 locations, 10 guides) was the bulk of execution time

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Key Change |
|-----------|---------|--------|------------|
| v1.0 | 133 | 4 | Initial process — coarse phases, data-driven content, audit scripts |

### Top Lessons (Verified Across Milestones)

1. (Single milestone — lessons above will be cross-validated as milestones accumulate)
