import { Button } from '@/components/ui/Button'
import { PhoneButton } from '@/components/ui/PhoneButton'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-br from-navy-dark via-navy to-navy-light">
      {/* Dark overlay -- ready for a real background image swap later */}
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-section-sm text-center sm:px-6 lg:px-8 lg:py-section lg:text-left">
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl">
          Paterson&apos;s #1 Roofing Contractors — Serving All of Passaic County
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-200">
          Professional roof repair, replacement &amp; installation serving
          Paterson and all 16 Passaic County municipalities. Free estimates, 24/7 emergency service.
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
