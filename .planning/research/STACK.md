# Technology Stack

**Project:** Paterson Roofing Contractors (Rank-and-Rent)
**Researched:** 2026-04-07

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.2.x | Full-stack React framework | SSG/ISR for SEO performance, built-in image optimization, sitemap generation, metadata API, font optimization. The project is ~100 static pages -- Next.js App Router with SSG is the optimal choice for fast TTFB and crawlability. Already specified in PROJECT.md constraints. | HIGH |
| TypeScript | 5.x | Type safety | Default with create-next-app. Type-safe schema markup, route params, and metadata generation prevent bugs across 100+ pages. | HIGH |
| React | 19.x | UI library | Ships with Next.js 16. Server Components reduce client JS bundle -- critical for Core Web Vitals on a lead gen site. | HIGH |

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first config (no tailwind.config.js), automatic content detection, 70% smaller production CSS than v3. Ideal for rapid page development across 100 similar-structure pages. | HIGH |
| @tailwindcss/postcss | 4.x | PostCSS integration | Required for Tailwind v4 + Next.js integration. Replaces the old tailwindcss package as PostCSS plugin. | HIGH |
| clsx | 2.x | Conditional class names | Lightweight utility for conditional class toggling on components (e.g., active nav states, CTA variants). | HIGH |
| tailwind-merge | 2.x | Class conflict resolution | Resolves Tailwind class conflicts when composing components. Combined with clsx in a `cn()` utility function. | HIGH |

### Fonts

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/font/google | (built-in) | Font loading | Self-hosts Google Fonts at build time -- zero layout shift, no external requests to Google, automatic `size-adjust`. Required by project constraints: Cormorant Garamond (medium, 18px min body) and Cormorant (headings). | HIGH |

**Font configuration:**
- `Cormorant_Garamond` -- body text, weight 500 (medium), subsets: ['latin']
- `Cormorant` -- headings, weights 400-700, subsets: ['latin']
- Both are available as variable fonts (weight axis 300-700) on Google Fonts

### Images

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/image | (built-in) | Image optimization | Automatic WebP/AVIF conversion, responsive srcset, lazy loading, blur placeholders. Reduces image payload 60-80%. Critical for page speed on image-heavy roofing pages. | HIGH |
| sharp | latest | Production image processing | Vercel auto-installs sharp, but include as dependency for local dev consistency. Significantly faster than default squoosh. | HIGH |

**Image format config in next.config.ts:**
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
}
```

### SEO and Structured Data

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js Metadata API | (built-in) | Title, description, OG tags | `generateMetadata()` per page/layout. Type-safe, composable, handles canonical URLs. No third-party package needed. | HIGH |
| Next.js Sitemap API | (built-in) | XML sitemap generation | `app/sitemap.ts` exports URL array. Supports `generateSitemaps()` for splitting. No need for deprecated `next-sitemap` package (last updated 3 years ago). | HIGH |
| schema-dts | 1.x | Schema.org TypeScript types | Google-maintained, type-only package (zero runtime cost). 100k+ weekly downloads. Provides compile-time validation for LocalBusiness, Service, FAQ, BreadcrumbList schemas. | HIGH |

**Do NOT use:**
- `next-sitemap` -- abandoned (last publish 3+ years ago, v4.2.3). Next.js has built-in sitemap generation.
- `next-seo` -- redundant with Next.js Metadata API (built-in since Next.js 13.2).
- `react-schemaorg` -- unnecessary wrapper. Inline `<script type="application/ld+json">` in Server Components is simpler and the official Next.js recommendation.

**Schema markup approach (no extra dependency):**
```typescript
// In any Server Component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      // ... typed with schema-dts
    } satisfies WithContext<RoofingContractor>)
  }}
