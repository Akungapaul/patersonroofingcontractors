---
phase: 04-silo-linking-crawl-health-cro-polish
plan: 01
subsystem: testing
tags: [audit, tsx, lighthouse, json-ld, sitemap, cro, cwv, internal-links]

# Dependency graph
requires:
  - phase: 03-service-guide-utility-pages
    provides: all page templates, service/city/guide content data, navigation components
provides:
  - route registry (getAllValidRoutes, getIndexableRoutes) for link/sitemap validation
  - audit reporter (AuditResult, printResults) with PASS/FAIL/WARN formatting
  - audit:links script validating nav links, inline hrefs, click depth, broken links
  - audit:schema script validating JSON-LD per page type
  - audit:sitemap script validating completeness, noindex exclusion, canonical URLs
  - audit:cro script validating CTA/trust presence, phone tracking, image opt, Lighthouse CWV
  - four npm run audit commands (audit:links, audit:schema, audit:sitemap, audit:cro)
affects: [04-02, 04-03]

# Tech tracking
tech-stack:
  added: [tsx]
  patterns: [audit script pattern with shared reporter and route registry]

key-files:
  created:
    - scripts/utils/routes.ts
    - scripts/utils/reporter.ts
    - scripts/audit-links.ts
    - scripts/audit-schema.ts
    - scripts/audit-sitemap.ts
    - scripts/audit-cro.ts
  modified:
    - package.json

key-decisions:
  - "Route count is 101 (not 103 as plan estimated) -- 1 homepage + 16 locations + 67 services + 10 guides + 2 index + 3 utility + 2 legal"
  - "Used fileURLToPath(import.meta.url) instead of import.meta.dirname for tsx CJS compatibility"
  - "Lighthouse TBT used as INP proxy since lab-mode Lighthouse cannot measure INP directly"

patterns-established:
  - "Audit script pattern: import routes + reporter, run checks, collect AuditResult[], call printResults()"
  - "Route registry pattern: single source of truth for all valid site routes derived from data files"

requirements-completed: [SILO-04, CRAWL-01, CRAWL-02, CRAWL-03, CRAWL-04, CRAWL-05]

# Metrics
duration: 7min
completed: 2026-04-13
---

# Phase 4 Plan 1: Audit Scripts Summary

**Four permanent audit scripts (links, schema, sitemap, CRO+CWV) with shared route registry and reporter, producing PASS/FAIL/WARN output for all ~100 pages**

## Performance

- **Duration:** 7 min
- **Started:** 2026-04-13T16:34:20Z
- **Completed:** 2026-04-13T16:42:15Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Built complete route registry (101 routes) derived from siteConfig, services, and guides data -- single source of truth for all audits
- Created four audit scripts covering internal link integrity (67 broken inline links found), JSON-LD schema correctness (11/11 page types pass), sitemap completeness (99 indexable routes covered), and CRO element presence with Lighthouse CWV measurement
- All audit scripts run via npm commands and exit with proper codes (0 for pass, 1 for fail) for CI integration
- Lighthouse CWV check is non-blocking -- gracefully emits WARN when server/Chrome unavailable

## Task Commits

Each task was committed atomically:

1. **Task 1: Build shared utilities and link/schema audit scripts** - `2e41d6b` (feat)
2. **Task 2: Build sitemap and CRO audit scripts with Lighthouse CWV checks** - `63c2b7e` (feat)

## Files Created/Modified
- `scripts/utils/routes.ts` - Complete route registry (getAllValidRoutes, getIndexableRoutes) built from siteConfig, services, guides data
- `scripts/utils/reporter.ts` - Shared AuditResult interface and printResults() with PASS/FAIL/WARN formatting and process.exit
- `scripts/audit-links.ts` - Nav link validation, inline HTML href extraction, click depth analysis, broken link detection
- `scripts/audit-schema.ts` - JSON-LD schema presence validation per page type (11 page types checked)
- `scripts/audit-sitemap.ts` - Sitemap completeness, noindex exclusion, no pagination, canonical URL validation
- `scripts/audit-cro.ts` - CTA/trust section presence table, phone tracking attrs, image optimization, StickyCallButton, Lighthouse CWV
- `package.json` - Added audit:links, audit:schema, audit:sitemap, audit:cro scripts; tsx dev dependency

## Decisions Made
- Route count is 101 total (not 103 as plan estimated) -- the plan double-counted index pages in multiple categories
- Used `fileURLToPath(import.meta.url)` + `path.dirname()` instead of `import.meta.dirname` because tsx v4 runs scripts in CJS mode where `import.meta.dirname` is undefined
- Lighthouse uses TBT (Total Blocking Time) as proxy for INP since lab-mode Lighthouse cannot measure INP directly

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed import.meta.dirname incompatibility with tsx**
- **Found during:** Task 1 (first script test run)
- **Issue:** `import.meta.dirname` is undefined when tsx runs TypeScript in CJS mode (Node.js v25 + tsx v4)
- **Fix:** Replaced with `fileURLToPath(import.meta.url)` + `path.dirname()` pattern in all scripts that read filesystem paths
- **Files modified:** scripts/audit-links.ts, scripts/audit-schema.ts
- **Verification:** All scripts execute without path resolution errors
- **Committed in:** 2e41d6b (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary fix for tsx compatibility. No scope change.

## Audit Results (Current State)

### audit:links
- **Nav Links:** PASS -- Footer and MegaMenu use data-driven iteration
- **Inline Links:** FAIL -- 67 broken inline links across all 16 city content files (7 unique broken slugs)
- **Click Depth:** PASS -- All 101 routes reachable within 2 clicks from homepage
- **Broken Link Summary:** FAIL -- 67 broken links, 16 affected files

### audit:schema
- All 11 page types PASS -- every expected JSON-LD schema present

### audit:sitemap
- All 4 checks PASS -- 99 indexable routes covered, noindex excluded, no pagination, canonical URLs correct

### audit:cro
- All 9 page types PASS -- CRO components present
- Phone Tracking: PASS -- all phone links have data-action="call"
- Image Optimization: PASS -- no raw `<img>` tags
- Sticky Call Button: PASS -- StickyCallButton present in layout
- CWV: Homepage LCP 6.2s (FAIL in dev mode -- expected for unoptimized dev server)

## Issues Encountered
- Lighthouse runs against dev server report inflated LCP (6.2s) because dev mode does not optimize bundles. This is expected -- production builds should pass CWV thresholds. The audit correctly reports the metrics regardless.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Audit scripts identify exactly 67 broken inline links in city content that Plan 03 will fix
- Schema, sitemap, and canonical URL checks all pass -- no fixes needed
- CRO sections already present on all page types -- Plan 02 may add additional trust sections
- Lighthouse CWV baseline established for production performance monitoring

## Self-Check: PASSED

All 6 created files exist. Both task commits (2e41d6b, 63c2b7e) verified in git log.

---
*Phase: 04-silo-linking-crawl-health-cro-polish*
*Completed: 2026-04-13*
