import { siteConfig } from '@/lib/site-config'
import { getCityContent } from '@/data/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cityMetadata, comboMetadata, serviceMetadata } from '@/lib/seo-metadata'
import { CORA_SUPPLEMENTS } from '@/data/cora-supplements'
import { getServiceContent } from '@/data/services/content'
import { getCityContent as getCity } from '@/data/content'
import { services } from '@/data/services'
import { COMBO_PAIRS, localizeServiceLinks, parseComboSlug, serviceSlugFromFlat } from '@/lib/routes'
import ServiceTemplate from '@/components/templates/ServiceTemplate'
import ComboTemplate from '@/components/templates/ComboTemplate'

// JSON-LD schemas
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import {
  buildLocalBusinessSchema,
  buildFaqSchema,
} from '@/lib/schemas'

// Section components (D-01 order)
import { Hero } from '@/components/sections/Hero'
import { CityIntro } from '@/components/sections/CityIntro'
import { CityRoofingProfile } from '@/components/sections/CityRoofingProfile'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { NeighborhoodGrid } from '@/components/sections/NeighborhoodGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CityFAQ } from '@/components/sections/CityFAQ'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { ContactForm } from '@/components/forms/ContactForm'

// One root dynamic segment serves both flat families (Rule 7):
// /roofing-contractor-<city>-nj (16 cities) and /<service>-paterson-nj (67 services).
// Only the 83 valid flat slugs are served -- all others 404.
export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...siteConfig.municipalities.map((m) => ({
      locationSlug: `roofing-contractor-${m.slug}-nj`,
    })),
    ...services.map((s) => ({
      locationSlug: `${s.slug}-paterson-nj`,
    })),
    ...COMBO_PAIRS.map((p) => ({
      locationSlug: `${p.service}-${p.city}-nj`,
    })),
  ]
}

function parseCombo(locationSlug: string) {
  return parseComboSlug(
    locationSlug,
    services.map((s) => s.slug),
    siteConfig.municipalities.map((m) => m.slug)
  )
}

// Helper: extract city slug from full location slug
function extractCitySlug(locationSlug: string): string {
  return locationSlug.replace('roofing-contractor-', '').replace('-nj', '')
}

// CRITICAL: In Next.js 16, params is a Promise and must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>
}): Promise<Metadata> {
  const { locationSlug } = await params
  const combo = parseCombo(locationSlug)
  if (combo) {
    const svc = getServiceContent(combo.service)
    const cty = getCity(combo.city)
    if (svc && cty) return comboMetadata(svc, cty, CORA_SUPPLEMENTS[locationSlug])
  }
  const svcSlug = serviceSlugFromFlat(locationSlug)
  if (svcSlug) {
    const svc = getServiceContent(svcSlug)
    if (svc) return serviceMetadata(svc, CORA_SUPPLEMENTS[locationSlug])
  }
  const citySlug = extractCitySlug(locationSlug)
  const content = getCityContent(citySlug)
  if (!content) return {}

  const canonical = `/roofing-contractor-${content.slug}-nj`
  const metadata = cityMetadata(content)

  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>
}) {
  const { locationSlug } = await params
  const combo = parseCombo(locationSlug)
  if (combo) {
    return <ComboTemplate serviceSlug={combo.service} citySlug={combo.city} />
  }
  const svcSlug = serviceSlugFromFlat(locationSlug)
  if (svcSlug && getServiceContent(svcSlug)) {
    return <ServiceTemplate slug={svcSlug} />
  }
  const citySlug = extractCitySlug(locationSlug)
  const content = getCityContent(citySlug)
  if (!content) notFound()

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    {
      name: `${content.name} Roofing`,
      url: `${siteConfig.url}/roofing-contractor-${content.slug}-nj`,
    },
  ]

  return (
    <>
      {/* JSON-LD Schemas (SCHEMA-01, SCHEMA-03) */}
      <JsonLd data={buildLocalBusinessSchema(content.name)} />
      <JsonLd
        data={buildFaqSchema(
          content.faqItems.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        )}
      />

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

      {/* 2. About Roofing in [City] */}
      <CityIntro
        cityName={content.name}
        introHtml={localizeServiceLinks(content.introHtml, content.slug)}
        localContext={content.localContext}
      />

      {/* 3. Local roofing profile (unique city signals) */}
      <CityRoofingProfile content={content} />

      {/* 4. Mid-page CTA (after About section -- D-04) */}
      <MidPageCTA cityName={content.name} />

      {/* 5. Services We Offer (silo links -- ANCHOR-04, LOC-06) */}
      <ServicesGrid
        serviceSlugs={content.relevantServiceSlugs}
        title={`Roofing Services We Offer in ${content.name}`}
        citySlug={content.slug}
      />

      {/* 5. Neighborhoods We Serve */}
      <NeighborhoodGrid
        neighborhoods={content.neighborhoods}
        cityName={content.name}
      />

      {/* 6. Mid-page CTA (after Neighborhoods -- D-04) */}
      <MidPageCTA cityName={content.name} />

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. FAQ */}
      <CityFAQ faqItems={content.faqItems} cityName={content.name} />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Emergency CTA */}
      <EmergencyCTA />

      {/* 11. Contact Form */}
      <section
        id="contact"
        className="bg-gray-light py-section-sm lg:py-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Get Your Free Roofing Estimate in {content.name}
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
