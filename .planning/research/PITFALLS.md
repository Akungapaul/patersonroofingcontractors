# Domain Pitfalls

**Domain:** Rank-and-rent local service website (roofing, Passaic County NJ)
**Researched:** 2026-04-07

## Critical Pitfalls

Mistakes that cause rewrites, ranking loss, or major issues.

### Pitfall 1: Thin/Duplicate Content Across Location Pages
**What goes wrong:** All 16 location pages use the same template with only the city name swapped. Google detects near-duplicate content, deindexes or consolidates pages, destroying the site's ability to rank for individual city keywords.
**Why it happens:** Laziness or over-reliance on AI content generation with minimal customization. Each page looks like `s/Paterson/Clifton/g`.
**Consequences:** Google Panda penalty. Pages drop from index. Site fails to rank for any location keyword. The entire business model collapses.
**Prevention:**
- 4 geographic content angles (Dense Urban, NJ Highlands, Suburban Corridor, Commercial) provide genuinely different framing per cluster
- Each location page must reference specific local landmarks, neighborhoods, weather patterns, building characteristics
- Population, housing stock data, and local roofing challenges must differ per page
- Target 90%+ uniqueness score across all pages (check with Copyscape or similar)
**Detection:** Run duplicate content analysis before launch. Compare any two location pages -- if >30% text overlap, rewrite.

### Pitfall 2: Keyword Cannibalization Between Location and Service Pages
**What goes wrong:** A service page for "roof repair" and a location page for "roofing contractor Clifton NJ" both target similar keywords. Google doesn't know which to rank, so neither ranks well.
**Why it happens:** No clear topical separation between page types. Service pages mention locations. Location pages detail individual services extensively.
**Consequences:** Both pages lose ranking potential. Search traffic splits between pages instead of consolidating authority.
**Prevention:**
- **Location pages** target: "[roofing/roofer/roofing contractor] [city] NJ" -- broad roofing intent + location
- **Service pages** target: "[specific service]" (e.g., "roof leak repair", "TPO roofing") -- service-specific intent, location-agnostic
- Internal links connect them: location pages link to service pages, service pages link back to location pages
- Use `hreflang` or canonical if any overlap detected
**Detection:** Search Google for `site:patersonroofingcontractors.com [keyword]`. If two pages appear for the same keyword, there's cannibalization.

