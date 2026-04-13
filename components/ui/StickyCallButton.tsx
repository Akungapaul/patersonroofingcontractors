'use client'

import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function StickyCallButton() {
  return (
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden"
      aria-label={`Call ${siteConfig.phone}`}
      data-action="call"
      data-location="sticky"
    >
      <Phone className="h-6 w-6" />
    </a>
  )
}
