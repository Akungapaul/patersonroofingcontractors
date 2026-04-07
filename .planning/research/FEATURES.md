# Feature Landscape

**Domain:** Rank-and-rent local service website (roofing, Passaic County NJ)
**Researched:** 2026-04-07

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile-responsive layout | 60%+ of local searches are mobile. Google mobile-first indexing. | Low | Tailwind responsive prefixes handle this. |
| Prominent phone number (click-to-call) | Roofing leads are phone-first. Users expect one-tap calling on mobile. | Low | Sticky header/footer with `tel:` link. |
| Contact form on every page | Not everyone calls. Form captures name, phone, email, message, service type. | Low | Server Component form + API Route Handler. |
| Service pages | Users search "[service] in [city]". Each service needs its own page. | Med | 67 service pages per PROJECT.md. Template-driven. |
| Location pages | Users search "roofing contractor [city] NJ". Each municipality needs a page. | Med | 16 location pages (1 anchor + 15). 3000+ words each. |
| Professional trust design | Roofing is a high-trust, high-cost purchase. Cheap design = no leads. | Med | Dark blues/grays, trust badges, testimonial sections. |
| Fast page load (<2s) | Core Web Vitals directly impact ranking. Users bounce on slow pages. | Low | SSG + Vercel CDN + image optimization handles this. |
| SSL/HTTPS | Google ranking factor. Users see "Not Secure" warning without it. | Low | Vercel provides automatic HTTPS. |
| XML sitemap | 100 pages need to be discovered and indexed efficiently. | Low | Built-in Next.js sitemap.ts. |
| robots.txt | Control crawl budget, prevent indexing of utility pages. | Low | Built-in Next.js robots.ts. |
| Canonical URLs | Prevent duplicate content issues across similar location/service pages. | Low | Next.js Metadata API `alternates.canonical`. |
| Schema markup (LocalBusiness) | Rich snippets in search results increase CTR. Google expects structured data for local businesses. | Med | JSON-LD with schema-dts types. |
| Open Graph meta tags | Social sharing previews. Even if not actively shared, establishes professionalism. | Low | Next.js `generateMetadata()` with `openGraph`. |
| Privacy Policy + Terms | Legal requirement. Google quality raters check for this. | Low | Static pages with standard legal text. |
| About page | Establishes E-E-A-T (Experience, Expertise, Authoritativeness, Trust). Google quality signal. | Low | Company story, team, certifications. |

## Differentiators

Features that set the site apart from competitor roofing websites. Not expected but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Geographic content angles | 4 distinct content clusters (Dense Urban, NJ Highlands, Suburban Corridor, Commercial) make each location page genuinely unique. Competitors use cookie-cutter templates. | Med | Requires thoughtful content architecture. Key to 90%+ uniqueness. |
| FAQ schema per page | Earns FAQ rich snippets in Google. Local roofing competitors rarely implement this. | Low | JSON-LD FAQ schema on service and location pages. |
| BreadcrumbList schema | Shows page hierarchy in search results. Improves CTR and helps Google understand site structure. | Low | JSON-LD on all pages reflecting silo structure. |
| Service area map | Visual representation of coverage area builds trust and local relevance. | Med | Static image or embedded map of Passaic County. |
| Internal linking silo structure | Topical authority signals. Location pages link to relevant services, services link back to locations. | Med | Programmatic internal linking based on silo architecture. |
| Speed-optimized images with AVIF | Faster than competitors still serving JPEG. Better CWV scores. | Low | next/image with AVIF priority. |
| Emergency roofing CTA | Storm damage leads are highest value. Prominent emergency call-to-action converts urgent searches. | Low | Sticky banner or hero section element. |
| Trust badges section | License numbers, insurance badges, warranty logos, BBB-style ratings. Builds trust without real reviews. | Low | Component with badge images. Content is placeholder until renter provides. |
| Review/testimonial placeholders | Social proof section ready for renter's real reviews. Even placeholder "5-star rated" signals matter. | Low | Designed section, content swapped when rented. |

## Anti-Features

Features to explicitly NOT build. These add complexity without improving ranking or conversion.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Blog/news section | Content maintenance burden. Evergreen service/location pages are higher ROI for rank-and-rent. | Focus all content effort on 100 core pages. |
| Online booking/scheduling | Adds complexity (calendar integration, availability management). Renter manages their own scheduling. | Phone + form lead capture. Renter handles scheduling. |
| Live chat widget | Requires someone to respond. Adds third-party JS bloat. Hurts page speed. | Phone for urgent. Form for async. Both are sufficient. |
| User accounts/login | No use case for visitor accounts on a lead gen site. | None needed. |
| Payment processing | This is lead gen, not e-commerce. | Renter handles all payments directly with customers. |
| CMS/admin panel | Over-engineering for a site with static content. Content changes are infrequent. | Edit code directly. Content is authored once and rarely changes. |
| Multi-language | English-only market for v1. Spanish would be a v2 consideration given 42.7% Hispanic population. | `lang="en"` on html element. Revisit after ranking. |
| Animated hero videos | Hurts page speed. Roofing customers want info, not entertainment. | High-quality static hero images with optimized loading. |
| Third-party review widgets (Yelp, Google) | External JS bloat, API rate limits, requires actual business listing (rank-and-rent may not have one). | Static testimonial section with placeholder content. |

## Feature Dependencies

```
Phone number + CallRail DNI  -->  GTM integration  -->  @next/third-parties
Contact form  -->  API Route Handler  -->  Email forwarding
Location pages  -->  Schema markup (LocalBusiness)  -->  schema-dts types
Service pages  -->  Schema markup (Service)  -->  schema-dts types
All pages  -->  Metadata API (title, desc, OG)  -->  generateMetadata()
All pages  -->  Breadcrumb schema  -->  URL hierarchy
Sitemap  -->  All page routes defined  -->  app/sitemap.ts
Internal linking silo  -->  Topical map complete  -->  Link component system
Trust design  -->  Font loading (Cormorant)  -->  next/font/google
```

## MVP Recommendation

**Phase 1 -- Prioritize (ship first):**
1. Homepage with full trust design, phone CTA, contact form
2. Anchor city page (Paterson) -- highest search volume, proves content quality
3. Core site infrastructure (layout, nav, footer, metadata, sitemap, robots.txt)
4. Schema markup system (LocalBusiness, BreadcrumbList)
5. Contact form with API Route Handler

**Phase 2 -- Scale:**
1. Remaining 15 location pages with geographic content angles
2. Top 20 service pages (highest search volume services first)
3. Internal linking silo structure
4. FAQ schema on all location and service pages

**Phase 3 -- Complete:**
1. Remaining 47 service pages
2. 10 guide pages
3. Utility pages (About, Contact, Service Area, Privacy, Terms)
4. CRO optimization pass (CTA placement, trust signals, conversion elements)

**Defer indefinitely:** Blog, chat, booking, CMS, multi-language.

## Sources

- [Rank and Rent SEO Guide 2026 - Diggity Marketing](https://diggitymarketing.com/rank-and-rent/) -- rank-and-rent best practices
- [Rank and Rent Side Hustle 2025 - CMO Eugene](https://www.cmoeugene.com/rank-rent-side-hustle-in-2025/) -- lead capture patterns
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) -- built-in SEO features
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data) -- schema markup requirements
- PROJECT.md requirements list -- validated feature set
