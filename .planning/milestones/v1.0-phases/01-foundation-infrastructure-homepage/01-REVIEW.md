---
phase: 01-foundation-infrastructure-homepage
reviewed: 2026-04-08T00:00:00Z
depth: standard
files_reviewed: 31
files_reviewed_list:
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - app/sitemap.ts
  - app/robots.ts
  - app/api/contact/route.ts
  - lib/cn.ts
  - lib/site-config.ts
  - lib/schemas.ts
  - lib/navigation.ts
  - data/services.ts
  - data/municipalities.ts
  - data/testimonials.ts
  - components/seo/JsonLd.tsx
  - components/seo/Breadcrumbs.tsx
  - components/ui/Button.tsx
  - components/ui/Card.tsx
  - components/ui/Badge.tsx
  - components/ui/StarRating.tsx
  - components/ui/PhoneButton.tsx
  - components/layout/Header.tsx
  - components/layout/Footer.tsx
  - components/layout/Navigation.tsx
  - components/layout/MobileNav.tsx
  - components/forms/ContactForm.tsx
  - components/sections/Hero.tsx
  - components/sections/ServicesGrid.tsx
  - components/sections/WhyChooseUs.tsx
  - components/sections/ServiceAreas.tsx
  - components/sections/Testimonials.tsx
  - components/sections/EmergencyCTA.tsx
  - components/sections/SeoContent.tsx
  - components/sections/MidPageCTA.tsx
findings:
  critical: 1
  high: 4
  medium: 6
  low: 5
  total: 16
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-04-08
**Depth:** standard
**Files Reviewed:** 31
**Status:** issues_found

## Summary

This phase establishes the foundation: Next.js App Router layout, homepage sections, a contact API route, SEO infrastructure, and the full component library. The overall code quality is high — TypeScript is used consistently, accessibility patterns are thoughtful (skip link, aria labels, 44px touch targets), and the Next.js conventions are well followed.

There are no catastrophic issues, but one critical security gap exists in the API route: the `GHL_WEBHOOK_URL` environment variable is forwarded to an external service without any validation that it resolves to a trusted host. Additional high-severity issues include missing rate limiting on the public API endpoint, an unvalidated user-controlled `serviceType` being forwarded directly to the webhook, a broken keyboard navigation pattern on the desktop dropdown menu, and a hydration risk in `Footer.tsx` from `new Date()` called during render. Six medium issues round out the report — all fixable with minor changes.

---

## Critical Issues

### CR-01: GHL Webhook URL Is Not Validated — SSRF Risk

**File:** `app/api/contact/route.ts:41`

**Issue:** The `GHL_WEBHOOK_URL` environment variable is fetched without any validation that it points to a known, trusted host. If this variable is misconfigured (typo, compromised deployment environment, or future operator error), the server will blindly `fetch()` an arbitrary URL with user-supplied PII (name, phone, email). This is a Server-Side Request Forgery (SSRF) surface: an attacker who can influence the env var — or who misconfigures it to an internal address — causes the server to exfiltrate contact data to an unintended endpoint. Even without an active attacker, the current code will silently forward real lead data to the wrong destination if the var is set incorrectly.

**Fix:** Validate the URL against an allowlist of known GoHighLevel domains before making the request.

```typescript
const ALLOWED_GHL_HOSTS = ['services.leadconnectorhq.com', 'app.gohighlevel.com']

const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
if (!ghlWebhookUrl) {
  // ... existing missing-var check
}

let parsedUrl: URL
try {
  parsedUrl = new URL(ghlWebhookUrl)
} catch {
  console.error('GHL_WEBHOOK_URL is not a valid URL')
  return Response.json({ error: 'Form submission failed. Please call us directly at (973) 555-0100.' }, { status: 500 })
}

if (!ALLOWED_GHL_HOSTS.includes(parsedUrl.hostname)) {
  console.error('GHL_WEBHOOK_URL points to a disallowed host:', parsedUrl.hostname)
  return Response.json({ error: 'Form submission failed. Please call us directly at (973) 555-0100.' }, { status: 500 })
}
```

---

## High Severity Issues

### HI-01: No Rate Limiting on Public Contact API Route

**File:** `app/api/contact/route.ts:11`

