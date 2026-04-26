import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Hero } from '@/components/sections/Hero'
import { ContactHub } from '@/components/sections/ContactHub'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { CityLinks } from '@/components/sections/CityLinks'
import { staticPageMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = staticPageMetadata({
  title: 'Contact Paterson Roofing Contractors',
  description:
    'Contact Paterson Roofing Contractors for a free roofing estimate in Paterson or Passaic County, NJ. Call or send a request online.',
  canonical: '/contact',
})

export default function ContactPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Contact', url: `${siteConfig.url}/contact` },
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
        headline="Contact Us"
        subheadline="Get in touch for a free roofing estimate. We respond within 1 hour."
        minHeight="min-h-[40vh]"
      />

      {/* 3. ContactHub */}
      <ContactHub />

      {/* 4. WhyChooseUs */}
      <WhyChooseUs />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. EmergencyCTA */}
      <EmergencyCTA />

      {/* 7. Areas We Serve */}
      <section className="bg-gray-light py-section-sm lg:py-section">
        <CityLinks heading="Areas We Serve" />
      </section>
    </>
  )
}
