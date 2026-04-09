import type {
  WithContext,
  LocalBusiness,
  Organization,
  BreadcrumbList,
} from 'schema-dts'
import { siteConfig } from './site-config'

export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: siteConfig.businessName,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paterson',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: siteConfig.municipalities.map((m) => ({
      '@type': 'City' as const,
      name: `${m.name}, NJ`,
    })),
    openingHoursSpecification: siteConfig.businessHours
      .filter((h) => h.opens !== 'Closed')
      .map((h) => ({
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      })),
    priceRange: '$$',
    image: `${siteConfig.url}/images/og-image.jpg`,
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
