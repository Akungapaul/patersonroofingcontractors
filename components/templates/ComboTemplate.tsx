// Combo template — a core service in a specific city, rendered by the root
// flat route (app/[locationSlug]) at /<service>-<city>-nj (Rule 7).
// Assembled from the existing city content file + service content file:
// no per-combo data files. Canonical/schema/breadcrumbs are generated from
// the flat combo path via lib/routes.ts.
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCityContent } from '@/data/content'
import { getServiceContent } from '@/data/services/content'
import { siteConfig } from '@/lib/site-config'
import { cityPath, comboPath, localizeServiceLinks, servicePath, CORE_COMBO_SERVICES } from '@/lib/routes'
import { services } from '@/data/services'

import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '@/lib/schemas'

import { Hero } from '@/components/sections/Hero'
import { CityIntro } from '@/components/sections/CityIntro'
import { CityRoofingProfile } from '@/components/sections/CityRoofingProfile'
import { ServiceOverview } from '@/components/sections/ServiceOverview'
import { ServiceFitProfile } from '@/components/sections/ServiceFitProfile'
import { MidPageCTA } from '@/components/sections/MidPageCTA'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { NeighborhoodGrid } from '@/components/sections/NeighborhoodGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ServiceFAQ } from '@/components/sections/ServiceFAQ'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { CoraSupplement } from '@/components/sections/CoraSupplement'
import { CORA_SUPPLEMENTS } from '@/data/cora-supplements'
import { ContactForm } from '@/components/forms/ContactForm'

// Insert a new first sentence at the start of the first <p> of an HTML
// block, keeping the original opening as the following sentence.
function prependFirstSentence(htmlText: string, sentence: string): string {
  return htmlText.replace('<p>', `<p>${sentence} `)
}

export default async function ComboTemplate({
  serviceSlug,
  citySlug,
}: {
  serviceSlug: string
  citySlug: string
}) {
  const service = getServiceContent(serviceSlug)
  const city = getCityContent(citySlug)
  if (!service || !city) notFound()

  const phrase = `${service.name} ${city.name}, NJ`
  const path = comboPath(service.slug, city.slug)

  const introOpener = `${phrase} is available from Paterson Roofing Contractors for homes and businesses in ${city.name} and across Passaic County.`
  const introHtml = localizeServiceLinks(prependFirstSentence(city.introHtml, introOpener), city.slug)

  const subheadline = `Professional ${service.name.toLowerCase()} for homes and businesses in ${city.name}, NJ. Licensed, insured, and committed to lasting solutions with free estimates.`

  // Combined FAQs: service first, then city, duplicates by question removed.
  const seen = new Set<string>()
  const faqItems = [...service.faqItems, ...city.faqItems].filter((f) => {
    if (seen.has(f.question)) return false
    seen.add(f.question)
    return true
  })

  const serviceSchema = buildServiceSchema(
    service.name,
    service.seoDescription,
    service.slug,
    path
  )
  const faqSchema = buildFaqSchema(
    faqItems.map((f) => ({ question: f.question, answer: f.answer }))
  )

  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    {
      name: `${city.name} Roofing`,
      url: `${siteConfig.url}${cityPath(city.slug)}`,
    },
    { name: phrase, url: `${siteConfig.url}${path}` },
  ]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(city.name)} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      />

      {/* 1. Hero — H1 is the Rule 7 phrase */}
      <Hero headline={phrase} subheadline={subheadline} />

      {/* 2. City intro — first sentence is the Rule 7 phrase */}
      <CityIntro
        cityName={city.name}
        introHtml={introHtml}
        localContext={city.localContext}
      />

      {/* 3. Service overview */}
      <ServiceOverview
        overviewHtml={localizeServiceLinks(service.overviewHtml, city.slug)}
        serviceName={`${service.name} in ${city.name}`}
      />

      {/* 4. Service fit profile */}
      <ServiceFitProfile
        serviceName={service.name}
        category={service.category}
        benefits={service.benefits}
        processSteps={service.processSteps}
        relatedServiceSlugs={service.relatedServiceSlugs}
      />

      <MidPageCTA cityName={city.name} />

      {/* 5. Process + benefits */}
      <ProcessSteps steps={service.processSteps} serviceName={service.name} />
      <BenefitsGrid benefits={service.benefits} serviceName={service.name} />

      {/* 6. City roofing profile + neighborhoods */}
      <CityRoofingProfile content={city} />
      <NeighborhoodGrid neighborhoods={city.neighborhoods} cityName={city.name} />

      <MidPageCTA cityName={city.name} />

      {/* 7. Continue exploring — the two hub pages this combo connects */}
      <section className="bg-gray-light py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Continue Exploring
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <Link
              href={cityPath(city.slug)}
              className="rounded-lg bg-white p-6 text-center font-heading text-xl font-bold text-navy shadow-sm transition hover:text-amber-dark"
            >
              Roofing Contractor {city.name}, NJ
              <span className="mt-2 block font-sans text-base font-normal text-gray-600">
                All roofing services in {city.name}
              </span>
            </Link>
            <Link
              href={servicePath(service.slug)}
              className="rounded-lg bg-white p-6 text-center font-heading text-xl font-bold text-navy shadow-sm transition hover:text-amber-dark"
            >
              {service.name} Paterson, NJ
              <span className="mt-2 block font-sans text-base font-normal text-gray-600">
                {service.name} from our Paterson team
              </span>
            </Link>
          </div>
        </div>
      </section>


      {/* 8. Combo mesh — same service in other cities, other core services here */}
      <section className="bg-white py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            {service.name} in Other Cities
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {siteConfig.municipalities
              .filter((m) => m.slug !== city.slug)
              .map((m) => (
                <Link
                  key={m.slug}
                  href={m.slug === 'paterson' ? servicePath(service.slug) : comboPath(service.slug, m.slug)}
                  className="rounded-lg bg-gray-light p-4 text-center text-lg font-bold text-navy transition hover:text-amber-dark"
                >
                  {m.name}
                </Link>
              ))}
          </div>

          <h2 className="mb-8 mt-16 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            More Services in {city.name}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CORE_COMBO_SERVICES.filter((s) => s !== service.slug).map((s) => {
              const entry = services.find((x) => x.slug === s)
              if (!entry) return null
              return (
                <Link
                  key={s}
                  href={comboPath(s, city.slug)}
                  className="rounded-lg bg-gray-light p-4 text-center text-lg font-bold text-navy transition hover:text-amber-dark"
                >
                  {entry.name} {city.name}, NJ
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. Why choose us + FAQ + testimonials */}
      <WhyChooseUs />
      <ServiceFAQ faqItems={faqItems} serviceName={phrase} />
      <Testimonials />

      {/* 10. Emergency CTA + contact */}
      {/* Cora supplemental block (collapsed) when a roadmap implementation exists */}
      {CORA_SUPPLEMENTS[`${service.slug}-${city.slug}-nj`] && (
        <CoraSupplement
          data={CORA_SUPPLEMENTS[`${service.slug}-${city.slug}-nj`]}
          phrase={phrase}
        />
      )}

      <EmergencyCTA />
      <section
        id="contact"
        className="bg-gray-light py-section-sm lg:py-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Get Your Free {service.name} Estimate in {city.name}
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
