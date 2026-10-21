import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { LegalPage } from '@/components/sections/LegalPage'
import { accessibilityContent } from '@/data/legal/accessibility'

export const metadata: Metadata = {
  title: 'Accessibility',
  alternates: { canonical: '/accessibility' },
}

export default function AccessibilityPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Accessibility', url: `${siteConfig.url}/accessibility` },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      />
      <LegalPage
        title="Accessibility"
        content={accessibilityContent}
        lastUpdated="October 2026"
      />
    </>
  )
}
