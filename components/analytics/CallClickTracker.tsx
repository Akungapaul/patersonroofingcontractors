'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Fires a GA4 `call_click` event for any tel: link on the page.
 * Links can carry data-location (header, form-panel, emergency, sticky…)
 * so call sources are attributable in GA4.
 */
export function CallClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest?.('a[href^="tel:"]') as
        | HTMLAnchorElement
        | null
      if (!link) return
      trackEvent('call_click', {
        location: link.dataset.location ?? 'unknown',
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