**Issue:** The `/api/contact` POST endpoint has no rate limiting. Any client can submit unlimited requests, enabling spam flooding of the GHL webhook, potential abuse of third-party API quotas, and denial-of-service against the webhook endpoint. Since this endpoint forwards directly to GoHighLevel — an external CRM with per-contact costs — unbounded submissions translate directly to financial and operational risk.

**Fix:** Add IP-based rate limiting using `@upstash/ratelimit` with `@upstash/redis` (the current Vercel-recommended Redis integration — provision via `vercel integration add upstash`):

```typescript
// Install: npm install @upstash/ratelimit @upstash/redis
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // reads UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN from env
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 submissions per minute per IP
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  if (!success) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }
  // ... rest of handler
}
```

As a simpler stopgap before adding a Redis dependency, add this route to `middleware.ts` using Next.js middleware rate limiting patterns.

### HI-02: User-Controlled `serviceType` Forwarded to Webhook Without Allowlist Validation

**File:** `app/api/contact/route.ts:50`

**Issue:** The `serviceType` field is sent directly from the client to the GHL webhook as both a tag and a custom field value, with no server-side validation that it matches one of the expected service options. A malicious client can submit any arbitrary string as `serviceType`, injecting unexpected values into the CRM (e.g., extremely long strings, control characters, or values designed to manipulate CRM automations/tags). The comment on line 15 correctly notes "never trust client-side validation alone" — but this field lacks the server-side counterpart that the required fields have.

**Fix:** Validate `serviceType` against the known options before forwarding:

```typescript
const VALID_SERVICE_TYPES = [
  'Roof Repair', 'Roof Replacement', 'Roof Inspection',
  'Storm Damage Repair', 'Flat Roof Services', 'Gutter Installation',
  'Emergency Roofing', 'Commercial Roofing', 'Other', ''
] as const

// In the handler, after the required-field check:
if (body.serviceType && !VALID_SERVICE_TYPES.includes(body.serviceType as typeof VALID_SERVICE_TYPES[number])) {
  return Response.json({ error: 'Invalid service type selected.' }, { status: 400 })
}
```

### HI-03: Desktop Dropdown Navigation Is Not Keyboard Accessible

**File:** `components/layout/Navigation.tsx:26-64`

**Issue:** The desktop dropdown menus use CSS `group-hover` visibility only. There is no keyboard interaction: pressing Enter or Space on a parent nav link navigates to the parent page rather than opening the dropdown, and there is no way to Tab into the submenu items. The `role="menu"` and `role="menuitem"` attributes are present (lines 51, 57), which is correct semantically, but the menu is never exposed to keyboard or assistive technology users because it only appears on mouse hover. This violates WCAG 2.1 SC 2.1.1 (Keyboard) and SC 2.4.3 (Focus Order). For a lead-gen site where the Locations submenu lists all 16 service-area links, this is a material accessibility failure.

**Fix:** Convert the desktop dropdown to a controlled component with `useState` that toggles on `click` (and closes on Escape/outside-click), or use a proper accessible disclosure pattern. The mobile nav (`MobileNav.tsx`) already implements the correct pattern with `aria-expanded` and toggle-on-click — replicate that approach for desktop. At minimum, add keyboard event handlers:

```tsx
// Promote to a client component and use useState for isOpen
<li key={item.label} className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    aria-expanded={isOpen}
    aria-haspopup="true"
    className="inline-flex min-h-[44px] items-center gap-1 ..."
  >
    {item.label}
    <ChevronDown ... />
  </button>
  {isOpen && (
    <div role="menu" ...>
      {children.map(...)}
    </div>
  )}
</li>
```

### HI-04: Hydration Mismatch Risk in Footer — `new Date()` Called at Render Time

**File:** `components/layout/Footer.tsx:128`

**Issue:** `new Date().getFullYear()` is called inline during render in the footer copyright line. Because `Footer` is a Server Component, this runs at build/request time on the server. If the site is statically generated (which is the intent), the year is baked in at build time and will be stale until the next deployment — a minor content issue. More critically, if this component is ever rendered on the client side (e.g., moved inside a `'use client'` boundary, or if Partial Prerendering causes client re-render), the server-rendered year and client-rendered year can diverge, causing a React hydration mismatch that degrades performance and may cause layout flicker.

