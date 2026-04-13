---
status: partial
phase: 03-service-guide-utility-pages
source: [03-VERIFICATION.md]
started: 2026-04-13T00:00:00Z
updated: 2026-04-13T00:00:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Service page render — all 13 sections display and FAQ accordion is interactive
expected: Visit /services/roof-repair, confirm ServiceOverview, ProcessSteps, BenefitsGrid, RelatedLocations, RelatedServices, ServiceFAQ all render. Click FAQ items to expand/collapse.
result: [pending]

### 2. Guide sidebar TOC — IntersectionObserver scroll tracking and sticky positioning
expected: Visit /roofing-guides/complete-nj-roofing-guide-homeowners on desktop. Sidebar TOC should be sticky, active section highlights as you scroll.
result: [pending]

### 3. Services mega menu — dropdown opens/closes, Escape key, category layout
expected: Click Services in nav. Mega menu shows 8 categories in a grid. Press Escape to close. Click outside to close.
result: [pending]

### 4. Service area page — MunicipalityGrid renders correctly
expected: Visit /service-area. Grid of 16 municipalities with population and cluster badges renders properly.
result: [pending]

### 5. Service page JSON-LD — 3 schema scripts in page source
expected: View source on /services/roof-repair. Find 3 application/ld+json scripts: Service, FAQ, BreadcrumbList.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
