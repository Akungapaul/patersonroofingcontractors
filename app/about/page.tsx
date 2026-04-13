import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Hero } from '@/components/sections/Hero'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CityLinks } from '@/components/sections/CityLinks'
import { ContactForm } from '@/components/forms/ContactForm'
import { Shield, FileCheck, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About Us | Paterson Roofing Contractors - Passaic County NJ',
  description:
    "Learn about Paterson Roofing Contractors -- Passaic County's trusted roofer. Licensed, insured, 15+ years experience serving all 16 municipalities.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Paterson Roofing Contractors - Passaic County NJ',
    description:
      "Learn about Paterson Roofing Contractors -- Passaic County's trusted roofer. Licensed, insured, 15+ years experience serving all 16 municipalities.",
    url: '/about',
  },
}

const credentials = [
  {
    icon: Shield,
    title: 'NJ Home Improvement Contractor License',
    description:
      'Fully licensed by the State of New Jersey Division of Consumer Affairs. Our HIC registration ensures compliance with all state regulations for residential and commercial roofing work.',
  },
  {
    icon: Shield,
    title: 'General Liability Insurance',
    description:
      'We carry comprehensive general liability insurance that protects our clients and their properties. Our coverage meets or exceeds industry standards for roofing contractors in New Jersey.',
  },
  {
    icon: Shield,
    title: "Workers' Compensation Insurance",
    description:
      "Every member of our roofing crew is covered by workers' compensation insurance. This protects homeowners from liability in the event of a workplace injury on their property.",
  },
  {
    icon: FileCheck,
    title: 'BBB Accredited Business',
    description:
      'Our Better Business Bureau accreditation reflects our commitment to ethical business practices, transparent pricing, and prompt resolution of any customer concerns.',
  },
  {
    icon: Award,
    title: 'GAF Certified Contractor',
    description:
      'As a GAF certified roofing contractor, we meet stringent standards for installation quality and customer satisfaction. This certification allows us to offer enhanced manufacturer warranties on GAF roofing products.',
  },
  {
    icon: Award,
    title: 'CertainTeed SELECT ShingleMaster',
    description:
      'Our CertainTeed SELECT ShingleMaster credential demonstrates advanced training in shingle installation techniques and qualifies us to offer extended product and workmanship warranties.',
  },
] as const

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
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
        headline="About Paterson Roofing Contractors"
        subheadline="Passaic County's trusted roofing experts for over 15 years."
        minHeight="min-h-[50vh]"
      />

      {/* 3. Our Story */}
      <section className="bg-white py-section-sm lg:py-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Our Story
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              {siteConfig.businessName} was founded with a simple mission: to
              provide Passaic County homeowners and business owners with honest,
              high-quality roofing services at fair prices. What started as a
              small crew working out of Paterson has grown into one of the
              county&apos;s most trusted roofing companies, serving all 16
              municipalities across the region.
            </p>
            <p>
              Our founder grew up in Passaic County and understands the unique
              challenges that local properties face. From the dense urban
              neighborhoods of Paterson, Clifton, and Passaic -- where aging
              multi-family homes require specialized flat roof expertise -- to
              the tree-lined suburban communities of Wayne, Hawthorne, and Little
              Falls, where seasonal storms and falling debris demand responsive,
              reliable service. We know this county because we live here.
            </p>
            <p>
              Over {siteConfig.stats.yearsExperience} years in business, we have
              completed more than {siteConfig.stats.projectsCompleted} roofing
              projects across Passaic County. Every project, from a simple shingle
              repair to a full commercial roof replacement, receives the same level
              of attention and craftsmanship. We never cut corners, and we stand
              behind every job with industry-leading warranties.
            </p>
            <p>
              Our team consists of skilled, licensed roofers who undergo regular
              training on the latest materials, techniques, and safety protocols.
              We are GAF certified and CertainTeed SELECT ShingleMaster qualified,
              which means we meet the highest standards set by the leading roofing
              material manufacturers. These certifications allow us to offer
              enhanced warranties that protect your investment for decades.
            </p>
            <p>
              Community involvement is central to who we are. We sponsor local
              youth sports teams, participate in Habitat for Humanity builds, and
              offer discounted roofing services to veterans and seniors in Passaic
              County. When severe storms hit our area, we mobilize quickly to help
              neighbors secure their homes and navigate the insurance claims
              process.
            </p>
            <p>
              We believe in transparency from the first phone call to the final
              inspection. Every project begins with a free, no-obligation estimate
              that includes a thorough roof inspection, detailed written proposal,
              and honest assessment of your options. There are no hidden fees, no
              pressure tactics, and no surprises. Our {siteConfig.stats.rating}{' '}
              rating reflects our commitment to doing things the right way, every
              time.
            </p>
            <p>
              Whether you need emergency storm damage repair at 2 AM or want to
              plan a complete roof replacement for your home, {siteConfig.businessName}{' '}
              is ready to help. We serve every city, borough, and township in
              Passaic County, and we treat every customer like a neighbor --
              because that is exactly what you are.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Credentials & Licenses */}
      <section className="bg-gray-light py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-[28px] font-bold text-navy md:text-3xl">
            Credentials & Licenses
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => (
              <Card key={credential.title} className="p-6">
                <credential.icon
                  className="mb-3 h-10 w-10 text-amber"
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-heading text-xl font-bold text-navy">
                  {credential.title}
                </h3>
                <p className="text-gray-600">{credential.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WhyChooseUs */}
      <WhyChooseUs />

      {/* 6. Service Area Overview */}
      <section className="bg-gray-light py-section-sm lg:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-6 max-w-3xl text-center text-lg text-gray-700">
            From the urban core of Paterson to the highlands of West Milford,
            our team provides professional roofing services throughout the
            entire county. Click on any municipality below to learn more about
            our services in your area.
          </p>
        </div>
        <CityLinks heading="Serving All of Passaic County" />
      </section>

      {/* 7. ContactForm */}
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
