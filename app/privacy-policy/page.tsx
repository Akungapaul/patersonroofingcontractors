import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { LegalPage } from '@/components/sections/LegalPage'
import { privacyPolicyContent } from '@/data/legal/privacy-policy'

export const metadata: Metadata = {
  title: 'Privacy Policy | Paterson Roofing Contractors',
  robots: { index: false, follow: false },
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Privacy Policy', url: `${siteConfig.url}/privacy-policy` },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      />
      <LegalPage
        title="Privacy Policy"
        content={privacyPolicyContent}
        lastUpdated="April 2026"
      />
    </>
  )
}
