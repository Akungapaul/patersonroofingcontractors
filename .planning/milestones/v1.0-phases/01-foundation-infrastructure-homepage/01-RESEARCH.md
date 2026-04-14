# Phase 1: Foundation, Infrastructure & Homepage - Research

**Researched:** 2026-04-07
**Domain:** Next.js App Router greenfield setup, Tailwind CSS v4, SEO infrastructure, lead capture, trust design system
**Confidence:** HIGH

## Summary

Phase 1 is a greenfield build establishing the entire project foundation: Next.js 16 App Router with Tailwind CSS v4, a professional trust-themed design system (navy #1B2A4A + amber #D97706), reusable layout shell (sticky header, footer, navigation), lead capture system (click-to-call phone CTA + contact form with GoHighLevel webhook integration), SEO infrastructure (metadata API, sitemap, robots.txt, JSON-LD schema), and a fully functional homepage with all required sections.

The stack is well-documented and stable. Next.js 16.2.2 is current, Tailwind CSS v4.2.2 uses CSS-first configuration (no tailwind.config.js), and all packages are verified on npm. The primary technical considerations are: (1) Tailwind v4's `@theme` vs `@theme inline` distinction for CSS variable-based font integration with `next/font`, (2) the correct approach to SSG in App Router (automatic for pages without dynamic data, NOT `output: 'export'` since we need API routes), and (3) JSON-LD schema implementation using `schema-dts` types with the `dangerouslySetInnerHTML` pattern recommended by Next.js.

**Primary recommendation:** Initialize with `npx create-next-app@latest --yes`, then layer on the custom design system, layout components, and homepage sections following the exact decisions locked in CONTEXT.md.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Full-width image hero with dark overlay, headline, subheadline, phone number, and primary CTA button ("Get Free Estimate")
- **D-02:** Services-first section ordering: Hero > Services Grid > Why Choose Us (trust + stats) > Service Areas (municipalities) > Reviews/Testimonials > Emergency CTA Banner > SEO Content Section (~200-300 words) > Contact Form > Footer
- **D-03:** Services displayed as icon cards in a responsive 3-column grid (6-8 top services), 2-column on tablet, 1-column on mobile. Each card links to its service page.
- **D-04:** Service Areas displayed as a 4-column grid of clickable municipality cards, each showing city name and geographic cluster tag (Urban, Suburban, Highlands). Links to location pages.
- **D-05:** Sticky header: logo left, main nav center (Services dropdown, Locations dropdown, Guides, About, Contact), phone CTA button right. Hamburger menu on mobile with phone button always visible.
- **D-06:** Full 4-column footer: Col 1 logo + business description + phone, Col 2 services quick links, Col 3 service area municipality links, Col 4 contact info + business hours. Bottom bar: copyright + privacy/terms links.
- **D-07:** Emergency storm damage CTA as full-width accent-colored banner between Reviews and SEO Content sections. Urgent messaging + phone number + CTA button.
- **D-08:** 200-300 word SEO content section ("Why Passaic County Homeowners Choose Paterson Roofing") placed after Service Areas, before Contact Form.
- **D-09:** Primary brand color: Deep navy #1B2A4A
- **D-10:** Accent color: Amber/Gold #D97706
- **D-11:** Backgrounds: White (#FFFFFF) + light gray (#F8FAFC) alternating sections. Hero: navy overlay on image. Emergency banner: amber. Footer: deep navy.
- **D-12:** 10 color theme variations (all navy+amber) to be generated as HTML files for approval before implementation.
- **D-13:** Cards: subtle shadow (shadow-sm) + rounded-lg + white background. Hover: shadow-md + amber border accent + translate-y-1 lift with transition-all.
- **D-14:** Primary CTA buttons: solid amber (#D97706) background, white bold text, rounded-md. Hover: darker amber. Secondary CTAs: navy outline, navy text, amber fill on hover.
- **D-15:** Phone number in sticky header as amber CTA button with phone icon. Desktop shows full number "(973) 555-0100". Mobile shows shortened "Call" label. Click-to-call on all viewports.
- **D-16:** Contact form as inline section: form fields (name, phone, email, service type dropdown, message) on left, contact info + hours + service area note on right. Light gray or navy background.
- **D-17:** Form submits to Next.js API route (/api/contact), validates fields, then POSTs to GoHighLevel webhook URL. GHL webhook URL stored in environment variable. No email service needed.
- **D-18:** Post-submission: inline success message replaces form ("Thank You! We'll call you within 1 hour") with phone number fallback CTA. No page redirect.
- **D-19:** Full contact form (reusable component) rendered on every content page (homepage, locations, services, guides) at the bottom before footer.
- **D-20:** Subtle mid-page CTA bars between major homepage sections. Navy background, white text: "Need a roofing estimate? Call (973) 555-0100 or [Get Quote]"
- **D-21:** Generic industry trust badges: Licensed & Insured, Free Estimates, 24/7 Emergency, Satisfaction Guaranteed, Local Family Owned. Lucide icons, navy color, displayed as horizontal strip in "Why Choose Us" section.
- **D-22:** Static social proof counters (no animation): 15+ Years Experience, 2,500+ Projects Completed, 5-Star Rated, 16 Cities Served. All values stored in site-config.ts for easy renter updates.
- **D-23:** 3 realistic placeholder testimonials with first name + last initial, Passaic County city, 5-star rating, and generic roofing review text. All stored in data file for easy replacement with real reviews.
- **D-24:** Single site-config.ts file for all renter-swappable content: business name, phone number, business hours, reviews, stats, GHL webhook URL. One file to update on renter handoff.

### Claude's Discretion

- Image sourcing for hero section (stock, placeholder, or AI-generated)
- Exact service dropdown options in contact form
- Specific Lucide icon choices for trust badges and service cards
- SEO content section copywriting approach
- Mobile hamburger menu animation/behavior details

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FNDN-01 | Site uses Next.js App Router with SSG for all pages | Next.js 16.2.2 auto-SSG for pages without dynamic data; no `output: 'export'` needed since API routes are required |
| FNDN-02 | Site deploys to Vercel with automatic HTTPS and CDN | Vercel CLI + `vercel --prod` deployment; free tier sufficient |
| FNDN-03 | Tailwind CSS v4 design system with professional trust theme | Tailwind v4.2.2 CSS-first @theme config for navy/amber palette |
| FNDN-04 | Cormorant Garamond body text at 18px min, Cormorant headings | next/font/google with CSS variable integration into Tailwind v4 @theme inline |
| FNDN-05 | Mobile-responsive layout (mobile-first) | Tailwind responsive utilities (sm/md/lg/xl breakpoints) |
| FNDN-06 | Reusable page layout with sticky header, footer, navigation | App Router layout.tsx pattern with shared components |
| FNDN-07 | next/font loading for Cormorant and Cormorant Garamond | Self-hosted via next/font/google, zero layout shift |
| LEAD-01 | Prominent tracked phone number (click-to-call) on every page | Header component with tel: link, site-config.ts for number |
| LEAD-02 | Contact form on every page with required fields | Reusable ContactForm client component with controlled inputs |
| LEAD-03 | Contact form submits via API Route Handler | app/api/contact/route.ts POST handler forwarding to GHL webhook |
| LEAD-04 | Emergency roofing CTA on homepage | Emergency banner component between Reviews and SEO sections |
| LEAD-05 | Placeholder phone number via single config change | site-config.ts pattern for all renter-swappable content |
| TRUST-01 | Trust badges section on all pages | Reusable TrustBadges component with Lucide icons |
| TRUST-02 | Review/testimonial placeholder sections | Testimonials component reading from data file |
| TRUST-03 | CRO-optimized CTAs above fold, mid-page, bottom | Hero CTA, mid-page CTA bars (D-20), contact form section |
| TRUST-04 | Social proof elements (years, projects, rating) | Stats component reading from site-config.ts |
| TRUST-05 | Service area map showing Passaic County | Municipality grid with geographic cluster tags (D-04) |
| SEO-01 | Every page exports generateMetadata() | Next.js Metadata API with title template in root layout |
| SEO-02 | One H1 per page, strict heading hierarchy | Enforced in component design |
| SEO-03 | Canonical URL via alternates.canonical | Metadata API alternates.canonical property |
| SEO-04 | XML sitemap via app/sitemap.ts | Built-in MetadataRoute.Sitemap type |
| SEO-05 | robots.txt via app/robots.ts | Built-in MetadataRoute.Robots type |
| SEO-06 | Internal links use next/link | Enforced in all navigation and link components |
| SEO-07 | html element has lang="en" | Set on `<html>` element in root layout |
| SEO-08 | All images have descriptive alt text | next/image component requires alt prop |
| SEO-09 | Clean URL structure | App Router file-based routing matches defined slugs |
| SEO-10 | Page load under 2s LCP via SSG + image optimization | SSG + next/image + sharp + Vercel CDN |
| SCHEMA-01 | LocalBusiness JSON-LD on homepage | schema-dts RoofingContractor type (subtype of LocalBusiness) |
| SCHEMA-04 | BreadcrumbList JSON-LD on all pages | Reusable JsonLd component with BreadcrumbList type |
| SCHEMA-05 | Organization JSON-LD on homepage | schema-dts Organization type |
| SILO-01 | Topical map with Source Context, Central Entity defined | Data structure in site config reflecting topical hierarchy |
| SILO-05 | Navigation reflects topical hierarchy | Services dropdown, Locations dropdown in header (D-05) |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.2 | Full-stack React framework | SSG by default for static pages, API routes for form handling, built-in image/font/metadata optimization. Locked by project constraints. [VERIFIED: npm registry] |
| react | 19.2.4 | UI library | Ships with Next.js 16. Server Components reduce client JS bundle. [VERIFIED: npm registry] |
| react-dom | 19.2.4 | React DOM renderer | Required peer dependency of Next.js 16. [VERIFIED: npm registry] |
| typescript | 6.0.2 | Type safety | Default with create-next-app. Type-safe metadata, schema markup, route params. [VERIFIED: npm registry] |
| tailwindcss | 4.2.2 | Utility-first CSS | CSS-first config via @theme directive. No tailwind.config.js needed. [VERIFIED: npm registry] |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration | Required for Tailwind v4 + Next.js. Replaces old PostCSS plugin. [VERIFIED: npm registry] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | 2.0.0 | Schema.org TypeScript types | Type-safe JSON-LD for LocalBusiness, Organization, BreadcrumbList. Zero runtime cost. [VERIFIED: npm registry] |
| lucide-react | 1.7.0 | SVG icons | Tree-shakable icons for trust badges, service cards, navigation. [VERIFIED: npm registry] |
| clsx | 2.1.1 | Conditional class names | Toggling active states, responsive variants, conditional styling. [VERIFIED: npm registry] |
| tailwind-merge | 3.5.0 | Class conflict resolution | Resolving conflicting Tailwind classes in component composition. [VERIFIED: npm registry] |
| sharp | 0.34.5 | Image processing | Production image optimization for next/image. [VERIFIED: npm registry] |
| @vercel/analytics | 2.0.1 | Page analytics | Privacy-friendly analytics, no cookie banner needed. [VERIFIED: npm registry] |
| @vercel/speed-insights | 2.0.0 | Core Web Vitals | Real user performance monitoring. [VERIFIED: npm registry] |
| @next/third-parties | 16.2.2 | GTM integration | Google Tag Manager for future analytics needs. [VERIFIED: npm registry] |

### Dev Dependencies

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | 10.2.0 | Linting | Code quality enforcement. Next.js 16 uses ESLint directly (no next lint). [VERIFIED: npm registry] |
| eslint-config-next | 16.2.2 | Next.js ESLint rules | Next.js-specific lint rules. [VERIFIED: npm registry] |
| prettier | 3.8.1 | Code formatting | Consistent formatting across 100+ page files. [VERIFIED: npm registry] |
| prettier-plugin-tailwindcss | 0.7.2 | Tailwind class sorting | Automatic class ordering in consistent order. [VERIFIED: npm registry] |
| @types/node | latest | Node.js types | TypeScript type definitions. [VERIFIED: npm registry] |
| @types/react | latest | React types | TypeScript type definitions. [VERIFIED: npm registry] |
| @types/react-dom | latest | React DOM types | TypeScript type definitions. [VERIFIED: npm registry] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS | CSS Modules | More boilerplate for 100+ similar pages; Tailwind faster for utility-driven design |
| schema-dts | Manual JSON objects | Lose compile-time validation; risk invalid schema hurting SEO |
| lucide-react | react-icons | react-icons bundles entire icon sets; lucide is tree-shakable |
| clsx + tailwind-merge | just template literals | Lose proper class conflict resolution; fragile conditional styling |

**Installation:**

```bash
# Initialize project (creates Next.js 16 with TypeScript, Tailwind, ESLint, App Router)
npx create-next-app@latest patersonroofingcontractors --yes

# Additional production dependencies
npm install schema-dts lucide-react clsx tailwind-merge sharp @vercel/analytics @vercel/speed-insights @next/third-parties

# Additional dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

**Version note:** `create-next-app --yes` installs Next.js 16.2.2 with TypeScript 6.x, React 19.x, Tailwind CSS v4, ESLint 10.x, and `@tailwindcss/postcss` automatically. The `--yes` flag uses recommended defaults (TypeScript, Tailwind, ESLint, App Router, Turbopack). [VERIFIED: nextjs.org/docs/app/getting-started/installation]

## Architecture Patterns

### Recommended Project Structure

```
src/                          # (optional, create-next-app asks)
app/
  layout.tsx                 # Root layout: fonts, metadata template, analytics, body wrapper
  page.tsx                   # Homepage
  globals.css                # Tailwind @import + @theme config
  sitemap.ts                 # XML sitemap generation
  robots.ts                  # robots.txt generation
  api/
    contact/
      route.ts               # POST handler: validate + forward to GHL webhook
  (future phases)/
    roofing-contractor-[city]-nj/  # Location pages (Phase 2)
    services/[slug]/               # Service pages (Phase 3)
    roofing-guides/[slug]/         # Guide pages (Phase 3)
components/
  layout/
    Header.tsx               # Sticky header with nav dropdowns + phone CTA
    Footer.tsx               # 4-column footer with links
    MobileNav.tsx            # Hamburger menu (client component)
    Navigation.tsx           # Desktop nav with dropdowns
  sections/
    Hero.tsx                 # Full-width hero with overlay
    ServicesGrid.tsx          # 3-col service icon cards
    WhyChooseUs.tsx           # Trust badges + social proof stats
    ServiceAreas.tsx          # 4-col municipality grid
    Testimonials.tsx          # 3 placeholder reviews
    EmergencyCTA.tsx          # Storm damage banner
    SeoContent.tsx            # 200-300 word content section
    MidPageCTA.tsx            # Inline CTA bars between sections
  forms/
    ContactForm.tsx           # Reusable contact form (client component)
  ui/
    Button.tsx               # Primary/secondary CTA variants
    Card.tsx                 # Standard card with hover effect
    Badge.tsx                # Trust badge component
    StarRating.tsx           # 5-star display
  seo/
    JsonLd.tsx               # Reusable JSON-LD script renderer
    Breadcrumbs.tsx          # BreadcrumbList schema + visual breadcrumbs
lib/
  site-config.ts             # All renter-swappable content (D-24)
  cn.ts                      # clsx + tailwind-merge utility
  schemas.ts                 # JSON-LD schema builders (typed with schema-dts)
  navigation.ts              # Nav menu structure data
data/
  services.ts                # Service list with icons, slugs, descriptions
  municipalities.ts          # All 16 municipalities with clusters, populations
  testimonials.ts            # Placeholder reviews
public/
  images/                    # Hero image, OG image, etc.
```

### Pattern 1: CSS-First Tailwind v4 Theme Configuration

**What:** Define all design tokens in globals.css using `@theme` and `@theme inline` directives instead of tailwind.config.js.
**When to use:** All styling -- this replaces the entire tailwind.config.js approach from v3.

```css
/* app/globals.css */
/* Source: https://nextjs.org/docs/app/getting-started/css + https://tailwindcss.com/docs/theme */

@import "tailwindcss";

/* Static theme values -- use @theme (generates CSS custom properties) */
@theme {
  /* Brand Colors */
  --color-navy: #1B2A4A;
  --color-navy-light: #2A3F6A;
  --color-navy-dark: #111D35;
  --color-amber: #D97706;
  --color-amber-light: #F59E0B;
  --color-amber-dark: #B45309;
  --color-gray-light: #F8FAFC;

  /* Spacing */
  --spacing-section: 5rem;
  --spacing-section-sm: 3rem;

  /* Border Radius */
  --radius-card: 0.5rem;
  --radius-button: 0.375rem;
}

/* Font references use @theme inline because the CSS variables
   are injected at runtime by next/font on the HTML element */
@theme inline {
  --font-heading: var(--font-cormorant);
  --font-body: var(--font-cormorant-garamond);
}

@layer base {
  body {
    @apply font-body text-lg text-gray-900 antialiased;
    font-size: 18px; /* Enforces FNDN-04 minimum */
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

### Pattern 2: next/font Integration with Tailwind v4

**What:** Load Google Fonts via next/font, expose as CSS variables, reference in Tailwind @theme inline.
**When to use:** Root layout setup.

```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/app/getting-started/fonts

import { Cormorant, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"  // SEO-07
      className={`${cormorant.variable} ${cormorantGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 3: JSON-LD Schema with schema-dts

**What:** Type-safe JSON-LD structured data using schema-dts types, rendered as `<script>` tags in Server Components.
**When to use:** Every page that needs schema markup.

```typescript
// components/seo/JsonLd.tsx
// Source: https://nextjs.org/docs/app/guides/json-ld

import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Thing>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

```typescript
// lib/schemas.ts -- Schema builders
// Source: https://schema.org/RoofingContractor

import type { WithContext, LocalBusiness, Organization, BreadcrumbList } from 'schema-dts'
import { siteConfig } from './site-config'

export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: siteConfig.businessName,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paterson',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: siteConfig.municipalities.map(m => ({
      '@type': 'City' as const,
      name: m.name,
      containedInPlace: {
        '@type': 'AdministrativeArea' as const,
        name: 'Passaic County',
      },
    })),
    openingHoursSpecification: siteConfig.businessHours.map(h => ({
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
  }
}

export function buildOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.businessName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    logo: `${siteConfig.url}/images/logo.png`,
  }
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

### Pattern 4: Next.js Metadata API with Title Template

**What:** Composable metadata with title template in root layout, page-specific overrides.
**When to use:** Root layout + every page.

```typescript
// app/layout.tsx (metadata export)
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Paterson Roofing Contractors',
    default: 'Paterson Roofing Contractors | #1 Roofer in Passaic County NJ',
  },
  description: 'Professional roofing contractor serving all 16 municipalities in Passaic County, NJ. Free estimates, 24/7 emergency service. Call (973) 555-0100.',
  metadataBase: new URL('https://patersonroofingcontractors.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Paterson Roofing Contractors',
  },
}
```

### Pattern 5: API Route for Contact Form + GHL Webhook

**What:** Server-side form validation and webhook forwarding via Next.js Route Handler.
**When to use:** Contact form submission endpoint.

```typescript
// app/api/contact/route.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

import { NextRequest } from 'next/server'

interface ContactFormData {
  name: string
  phone: string
  email: string
  serviceType: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Server-side validation
    if (!body.name || !body.phone || !body.email) {
      return Response.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      )
    }

    // Forward to GoHighLevel webhook
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
    if (!ghlWebhookUrl) {
      console.error('GHL_WEBHOOK_URL not configured')
      return Response.json(
        { error: 'Form submission failed. Please call us directly.' },
        { status: 500 }
      )
    }

    const ghlResponse = await fetch(ghlWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.name.split(' ')[0],
        lastName: body.name.split(' ').slice(1).join(' '),
        phone: body.phone,
        email: body.email,
        source: 'Website Contact Form',
        tags: ['website-lead', body.serviceType],
        customField: {
          service_requested: body.serviceType,
          message: body.message,
        },
      }),
    })

    if (!ghlResponse.ok) {
      console.error('GHL webhook failed:', ghlResponse.status)
      return Response.json(
        { error: 'Submission failed. Please call us directly.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
```

### Pattern 6: Sitemap and Robots.txt

**What:** Built-in Next.js file conventions for SEO infrastructure.
**When to use:** Phase 1 initial setup; expanded in later phases as pages are added.

```typescript
// app/sitemap.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://patersonroofingcontractors.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Future phases will add location, service, guide pages here
  ]
}
```

```typescript
// app/robots.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://patersonroofingcontractors.com/sitemap.xml',
  }
}
```

### Pattern 7: cn() Utility Function

**What:** Composable class name utility combining clsx + tailwind-merge.
**When to use:** Every component that accepts className overrides or conditional classes.

```typescript
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Pattern 8: Site Config for Renter Handoff

**What:** Single source of truth for all business-specific content that changes when the site is rented.
**When to use:** Any component that displays business name, phone, hours, stats, or webhook URLs.

```typescript
// lib/site-config.ts
// Decision D-24: Single file for all renter-swappable content

export const siteConfig = {
  businessName: 'Paterson Roofing Contractors',
  phone: '(973) 555-0100',
  phoneRaw: '+19735550100',
  email: 'info@patersonroofingcontractors.com',
  url: 'https://patersonroofingcontractors.com',
  
  businessHours: [
    { day: 'Monday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Tuesday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Wednesday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Thursday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Friday' as const, opens: '07:00', closes: '18:00' },
    { day: 'Saturday' as const, opens: '08:00', closes: '14:00' },
    { day: 'Sunday' as const, opens: 'Closed', closes: 'Closed' },
  ],

  stats: {
    yearsExperience: '15+',
    projectsCompleted: '2,500+',
    rating: '5-Star',
    citiesServed: '16',
  },

  municipalities: [
    { name: 'Paterson', slug: 'paterson', type: 'City', cluster: 'Urban', population: 159732 },
    { name: 'Clifton', slug: 'clifton', type: 'City', cluster: 'Urban', population: 90296 },
    { name: 'Passaic', slug: 'passaic', type: 'City', cluster: 'Urban', population: 72290 },
    { name: 'Wayne', slug: 'wayne', type: 'Township', cluster: 'Suburban', population: 53665 },
    { name: 'West Milford', slug: 'west-milford', type: 'Township', cluster: 'Highlands', population: 25637 },
    { name: 'Hawthorne', slug: 'hawthorne', type: 'Borough', cluster: 'Suburban', population: 19457 },
    { name: 'Little Falls', slug: 'little-falls', type: 'Township', cluster: 'Suburban', population: 14886 },
    { name: 'Woodland Park', slug: 'woodland-park', type: 'Borough', cluster: 'Suburban', population: 13021 },
    { name: 'Ringwood', slug: 'ringwood', type: 'Borough', cluster: 'Highlands', population: 12229 },
    { name: 'Wanaque', slug: 'wanaque', type: 'Borough', cluster: 'Highlands', population: 12033 },
    { name: 'Pompton Lakes', slug: 'pompton-lakes', type: 'Borough', cluster: 'Suburban', population: 11276 },
    { name: 'Totowa', slug: 'totowa', type: 'Borough', cluster: 'Suburban', population: 11189 },
    { name: 'North Haledon', slug: 'north-haledon', type: 'Borough', cluster: 'Suburban', population: 8828 },
    { name: 'Haledon', slug: 'haledon', type: 'Borough', cluster: 'Urban', population: 8541 },
    { name: 'Bloomingdale', slug: 'bloomingdale', type: 'Borough', cluster: 'Highlands', population: 8255 },
    { name: 'Prospect Park', slug: 'prospect-park', type: 'Borough', cluster: 'Urban', population: 6372 },
  ],
} as const
```

### Anti-Patterns to Avoid

- **Using `output: 'export'` in next.config.ts:** This project needs API routes for form handling. Without `output: 'export'`, Next.js still pre-renders all static pages as HTML at build time. Pages without dynamic data are automatically SSG.
- **Installing `next-sitemap` or `next-seo`:** Both are deprecated/redundant. Next.js 16 has built-in sitemap.ts, robots.ts, and Metadata API. [CITED: CLAUDE.md Technology Stack]
- **Using `react-schemaorg` wrapper:** Unnecessary abstraction. Inline `<script type="application/ld+json">` in Server Components is the official Next.js recommendation. [CITED: nextjs.org/docs/app/guides/json-ld]
- **Creating tailwind.config.js/ts:** Tailwind v4 uses CSS-first config via `@theme` in globals.css. No JavaScript config file needed.
- **Using `'use client'` on pages:** Keep page.tsx as Server Components. Move interactivity (form state, mobile menu toggle) to dedicated client components imported by the server page.
- **Putting business data inline in components:** All renter-swappable content goes in site-config.ts (D-24). Components import from config, never hardcode business name, phone, etc.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class name merging | Custom class concatenation | `cn()` (clsx + tailwind-merge) | Tailwind class conflicts are subtle and hard to debug manually |
| Schema.org types | Manual JSON-LD objects | `schema-dts` WithContext types | Compile-time type checking catches invalid schema before it hurts SEO |
| Font loading | Manual @font-face rules | `next/font/google` | Self-hosting, zero CLS, automatic size-adjust, no FOUT |
| Image optimization | Manual responsive images | `next/image` + `sharp` | Automatic WebP/AVIF, responsive srcset, lazy loading, blur placeholders |
| XML sitemap | Manual XML generation | `app/sitemap.ts` | Built-in type-safe API, cached as Route Handler |
| robots.txt | Static text file | `app/robots.ts` | Programmatic, type-safe, easy to extend |
| Metadata/SEO tags | Manual `<head>` tags | Next.js Metadata API | Type-safe, composable, handles OG + canonical automatically |
| Form validation | Custom regex checks | Standard HTML5 validation + server-side checks | Browser-native, accessible, combined with API route validation |

**Key insight:** Next.js 16 has built-in solutions for nearly every SEO/infrastructure concern. The only external package needed for SEO is `schema-dts` (type-only, zero runtime).

## Common Pitfalls

### Pitfall 1: Tailwind v4 @theme vs @theme inline Confusion
**What goes wrong:** Custom fonts defined with `@theme` (not `@theme inline`) don't work because the CSS variables from `next/font` are injected at runtime on the HTML element, not as static values.
**Why it happens:** `@theme` embeds literal values into generated CSS. `@theme inline` leaves variable references intact, letting them resolve at runtime.
**How to avoid:** Use `@theme` for static values (colors, spacing). Use `@theme inline` for values that reference runtime CSS variables (fonts from next/font).
**Warning signs:** Font utility classes like `font-heading` produce no visible effect; inspecting CSS shows a hardcoded empty or wrong value.

### Pitfall 2: Contact Form Hydration Mismatch
**What goes wrong:** Contact form with `useState`/`useEffect` causes hydration errors if the parent page.tsx is a Server Component.
**Why it happens:** Form state management requires client-side JavaScript; mixing server and client incorrectly causes mismatches.
**How to avoid:** Create ContactForm as a separate file with `'use client'` directive. Import it into the Server Component page. The page itself stays as a Server Component.
**Warning signs:** Console errors about hydration mismatch, form not responding to input.

### Pitfall 3: Sticky Header Z-Index Conflicts
**What goes wrong:** Sticky header disappears behind other elements or dropdown menus get clipped.
**Why it happens:** Stacking context issues with overlapping fixed/sticky/relative positioned elements.
**How to avoid:** Set header to `z-50` minimum. Dropdown menus should be children of the header (inherit stacking context). Mobile overlay menu should be `z-40` or use a portal.
**Warning signs:** Header disappears when scrolling past certain sections; dropdown menus appear behind page content.

### Pitfall 4: Missing `metadataBase` Causes Relative URL Warnings
**What goes wrong:** Canonical URLs and OG images generate as relative paths instead of absolute URLs.
**Why it happens:** Next.js requires `metadataBase` in root layout to resolve relative URLs in metadata.
**How to avoid:** Set `metadataBase: new URL('https://patersonroofingcontractors.com')` in root layout metadata.
**Warning signs:** Build warnings about metadata URLs; OG debuggers show relative paths.

### Pitfall 5: GoHighLevel Webhook URL Exposed in Client Bundle
**What goes wrong:** GHL webhook URL leaks to the client, enabling spam submissions directly to the webhook.
**Why it happens:** Using `NEXT_PUBLIC_` prefix on the GHL webhook environment variable, or calling the webhook from client-side code.
**How to avoid:** Store as `GHL_WEBHOOK_URL` (server-only, no `NEXT_PUBLIC_` prefix). Only access in the API route handler (`app/api/contact/route.ts`). Client form submits to `/api/contact`, never directly to GHL.
**Warning signs:** Webhook URL visible in browser devtools network tab or JS bundle.

### Pitfall 6: Cormorant Garamond Below 18px on Mobile
**What goes wrong:** Tailwind's default `text-base` (16px) overrides the 18px minimum body font size requirement.
**Why it happens:** Default Tailwind typography scale starts at 16px; developer forgets to enforce minimum.
**How to avoid:** Set `font-size: 18px` in the base layer for `body`. Use `text-lg` (18px) as the minimum text class. Never use `text-sm` or `text-base` for body copy.
**Warning signs:** Lighthouse or manual review shows body text smaller than 18px.

### Pitfall 7: Hero Image Blocking LCP
**What goes wrong:** Large hero image causes LCP > 2 seconds, failing SEO-10.
**Why it happens:** Hero image is the LCP element; if not optimized or prioritized, it becomes the bottleneck.
**How to avoid:** Use `next/image` with `priority={true}` on the hero image (disables lazy loading, adds preload hint). Serve appropriately sized image (not 4000px wide for mobile). Use `placeholder="blur"` with a blurDataURL.
**Warning signs:** Lighthouse LCP metric > 2s; hero image loads visibly late.

### Pitfall 8: RoofingContractor Not a Direct Export from schema-dts
**What goes wrong:** Trying to import `RoofingContractor` as a type from schema-dts fails or doesn't provide the expected type.
**Why it happens:** `RoofingContractor` is a valid `@type` string value in Schema.org but may be represented as a string literal union in schema-dts, not a standalone exported type.
**How to avoid:** Use `WithContext<LocalBusiness>` as the type and set `'@type': 'RoofingContractor'` as the value. The `LocalBusiness` type in schema-dts accepts its subtypes as valid `@type` values.
**Warning signs:** TypeScript error on import; type doesn't include expected properties.

## Code Examples

### Contact Form Client Component

```typescript
// components/forms/ContactForm.tsx
'use client'

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/site-config'

const serviceOptions = [
  'Roof Repair',
  'Roof Replacement',
  'Roof Inspection',
  'Storm Damage Repair',
  'Flat Roof Services',
  'Gutter Installation',
  'Emergency Roofing',
  'Commercial Roofing',
  'Other',
]

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      serviceType: formData.get('serviceType') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const err = await res.json()
        setErrorMessage(err.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please call us directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('rounded-lg bg-green-50 p-8 text-center', className)}>
        <h3 className="mb-2 text-2xl font-bold text-navy">Thank You!</h3>
        <p className="text-lg">We'll call you within 1 hour.</p>
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="mt-4 inline-block rounded-md bg-amber px-6 py-3 font-bold text-white"
        >
          Call {siteConfig.phone} Now
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Form fields -- name, phone, email, serviceType dropdown, message textarea */}
      {/* Each with proper labels, required attributes, HTML5 validation */}
      {status === 'error' && (
        <p className="text-red-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-md bg-amber px-6 py-3 font-bold text-white hover:bg-amber-dark disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Get Free Estimate'}
      </button>
    </form>
  )
}
```

### Click-to-Call Phone Button

```typescript
// components/ui/PhoneButton.tsx (Server Component)
import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/cn'

export function PhoneButton({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 font-bold text-white transition-colors hover:bg-amber-dark',
        className
      )}
    >
      <Phone className="h-5 w-5" />
      {compact ? (
        <span className="sr-only sm:not-sr-only">{siteConfig.phone}</span>
      ) : (
        <span>{siteConfig.phone}</span>
      )}
      {compact && <span className="sm:hidden">Call</span>}
    </a>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme in CSS (Tailwind v4) | Jan 2024 (v4.0) | No JS config file; CSS-first; 70% smaller output [CITED: tailwindcss.com/blog/tailwindcss-v4] |
| next-sitemap package | Built-in app/sitemap.ts | Next.js 13.3+ | No external dependency; type-safe; cached as Route Handler [CITED: nextjs.org sitemap docs] |
| next-seo package | Built-in Metadata API | Next.js 13.2+ | No external dependency; composable; title templates [CITED: nextjs.org generateMetadata docs] |
| @tailwind base/components/utilities | @import "tailwindcss" | Tailwind v4 | Single import replaces three directives [CITED: tailwindcss.com/docs/theme] |
| next lint CLI | eslint CLI directly | Next.js 16 | next lint removed; use eslint with flat config + eslint-config-next [CITED: CLAUDE.md] |
| getStaticProps / getStaticPaths | generateStaticParams + default SSG | Next.js 13+ (App Router) | Pages without dynamic data auto-SSG; no explicit opt-in needed |
| react-schemaorg wrapper | Direct `<script>` tag with dangerouslySetInnerHTML | Next.js official recommendation | Simpler, no dependency, works in Server Components [CITED: nextjs.org/docs/app/guides/json-ld] |

**Deprecated/outdated:**
- `next-sitemap` (v4.2.3): Last published 3+ years ago. Use built-in `app/sitemap.ts`. [CITED: CLAUDE.md]
- `next-seo`: Redundant with Metadata API. [CITED: CLAUDE.md]
- `next lint`: Removed in Next.js 16. Use `eslint` directly. [CITED: CLAUDE.md]
- `@tailwind base; @tailwind components; @tailwind utilities;`: Replaced by `@import "tailwindcss"` in v4.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | GoHighLevel inbound webhook accepts arbitrary JSON POST payloads with fields like firstName, lastName, phone, email | Architecture Patterns (Pattern 5) | Contact form submissions would fail; would need to adjust payload format to match GHL's expected schema |
| A2 | Cormorant and Cormorant_Garamond are importable from next/font/google with the underscore naming convention | Architecture Patterns (Pattern 2) | Font loading would fail; would need to try alternative import name or use localFont |
| A3 | schema-dts 2.0.0 exports LocalBusiness, Organization, BreadcrumbList, and WithContext types | Architecture Patterns (Pattern 3) | Would need to check actual exports and potentially use different type names or older version |
| A4 | RoofingContractor is a valid @type value accepted by the LocalBusiness type in schema-dts | Common Pitfalls (Pitfall 8) | Would need to use 'LocalBusiness' as @type instead, losing specificity in structured data |
| A5 | Hero placeholder image can use next/image with a local file in /public/images/ for priority LCP optimization | Common Pitfalls (Pitfall 7) | If using external URL, would need different optimization approach |

## Open Questions

1. **Hero Image Source**
   - What we know: Decision D-01 specifies a full-width image hero with dark overlay. Claude has discretion on image sourcing.
   - What's unclear: Whether to use a stock photo, AI-generated image, or a solid color/gradient placeholder for initial build.
   - Recommendation: Use a high-quality stock photo of a residential roofing scene (Northeast suburban context). Store in `/public/images/hero.jpg`. Use `next/image` with `priority={true}` and `placeholder="blur"`. A free stock photo from Unsplash or Pexels is sufficient for initial build; renter can replace later.

2. **GoHighLevel Webhook URL Format**
   - What we know: GHL provides unique webhook URLs when you create an inbound webhook trigger in a workflow. The form submits to our API route which forwards to GHL.
   - What's unclear: Exact GHL URL format and expected payload schema until the user configures their GHL workspace.
   - Recommendation: Build the API route with configurable `GHL_WEBHOOK_URL` env var. Use standard contact fields (firstName, lastName, phone, email, source, tags). Add clear error handling and fallback messaging if webhook fails.

3. **Color Theme Variations (D-12)**
   - What we know: 10 color theme variations must be generated as HTML files for approval before implementation.
   - What's unclear: Whether these should be generated as part of Phase 1 implementation or as a pre-implementation step.
   - Recommendation: Generate the 10 HTML variation files as the first task in the plan, get approval, then proceed with implementation using the approved variation.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js framework | Yes | 25.4.0 | -- (exceeds minimum 20.9) |
| npm | Package management | Yes | 11.7.0 | -- |
| npx | create-next-app | Yes | (bundled with npm) | -- |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

All required tools are available. Node.js 25.4.0 exceeds the Next.js minimum of 20.9. The Vercel CLI is not pre-installed but will be installed as a dev dependency or used via `npx vercel`.

## Project Constraints (from CLAUDE.md)

The following directives from CLAUDE.md MUST be followed:

### Hard Requirements (Global)
- Use **Cormorant Garamond** (medium weight) for body text, **Cormorant** for headings
- Minimum body font size: **18px**
- Before applying any color theme, generate **10 variations as HTML files** for approval

### SEO Hard Requirements
- Every page must export `metadata` or `generateMetadata()` with `title`, `description`, and `openGraph`
- One `<h1>` per page -- headings follow strict hierarchy (h1 > h2 > h3, no skipping)
- All images have descriptive `alt` text -- not filenames, not empty unless decorative (`alt=""`)
- Canonical URL set via `alternates.canonical` in metadata on every page
- `<html lang="en">` on the root element
- Internal links use `next/link`, not raw `<a>` tags with full URLs

### QA Requirements
- Run browser verification after starting dev server and after major UI changes
- All forms and CTAs must be tested via browser automation before shipping
- Console must be free of errors and warnings on all pages
- Interactive elements must be verified as keyboard-navigable

### Design Standards
- `/frontend-design` skill for building pages, components, or any visual UI work
- `/react-best-practices` skill after editing React/TSX components
- `/tailwind-design-system` skill when setting up design tokens
- `/web-design-guidelines` skill to audit UI for accessibility and performance

## Sources

### Primary (HIGH confidence)
- [Next.js 16.2.2 Installation Docs](https://nextjs.org/docs/app/getting-started/installation) -- create-next-app defaults, --yes flag, project setup [VERIFIED: direct fetch]
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- recommended `<script>` tag pattern with dangerouslySetInnerHTML, schema-dts integration [VERIFIED: direct fetch]
- [Next.js Sitemap API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- MetadataRoute.Sitemap type, programmatic generation [VERIFIED: direct fetch]
- [Next.js Robots API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) -- MetadataRoute.Robots type, rules configuration [VERIFIED: direct fetch]
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) -- POST handler pattern, NextRequest, Response.json [VERIFIED: direct fetch]
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google, variable property, className application [VERIFIED: direct fetch]
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- title templates, alternates.canonical, openGraph [VERIFIED: direct fetch]
- [Next.js CSS / Tailwind Setup](https://nextjs.org/docs/app/getting-started/css) -- @tailwindcss/postcss, postcss.config.mjs, @import "tailwindcss" [VERIFIED: direct fetch]
- [npm registry](https://www.npmjs.com/) -- All package versions verified via `npm view` [VERIFIED: npm registry]

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- @theme directive, CSS-first config, custom colors [CITED: web search + official docs URL]
- [Tailwind v4 @theme vs @theme inline](https://github.com/tailwindlabs/tailwindcss/discussions/18560) -- runtime CSS variable handling [CITED: GitHub discussion]
- [Next.js + Tailwind v4 Custom Fonts](https://www.owolf.com/blog/how-to-use-custom-fonts-in-a-nextjs-15-tailwind-4-app) -- @theme inline for font variables pattern [CITED: web fetch, verified pattern]
- [Schema.org RoofingContractor](https://schema.org/RoofingContractor) -- RoofingContractor is subtype of LocalBusiness > HomeAndConstructionBusiness [CITED: web search]
- [GoHighLevel Inbound Webhook](https://help.gohighlevel.com/support/solutions/articles/155000003147-workflow-trigger-inbound-webhook) -- webhook trigger setup, JSON POST [CITED: web fetch]

### Tertiary (LOW confidence)
- GoHighLevel expected payload schema (firstName, lastName, phone, email, tags format) -- based on web search results and common webhook patterns, not verified against official API docs [ASSUMED: A1]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages verified on npm, versions confirmed, Next.js 16 docs directly fetched
- Architecture: HIGH -- patterns sourced from official Next.js and Tailwind docs; well-established conventions
- Pitfalls: HIGH -- based on documented v4 migration issues and known Next.js patterns
- GoHighLevel integration: MEDIUM -- webhook URL pattern confirmed, but exact payload schema is assumed

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable ecosystem, no major releases expected)
