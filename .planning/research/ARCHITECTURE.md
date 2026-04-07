# Architecture Patterns

**Domain:** Rank-and-rent local service website (roofing, Passaic County NJ)
**Researched:** 2026-04-07

## Recommended Architecture

**Pattern:** Static Site Generation (SSG) with template-driven page generation

This is a content-heavy, read-only site with ~100 pages that change infrequently. SSG pre-renders all pages at build time. Vercel CDN serves them at edge locations. No database, no server runtime for page serving.

### High-Level Architecture

```
[Browser] --> [Vercel CDN/Edge] --> [Pre-rendered HTML + Assets]
                                         |
                                    [next/image CDN]
                                    (on-demand optimization)

[Contact Form] --> [API Route] --> [Email Service]
[CallRail DNI] --> [GTM] --> [Phone Number Swap]
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Root Layout (`app/layout.tsx`) | HTML shell, fonts, analytics, GTM, global nav/footer | All page components |
| Homepage (`app/page.tsx`) | Hero, service overview, area map, trust signals, CTA | Layout, shared components |
| Location Pages (`app/roofing-contractor-[city]-nj/page.tsx`) | 3000+ word city-specific roofing content, local schema | Layout, schema utils, content data |
| Service Pages (`app/services/[slug]/page.tsx`) | Service-specific content, related locations, CTA | Layout, schema utils, content data |
| Guide Pages (`app/roofing-guides/[slug]/page.tsx`) | Educational roofing content, internal links to services | Layout, content data |
| Contact API (`app/api/contact/route.ts`) | Form submission handling, email forwarding | Email service (external) |
| Sitemap (`app/sitemap.ts`) | XML sitemap generation from all routes | Content data (page list) |
| Robots (`app/robots.ts`) | Crawl directives | None |
| Schema Utils (`src/lib/schema.ts`) | Type-safe JSON-LD generation for all schema types | schema-dts types |
| Content Data (`src/data/`) | Static data for locations, services, guides | Page components |

### Directory Structure

```
src/
  app/
    layout.tsx                          # Root layout (fonts, analytics, nav, footer)
    page.tsx                            # Homepage
    sitemap.ts                          # Dynamic sitemap generation
    robots.ts                           # robots.txt generation
    not-found.tsx                       # Custom 404
    roofing-contractor-paterson-nj/
      page.tsx                          # Anchor city page
    roofing-contractor-[city]-nj/
      page.tsx                          # Location pages (15 cities)
    services/
      [slug]/
        page.tsx                        # Service pages (67 services)
    roofing-guides/
      [slug]/
        page.tsx                        # Guide pages (10 guides)
    about/
      page.tsx                          # About page
    contact/
      page.tsx                          # Contact page
    service-area/
      page.tsx                          # Service area overview
    privacy-policy/
      page.tsx                          # Privacy policy
    terms/
      page.tsx                          # Terms of service
    api/
      contact/
        route.ts                        # Contact form handler
  components/
    layout/
      Header.tsx                        # Site header with nav and phone CTA
      Footer.tsx                        # Site footer with links and contact
      Navigation.tsx                    # Main navigation
      MobileMenu.tsx                    # Mobile hamburger menu ('use client')
      Breadcrumbs.tsx                   # Breadcrumb navigation
    ui/
      Button.tsx                        # CTA button variants
      Card.tsx                          # Service/feature cards
      Badge.tsx                         # Trust badges, labels
      Container.tsx                     # Max-width wrapper
      Section.tsx                       # Page section wrapper
    forms/
      ContactForm.tsx                   # Lead capture form ('use client')
      PhoneNumber.tsx                   # Click-to-call phone display
    sections/
      Hero.tsx                          # Hero section with CTA
      ServiceGrid.tsx                   # Service listing grid
      TrustSignals.tsx                  # Trust badges, warranties
      TestimonialSection.tsx            # Review/testimonial display
      CTABanner.tsx                     # Call-to-action banner
      FAQSection.tsx                    # FAQ accordion
      AreaMap.tsx                       # Service area visualization
    seo/
      JsonLd.tsx                        # Generic JSON-LD wrapper
      LocalBusinessSchema.tsx           # LocalBusiness schema component
      ServiceSchema.tsx                 # Service schema component
      FAQSchema.tsx                     # FAQ schema component
      BreadcrumbSchema.tsx              # BreadcrumbList schema component
  lib/
    utils.ts                            # cn() utility, helpers
    schema.ts                           # Schema generation functions
    metadata.ts                         # Shared metadata generation helpers
    constants.ts                        # Site-wide constants (phone, address, etc.)
  data/
    locations.ts                        # Municipality data (name, slug, pop, angle, content)
    services.ts                         # Service data (name, slug, description, related)
    guides.ts                           # Guide data (title, slug, description)
    navigation.ts                       # Nav menu structure
  types/
    index.ts                            # Shared TypeScript types
