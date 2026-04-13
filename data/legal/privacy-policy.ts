import { siteConfig } from '@/lib/site-config'

export const privacyPolicyContent = `
<h2>Information We Collect</h2>
<p>When you visit ${siteConfig.url} or contact ${siteConfig.businessName}, we may collect the following information:</p>
<ul>
<li>Name, email address, and phone number submitted through our contact form</li>
<li>Information about roofing services you are interested in</li>
<li>Technical data such as your IP address, browser type, and pages visited</li>
<li>Location-based information to help us provide relevant service area content</li>
</ul>

<h2>How We Use Your Information</h2>
<p>${siteConfig.businessName} uses the information we collect to:</p>
<ul>
<li>Respond to your inquiries and provide roofing estimates</li>
<li>Communicate about our services and schedule appointments</li>
<li>Improve our website and service offerings</li>
<li>Send follow-up communications related to your roofing project (with your consent)</li>
<li>Comply with legal obligations</li>
</ul>

<h2>Information Sharing</h2>
<p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
<ul>
<li>Service providers who assist in our business operations (e.g., email delivery services, analytics providers)</li>
<li>Our roofing contractors and subcontractors, solely for the purpose of fulfilling your service request</li>
<li>Legal authorities when required by law or to protect our rights</li>
</ul>

<h2>Cookies and Tracking</h2>
<p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. These include:</p>
<ul>
<li>Essential cookies required for website functionality</li>
<li>Analytics cookies that help us understand how visitors interact with our site</li>
<li>Third-party cookies from services like Google Tag Manager for marketing analysis</li>
</ul>
<p>You can control cookie settings through your browser preferences. Disabling cookies may affect some website features.</p>

<h2>Data Security</h2>
<p>We implement reasonable security measures to protect your personal information, including secure form submission via HTTPS encryption. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security of data transmitted to our website.</p>

<h2>Third-Party Links</h2>
<p>Our website may contain links to third-party websites. ${siteConfig.businessName} is not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>

<h2>Your Rights</h2>
<p>You have the right to:</p>
<ul>
<li>Request access to the personal information we hold about you</li>
<li>Request correction of inaccurate personal information</li>
<li>Request deletion of your personal information</li>
<li>Opt out of marketing communications at any time</li>
</ul>
<p>To exercise any of these rights, contact us at <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> or call <a href="tel:${siteConfig.phoneRaw}">${siteConfig.phone}</a>.</p>

<h2>Children&apos;s Privacy</h2>
<p>Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>

<h2>Changes to This Policy</h2>
<p>${siteConfig.businessName} reserves the right to update this privacy policy at any time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>

<h2>Contact Us</h2>
<p>For questions about this privacy policy or our data practices, contact ${siteConfig.businessName}:</p>
<ul>
<li>Email: <a href="mailto:${siteConfig.email}">${siteConfig.email}</a></li>
<li>Phone: <a href="tel:${siteConfig.phoneRaw}">${siteConfig.phone}</a></li>
<li>Service Area: All 16 municipalities in Passaic County, NJ</li>
</ul>
`