### Pitfall 3: Missing or Incorrect Schema Markup
**What goes wrong:** Schema markup has errors (missing required fields, wrong @type, invalid nesting). Google silently ignores it. No rich snippets appear. Worse: a manual action if schema is misleading.
**Why it happens:** Schema is JSON that's easy to get wrong without type checking. Copy-paste from other sites often has errors.
**Consequences:** Lost rich snippet opportunities (FAQ dropdowns, star ratings, business info in search results). Potential manual action for spammy/misleading schema.
**Prevention:**
- Use `schema-dts` for compile-time type checking -- TypeScript will catch invalid schema
- Test every page's schema with Google Rich Results Test before launch
- Use `RoofingContractor` as @type (it's a valid Schema.org type, subclass of HomeAndConstructionBusiness)
- Never add fake reviews or ratings to schema (manual action risk)
**Detection:** Google Search Console structured data report. Google Rich Results Test for individual pages.

### Pitfall 4: Broken Internal Linking Silo
**What goes wrong:** Internal links are inconsistent, orphaned pages exist, or the silo structure has cross-contamination that dilutes topical authority.
**Why it happens:** Manual link management across 100 pages is error-prone. New pages get added without updating related pages' links.
**Consequences:** Google can't understand site structure. Crawl budget wasted. Topical authority signals weakened. Pages don't rank as well as they should.
**Prevention:**
- Programmatic internal linking: location pages auto-link to their relevant service pages based on data relationships
- Use a link audit script that checks all internal links resolve, every page has at least 3 internal links pointing to it, no orphaned pages exist
- Breadcrumb navigation on every page reinforces hierarchy
- Sitemap includes all pages
**Detection:** Run a site crawl tool (Screaming Frog or similar). Check for orphaned pages, broken links, thin link counts.

### Pitfall 5: Poor Core Web Vitals from Unoptimized Images
**What goes wrong:** Hero images are large JPEGs, no lazy loading, no responsive sizing. LCP (Largest Contentful Paint) exceeds 2.5s. Page speed tanks rankings.
**Why it happens:** Developers use `<img>` instead of `next/image`, or serve oversized images without responsive `sizes` attribute.
**Consequences:** Failed Core Web Vitals. Google ranks competitors with faster pages higher. Users bounce on slow pages, especially mobile.
**Prevention:**
- ALWAYS use `next/image` -- never raw `<img>` tags
- Set `priority` on above-fold hero images (disables lazy loading for LCP image)
- Configure `sizes` attribute to prevent oversized image downloads
- Enable AVIF format in `next.config.ts`
- Use blur placeholders for perceived performance
**Detection:** Lighthouse audit, Vercel Speed Insights, Google PageSpeed Insights.

## Moderate Pitfalls

### Pitfall 1: Contact Form Without Server-Side Validation
**What goes wrong:** Client-side validation only. Bots or malicious users submit garbage data, fill up email inbox, or exploit the API endpoint.
**Prevention:**
- Server-side validation in `app/api/contact/route.ts` (check required fields, email format, message length)
- Rate limiting on the API route (e.g., max 5 submissions per IP per hour)
- Honeypot field (hidden input that bots fill but humans don't) instead of CAPTCHA (CAPTCHAs hurt conversion rate)

### Pitfall 2: Hardcoded Phone Numbers Scattered Across Components
**What goes wrong:** Phone number appears in Header, Footer, Hero, CTA sections. When the site is rented and the number changes, some instances get missed.
**Prevention:**
- Single source of truth: `SITE.phone` constant in `src/lib/constants.ts`
- All components import from constants
- CallRail DNI handles dynamic swapping at runtime

### Pitfall 3: Missing `alt` Text on Images
**What goes wrong:** Images lack descriptive alt text. Screen readers can't describe them. Google Image search doesn't index them. Accessibility audit fails.
**Prevention:**
- Every `next/image` component must have a descriptive `alt` prop
- Alt text should describe the image content in context: "Roof repair technician inspecting storm damage on a colonial home in Wayne, NJ" -- not "roof-repair.jpg"
- Decorative images use `alt=""`

### Pitfall 4: 404 Errors from URL Typos
**What goes wrong:** URL structure uses city names with special cases (e.g., "west-milford" vs "westmilford"). Users or backlinks use wrong format. Broken URLs return 404.
**Prevention:**
- Consistent slug format: `kebab-case` for all city names
- Custom `not-found.tsx` with helpful messaging and navigation
- Redirect map for common misspellings if needed

### Pitfall 5: Next.js 16 ESLint Migration Confusion
**What goes wrong:** Developers expect `next lint` to work (removed in Next.js 16). ESLint flat config format is unfamiliar. Linting breaks or gets skipped.
**Prevention:**
- Set up ESLint with flat config from day one
- Add `"lint": "eslint ."` to package.json scripts
- Include `eslint-config-next` for Next.js-specific rules
- Don't rely on `next lint` -- it no longer exists

### Pitfall 6: Forgetting `generateStaticParams` for Dynamic Routes
**What goes wrong:** Dynamic route pages (`[city]`, `[slug]`) are server-rendered on every request instead of pre-built as static pages. Slower TTFB, higher Vercel costs.
**Prevention:**
- Every dynamic route page must export `generateStaticParams()`
- This tells Next.js to pre-render all pages at build time (SSG)
- Verify with `next build` output -- all dynamic pages should show as "Static"

## Minor Pitfalls

### Pitfall 1: Inconsistent Heading Hierarchy
**What goes wrong:** Page has multiple H1s, or jumps from H2 to H4 skipping H3. Hurts SEO and accessibility.
**Prevention:** Enforce one H1 per page (the page title). Strict H1 > H2 > H3 hierarchy. Create heading components that enforce this.

### Pitfall 2: Missing Canonical on Paginated or Filtered Views
**What goes wrong:** If URL parameters are added (utm_source, etc.), Google may index parameterized URLs as separate pages.
**Prevention:** Set canonical URL on every page via `alternates.canonical` in metadata. Canonical should always be the clean URL without parameters.

### Pitfall 3: Forgetting robots.txt Disallow for API Routes
**What goes wrong:** Google tries to crawl `/api/contact` and other API routes. Wastes crawl budget on non-content endpoints.
**Prevention:** `robots.ts` should disallow `/api/` path.

### Pitfall 4: Over-Optimized Anchor Text
**What goes wrong:** Every internal link uses exact-match keywords ("roofing contractor Clifton NJ"). Google sees this as manipulative.
**Prevention:** Vary anchor text naturally. Use branded anchors, partial matches, and natural phrases alongside keyword-rich anchors.

### Pitfall 5: Not Setting Up Proper Error Pages
**What goes wrong:** Default Next.js error pages look unprofessional. Users who hit a 404 leave the site instead of navigating to relevant content.
**Prevention:** Custom `not-found.tsx` and `error.tsx` with brand styling, search suggestions, and links to popular pages.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup | ESLint flat config with Next.js 16 | Follow Next.js 16 upgrade guide for ESLint setup |
| Design system | Font loading performance | Use `next/font/google` with `display: 'swap'` and proper subsets |
| Homepage | Hero image LCP | Set `priority` on hero image, use AVIF format |
| Anchor city page | Content quality/length | Target 3000+ words of genuinely unique, locally-relevant content |
| Location pages | Duplicate content | Use 4 geographic content angles, verify 90%+ uniqueness |
| Service pages | Keyword cannibalization | Clear topical separation from location pages |
| Schema markup | Invalid JSON-LD | Use schema-dts types, test with Rich Results Test |
| Internal linking | Orphaned pages | Programmatic link generation, crawl audit before launch |
| Contact form | Bot submissions | Honeypot field, rate limiting, server-side validation |
| Launch | Missing pages in sitemap | Verify sitemap.xml includes all 100 pages |
| Post-launch | Core Web Vitals regression | Monitor with Vercel Speed Insights, set performance budgets |

## Sources

- [Google Search Central - Duplicate Content](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) -- Google's guidance on duplicate content
- [Google Search Central - Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) -- schema markup policies
- [web.dev Core Web Vitals](https://web.dev/articles/vitals) -- performance thresholds
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image) -- next/image best practices
- [Next.js Upgrading to v16](https://nextjs.org/docs/app/guides/upgrading/version-16) -- ESLint changes
- [Diggity Marketing - Rank and Rent](https://diggitymarketing.com/rank-and-rent/) -- common rank-and-rent mistakes
