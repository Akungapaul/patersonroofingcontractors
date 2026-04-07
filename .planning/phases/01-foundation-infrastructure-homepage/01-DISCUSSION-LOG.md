# Phase 1: Foundation, Infrastructure & Homepage - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 01-foundation-infrastructure-homepage
**Areas discussed:** Homepage Section Flow, Color Palette & Theme, Lead Capture Presentation, Trust & Social Proof

---

## Homepage Section Flow

### Hero Style

| Option | Description | Selected |
|--------|-------------|----------|
| Full-width image hero | Large roofing background image with dark overlay, headline, subheadline, CTA | ✓ |
| Gradient hero (no image) | Dark blue-to-gray gradient, bold typography, no image dependency | |
| Split hero (text + image) | Left: text + CTA, Right: roofing image. Balanced layout. | |

**User's choice:** Full-width image hero
**Notes:** Classic contractor site pattern for high trust first impression.

### Page Section Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Services-first flow | Hero > Services > Why Choose Us > Areas > Reviews > Emergency CTA > SEO Content > Contact > Footer | ✓ |
| Trust-first flow | Hero > Trust badges > Services > Areas > Reviews > Emergency CTA > Contact > Footer | |
| Compact conversion flow | Hero > Inline form > Services+trust combined > Areas > Emergency CTA > Footer | |

**User's choice:** Services-first flow
**Notes:** Leads with what you DO, then builds trust. SEO content section added later in discussion.

### Services Grid Display

| Option | Description | Selected |
|--------|-------------|----------|
| Icon cards in 3-column grid | 6-8 service cards with icon, name, description. Responsive 3/2/1 columns. | ✓ |
| Large image cards (2-column) | Photo background cards, service name overlay, hover effect | |
| Compact list style | Vertical list with icon + name + arrow. Utilitarian. | |

**User's choice:** Icon cards in 3-column grid

### Service Areas Display

| Option | Description | Selected |
|--------|-------------|----------|
| Grid of clickable municipality cards | 4-column grid, city name + geographic cluster tag, links to location pages | ✓ |
| Interactive map with pins | Embedded Passaic County map with clickable pins | |
| Simple linked list | Two-column list grouped by geographic cluster | |

**User's choice:** Grid of clickable municipality cards

### Navigation Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Logo + main nav + phone CTA | Logo left, nav center (dropdowns), amber phone button right. Hamburger on mobile. | ✓ |
| Minimal nav + mega menu | Fewer top-level items, mega menu dropdowns | |
| You decide | Let Claude pick | |

**User's choice:** Logo + main nav + phone CTA
**Notes:** Phone CTA always visible on mobile, even when hamburger is closed.

### Footer Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Full 4-column footer | Logo+desc+phone, Services links, Areas links, Contact+hours. Bottom bar. | ✓ |
| Compact 2-column footer | Logo+contact left, quick links right | |
| You decide | Let Claude pick | |

**User's choice:** Full 4-column footer

### Emergency CTA Banner

| Option | Description | Selected |
|--------|-------------|----------|
| Full-width accent banner | Bold accent-colored banner with urgent messaging + phone + CTA button | ✓ |
| Sticky top alert bar | Thin bar above header, always visible, dismissible | |
| Card within hero section | Emergency CTA integrated as highlighted card near hero | |

**User's choice:** Full-width accent banner
**Notes:** Amber accent background, white text. Placed between Reviews and SEO Content sections.

### SEO Content Section

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, add SEO content section | 200-300 words about roofing in Passaic County, after Service Areas | ✓ |
| No, structured sections enough | Rely on hero, services, trust, areas for content | |
| You decide | Let Claude determine need | |

**User's choice:** Yes, add SEO content section

---

## Color Palette & Theme

### Primary Brand Color

| Option | Description | Selected |
|--------|-------------|----------|
| Deep navy #1B2A4A | Very dark navy, authoritative, professional | ✓ |
| Slate blue #2C3E6B | Medium-dark blue, more vibrant/approachable | |
| Dark steel #1E293B | Blue-gray, modern/tech-forward | |

**User's choice:** Deep navy #1B2A4A

### Accent Color for CTAs

| Option | Description | Selected |
|--------|-------------|----------|
| Amber/Gold #D97706 | Warm, high contrast against navy, action-oriented | ✓ |
| Bright orange #EA580C | Maximum urgency, aggressive | |
| Teal/Cyan #0D9488 | Cool, professional, premium | |
| Classic red #DC2626 | Maximum urgency, emergency feel | |

**User's choice:** Amber/Gold #D97706

### Page Backgrounds

| Option | Description | Selected |
|--------|-------------|----------|
| White + light gray alternating | #FFFFFF + #F8FAFC alternating. Navy hero overlay, amber emergency, navy footer. | ✓ |
| All white with navy dividers | Pure white throughout, thin navy divider lines | |
| Dark sections mixed in | Some sections use navy bg with white text | |

**User's choice:** White + light gray alternating

