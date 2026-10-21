import { siteConfig } from '@/lib/site-config'

export const cookiePolicyContent = `
<h2>What Are Cookies</h2>
<p>Cookies are small text files that are placed on your device when you visit ${siteConfig.url}. They help the website function, remember your preferences, and allow us to understand how visitors use the site so we can improve it.</p>

<h2>Cookies We Use</h2>
<p>${siteConfig.businessName} uses the following categories of cookies:</p>
<ul>
<li><strong>Essential cookies:</strong> required for the website to function properly, including security and load-balancing features. These cannot be switched off.</li>
<li><strong>Analytics cookies:</strong> we use Google Analytics (GA4) to measure traffic and understand which pages and services visitors are interested in. These cookies collect information in aggregate form and do not identify you personally.</li>
<li><strong>Functional cookies:</strong> used to remember choices you make on the site, such as content preferences, to improve your browsing experience.</li>
</ul>

<h2>Third-Party Cookies</h2>
<p>Some cookies are set by third-party services that appear on our pages, such as Google Analytics and embedded map or video providers. These providers set cookies under their own privacy and cookie policies, which we do not control.</p>

<h2>How To Control Cookies</h2>
<p>You can control or delete cookies at any time through your browser settings. Most browsers let you refuse cookies, delete existing cookies, or receive a warning before a cookie is stored. Disabling cookies may affect some features of this website.</p>
<p>To opt out of Google Analytics tracking across all websites, you can install the Google Analytics Opt-out Browser Add-on provided by Google.</p>

<h2>Updates To This Policy</h2>
<p>We may update this cookie policy from time to time as the services we use change. Any updates will be posted on this page with a revised effective date.</p>

<h2>Contact Us</h2>
<p>Questions about our use of cookies can be sent to <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> or by calling <a href="tel:${siteConfig.phoneRaw}">${siteConfig.phone}</a>. See our <a href="/privacy-policy">Privacy Policy</a> for how we handle personal information.</p>
`
