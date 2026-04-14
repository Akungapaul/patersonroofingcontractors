---
phase: 03-service-guide-utility-pages
reviewed: 2026-04-12T00:00:00Z
depth: standard
files_reviewed: 43
files_reviewed_list:
  - lib/utils.ts
  - lib/schemas.ts
  - data/services/types.ts
  - data/guides/types.ts
  - data/services.ts
  - data/services/content/index.ts
  - data/guides/content/index.ts
  - data/legal/privacy-policy.ts
  - data/legal/terms-of-service.ts
  - app/services/[serviceSlug]/page.tsx
  - app/services/page.tsx
  - app/roofing-guides/[guideSlug]/page.tsx
  - app/roofing-guides/page.tsx
  - app/about/page.tsx
  - app/contact/page.tsx
  - app/service-area/page.tsx
  - app/privacy-policy/page.tsx
  - app/terms-of-service/page.tsx
  - app/sitemap.ts
  - components/layout/MegaMenu.tsx
  - components/layout/Navigation.tsx
  - components/layout/MobileNav.tsx
  - components/layout/Header.tsx
  - components/sections/ServiceOverview.tsx
  - components/sections/ProcessSteps.tsx
  - components/sections/BenefitsGrid.tsx
  - components/sections/RelatedLocations.tsx
  - components/sections/RelatedServices.tsx
  - components/sections/ServiceFAQ.tsx
  - components/sections/GuideArticle.tsx
  - components/sections/TableOfContents.tsx
  - components/sections/ExpertTips.tsx
  - components/sections/GuideFAQ.tsx
  - components/sections/RelatedGuides.tsx
  - components/sections/CityLinks.tsx
  - components/sections/ContactHub.tsx
  - components/sections/MunicipalityGrid.tsx
  - components/sections/LegalPage.tsx
  - components/sections/Hero.tsx
  - components/sections/ServicesGrid.tsx
  - data/services/content/roof-repair.ts
  - data/services/content/commercial-roof-installation.ts
  - data/services/content/solar-panel-roofing-installation.ts
  - data/guides/content/complete-nj-roofing-guide-homeowners.ts
  - data/guides/content/roof-repair-vs-replacement.ts
findings:
  critical: 2
  warning: 6
  info: 5
  total: 13
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-04-12
**Depth:** standard
**Files Reviewed:** 43
**Status:** issues_found

## Summary

This phase covers the service, guide, utility, and legal pages for the Paterson Roofing Contractors site, along with the shared layout (Header, Navigation, MegaMenu, MobileNav) and all section components. The codebase is well-structured overall: Next.js 15+ async params are correctly awaited, `dynamicParams = false` is properly set on dynamic routes, `generateStaticParams` is in place, and structured data schemas are sound.

Two critical issues stand out: uncontrolled `dangerouslySetInnerHTML` usage on content passed at build-time (low exploit risk today, but a structural XSS risk if the data pipeline ever changes), and the `LegalPage` component rendering server-interpolated template strings via `dangerouslySetInnerHTML` without any sanitization.

Six warnings cover logic gaps: icon lookup returning `undefined` silently, an uncontrolled `max-h` animation that will clip unusually long FAQs, the MobileNav accordion not resetting state when closed, a missing `aria-label` on the read-time span in `RelatedGuides`, duplicate `h3` headings in `ContactHub`, and the sitemap hardcoding a URL string rather than using `siteConfig.url`.

---

## Critical Issues

### CR-01: Unsanitized HTML injected via `dangerouslySetInnerHTML` across multiple components

**Files:**
- `components/sections/ServiceOverview.tsx:17`
- `components/sections/GuideArticle.tsx:22` and `34`
- `components/sections/ServiceFAQ.tsx:66`
- `components/sections/GuideFAQ.tsx:64`
- `components/sections/LegalPage.tsx:22`

**Issue:** All six call sites pass `overviewHtml`, `contentHtml`, `item.answer`, or `content` directly into `dangerouslySetInnerHTML={{ __html: … }}` with no sanitization. Today the content is authored in TypeScript data files and is therefore controlled at build time. However:

