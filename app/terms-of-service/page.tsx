import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { LegalPage } from '@/components/sections/LegalPage'
import { termsOfServiceContent } from '@/data/legal/terms-of-service'

export const metadata: Metadata = {
  title: 'Terms of Service | Paterson Roofing Contractors',
  robots: { index: false, follow: false },
  alternates: { canonical: '/terms-of-service' },
}

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Terms of Service', url: `${siteConfig.url}/terms-of-service` },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      />
      <LegalPage
        title="Terms of Service"
        content={termsOfServiceContent}
        lastUpdated="April 2026"
      />
    </>
  )
}