/>
```

### Analytics and Tracking

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @vercel/analytics | 2.x | Page view analytics | Free on Vercel, privacy-friendly, no cookie banner needed. v2 adds resilient intake for better data collection. | HIGH |
| @vercel/speed-insights | 2.x | Core Web Vitals monitoring | Real user performance data. Critical for a site competing on page speed. v2 released March 2026. | HIGH |
| @next/third-parties | 16.x | Google Tag Manager | Official Next.js package for GTM integration. Loads GTM optimally without blocking render. Version tracks Next.js releases. | HIGH |

**Analytics strategy:**
1. Vercel Analytics for baseline traffic monitoring (free tier sufficient)
2. Google Tag Manager via `@next/third-parties` for conversion tracking, Google Ads pixels
3. Speed Insights for ongoing Core Web Vitals monitoring

### Lead Capture

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| CallRail | (external service) | Call tracking | Industry standard for rank-and-rent. Dynamic Number Insertion (DNI) swaps displayed phone number per traffic source. Easy to transfer tracking when site is rented. ~$45/mo starter plan. | MEDIUM |

**Implementation approach:**
- Placeholder phone number in code (e.g., `(973) 555-0100`)
- CallRail DNI script injected via GTM -- swaps number dynamically
- Contact forms submit to Next.js API Route Handler (`app/api/contact/route.ts`)
- Form submissions forwarded via email (no database needed for MVP)

**Do NOT use:**
- Complex CRM integrations -- overkill for rank-and-rent MVP
- Third-party form builders (Typeform, JotForm) -- adds external dependency, slower load, brand dilution

### Icons

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| lucide-react | 1.7.x | SVG icons | Tree-shakable (only imported icons in bundle), TypeScript support, clean design, actively maintained. Fork of Feather Icons with 1500+ icons. | HIGH |

### Code Quality

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ESLint | 9.x | Linting | Next.js 16 removes `next lint` -- use ESLint directly with flat config. `eslint-config-next` provides Next.js-specific rules. | HIGH |
| Prettier | 3.8.x | Code formatting | Opinionated formatter. Use `prettier-plugin-tailwindcss` for automatic class sorting. | HIGH |
| prettier-plugin-tailwindcss | latest | Tailwind class ordering | Auto-sorts Tailwind classes in consistent order. Reduces diff noise and enforces conventions across 100+ page files. | HIGH |

### Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel | (platform) | Hosting and CDN | Optimal for Next.js (same company). Free tier handles rank-and-rent traffic volumes. Automatic HTTPS, edge CDN, image optimization CDN, preview deployments. Already specified in PROJECT.md constraints. | HIGH |
| Vercel CLI | latest | Deployment tooling | `vercel deploy` for previews, `vercel --prod` for production. | HIGH |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro 5.x | Astro is excellent for static sites, but Next.js provides ISR for content updates, API routes for form handling, and the project already specifies Next.js. |
| Framework | Next.js 16 | WordPress + Rank Math | WordPress is common for rank-and-rent, but slower page speed, security vulnerabilities, hosting complexity. Next.js SSG on Vercel delivers superior Core Web Vitals. |
| CSS | Tailwind CSS 4 | CSS Modules | Tailwind is faster for building 100+ similar pages with consistent design tokens. CSS Modules would require more boilerplate. |
| Icons | lucide-react | react-icons | react-icons bundles entire icon sets. lucide-react is fully tree-shakable. |
| Icons | lucide-react | heroicons | Heroicons has fewer icons. Lucide has better coverage for service/trade industry iconography. |
| Sitemap | Built-in Next.js | next-sitemap | next-sitemap is abandoned (no updates in 3+ years). Built-in API is simpler and maintained. |
| Analytics | Vercel Analytics | Google Analytics 4 | GA4 requires cookie consent banner. Vercel Analytics is privacy-friendly, no cookies, free on Vercel. GTM still available for GA4 if renter requires it. |
| Call Tracking | CallRail | WhatConverts | CallRail has larger market share, more integrations, simpler setup for single-site rank-and-rent. WhatConverts better for agencies managing many sites. |
| Hosting | Vercel | Netlify | Both excellent for SSG. Vercel has tighter Next.js integration (same company), better image optimization pipeline. |
| Schema Types | schema-dts | Manual JSON | schema-dts provides compile-time type checking at zero runtime cost. Prevents invalid schema that could hurt SEO. |

## Project Initialization

```bash
# Create project
pnpm create next-app@latest patersonroofingcontractors \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack

# Core dependencies
pnpm add sharp lucide-react schema-dts clsx tailwind-merge \
  @vercel/analytics @vercel/speed-insights @next/third-parties

# Dev dependencies
pnpm add -D prettier prettier-plugin-tailwindcss
```

**Package manager: pnpm** -- faster installs, strict dependency resolution, disk space efficient. Default for modern Next.js projects.

## Configuration Files

### next.config.ts (key settings)
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

### postcss.config.mjs
```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

### Global CSS (app/globals.css)
```css
@import 'tailwindcss';

@theme {
  /* Design tokens matching project constraints */
  --color-primary-900: #1a237e;  /* Dark blue */
  --color-primary-800: #1e3a5f;
  --color-primary-700: #2c5282;
  --color-neutral-900: #1a1a2e;  /* Dark gray */
  --color-neutral-800: #2d2d44;
  --color-neutral-100: #f7f7f8;
  --color-accent-500: #e65100;   /* CTA orange */
  --font-heading: 'Cormorant', serif;
  --font-body: 'Cormorant Garamond', serif;
}
```

## Complete Dependency List

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | ^16.2.0 | Framework |
| react | ^19.0.0 | UI library |
| react-dom | ^19.0.0 | React DOM |
| sharp | latest | Image processing |
| schema-dts | ^1.1.0 | Schema.org types |
| lucide-react | ^1.7.0 | Icons |
| clsx | ^2.1.0 | Class names |
| tailwind-merge | ^2.6.0 | Tailwind conflict resolution |
| @vercel/analytics | ^2.0.0 | Page analytics |
| @vercel/speed-insights | ^2.0.0 | Performance monitoring |
| @next/third-parties | ^16.2.0 | GTM integration |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.0.0 | Type checking |
| tailwindcss | ^4.0.0 | CSS framework |
| @tailwindcss/postcss | ^4.0.0 | PostCSS plugin |
| eslint | ^9.0.0 | Linting |
| eslint-config-next | ^16.2.0 | Next.js ESLint rules |
| prettier | ^3.8.0 | Formatting |
| prettier-plugin-tailwindcss | latest | Class sorting |
| @types/node | latest | Node.js types |
| @types/react | latest | React types |
| @types/react-dom | latest | React DOM types |

## Sources

- [Next.js 16.2 Release Blog](https://nextjs.org/blog/next-16-2) -- confirmed version 16.2.2 (April 2, 2026)
- [Next.js Sitemap API Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- built-in sitemap generation
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- recommended schema markup approach
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google usage
- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, performance improvements
- [Tailwind CSS Next.js Guide](https://tailwindcss.com/docs/guides/nextjs) -- PostCSS integration setup
- [schema-dts GitHub](https://github.com/google/schema-dts) -- Google-maintained Schema.org types
- [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond) -- variable font, weights 300-700
- [Vercel Analytics Docs](https://vercel.com/docs/analytics) -- v2 resilient intake
- [@vercel/speed-insights npm](https://www.npmjs.com/package/@vercel/speed-insights) -- v2.0.0
- [lucide-react npm](https://www.npmjs.com/package/lucide-react) -- v1.7.0
- [Next.js Upgrading to v16](https://nextjs.org/docs/app/guides/upgrading/version-16) -- ESLint changes, next lint removal
- [CallRail](https://www.callrail.com/) -- call tracking for lead generation
- [Prettier npm](https://www.npmjs.com/package/prettier) -- v3.8.1