1. `LegalPage` renders content produced by template-literal string interpolation in `data/legal/privacy-policy.ts` and `data/legal/terms-of-service.ts` — if `siteConfig` values were ever loaded from an external source (CMS, env var, database), the interpolated values would arrive unsanitized.
2. Any future migration to a CMS or external content API would silently introduce XSS because no sanitization layer exists anywhere in the pipeline.
3. `ServiceFAQ` and `GuideFAQ` render `item.answer` which originates from the same static data today, but FAQ items are the most likely field to be moved to a CMS.

**Fix:** Add a DOMPurify (or server-side sanitize-html) pass at the data boundary — ideally in a single wrapper utility — so that every HTML field is sanitized before it ever reaches `dangerouslySetInnerHTML`:

```ts
// lib/sanitize.ts  (runs server-side only — no browser DOMPurify needed)
import sanitizeHtml from 'sanitize-html'

const ALLOWED = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h2', 'h3', 'h4']),
  allowedAttributes: { a: ['href', 'rel', 'target'], '*': [] },
}

export function sanitize(html: string): string {
  return sanitizeHtml(html, ALLOWED)
}
```

Then in each component:
```tsx
import { sanitize } from '@/lib/sanitize'
// ...
dangerouslySetInnerHTML={{ __html: sanitize(overviewHtml) }}
```

---

### CR-02: Icon name `'Calendar'` and `'ShieldCheck'`, `'Award'`, `'FileText'` are referenced in data but absent from `iconMap`

**Files:**
- `data/services/content/roof-repair.ts:30` (`Calendar`), `55` (`ShieldCheck`), `83` (`ShieldCheck`), `88` (`Award`), and throughout other service files
- `components/sections/ProcessSteps.tsx:35-66` — `iconMap` does not contain `Calendar`, `ShieldCheck`, `Award`, `FileText`
- `components/sections/BenefitsGrid.tsx:35-66` — same gap

**Issue:** When `step.icon` or `benefit.icon` resolves to a name not in `iconMap`, the lookup returns `undefined` and the icon renders silently as nothing. This is not a runtime crash but it is a silent data correctness bug that will affect every service page that references these icon names. `roof-repair.ts` references `Calendar`, `ShieldCheck`, `Award`, and `FileText` — none of which appear in either `ProcessSteps` or `BenefitsGrid` `iconMap`. Same icons are used in `commercial-roof-installation.ts` and likely other service files.

**Fix:** Add the missing imports and entries to both `iconMap` objects, or (better) unify into a single shared `iconMap` module:

```tsx
// lib/icon-map.ts
import { Calendar, ShieldCheck, Award, FileText, /* …all others … */ } from 'lucide-react'

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  ShieldCheck,
  Award,
  FileText,
  // … existing entries …
}
```

Import `iconMap` from this shared module in `ProcessSteps`, `BenefitsGrid`, and `ServicesGrid` instead of declaring three separate copies.

---

## Warnings

### WR-01: `max-h` accordion animation will clip content on very long FAQ answers

**Files:**
- `components/sections/ServiceFAQ.tsx:60` (`max-h-[1000px]`)
- `components/sections/GuideFAQ.tsx:60` (`max-h-[1000px]`)
- `components/sections/TableOfContents.tsx:95` (`max-h-[1000px]`)
- `components/layout/MobileNav.tsx:148` (`max-h-[5000px]`)

**Issue:** The `max-h` CSS-transition accordion pattern works only when the content height is known to never exceed the hard-coded maximum. The `roof-repair.ts` FAQ answers are already several hundred words long; at 18px body size with line-height 1.6 that easily approaches 800px per answer. A 1000px cap will silently clip any answer that renders taller. The mobile nav uses `max-h-[5000px]` for the full services accordion — this is fine for today's 67 services but is a magic number with no guard.

**Fix:** Use CSS Grid for the animation instead, which avoids needing a hard-coded max height:

```tsx
// Replace the max-h transition div with:
<div
  className={cn(
    'grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none',
    openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
  )}
>
  <div className="overflow-hidden">
    <div className="pb-5" dangerouslySetInnerHTML={{ __html: item.answer }} />
  </div>
</div>
```

---

### WR-02: MobileNav accordion state not reset when menu closes

