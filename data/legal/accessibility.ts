import { siteConfig } from '@/lib/site-config'

export const accessibilityContent = `
<h2>Our Commitment</h2>
<p>${siteConfig.businessName} is committed to making ${siteConfig.url} accessible to visitors of all abilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, the widely used standard for web accessibility.</p>

<h2>Measures We Take</h2>
<ul>
<li>Semantic page structure with a single, descriptive heading hierarchy</li>
<li>Text alternatives for meaningful images and descriptive link text</li>
<li>Color contrast chosen to keep text readable against its background</li>
<li>Pages that can be navigated by keyboard, with visible focus states</li>
<li>Responsive layouts that remain usable when zoomed or on small screens</li>
</ul>

<h2>Known Limitations</h2>
<p>Some third-party content embedded on this site, such as maps and analytics tools, is provided by external vendors and may not fully meet the same accessibility standard. We raise accessibility issues with those vendors when we find them and offer the same information by phone or email on request.</p>

<h2>Feedback And Assistance</h2>
<p>If you have difficulty using any part of this website, or if you need information from this site in another format, contact us and we will help:</p>
<ul>
<li>Email: <a href="mailto:${siteConfig.email}">${siteConfig.email}</a></li>
<li>Phone: <a href="tel:${siteConfig.phoneRaw}">${siteConfig.phone}</a></li>
</ul>
<p>Please tell us the page address and describe the problem you ran into. We respond to accessibility requests within two business days and work to fix reported barriers promptly.</p>

<h2>Ongoing Review</h2>
<p>Accessibility is part of our website maintenance process. We review new pages and major updates against the WCAG 2.1 AA criteria before they are published, and we revisit this statement as the site changes.</p>
`