public/
  images/
    hero/                               # Hero images (optimized at build)
    services/                           # Service category images
    trust-badges/                       # License, insurance, warranty badges
    locations/                          # City-specific images
  favicon.ico
  apple-touch-icon.png
```

### Data Flow

**Page rendering (build time):**
```
Content Data (src/data/*.ts)
  --> Page Component (Server Component)
    --> generateStaticParams() produces all slugs
    --> generateMetadata() produces SEO metadata
    --> Component renders HTML with data
      --> Schema components inject JSON-LD
      --> next/image optimizes images
  --> Static HTML output cached on Vercel CDN
```

**Contact form submission (runtime):**
```
User fills form (ContactForm.tsx - Client Component)
  --> Client-side validation
  --> fetch POST to /api/contact
  --> API Route validates input
  --> Sends email via Resend/Nodemailer
  --> Returns success/error response
  --> Client shows confirmation/error
```

**Phone tracking (runtime):**
```
Page loads with static placeholder phone number
  --> GTM loads CallRail DNI script
  --> DNI detects traffic source
  --> Swaps displayed phone number dynamically
  --> Calls are tracked and attributed
```

## Patterns to Follow

### Pattern 1: Template-Driven Page Generation
**What:** Define data structures for locations/services, use `generateStaticParams()` to create all pages from a single template.
**When:** Any time you have multiple pages with the same structure but different content (location pages, service pages).
**Why:** Ensures consistency, reduces code duplication, makes it easy to add new pages.

```typescript
// src/data/locations.ts
export const locations = [
  {
    slug: 'clifton',
    name: 'Clifton',
    state: 'NJ',
    population: 90296,
    type: 'City',
    contentAngle: 'dense-urban',
    // ... more data
  },
  // ... 14 more
] as const satisfies Location[]

// app/roofing-contractor-[city]-nj/page.tsx
export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const location = locations.find(l => l.slug === params.city)
  return {
    title: `Roofing Contractor ${location.name}, NJ | Paterson Roofing Contractors`,
    description: `...`,
    alternates: { canonical: `https://patersonroofingcontractors.com/roofing-contractor-${location.slug}-nj` },
  }
}
```

### Pattern 2: Schema Component Composition
**What:** Create reusable schema components that accept typed props and render JSON-LD.
**When:** Every page that needs structured data.
**Why:** Centralized schema logic, type-safe with schema-dts, easy to audit.

```typescript
// src/components/seo/LocalBusinessSchema.tsx
import type { WithContext, RoofingContractor } from 'schema-dts'

export function LocalBusinessSchema({ location }: { location: Location }) {
  const schema: WithContext<RoofingContractor> = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: 'Paterson Roofing Contractors',
    telephone: PHONE_NUMBER,
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: { '@type': 'State', name: 'New Jersey' },
    },
    // ...
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Pattern 3: Server Components by Default, Client Components at Boundary
**What:** Keep everything as Server Components. Only add `'use client'` at the smallest possible boundary.
**When:** Always. This is the default React 19 / Next.js 16 mental model.
**Why:** Less client-side JS = faster page loads = better CWV = better ranking.

**Client component boundaries for this project:**
- `ContactForm.tsx` -- needs form state, validation, submission
- `MobileMenu.tsx` -- needs toggle state for hamburger menu
- `FAQSection.tsx` -- needs accordion open/close state (if interactive)
- Phone number component if using client-side DNI swap

Everything else stays as Server Components.

### Pattern 4: Centralized Constants
**What:** All site-wide values (phone number, business name, address, service area) in one file.
**When:** Any value used across multiple pages or components.
**Why:** When the site is rented, only `constants.ts` needs updating for basic customization.

```typescript
// src/lib/constants.ts
export const SITE = {
  name: 'Paterson Roofing Contractors',
  phone: '(973) 555-0100', // Placeholder -- swap with CallRail number
  domain: 'patersonroofingcontractors.com',
  url: 'https://patersonroofingcontractors.com',
  county: 'Passaic County',
  state: 'NJ',
  description: 'Professional roofing contractor serving Passaic County, NJ.',
} as const
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side Data Fetching for Static Content
**What:** Using `useEffect` + `fetch` or React Query to load page content.
**Why bad:** Adds loading spinners, hurts SEO (content not in initial HTML), increases client JS bundle.
**Instead:** All content data is imported at build time in Server Components. No API calls for page content.

### Anti-Pattern 2: Shared Layout with Dynamic Content
**What:** Putting location-specific content in the root layout based on URL.
**Why bad:** Root layout is shared and cached. Dynamic content in layout causes hydration mismatches.
**Instead:** Location-specific content goes in page.tsx. Layout contains only truly global elements (nav, footer, analytics).

### Anti-Pattern 3: One Giant Page Component
**What:** 3000+ words of JSX in a single page.tsx file.
**Why bad:** Unmaintainable, hard to update, impossible to review.
**Instead:** Break into section components (Hero, Services, FAQ, etc.) composed in page.tsx. Content data separate from presentation.

### Anti-Pattern 4: Duplicate Schema Across Pages
**What:** Copy-pasting JSON-LD schema objects in each page.
**Why bad:** Schema errors propagate. Updates require changing 100+ files.
**Instead:** Schema generation functions in `src/lib/schema.ts` that accept data and return typed schema objects.

### Anti-Pattern 5: String Concatenation for URLs
**What:** Manually building URLs with template literals across the codebase.
**Why bad:** Inconsistent URL formats, easy to break canonical URLs, hard to audit.
**Instead:** URL helper functions in `src/lib/utils.ts` that generate URLs from slugs.

```typescript
export function locationUrl(slug: string): string {
  return `/roofing-contractor-${slug}-nj`
}

export function serviceUrl(slug: string): string {
  return `/services/${slug}`
}
```

## Scalability Considerations

| Concern | At Launch (100 pages) | At Scale (500+ pages) | Notes |
|---------|----------------------|----------------------|-------|
| Build time | <60s on Vercel | 2-5 min | Use `generateSitemaps()` to split sitemap if >50K URLs |
| CDN cost | Free tier (sufficient) | Still free tier likely | Static sites use minimal bandwidth |
| Image optimization | On-demand via Vercel | On-demand via Vercel | Vercel handles image CDN at scale |
| Content management | Edit TypeScript data files | Consider headless CMS | CMS only needed if scaling to many rank-and-rent sites |
| Form submissions | Email forwarding | Need a form service (Resend) | High volume may need rate limiting |

## Sources

- [Next.js App Router Docs](https://nextjs.org/docs/app) -- routing, layouts, metadata conventions
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- static page generation
- [React Server Components](https://react.dev/reference/rsc/server-components) -- RSC mental model
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- schema implementation pattern
- [Vercel Deployment Docs](https://vercel.com/docs) -- CDN, edge, image optimization
