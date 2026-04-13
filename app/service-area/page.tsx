import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Hero } from '@/components/sections/Hero'
import { MunicipalityGrid } from '@/components/sections/MunicipalityGrid'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Service Area | Paterson Roofing Contractors - Passaic County NJ',
  description:
    'Paterson Roofing Contractors serves all 16 municipalities in Passaic County, NJ. Find your city and request a free roofing estimate today.',
  alternates: { canonical: '/service-area' },
  openGraph: {
    title: 'Service Area | Paterson Roofing Contractors - Passaic County NJ',
    description:
      'Paterson Roofing Contractors serves all 16 municipalities in Passaic County, NJ. Find your city and request a free roofing estimate today.',
    url: '/service-area',
  },
}

export default function ServiceAreaPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Service Area', url: `${siteConfig.url}/service-area` },
  ]

  return (
    <>
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* 2. Hero */}
      <Hero
        headline="Our Service Area"
        subheadline="Proudly serving all 16 municipalities in Passaic County, New Jersey."
        minHeight="min-h-[50vh]"
      />

      {/* 3. MunicipalityGrid */}
      <MunicipalityGrid />

      {/* 4. Static Map Placeholder */}
      <section className="bg-gray-light py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Passaic County Coverage
          </h2>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-200 text-gray-500">
            Map placeholder - Passaic County service area
          </div>
        </div>
      </section>

      {/* 5. MidPageCTA */}
      <MidPageCTA />

      {/* 6. ContactForm */}
      <section
        id="contact"
        className="bg-white py-section-sm lg:py-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Get Your Free Roofing Estimate
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
