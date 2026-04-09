import { Hero } from '@/components/sections/Hero'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { SeoContent } from '@/components/sections/SeoContent'
import { ContactForm } from '@/components/forms/ContactForm'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/schemas'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paterson Roofing Contractors | #1 Roofer in Passaic County NJ',
  description:
    'Professional roofing contractor serving all 16 municipalities in Passaic County, NJ. Free estimates, 24/7 emergency service. Call (973) 555-0100.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Paterson Roofing Contractors | #1 Roofer in Passaic County NJ',
    description:
      'Professional roofing contractor serving all 16 municipalities in Passaic County, NJ. Free estimates, 24/7 emergency service. Call (973) 555-0100.',
    url: '/',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schemas (SCHEMA-01, SCHEMA-04, SCHEMA-05) */}
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([{ name: 'Home', url: siteConfig.url }])}
      />

      {/* Homepage Sections (D-02 order) */}
      <Hero />
      <MidPageCTA />
      <ServicesGrid />
      <MidPageCTA />
      <WhyChooseUs />
      <ServiceAreas />
      <Testimonials />
      <EmergencyCTA />
      <SeoContent />

      {/* Contact Form Section (D-16, D-19) */}
      <section id="contact" className="bg-gray-light py-section-sm lg:py-section">
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
