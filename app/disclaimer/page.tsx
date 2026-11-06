import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { LegalPage } from '@/components/sections/LegalPage'
import { disclaimerContent } from '@/data/legal/disclaimer'

export const metadata: Metadata = {
  title: 'Disclaimer',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Disclaimer', url: `${siteConfig.url}/disclaimer` },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      />
      <LegalPage
        title="Disclaimer"
        content={disclaimerContent}
        lastUpdated="October 2026"
      />
    </>
  )
}