**File:** `components/layout/MobileNav.tsx:39-55`

**Issue:** `expandedItems` and `expandedCategories` are initialized once and never cleared when `isOpen` goes from `true` to `false`. If a user opens the Services accordion, closes the mobile menu, then reopens it, the Services and category sections are already expanded — producing an inconsistent UX and potentially a very tall panel that needs scrolling immediately.

**Fix:** Reset expanded state when the menu closes:

```tsx
useEffect(() => {
  if (!isOpen) {
    setExpandedItems([])
    setExpandedCategories([])
  }
}, [isOpen])
```

---

### WR-03: `aria-expanded` on MegaMenu trigger button uses `"true"` string literal instead of boolean

**File:** `components/layout/Navigation.tsx:67` and `113`

**Issue:** Both `<button aria-haspopup="true">` attributes use the string `"true"`. `aria-haspopup` should be set to `"menu"` (or `"listbox"`, `"tree"`, `"grid"`, `"dialog"`) per ARIA spec — `"true"` is technically valid but semantically imprecise and some screen readers may announce it incorrectly. More importantly, `aria-haspopup` is not the same as `aria-expanded` — both are present but `aria-haspopup="true"` is legacy. For the MegaMenu pattern the correct value is `aria-haspopup="menu"`.

**Fix:**
```tsx
// Navigation.tsx line 67 and line 113
aria-haspopup="menu"
```

---

### WR-04: `GuideFAQ` accepts `guideTitle` prop but never uses it

**File:** `components/sections/GuideFAQ.tsx:13`

**Issue:** The component signature declares `{ faqItems, guideTitle }: GuideFAQProps` but destructures only `faqItems` in the function body — `guideTitle` is silently dropped. The heading is hardcoded as `"Frequently Asked Questions"` rather than using the title to contextualise it (e.g. `"FAQ: {guideTitle}"`). This is both an unused prop bug and a missed SEO/UX opportunity.

**Fix:**
```tsx
export function GuideFAQ({ faqItems, guideTitle }: GuideFAQProps) {
  // ...
  <h2 …>
    Frequently Asked Questions About {guideTitle}
  </h2>
```

---

### WR-05: Sitemap hardcodes base URL instead of reading from `siteConfig`

**File:** `app/sitemap.ts:7`

**Issue:** `const baseUrl = 'https://patersonroofingcontractors.com'` duplicates the canonical URL that is already defined in `siteConfig.url`. If the domain ever changes during development, staging, or a tenant swap, the sitemap will serve incorrect absolute URLs while all other pages use the updated `siteConfig` value — a divergence that could cause indexing problems.

**Fix:**
```ts
import { siteConfig } from '@/lib/site-config'
// Remove the hardcoded const and use:
const baseUrl = siteConfig.url
```

---

### WR-06: `ContactHub` renders two sibling `<h3>` elements at the same structural level inside a `<div>` that acts as a section, creating an implicit heading hierarchy skip

**File:** `components/sections/ContactHub.tsx:15` and `65`

**Issue:** The right-hand panel contains `<h3>Get In Touch</h3>` (line 15) and then `<h3>Business Hours</h3>` (line 65) as siblings inside a plain `<div>`. The surrounding page (`app/contact/page.tsx`) has an `<h1>` from the Hero, but `ContactHub` has no `<h2>` — so these `<h3>` headings appear at heading level 3 without a preceding level-2, violating the heading hierarchy rule from the project's CLAUDE.md SEO requirements. Screen readers and crawlers will see an h1 → h3 skip.

**Fix:** Promote one of the two headings to `<h2>` or wrap the section in an `<h2>` heading, then demote the inner headings:

```tsx
// ContactHub.tsx
<h2 className="mb-6 font-heading text-xl font-bold text-white">
  Get In Touch
</h2>
// ...
<h3 className="mt-6 mb-3 font-heading text-xl font-bold text-white">
  Business Hours
</h3>
```

---

## Info

### IN-01: Three separate `iconMap` declarations with identical contents across `ProcessSteps`, `BenefitsGrid`, and `ServicesGrid`

**Files:**
- `components/sections/ProcessSteps.tsx:35-66`
- `components/sections/BenefitsGrid.tsx:35-66`
- `components/sections/ServicesGrid.tsx:37-68`

