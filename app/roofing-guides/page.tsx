import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock } from 'lucide-react'

import { getAllGuideContent } from '@/data/guides/content'
import { calculateGuideReadTime } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

// Section components
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Hero } from '@/components/sections/Hero'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card } from '@/components/ui/Card'
import { staticPageMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = staticPageMetadata({
  title: 'Roofing Guides for Passaic County Homeowners',
  description:
    'Free roofing guides for Passaic County homeowners covering roof repair, replacement, materials, costs, leaks, and maintenance.',
  canonical: '/roofing-guides',
})

export default function GuidesIndexPage() {
  const guides = getAllGuideContent()

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Roofing Guides', url: `${siteConfig.url}/roofing-guides` },
  ]

  return (
    <>
      {/* Breadcrumbs (visual + BreadcrumbList JSON-LD) */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* 1. Hero */}
      <Hero
        headline="Roofing Guides & Resources"
        subheadline="Expert advice to help Passaic County homeowners make informed roofing decisions."
        minHeight="min-h-[50vh]"
      />

      {/* 2. Guide cards grid */}
      <section className="bg-white py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => {
                const readTime = calculateGuideReadTime(guide.sections)
                return (
                  <Link
                    key={guide.slug}
                    href={`/roofing-guides/${guide.slug}`}
                  >
                    <Card interactive className="h-full p-6">
                      <h2 className="font-heading text-2xl font-bold text-navy">
                        {guide.title}
                      </h2>
                      <p className="mt-2 text-lg text-gray-700">
                        {guide.description}
                      </p>
                      <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span aria-label={`${readTime} minute read`}>
                          {readTime} min read
                        </span>
                      </p>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Roofing guides coming soon. Check back for expert advice on roof
              repair, replacement, materials, and more.
            </p>
          )}
        </div>
      </section>

      {/* 3. MidPageCTA */}
      <MidPageCTA />

      {/* 4. WhyChooseUs */}
      <WhyChooseUs />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. EmergencyCTA */}
      <EmergencyCTA />

      {/* 7. ContactForm */}
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
