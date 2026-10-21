import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { LegalPage } from '@/components/sections/LegalPage'
import { cookiePolicyContent } from '@/data/legal/cookie-policy'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Cookie Policy', url: `${siteConfig.url}/cookie-policy` },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      />
      <LegalPage
        title="Cookie Policy"
        content={cookiePolicyContent}
        lastUpdated="October 2026"
      />
    </>
  )
}
