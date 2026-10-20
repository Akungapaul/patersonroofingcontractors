// Rule 7 flat paths — single source for every flat URL on the site.
// City:    /roofing-contractor-<city>-nj
// Service: /<service>-paterson-nj  (services are audited against the home city, Paterson)
export function cityPath(citySlug: string): string {
  return `/roofing-contractor-${citySlug}-nj`
}

export function servicePath(serviceSlug: string): string {
  return `/${serviceSlug}-paterson-nj`
}

export function serviceSlugFromFlat(flatSlug: string): string | null {
  if (!flatSlug.endsWith('-paterson-nj')) return null
  return flatSlug.slice(0, -'-paterson-nj'.length)
}

// Combo pages: /<service>-<city>-nj for core services in non-home cities.
// The Paterson column is the service family above (/<service>-paterson-nj),
// so combos only cover the other 15 cities. COMBO_PAIRS is the single source
// for which combos exist: the sample stage lists one pair; the scale stage
// replaces it with the full core matrix (plan: ~/workspace/seo/paterson/combo-plan-2026-10-20.md).
export const COMBO_PAIRS: readonly { service: string; city: string }[] = [
  { service: 'roof-repair', city: 'clifton' },
]

export function comboPath(serviceSlug: string, citySlug: string): string {
  return `/${serviceSlug}-${citySlug}-nj`
}

export function comboExists(serviceSlug: string, citySlug: string): boolean {
  return COMBO_PAIRS.some((p) => p.service === serviceSlug && p.city === citySlug)
}

export function parseComboSlug(
  flatSlug: string,
  serviceSlugs: readonly string[],
  citySlugs: readonly string[]
): { service: string; city: string } | null {
  // Longest city slug first so multi-word cities (north-haledon) win.
  for (const city of [...citySlugs].sort((a, b) => b.length - a.length)) {
    const suffix = `-${city}-nj`
    if (!flatSlug.endsWith(suffix)) continue
    const service = flatSlug.slice(0, -suffix.length)
    if (serviceSlugs.includes(service) && comboExists(service, city)) {
      return { service, city }
    }
  }
  return null
}
