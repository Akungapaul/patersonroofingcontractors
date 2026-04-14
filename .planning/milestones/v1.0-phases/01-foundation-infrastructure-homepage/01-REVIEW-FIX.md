---
phase: 01-foundation-infrastructure-homepage
fixed_at: 2026-04-09T00:00:00Z
review_path: .planning/phases/01-foundation-infrastructure-homepage/01-REVIEW.md
iteration: 1
findings_in_scope: 5
fixed: 5
skipped: 0
status: all_fixed
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-04-09
**Source review:** .planning/phases/01-foundation-infrastructure-homepage/01-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 5 (1 Critical, 4 High)
- Fixed: 5
- Skipped: 0

## Fixed Issues

### CR-01: GHL Webhook URL Is Not Validated -- SSRF Risk

**Files modified:** `app/api/contact/route.ts`
**Commit:** 1290d23
**Applied fix:** Added an `ALLOWED_GHL_HOSTS` allowlist containing `services.leadconnectorhq.com` and `app.gohighlevel.com`. The webhook URL from `process.env.GHL_WEBHOOK_URL` is now parsed with `new URL()` and its hostname is validated against the allowlist before any fetch is made. Invalid URLs and disallowed hosts return a 500 error with a generic user-facing message and a server-side console error for debugging.

### HI-01: No Rate Limiting on Public Contact API Route

**Files modified:** `app/api/contact/route.ts`
**Commit:** 023d7c8
**Applied fix:** Added an in-memory IP-based rate limiter (5 requests per 60-second sliding window per IP). The `isRateLimited()` function uses a `Map` keyed by IP address extracted from the `x-forwarded-for` header. Requests exceeding the limit receive a 429 response. Includes a code comment noting that for multi-instance deployments, this should be replaced with `@upstash/ratelimit` + `@upstash/redis` for distributed rate limiting.

### HI-02: User-Controlled `serviceType` Forwarded to Webhook Without Allowlist Validation

**Files modified:** `app/api/contact/route.ts`
**Commit:** 1290d23 (committed alongside CR-01 as both are in the same file)
**Applied fix:** Added a `VALID_SERVICE_TYPES` constant array containing the 8 known service types plus `'Other'` and empty string. The handler now validates `body.serviceType` against this allowlist before forwarding to the GHL webhook, returning a 400 error for unrecognized values.

### HI-03: Desktop Dropdown Navigation Is Not Keyboard Accessible

**Files modified:** `components/layout/Navigation.tsx`
**Commit:** ebbbe87
**Applied fix:** Converted `Navigation` from a server component with CSS-only `group-hover` dropdowns to a `'use client'` component with proper keyboard accessibility. Changes include: (1) replaced `<Link>` parent with `<button>` toggle using `useState` for open/close state, (2) added `aria-expanded` and `aria-haspopup="true"` attributes, (3) added Escape key handler to close the menu, (4) added click-outside detection to close the menu, (5) added `onClick={closeMenu}` on menu items for navigation cleanup. This follows the same accessible disclosure pattern already used in `MobileNav.tsx`.

### HI-04: Hydration Mismatch Risk in Footer -- `new Date()` Called at Render Time

**Files modified:** `components/layout/Footer.tsx`
**Commit:** c6471ed
**Applied fix:** Wrapped `{new Date().getFullYear()}` in a `<span suppressHydrationWarning>` element. This prevents React hydration mismatch warnings if the server-rendered year and client-rendered year ever diverge (e.g., around midnight on New Year's Eve or if the component enters a client rendering context). The fix is scoped to just the year span, not the entire paragraph.

---

_Fixed: 2026-04-09_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