**Issue:** All three components declare an identical `iconMap` constant with 29 entries each. This is code duplication — any icon added to one must be manually added to all three. Consolidate into a shared module (see fix in CR-02).

---

### IN-02: `ProcessSteps` and `BenefitsGrid` use array index as React key

**Files:**
- `components/sections/ProcessSteps.tsx:86` (`key={index}`)
- `components/sections/BenefitsGrid.tsx:82` (`key={index}`)
- `components/sections/ExpertTips.tsx:19` (`key={index}`)

**Issue:** Using array index as `key` is acceptable for purely static lists but is a React anti-pattern when the list could be reordered, filtered, or updated. Since these lists come from static data files and are never mutated, this is low risk in practice. A stable key derived from content (e.g. `step.title`) would be semantically better and avoids lint warnings.

**Fix:**
```tsx
// ProcessSteps
<div key={step.title} …>

// BenefitsGrid
<div key={benefit.title} …>

// ExpertTips (index is unavoidable here since tips are plain strings — acceptable as-is)
```

---

### IN-03: `app/about/page.tsx` — "Service Area Overview" section renders a `<p>` without a wrapping heading at that section level

**File:** `app/about/page.tsx:181`

**Issue:** The Service Area Overview section (line 179-189) in the About page renders only a `<p>` intro paragraph and then the `<CityLinks>` component, which itself renders an `<h2>`. There is no section-level heading before the paragraph, making the intro text appear to belong visually to the preceding Credentials section. The CityLinks heading `"Serving All of Passaic County"` is inside a nested component, so the About page's outline reads: h2 "Our Story" → h2 "Credentials & Licenses" → (orphan p) → h2 "Serving All of Passaic County" (from CityLinks). The paragraph has no associated heading.

**Fix:** Add an `<h2>` before the intro paragraph:
```tsx
<h2 className="mb-4 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
  Our Service Area
</h2>
<p className="mx-auto mb-6 …">
  From the urban core of Paterson …
</p>
<CityLinks heading="Serving All of Passaic County" />
```

---

### IN-04: `app/roofing-guides/page.tsx` — guide cards use `<h2>` for card titles in a grid context

**File:** `app/roofing-guides/page.tsx:68`

**Issue:** Each guide card renders `<h2 className="font-heading …">{guide.title}</h2>`. The page already has an `<h1>` (from the Hero component) and the grid section has no intervening `<h2>` — so all guide titles are `<h2>` elements, which creates many `<h2>` headings on the same page without a structural grouping heading above them. This is semantically valid (the page has a single h1 and multiple h2s as peers) but misses the opportunity to have a labeling `<h2>` like "All Guides" that groups them. More practically, once there are 10 guides, search engines will see 10 h2 headings of equal weight, diluting heading signals. Using `<h3>` within a containing `<h2>` section would be cleaner.

**Fix:**
```tsx
<section className="bg-white py-section-sm lg:py-section">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
      All Roofing Guides
    </h2>
    <div className="grid …">
      {guides.map((guide) => (
        <Link key={guide.slug} href={…}>
          <Card interactive className="h-full p-6">
            <h3 className="font-heading text-2xl font-bold text-navy">
              {guide.title}
            </h3>
            …
          </Card>
        </Link>
      ))}
    </div>
  </div>
</section>
```

---

### IN-05: `RelatedGuides` read-time span lacks `aria-label`

**File:** `components/sections/RelatedGuides.tsx:37-40`

**Issue:** The read-time span renders `{guide.readTime} min read` as plain text without an `aria-label`. The sibling component `app/roofing-guides/page.tsx:76` already applies `aria-label={`${readTime} minute read`}` for the same pattern — `RelatedGuides` is inconsistent. Screen readers will announce the abbreviated "min" which may be unclear.

**Fix:**
```tsx
<span
  className="mt-3 flex items-center gap-1 text-sm text-gray-500"
  aria-label={`${guide.readTime} minute read`}
>
  <Clock className="h-4 w-4" aria-hidden="true" />
  {guide.readTime} min read
</span>
```

---

_Reviewed: 2026-04-12_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
