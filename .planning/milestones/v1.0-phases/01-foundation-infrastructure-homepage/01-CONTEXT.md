# Phase 1: Foundation, Infrastructure & Homepage - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the complete design system (colors, typography, components), layout shell (sticky header, footer, navigation), lead capture system (phone CTA, contact form with GHL integration), SEO infrastructure (metadata, sitemap, robots.txt, schema), and a fully functional homepage. This is the foundation every subsequent page (locations, services, guides) depends on.

</domain>

<decisions>
## Implementation Decisions

### Homepage Section Flow
- **D-01:** Full-width image hero with dark overlay, headline, subheadline, phone number, and primary CTA button ("Get Free Estimate")
- **D-02:** Services-first section ordering: Hero > Services Grid > Why Choose Us (trust + stats) > Service Areas (municipalities) > Reviews/Testimonials > Emergency CTA Banner > SEO Content Section (~200-300 words) > Contact Form > Footer
- **D-03:** Services displayed as icon cards in a responsive 3-column grid (6-8 top services), 2-column on tablet, 1-column on mobile. Each card links to its service page.
- **D-04:** Service Areas displayed as a 4-column grid of clickable municipality cards, each showing city name and geographic cluster tag (Urban, Suburban, Highlands). Links to location pages.
- **D-05:** Sticky header: logo left, main nav center (Services dropdown, Locations dropdown, Guides, About, Contact), phone CTA button right. Hamburger menu on mobile with phone button always visible.
- **D-06:** Full 4-column footer: Col 1 logo + business description + phone, Col 2 services quick links, Col 3 service area municipality links, Col 4 contact info + business hours. Bottom bar: copyright + privacy/terms links.
- **D-07:** Emergency storm damage CTA as full-width accent-colored banner between Reviews and SEO Content sections. Urgent messaging + phone number + CTA button.
- **D-08:** 200-300 word SEO content section ("Why Passaic County Homeowners Choose Paterson Roofing") placed after Service Areas, before Contact Form. Locally-relevant roofing copy.

### Color Palette & Theme
- **D-09:** Primary brand color: Deep navy #1B2A4A — authoritative, professional, high trust
- **D-10:** Accent color: Amber/Gold #D97706 — warm, urgent, high contrast against navy. Used for CTA buttons, emergency banner, hover states, star ratings.
- **D-11:** Backgrounds: White (#FFFFFF) + light gray (#F8FAFC) alternating sections. Hero: navy overlay on image. Emergency banner: amber. Footer: deep navy.
- **D-12:** 10 color theme variations (all navy+amber) to be generated as HTML files for approval before implementation. Variations explore shade intensity, gradients, hover states, card styling, spacing density, etc.
- **D-13:** Cards: subtle shadow (shadow-sm) + rounded-lg + white background. Hover: shadow-md + amber border accent + translate-y-1 lift with transition-all.
- **D-14:** Primary CTA buttons: solid amber (#D97706) background, white bold text, rounded-md. Hover: darker amber. Secondary CTAs: navy outline, navy text, amber fill on hover.

### Lead Capture
- **D-15:** Phone number in sticky header as amber CTA button with phone icon. Desktop shows full number "(973) 555-0100". Mobile shows shortened "Call" label. Click-to-call on all viewports.
- **D-16:** Contact form as inline section: form fields (name, phone, email, service type dropdown, message) on left, contact info + hours + service area note on right. Light gray or navy background.
- **D-17:** Form submits to Next.js API route (/api/contact), validates fields, then POSTs to GoHighLevel webhook URL. GHL webhook URL stored in environment variable. No email service needed.
- **D-18:** Post-submission: inline success message replaces form ("Thank You! We'll call you within 1 hour") with phone number fallback CTA. No page redirect.
- **D-19:** Full contact form (reusable component) rendered on every content page (homepage, locations, services, guides) at the bottom before footer.
- **D-20:** Subtle mid-page CTA bars between major homepage sections. Navy background, white text: "Need a roofing estimate? Call (973) 555-0100 or [Get Quote]"

### Trust & Social Proof
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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in the following project files:

### Project Configuration
- `.planning/PROJECT.md` — Project vision, constraints, municipality data, URL structure, content angles
- `.planning/REQUIREMENTS.md` — Full requirement list with IDs (FNDN-01..07, LEAD-01..05, TRUST-01..05, SEO-01..10, SCHEMA-01/04/05, SILO-01/05)
- `.planning/ROADMAP.md` — Phase 1 goal and success criteria

### Technology Stack
- `CLAUDE.md` §Technology Stack — Complete dependency list, version requirements, and configuration

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code. All components built from scratch.

### Established Patterns
- None yet. Phase 1 establishes the patterns all subsequent phases follow.

### Integration Points
- GoHighLevel webhook for form submissions (external service)
- Vercel deployment platform
- Google Fonts (Cormorant, Cormorant Garamond) via next/font

</code_context>

<specifics>
## Specific Ideas

- Hero image should evoke professional roofing work in a Northeast/NJ suburban context
- Municipality cards should show geographic cluster tags (Urban, Suburban, Highlands, Commercial) as visual differentiators
- Emergency CTA banner should feel urgent but not alarming — amber accent, not red
- Reviews should reference specific Passaic County cities for local SEO value
- Site config file pattern enables clean renter handoff — change one file, whole site updates

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-infrastructure-homepage*
*Context gathered: 2026-04-07*
