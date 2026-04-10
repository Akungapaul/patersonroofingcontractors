import { siteConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface MidPageCTAProps {
  cityName?: string
}

export function MidPageCTA({ cityName }: MidPageCTAProps = {}) {
  return (
    <section className="bg-navy py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-white">
          {cityName ? `Need a roof estimate in ${cityName}?` : 'Need a roofing estimate?'} Call{' '}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="text-amber-light underline hover:text-amber"
          >
            {siteConfig.phone}
          </a>{' '}
          or
        </p>
        <Link href="#contact">
          <Button variant="primary" size="sm">
            Get Quote
          </Button>
        </Link>
      </div>
    </section>
  )
}