**Fix:** Either (a) export the year from a server-only constant, (b) use a static value for the build year, or (c) suppress hydration on just this element with `suppressHydrationWarning`:

```tsx
// Option A: Suppress hydration warning on just the year span (cleanest)
<p>
  &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span>{' '}
  {siteConfig.businessName}. All rights reserved.
</p>

// Option B: Hard-code if SSG and annual redeploy is acceptable
const CURRENT_YEAR = 2026
```

---

## Medium Severity Issues

### ME-01: `message` and `serviceType` Fields Have No Length Limits

**File:** `app/api/contact/route.ts:13-21`

**Issue:** The API route validates presence of name, phone, and email, but imposes no maximum length on any field. `message` in particular is a `<textarea>` with no `maxlength` attribute on the client (`ContactForm.tsx:182`) and no server-side length check. A client can POST a message field of arbitrary size (e.g., 10MB), which the server will parse into memory, log on error, and forward to GoHighLevel. This enables denial-of-service via memory exhaustion and may hit GHL payload limits silently.

**Fix:** Add length validation server-side and set `maxLength` on the textarea client-side:

```typescript
// In route.ts, after trim checks:
const MAX_LENGTHS = { name: 100, phone: 20, email: 254, serviceType: 100, message: 2000 }
for (const [field, max] of Object.entries(MAX_LENGTHS)) {
  const value = body[field as keyof ContactFormData] ?? ''
  if (value.length > max) {
    return Response.json({ error: `${field} is too long.` }, { status: 400 })
  }
}
```

```tsx
// In ContactForm.tsx textarea:
<textarea maxLength={2000} ... />
```

### ME-02: Error Message From API Is Rendered Unescaped in DOM

**File:** `components/forms/ContactForm.tsx:192-194`

**Issue:** The error message displayed to the user (`errorMessage`) is populated from `err.error` — the JSON body of the API error response (line 56). If the API ever returns an error message containing HTML special characters or if the error source changes, the content is rendered via React's JSX which does escape by default. However, the `errorMessage` state is initialized from `err.error || 'Something went wrong.'` without any sanitization, and the component renders it as `{errorMessage}`. While React JSX escapes string interpolation, this pattern creates a fragile dependency on the API always returning safe strings. More concretely: the error message from `res.json()` is not type-checked — `err` is typed as `any`, and `err.error` could be any value including objects that render as `[object Object]`, arrays, or other unexpected types.

**Fix:** Narrow the type of `err.error` before using it:

```typescript
const err = await res.json()
const message = typeof err?.error === 'string' ? err.error : 'Something went wrong. Please try again.'
setErrorMessage(message)
```

### ME-03: `ContactForm` — All Fields Get Error Border on Any Validation Failure

**File:** `components/forms/ContactForm.tsx:103, 124, 144`

**Issue:** The error styling (`border-red-600`) is applied to the name, phone, and email inputs whenever `status === 'error'`, regardless of which field caused the error. If the email format check fails, the name and phone inputs also get red borders — misleading the user about which field to correct. This is a UX/logic error that will confuse users and reduce form conversion rates.

**Fix:** Track per-field error state rather than a global status:

```typescript
const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({})

// On API error response, map error messages to specific fields
// or use per-field validation before submit
```

At minimum, only apply error borders on submit attempt after client-side field validation, and clear a field's error state on change.

### ME-04: `Navigation.tsx` Is a Server Component That Renders Dynamic Location Children Without Memoization

**File:** `components/layout/Navigation.tsx:15-21`

**Issue:** The `Navigation` component computes `siteConfig.municipalities.map(...)` on every render to build the Locations submenu child list. Since this component is imported by `Header.tsx` which is a `'use client'` component, `Navigation` is actually rendered in a client context despite having no `'use client'` directive. This means the municipality mapping runs on the client on every render cycle. While the data is constant and `siteConfig` is `as const`, the array is recreated on each render pass. With 16 municipalities this is negligible overhead, but the pattern also exists identically in `MobileNav.tsx` (line 92-96), creating two duplicate derivation sites that must be kept in sync.

**Fix:** Extract the computed Locations children to a shared constant in `lib/navigation.ts` or `data/municipalities.ts` so it's computed once at module load time:

```typescript
// In lib/navigation.ts, add:
export const locationNavItems = siteConfig.municipalities.map((m) => ({
  label: m.name,
  href: `/roofing-contractor-${m.slug}-nj`,
}))
```

Then import and use `locationNavItems` in both `Navigation.tsx` and `MobileNav.tsx`.

### ME-05: `StarRating` Accepts Any `number` But Rendering Assumes Integer 0-5

**File:** `components/ui/StarRating.tsx:9`

**Issue:** The `rating` prop is typed as `number` with no validation. The component renders `i < rating` to decide which stars are filled. If `rating` is `4.5`, `NaN`, negative, or greater than 5, the output is wrong: `4.5` would render 4 filled stars with no indication of the half-star, `NaN` would render all empty stars silently, and a value like `6` would produce 5 filled stars (since `i < 6` is always true for `i` in 0-4) but only by accident. The `testimonials.ts` data always uses integers so this is not a current bug, but the component contract is not enforced.

**Fix:** Add a runtime guard or restrict the type:

```typescript
type StarRatingValue = 1 | 2 | 3 | 4 | 5

interface StarRatingProps {
  rating: StarRatingValue
  className?: string
}

// Or add a runtime clamp:
const clampedRating = Math.min(5, Math.max(0, Math.round(rating)))
```

### ME-06: `ContactForm` Uses `noValidate` But Provides No Accessible Error Announcements for Screen Readers

**File:** `components/forms/ContactForm.tsx:85`

**Issue:** The form sets `noValidate` (disabling native browser validation), which means validation happens only via the `status === 'error'` display path. The error paragraph has `role="alert"` (line 192) which is good — it will be announced by screen readers. However, there is no `aria-describedby` linking individual fields to their error state, and there is no `aria-invalid="true"` set on fields when they fail validation. A screen reader user who navigates back to the name field after a submission error will not be informed that the field is in error. Combined with the ME-03 issue (all fields get red borders indiscriminately), this creates a poor experience for keyboard/AT users.

**Fix:** Add `aria-invalid` and `aria-describedby` dynamically:

```tsx
<input
  id="contact-name"
  name="name"
  aria-invalid={status === 'error' ? 'true' : undefined}
  aria-describedby={status === 'error' ? 'form-error' : undefined}
  ...
/>
// On the error paragraph:
<p id="form-error" role="alert" ...>{errorMessage}</p>
```

---

## Low Severity Issues

### LO-01: `siteConfig.businessHours` Uses `'Closed'` as a Time String — Type Is Misleading

**File:** `lib/site-config.ts:15`

**Issue:** Sunday's hours are `{ opens: 'Closed', closes: 'Closed' }`. The type of `opens` and `closes` is inferred as a union of `'07:00' | '08:00' | ... | 'Closed'`. The `schemas.ts` filter at line 29 (`filter((h) => h.opens !== 'Closed')`) correctly excludes Sunday, but any future consumer of this data must remember to handle the `'Closed'` sentinel. This is a stringly-typed sentinel value where a more explicit structure would be clearer and less fragile.

**Fix:** Use an optional/null pattern or a discriminated union:

```typescript
type BusinessHour =
  | { day: DayName; opens: string; closes: string; closed?: false }
  | { day: DayName; closed: true; opens?: never; closes?: never }
```

Or at minimum document the sentinel pattern with a JSDoc comment:

```typescript
// Note: 'Closed' is a sentinel string for days with no business hours.
// Always filter with `h.opens !== 'Closed'` before using opens/closes as time values.
```

### LO-02: `Testimonials.tsx` Uses `t.name` as React Key — Names Are Not Guaranteed Unique

**File:** `components/sections/Testimonials.tsx:14`

**Issue:** The testimonials list uses `t.name` as the React `key`. If two testimonials ever share a first name (e.g., two customers named "Michael T."), React will produce a duplicate key warning and potentially mis-render. This is not a current bug since the data has 3 unique names, but `slug` or array index would be more robust keys.

**Fix:** Use array index or add a unique `id` field to the `Testimonial` type:

```tsx
{testimonials.map((t, index) => (
  <Card key={index} ...>
```

Or add `id: string` to the `Testimonial` type and use `key={t.id}`.

