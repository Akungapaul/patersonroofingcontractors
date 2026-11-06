import { siteConfig } from '@/lib/site-config'

export const disclaimerContent = `
<h2>General Information Only</h2>
<p>The content on ${siteConfig.url} is provided by ${siteConfig.businessName} for general information about roofing services in Paterson and Passaic County, New Jersey. It is not professional advice for your specific property. Roofing conditions vary by building, and only an on-site inspection can determine the work your roof actually needs.</p>

<h2>Estimates Are Not Quotes</h2>
<p>Any pricing ranges, cost guides, or estimate figures published on this website are general illustrations based on typical projects. They are not a quote, bid, or binding price. Your actual price is set only in a written estimate or contract issued after an inspection of your property.</p>

<h2>No Guarantee Of Results</h2>
<p>Descriptions of past projects, warranties, service outcomes, and timelines describe what we aim to deliver, but results on any individual project depend on the condition of the existing roof, materials, weather, and factors outside our control. Product and manufacturer warranty terms are governed by the manufacturers' own documents.</p>

<h2>Emergency And Safety Information</h2>
<p>Guidance published on this site about leaks, storm damage, and emergency repairs is general information, not a substitute for emergency services. If a roofing problem creates an immediate safety hazard, contact emergency services first. Do not climb onto a damaged or wet roof.</p>

<h2>External Links</h2>
<p>This website links to third-party websites, including manufacturers, suppliers, and reference resources. ${siteConfig.businessName} does not control and is not responsible for the accuracy or content of external sites.</p>

<h2>Accuracy Of Information</h2>
<p>We work to keep the information on this site current and accurate, but services, service areas, and policies can change without notice. If you find an error, please let us know at <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> or <a href="tel:${siteConfig.phoneRaw}">${siteConfig.phone}</a>.</p>

<h2>Relationship To Our Terms</h2>
<p>This disclaimer supplements our <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>. Where this page and a signed written contract for your project differ, the signed contract governs.</p>
`
