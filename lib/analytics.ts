declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

/** Fire a GA4 event if gtag is loaded. No-ops on the server / before load. */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {})
  }
}
