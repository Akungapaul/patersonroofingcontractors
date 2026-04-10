import { Button } from '@/components/ui/Button'
import { PhoneButton } from '@/components/ui/PhoneButton'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  headline?: string
  subheadline?: string
  backgroundImage?: string
}

export function Hero({ headline, subheadline, backgroundImage }: HeroProps = {}) {
  const defaultHeadline =
    "Paterson\u2019s #1 Roofing Contractors \u2014 Serving All of Passaic County"
  const defaultSubheadline =
    'Professional roof repair, replacement & installation serving Paterson and all 16 Passaic County municipalities. Free estimates, 24/7 emergency service.'
  const isLocationPage = !!headline

  return (
    <section
      className={`relative flex ${isLocationPage ? 'min-h-[70vh]' : 'min-h-screen'} items-center bg-gradient-to-br from-navy-dark via-navy to-navy-light`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-section-sm text-center sm:px-6 lg:px-8 lg:py-section lg:text-left">
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl">
          {headline ?? defaultHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-200">
          {subheadline ?? defaultSubheadline}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
          <Link href="#contact">
            <Button variant="primary" size="lg">
              Get Free Estimate
            </Button>
          </Link>
          <PhoneButton compact={false} />
        </div>
      </div>
    </section>
  )
}