### Color Variation Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Navy + amber variations only | All 10 variations explore navy+amber shades, gradients, hover states | ✓ |
| Include 2-3 alternative accents | 7 navy+amber + 3 alternative accent colors | |
| Skip variations | Go straight to implementation | |

**User's choice:** Navy + amber variations only

### Card Styling

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle shadow + rounded corners | shadow-sm, rounded-lg, white bg. Hover: shadow-md + amber border + lift | ✓ |
| Flat with border | No shadow, thin gray border. Hover: border color change | |
| Navy-bordered cards | White card with navy left border accent | |

**User's choice:** Subtle shadow + rounded corners

### CTA Button Styling

| Option | Description | Selected |
|--------|-------------|----------|
| Solid amber with white text | Primary: amber bg, white bold text, rounded-md. Secondary: navy outline. | ✓ |
| Navy buttons with amber hover | Navy bg, transitions to amber on hover | |
| Rounded pill buttons | Same colors but fully rounded pill shape | |

**User's choice:** Solid amber with white text

---

## Lead Capture Presentation

### Phone CTA in Header

| Option | Description | Selected |
|--------|-------------|----------|
| Amber button with phone icon | Solid amber CTA button with full number. Shortened on mobile. | ✓ |
| Text-only phone number | Plain text with icon, no button styling | |
| Floating phone button (mobile) | Desktop: text in header. Mobile: floating circular button | |

**User's choice:** Amber button with phone icon

### Contact Form Section

| Option | Description | Selected |
|--------|-------------|----------|
| Inline section with form + info | Form fields left, contact info + hours right. Side-by-side layout. | ✓ |
| Compact form only | Just form fields in centered card | |
| Multi-step form | Step 1: Service + zip. Step 2: Contact. Step 3: Message. | |

**User's choice:** Inline section with form + info side-by-side

### Form Submission Handler

| Option | Description | Selected |
|--------|-------------|----------|
| Direct GHL webhook POST | API route validates, forwards to GoHighLevel webhook. No email needed. | ✓ |
| GHL embedded form | Embed GHL's own form via iframe/script | |
| Webhook + email backup | GHL webhook primary, email via Resend as backup | |

**User's choice:** Direct GHL webhook POST
**Notes:** User uses GoHighLevel for lead management. GHL webhook URL in env variable for easy renter swap.

### Post-Submission UX

| Option | Description | Selected |
|--------|-------------|----------|
| Success message + email forward | Inline success message replaces form, phone fallback CTA. No redirect. | ✓ |
| Redirect to thank-you page | Redirect to /thank-you. Better for GA tracking. | |
| You decide | Let Claude pick | |

**User's choice:** Success message (inline, no redirect)

### Form Scope Across Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Full form on every page | Reusable form component at bottom of every content page | ✓ |
| Short CTA linking to contact page | CTA banner linking to /contact | |
| Compact mini-form | Shorter form (name + phone only) on content pages | |

**User's choice:** Full form on every page

### Mid-Page CTAs

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle CTA bars between sections | Thin navy strip with phone + Get Quote button | ✓ |
| No mid-page CTAs | Only hero CTA, emergency banner, and bottom form | |
| You decide | Let Claude determine optimal placement | |

**User's choice:** Subtle CTA bars between sections

---

## Trust & Social Proof

### Trust Badges

| Option | Description | Selected |
|--------|-------------|----------|
| Generic industry badges | Licensed & Insured, Free Estimates, 24/7 Emergency, Satisfaction Guaranteed, Local Family Owned. Lucide icons. | ✓ |
| Certification-style badges | Designed to look like BBB/Angi but generic branding | |
| Minimal text claims | Simple text list, no icons or styling | |

**User's choice:** Generic industry badges

### Social Proof Counters

| Option | Description | Selected |
|--------|-------------|----------|
| Static counters with plausible numbers | 15+ Years, 2,500+ Projects, 5-Star, 16 Cities. In site-config.ts. | ✓ |
| Animated count-up on scroll | Same counters with scroll-triggered animation | |
| Skip counters entirely | No specific numbers, just qualitative claims | |

**User's choice:** Static counters with plausible numbers

### Reviews/Testimonials

| Option | Description | Selected |
|--------|-------------|----------|
| Realistic placeholder testimonials | 3 placeholders with name, city, stars, review text. In data file. | ✓ |
| Empty state with CTA | Section structure with "Reviews coming soon" | |
| Skip reviews section for now | Don't include until renter provides real reviews | |

**User's choice:** Realistic placeholder testimonials

### Site Config Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Single site-config.ts file | All renter-swappable content in one TypeScript config file | ✓ |
| Spread across env vars | All configurable values in .env | |
| You decide | Let Claude determine best pattern | |

**User's choice:** Single site-config.ts file

---

## Claude's Discretion

- Image sourcing for hero section
- Exact service dropdown options in contact form
- Specific Lucide icon choices
- SEO content section copywriting
- Mobile hamburger menu animation details

## Deferred Ideas

None — discussion stayed within phase scope
