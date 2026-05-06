import { getServiceContent, getAllServiceSlugs } from '@/data/services/content'
import { services } from '@/data/services'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { serviceMetadata } from '@/lib/seo-metadata'

// JSON-LD schemas
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import {
  buildServiceSchema,
  buildFaqSchema,
} from '@/lib/schemas'
import { siteConfig } from '@/lib/site-config'

// Section components (D-01 order)
import { Hero } from '@/components/sections/Hero'
import { ServiceOverview } from '@/components/sections/ServiceOverview'
import { ServiceFitProfile } from '@/components/sections/ServiceFitProfile'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { RelatedLocations } from '@/components/sections/RelatedLocations'
import { RelatedServices } from '@/components/sections/RelatedServices'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ServiceFAQ } from '@/components/sections/ServiceFAQ'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { ContactForm } from '@/components/forms/ContactForm'

// Only serve valid service slugs -- all others 404
export const dynamicParams = false

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ serviceSlug: slug }))
}

// CRITICAL: In Next.js 16, params is a Promise and must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>
}): Promise<Metadata> {
  const { serviceSlug } = await params
  const content = getServiceContent(serviceSlug)
  if (!content) return {}

  const canonical = `/services/${content.slug}`
  const metadata = serviceMetadata(content)

  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>
}) {
  const { serviceSlug } = await params
  const content = getServiceContent(serviceSlug)
  if (!content) notFound()

  // Build schemas
  const serviceSchema = buildServiceSchema(
    content.name,
    content.seoDescription,
    content.slug
  )
  const faqSchema = buildFaqSchema(
    content.faqItems.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  )

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Services', url: `${siteConfig.url}/services` },
    {
      name: content.name,
      url: `${siteConfig.url}/services/${content.slug}`,
    },
  ]

  // Resolve related services from lightweight service index
  const relatedServices = content.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(
      (s): s is (typeof services)[number] => s !== undefined
    )

  return (
    <>
      {/* JSON-LD Schemas (SCHEMA-02) */}
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumbs (visual + BreadcrumbList JSON-LD) */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* D-01 Section Flow */}
      {/* 1. Hero */}
      <Hero
        headline={content.heroHeadline}
        subheadline={content.heroSubheadline}
      />

      {/* 2. ServiceOverview */}
      <ServiceOverview
        overviewHtml={content.overviewHtml}
        serviceName={content.name}
      />

      {/* 3. Service-specific fit profile (unique service signals) */}
      <ServiceFitProfile
        serviceName={content.name}
        category={content.category}
        benefits={content.benefits}
        processSteps={content.processSteps}
        relatedServiceSlugs={content.relatedServiceSlugs}
      />

      {/* 4. MidPageCTA (after overview) */}
      <MidPageCTA />

      {/* 5. ProcessSteps */}
      <ProcessSteps steps={content.processSteps} serviceName={content.name} />

      {/* 5. BenefitsGrid */}
      <BenefitsGrid benefits={content.benefits} serviceName={content.name} />

      {/* 6. MidPageCTA (after benefits) */}
      <MidPageCTA />

      {/* 7. RelatedLocations */}
      <RelatedLocations serviceName={content.name} />

      {/* 8. RelatedServices */}
      <RelatedServices services={relatedServices} />

      {/* 9. WhyChooseUs */}
      <WhyChooseUs />

      {/* 10. ServiceFAQ */}
      <ServiceFAQ faqItems={content.faqItems} serviceName={content.name} />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. EmergencyCTA */}
      <EmergencyCTA />

      {/* 12. ContactForm */}
      <section
        id="contact"
        className="bg-gray-light py-section-sm lg:py-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Get Your Free {content.name} Estimate
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
