---
phase: 02-anchor-city-location-pages
reviewed: 2026-04-10T00:00:00Z
depth: standard
files_reviewed: 27
files_reviewed_list:
  - app/[locationSlug]/page.tsx
  - app/sitemap.ts
  - components/sections/CityFAQ.tsx
  - components/sections/CityIntro.tsx
  - components/sections/Hero.tsx
  - components/sections/MidPageCTA.tsx
  - components/sections/NeighborhoodGrid.tsx
  - components/sections/ServicesGrid.tsx
  - data/content/bloomingdale.ts
  - data/content/clifton.ts
  - data/content/haledon.ts
  - data/content/hawthorne.ts
  - data/content/index.ts
  - data/content/little-falls.ts
  - data/content/north-haledon.ts
  - data/content/passaic.ts
  - data/content/paterson.ts
  - data/content/pompton-lakes.ts
  - data/content/prospect-park.ts
  - data/content/ringwood.ts
  - data/content/totowa.ts
  - data/content/types.ts
  - data/content/wanaque.ts
  - data/content/wayne.ts
  - data/content/west-milford.ts
  - data/content/woodland-park.ts
  - lib/schemas.ts
findings:
  critical: 1
  warning: 4
  info: 3
  total: 8
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-10
**Depth:** standard
**Files Reviewed:** 27
**Status:** issues_found

## Summary

The location page system is well-architected overall. The dynamic route, content data layer, and schema helpers are clean and correctly use Next.js 15+ async params. The 16 city content files are consistent in shape and all satisfy the `CityContent` interface.

Three issues warrant attention before this ships:

1. **HTML tags in FAQ answers bleed into JSON-LD structured data.** Some FAQ answers (notably in `paterson.ts`) contain `<strong>` and other HTML markup. The `buildFaqSchema` function writes `item.answer` verbatim into the `text` field of the schema's `Answer` objects. Google's Rich Results guidelines require plain text in that field; HTML markup causes the FAQ rich result to be rejected or silently suppressed.

2. **`dangerouslySetInnerHTML` in both `CityIntro` and `CityFAQ` renders untrusted HTML.** The HTML originates from static TypeScript content files checked into the repo, so there is no live injection vector today — but the pattern is a latent security risk with no sanitization guard. If content ever migrates to a CMS or external source, XSS becomes exploitable immediately.

3. **`sitemap.ts` has an inconsistent `changeFrequency` type on the homepage entry** (missing `as const`), which TypeScript may silently widen to `string` rather than the required literal union type.

The remaining findings are lower-severity quality and SEO issues.

---

## Critical Issues

### CR-01: HTML markup in FAQ answers corrupts JSON-LD structured data

**File:** `data/content/paterson.ts:117`, `data/content/paterson.ts:141`
**Also affects:** `data/content/passaic.ts` (answer lines containing HTML)

**Issue:** Several FAQ answers contain raw HTML tags (`<strong>`, `<a href>`). The `buildFaqSchema` function in `lib/schemas.ts:78` writes `item.answer` directly into the `text` property of the `Answer` object with no stripping:

```ts
// lib/schemas.ts:78
text: item.answer,
```

The `FaqItem` type comment in `types.ts:8` explicitly notes answers "Can contain HTML for rich formatting," which is correct for the `dangerouslySetInnerHTML` rendering — but the same value flows unmodified into JSON-LD. Google's FAQ structured data documentation specifies that `acceptedAnswer.text` must be plain text; HTML tags are not permitted and will cause the rich result to fail validation.

**Fix:** Strip HTML before writing the answer to the schema. Either sanitize in `buildFaqSchema` or add a helper:

```ts
// lib/schemas.ts — strip HTML for structured data output
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

// Then in buildFaqSchema:
text: stripHtml(item.answer),
```

Alternatively, add a separate `answerText` (plain text) field to `FaqItem` alongside `answer` (HTML), and use each where appropriate.

---

## Warnings

### WR-01: `dangerouslySetInnerHTML` renders unvalidated HTML from content files

**File:** `components/sections/CityIntro.tsx:18`, `components/sections/CityFAQ.tsx:66`

**Issue:** Both components render HTML strings sourced from data content files using `dangerouslySetInnerHTML`. The content is static and developer-controlled today, so there is no active injection path. However, there is no sanitization layer — no DOMPurify, no allowlist enforcement, no type-level constraint that the string is safe. If content is ever sourced from a CMS, database, or third-party API (a natural evolution for a rank-and-rent site sold to a renter), XSS becomes a direct risk with no additional protection.

**Fix:** Add a thin sanitization wrapper with an allowlist restricted to the tags actually used (`<p>`, `<a>`, `<strong>`, `<em>`). At minimum, enforce this in the type system and document the security assumption:

```tsx
// components/sections/CityIntro.tsx
// SECURITY: introHtml must only come from static content files.
// If this ever sources from external input, add DOMPurify sanitization here.
<div dangerouslySetInnerHTML={{ __html: introHtml }} />
```

For a more robust fix, install `isomorphic-dompurify` and wrap the render:

