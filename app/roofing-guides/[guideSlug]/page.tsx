import {
  getGuideContent,
  getAllGuideSlugs,
  getAllGuideContent,
} from '@/data/guides/content'
import { calculateGuideReadTime } from '@/lib/utils'
import { services } from '@/data/services'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { guideMetadata } from '@/lib/seo-metadata'

// JSON-LD schemas
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { buildFaqSchema } from '@/lib/schemas'
import { siteConfig } from '@/lib/site-config'

// Section components (Guide page order per UI-SPEC)
import { Hero } from '@/components/sections/Hero'
import { TableOfContents } from '@/components/sections/TableOfContents'
import { GuideArticle } from '@/components/sections/GuideArticle'
import { ExpertTips } from '@/components/sections/ExpertTips'
import { GuideFAQ } from '@/components/sections/GuideFAQ'
import { RelatedServices } from '@/components/sections/RelatedServices'
import { RelatedGuides } from '@/components/sections/RelatedGuides'
import { CityLinks } from '@/components/sections/CityLinks'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { ContactForm } from '@/components/forms/ContactForm'

// Only serve valid guide slugs -- all others 404
export const dynamicParams = false

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ guideSlug: slug }))
}

// CRITICAL: In Next.js 16, params is a Promise and must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ guideSlug: string }>
}): Promise<Metadata> {
  const { guideSlug } = await params
  const content = getGuideContent(guideSlug)
  if (!content) return {}

  const canonical = `/roofing-guides/${content.slug}`
  const metadata = guideMetadata(content)

  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ guideSlug: string }>
}) {
  const { guideSlug } = await params
  const content = getGuideContent(guideSlug)
  if (!content) notFound()

  // Calculate read time from all sections
  const readTime = calculateGuideReadTime(content.sections)

  // Build TOC sections from guide sections
  const tocSections = content.sections.map((s) => ({
    id: s.id,
    title: s.title,
  }))

  // Build FAQ JSON-LD schema
  const faqSchema = buildFaqSchema(
    content.faqItems.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  )

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Roofing Guides', url: `${siteConfig.url}/roofing-guides` },
    {
      name: content.title,
      url: `${siteConfig.url}/roofing-guides/${content.slug}`,
    },
  ]

  // Resolve related services from lightweight service index
  const relatedServices = content.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(
      (s): s is (typeof services)[number] => s !== undefined
    )

  // Resolve related guides with read time
  const allGuides = getAllGuideContent()
  const relatedGuides = content.relatedGuideSlugs
    .map((slug) => allGuides.find((g) => g.slug === slug))
    .filter((g): g is NonNullable<typeof g> => g !== undefined)
    .map((g) => ({
      title: g.title,
      slug: g.slug,
      description: g.description,
      readTime: calculateGuideReadTime(g.sections),
    }))

  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd data={faqSchema} />

      {/* Breadcrumbs (visual + BreadcrumbList JSON-LD) */}
      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* 1. Hero with read time badge */}
      <Hero
        headline={content.title}
        subheadline={content.description}
        readTime={readTime}
        minHeight="min-h-[50vh]"
      />

      {/* 2. TableOfContents (mobile only -- collapsible) */}
      <div className="bg-gray-light px-4 py-6 sm:px-6 lg:hidden lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TableOfContents sections={tocSections} />
        </div>
      </div>

      {/* 3. GuideArticle + TableOfContents (desktop sidebar) */}
      <section className="bg-white py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Desktop sidebar TOC */}
            <div className="hidden lg:block">
              <TableOfContents sections={tocSections} />
            </div>

            {/* Article body + ExpertTips */}
            <div className="min-w-0 flex-1">
              <GuideArticle sections={content.sections} />
              <ExpertTips tips={content.expertTips} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. GuideFAQ */}
      <GuideFAQ faqItems={content.faqItems} guideTitle={content.title} />

      {/* 5. RelatedServices */}
      <RelatedServices services={relatedServices} />

      {/* 6. RelatedGuides */}
      <RelatedGuides guides={relatedGuides} />

      {/* 7. CityLinks */}
      <CityLinks />

      {/* 8. WhyChooseUs */}
      <WhyChooseUs />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. EmergencyCTA */}
      <EmergencyCTA />

      {/* 11. ContactForm */}
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