### LO-03: `PhoneButton` Compact Mode Has Redundant Screen-Reader Text

**File:** `components/ui/PhoneButton.tsx:20-26`

**Issue:** In compact mode, the button renders three elements: `<span className="sm:hidden">Call</span>`, `<span className="hidden sm:inline">{phone}</span>`, and `<span className="sr-only">Call {phone}</span>`. The `sr-only` span always announces "Call (973) 555-0100" to screen readers, but the second span with the phone number is visible on sm+ screens and is also readable by screen readers (it is not `aria-hidden`). A screen reader user on a large screen will hear "Call (973) 555-0100" twice — once from the visible number span, once from the sr-only span.

**Fix:** Add `aria-hidden="true"` to the visible spans in compact mode:

```tsx
{compact ? (
  <>
    <span className="sm:hidden" aria-hidden="true">Call</span>
    <span className="hidden sm:inline" aria-hidden="true">{siteConfig.phone}</span>
    <span className="sr-only">Call {siteConfig.phone}</span>
  </>
) : (
  <span>{siteConfig.phone}</span>
)}
```

### LO-04: `app/sitemap.ts` Only Includes the Homepage — Will Never Be Complete

**File:** `app/sitemap.ts:3`

**Issue:** The sitemap currently returns only the homepage URL. This is presumably a Phase 01 placeholder, but it means that if the site is deployed before additional pages are added, search engines will receive an incomplete sitemap signal. The comment in the file does not note this as intentional or temporary. Additionally, `lastModified: new Date()` will always return the current request time rather than an actual last-modified date, which can cause Googlebot to re-crawl the page unnecessarily.

**Fix:** For now, add a `// TODO: expand to include location, service, and guide URLs in Phase 02` comment so this isn't overlooked. For `lastModified`, use a static date or the build time:

```typescript
lastModified: new Date('2026-04-08'), // Update with actual modification date
```

### LO-05: `app/page.tsx` — Canonical URL Set to `'/'` Instead of Absolute URL

**File:** `app/page.tsx:23`

**Issue:** The canonical `alternates.canonical` is set to `'/'`. Next.js resolves this relative to `metadataBase` (set in `layout.tsx` to `https://patersonroofingcontractors.com`), so the output canonical tag should be correct. However, it is also set to `'/'` in `layout.tsx:33` for the layout-level canonical. Setting a canonical in both the layout and the page metadata is redundant — the page-level metadata should take precedence, but this is an implicit behavior. For clarity and to avoid confusion when adding other pages, prefer absolute URLs or remove the layout-level canonical (which applies to all pages that don't override it).

**Fix:** Remove the `alternates.canonical` from `layout.tsx` default metadata (it will be set per-page) or make both consistent:

```typescript
// In layout.tsx metadata: remove alternates.canonical from default
// (each page should set its own canonical)

// In page.tsx: keep canonical explicitly as absolute
alternates: {
  canonical: 'https://patersonroofingcontractors.com',
},
```

---

## What Is Done Well

- **Security defaults are solid.** The API route correctly validates required fields server-side, returns generic error messages to clients (no stack traces), logs detailed errors server-only, and keeps the webhook URL server-side via env var. The `robots.ts` correctly disallows `/api/`.
- **JsonLd XSS protection.** `JsonLd.tsx` replaces `<` with `\u003c` in the serialized JSON — the correct defense against script injection via JSON-LD.
- **Accessibility foundations.** Skip-to-content link, `aria-label` on all navigation landmarks, `aria-expanded` on accordion controls, `aria-hidden` on decorative icons, 44px minimum touch targets, `role="alert"` on form errors — these are all present and correct.
- **TypeScript type safety.** `schema-dts` is used for schema objects, `as const` is applied to data arrays, component props are fully typed, and no `any` types appear in the reviewed files.
- **Next.js conventions.** Server Components are used by default, `'use client'` is applied only where state/effects are needed (Header, MobileNav, ContactForm), `next/link` is used for all internal navigation, `next/font` is used for fonts, and `next/image` would be used for images (none yet in scope).
- **`siteConfig` as single source of truth.** Phone number, business name, municipalities, and hours all derive from one module — no duplication across components.

---

_Reviewed: 2026-04-08_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