```ts
import DOMPurify from 'isomorphic-dompurify'
const ALLOWED_TAGS = ['p', 'a', 'strong', 'em', 'br']
const safe = DOMPurify.sanitize(introHtml, { ALLOWED_TAGS })
```

### WR-02: `sitemap.ts` homepage entry missing `as const` on `changeFrequency`

**File:** `app/sitemap.ts:18`

**Issue:** The location page entries correctly use `'monthly' as const` (line 10), but the homepage entry does not:

```ts
// line 18 — missing `as const`
changeFrequency: 'monthly',
```

Without `as const`, TypeScript infers the type as `string` rather than the required `"monthly"` literal. Whether this causes a compile error depends on how `MetadataRoute.Sitemap` is declared in the installed Next.js version. If it does not error today, it will silently produce incorrect types, and a future Next.js upgrade may surface the failure.

**Fix:**

```ts
{
  url: baseUrl,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 1,
},
```

### WR-03: `ServicesGrid` silently renders empty when all `serviceSlugs` are unrecognized

**File:** `components/sections/ServicesGrid.tsx:46-48`

**Issue:** When `serviceSlugs` is provided, the component filters `services` to only those whose `slug` is in the list. If every slug in the list is misspelled or does not exist in `services.ts`, the filter returns an empty array and the component renders an `<h2>` heading with zero cards underneath — no empty-state guard, no warning. This is a silent failure mode that would produce a broken section on a live page without any visible error.

The `relevantServiceSlugs` arrays in the content files are all valid today (verified against `data/services.ts`), but a future content edit could introduce a typo.

**Fix:** Add a guard to return `null` (or a fallback) when the filtered list is empty:

```tsx
const displayedServices = serviceSlugs
  ? services.filter((s) => serviceSlugs.includes(s.slug))
  : services

if (displayedServices.length === 0) return null
```

Additionally, consider validating slugs at build time in `generateStaticParams` or via a TypeScript union type derived from `services`:

```ts
type ServiceSlug = typeof services[number]['slug']
relevantServiceSlugs: readonly ServiceSlug[]
```

### WR-04: `OpeningHoursSpecification` schema includes invalid time strings for closed days

**File:** `lib/schemas.ts:29-35`

**Issue:** The `buildLocalBusinessSchema` function filters business hours to exclude entries where `opens === 'Closed'` (line 29). However, the `closes` value for Sunday is also `'Closed'` — a non-time string. The filter correctly excludes Sunday from the output, so this does not produce invalid schema today. The risk is that the filter condition checks only `opens`, not `closes`. A future entry that sets `opens` to a valid time but `closes` to `'Closed'` (or vice versa) would pass the filter and emit an invalid `OpeningHoursSpecification` to the page.

```ts
// Current filter — only checks opens
.filter((h) => h.opens !== 'Closed')
```

**Fix:** Tighten the filter to require both fields to be valid:

```ts
.filter((h) => h.opens !== 'Closed' && h.closes !== 'Closed')
```

---

## Info

### IN-01: `CityFAQ` uses array index as React key

**File:** `components/sections/CityFAQ.tsx:29`

**Issue:** The FAQ accordion uses `key={index}` for list items. The FAQ items array comes from static content and is never reordered at runtime, so this does not cause incorrect rendering today. However, index keys are an antipattern — React may produce incorrect reconciliation behavior if the list order ever changes or items are conditionally filtered.

**Fix:** Use the question text as a stable key (it is unique within each city's FAQ list):

```tsx
<div key={item.question} ...>
```

### IN-02: `openGraph.url` in `generateMetadata` is a relative path

**File:** `app/[locationSlug]/page.tsx:60`

**Issue:** `openGraph.url` is set to a relative path (`/${locationSlug}`). The root layout sets `metadataBase`, so Next.js resolves this to an absolute URL — this is technically correct behavior. However, it is an implicit dependency on `metadataBase` being set correctly. The same relative path is used for `alternates.canonical` (line 55), which is also resolved via `metadataBase`. The pattern works but is fragile; if `metadataBase` is ever removed from the root layout, both canonical and OG URLs silently become relative — which breaks both SEO and social sharing.

**Fix (optional hardening):** Use the full URL explicitly:

```ts
alternates: {
  canonical: `${siteConfig.url}/${locationSlug}`,
},
openGraph: {
  url: `${siteConfig.url}/${locationSlug}`,
},
```

This makes the page self-contained and removes the hidden dependency.

### IN-03: `NeighborhoodGrid` Card elements have `tabIndex={-1}` with no interactive purpose

**File:** `components/sections/NeighborhoodGrid.tsx:29`

**Issue:** The neighborhood cards use `tabIndex={-1}`, which removes them from the natural tab order. These cards are purely informational `<div>` elements — they are not links, buttons, or otherwise interactive. `tabIndex={-1}` on a non-interactive element is meaningless and slightly misleading (it signals something is programmatically focusable, which is typically only correct for elements managed by a custom focus controller). The `interactive` prop is not passed, so the hover/focus styles from `Card` are not applied either.

**Fix:** Remove `tabIndex={-1}` from the static neighborhood cards:

```tsx
<Card
  key={neighborhood.name}
  className="border-t-[3px] border-t-amber p-6"
>
```

---

_Reviewed: 2026-04-10_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
