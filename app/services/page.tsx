import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

// SEO
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// Section components
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Roofing Services | Paterson Roofing Contractors - Passaic County NJ',
  description:
    'Full range of roofing services for Passaic County, NJ. Residential and commercial roof repair, replacement, installation, gutters, and more. Free estimates.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title:
      'Roofing Services | Paterson Roofing Contractors - Passaic County NJ',
    description:
      'Full range of roofing services for Passaic County, NJ. Residential and commercial roof repair, replacement, installation, gutters, and more. Free estimates.',
    url: '/services',
  },
}

export default function ServicesIndexPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Services', url: `${siteConfig.url}/services` },
  ]

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* Hero */}
      <Hero
        headline="Our Roofing Services"
        subheadline="Complete roofing solutions for Passaic County homes and businesses. From emergency repairs to full replacements, we handle it all."
        minHeight="min-h-[50vh]"
      />

      {/* Services grouped by category */}
      <ServicesGrid groupByCategory />

      {/* Mid-page CTA */}
      <MidPageCTA />

      {/* Contact Form */}
      <section
        id="contact"
        className="bg-gray-light py-section-sm lg:py-section"
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
